import joi from "joi";

export const signInSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
});

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  phone: joi.number().required().min(11),
  password: joi.string().required().min(8),
  confirmPassword: joi.string().required().min(8),
});
