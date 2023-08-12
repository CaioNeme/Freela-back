import joi from "joi";

export const contractSchema = joi.object({
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  // status: joi.string().allow("Em andamento", "Feito", "Cancelado"),
});

export const contractPutSchema = joi.object({
  status: joi.string().allow("Em andamento", "Feito", "Cancelado").required(),
});
