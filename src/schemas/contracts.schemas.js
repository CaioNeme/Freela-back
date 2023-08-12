import JoiBase from "joi";
import JoiDate from "@joi/date";

const joi = JoiBase.extend(JoiDate);

export const contractSchema = joi.object({
  startDate: joi.date().format("MM/DD/YYYY").required(),
});

export const contractPutSchema = joi.object({
  status: joi.string().allow("Em andamento", "Feito", "Cancelado").required(),
});
