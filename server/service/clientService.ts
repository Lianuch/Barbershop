import { Client } from "../models/client";
import AppError from "../utils/appError";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mailService";
import ClientDto from "../dto/clientDto";
import tokenService from "./tokenService";
class ClientService {
  async registration(email: string, password: string) {
    const candidate = await Client.findOne({ email });
    if (candidate) {
      throw AppError.BadRequest("Client already exists");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const client = await Client.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/clients/activate/${activationLink}`
    );
    
    console.log("PASSWORD: ", client.password);

    const clientDto = new ClientDto(client);
    const tokens = tokenService.generateTokens({ ...clientDto });
    await tokenService.saveToken(clientDto.id, tokens.refreshToken);

    return {
      ...tokens,
      client: clientDto,
    };
  }

  async activate(activationLink: string) {
    const client = await Client.findOne({ activationLink });
    if (!client) {
      throw AppError.BadRequest("Invalid link");
    }

    client.isActivated = true;
    await client.save();
  }

  async login(email: string, password: string) {
    const client = await Client.findOne({ email }).select("+password");;    

    if (!client) {
      throw AppError.BadRequest("Client not found");
    }

    const isPassEquals = await bcrypt.compare(password, client.password);
    if (!isPassEquals) {
        throw AppError.BadRequest("Incorrect password");
    }

    const clientDto = new ClientDto(client);
    const tokens = tokenService.generateTokens({ ...clientDto });

    await tokenService.saveToken(clientDto.id, tokens.refreshToken);

    return { ...tokens, client: clientDto };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw AppError.UnauthorizedError();
    }

    const clientData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if(!clientData || !tokenFromDB) {
        throw AppError.UnauthorizedError();
    }

    const client = await Client.findById(clientData.id);
    const clientDto = new ClientDto(client);
    const tokens = tokenService.generateTokens({ ...clientDto });

    await tokenService.saveToken(clientDto.id, tokens.refreshToken);

    return { ...tokens, client: clientDto };

  }

  async getAllClients() {
    const clients = await Client.find();
    return clients;
  }
}

export default new ClientService();