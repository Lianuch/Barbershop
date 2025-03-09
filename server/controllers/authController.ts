import { Client, IClient } from "../models/client";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { generateOtp } from "../utils/generateOtp";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { sendEmail } from "../utils/email";

import crypto from 'crypto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';


const SignToken = (id: string) => {
const secret = "asjk2fja6slki8othaisd"

console.log(secret);
console.log(`id:  ${id}`);

  const token = jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  try {
    const decoded = jwt.verify(token, secret);
    console.log("Token is valid:", decoded);
  } catch (err) {
    console.error("Token verification failed:", err.message);
  }
console.log(token);

  return token;


};


export const createSendToken = (client: IClient,statusCode: number,res: Response,message: string) => {
  const token = SignToken(client._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.cookie("jwt", token, cookieOptions);

  client.password = undefined;
  client.passwordConfirm = undefined;
  client.otp = undefined;

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      client,
    },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm } = req.body;
    const existingClient = await Client.findOne({ email });
    if (existingClient) return next(new AppError("Client already exists", 400));

    const otp = generateOtp();
    const otpExpires = Date.now() + 24 * 60 * 60 * 1000;

    const newClient = await Client.create({
      name,
      email,
      password,
      passwordConfirm,
      otp,
      otpExpires,
    });

    try {
      sendEmail({
        email: newClient.email,
        subject: "Verify your email address",
        html: `<h1>Use the following OTP to verify your email address: <b>${otp}</b></h1>`,
      });
      createSendToken(newClient, 200, res, "Registration successfull");
    } catch (err) {
      await Client.findByIdAndDelete(newClient._id);
      return next(
        new AppError("Error occured while sending email. Try again", 500)
      );
    }
  }
);

export const verifyAccount = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body;
  console.log("dskghsd");

    if (!otp) {
      return next(new AppError("OTP is missing", 400));

    }

    const client = req.client as IClient;

    if (client.otp !== otp) {
      return next(new AppError("Invalid OTP", 400));
    }

    if (Date.now() > (client.otpExpires as Date).getTime()) {
      return next(new AppError("OTP has expired. Please request a new one", 400));
    }

    client.isVerified = true;
    client.otp = undefined;
    client.otpExpires = undefined;

    await (client as any).save({
      validateBeforeSave: false,
    });

    createSendToken(client, 200, res, "Account verified successfully");
  }
);

export const resendOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.client;
    if (!email) {
      return next(new AppError("Email is missing", 400));
    }

    const client = await Client.findOne({ email });
    if (!client) {
      return next(new AppError("Client not found", 400));
    }
    if(client.isVerified){
        return next(new AppError("Client is already verified", 400));
    }

    const newOtp = generateOtp();
    client.otp = newOtp;
    client.otpExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await client.save({
      validateBeforeSave: false,
    });

    try {
      await sendEmail({
        email: client.email,
        subject: "Resend otp for email verification",
        html: `<h1>Your new OTP is: ${newOtp}</h1>`,
      });
      res.status(200).json({
        status: "success",
        message: "New otp has sent to your email",
      });
    } 
    catch (err) {
      client.otp = undefined;
      client.otpExpires = undefined;

      await client.save({
        validateBeforeSave: false,
      });
      return next(
        new AppError("Error occured while sending email. Try again", 500)
      );
    }
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const client = await Client.findOne({ email }).select("+password");

    if (!client || !(await client.correctPassword(password, client.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(client, 200, res, "Login successfully");
  }
);

export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
    res.status(200).json({
        status:"success",
        message:"Logged out successfully"
    })
})

export const forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const client = await Client.findOne({ email });

    if (!client) {
        return next(new AppError("Client not found", 404));
    }

    const otp = generateOtp()
    client.resetPasswordOtp = otp;
    client.resetPasswordOTPExpires = new Date(Date.now() + 300000);

    await client.save({
        validateBeforeSave: false,
    });

    try {
        await sendEmail({
            email:client.email,
            subject: "Your OTP for password reset (valid for 5 minutes)",
            html: `<h1>Your OTP is: ${otp}</h1>`
        })

        res.status(200).json({
            status: "success",
            message: "Password reset OTP has sent to your email"
        })
    }
    catch(err){
        client.resetPasswordOtp = undefined;
        client.resetPasswordOTPExpires = undefined;
        await client.save({
            validateBeforeSave: false,
        });
        return next(new AppError("Error occured while sending email. Try again", 500))
    }

})

export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, otp, password, passwordConfirm} = req.body;

    const client = await Client.findOne({
        email,
        resetPasswordOtp: otp,
        resetPasswordOTPExpires: {$gt: Date.now()}
    });

    if(!client){
        return next(new AppError("Client not found", 404));
    }

    client.password = password;
    client.passwordConfirm = passwordConfirm;
    client.resetPasswordOtp = undefined;
    client.resetPasswordOTPExpires = undefined;

    await client.save()
    createSendToken(client, 200, res, "Password reset successfully")
})