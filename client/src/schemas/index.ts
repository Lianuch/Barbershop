import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
});
export const SignupValidationSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().email("Invalid email format").required("Email required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
});

export const ResetPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
});
