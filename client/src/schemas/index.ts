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


export const AddFavorSchema = yup.object().shape({
  nameEn: yup.string().required("Name is required"),
  nameUa: yup.string().required("Name is required"),

  time: yup.string().required("Time is required"),
  price: yup.number().min(0.1).required("Price is required"),
});

export const AddBarberSchema = yup.object().shape({
  image: yup.string().url("Invalid URL").required("Image is required"),
  nameEn: yup.string().required("Name is required"),
  nameUa: yup.string().required("Name is required"),
  surnameEn: yup.string().required("Surname is required"),
  surnameUa: yup.string().required("Surname is required"),
  coef: yup.number().min(0.1).required("Coefficient is required"),
});
