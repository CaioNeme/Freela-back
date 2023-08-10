import joi from "joi";

export const createServiceSchema = joi.object({
  title: joi.string().required(),
  subTitle: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  address: joi.string().required(),
  categoryId: joi.number().required(),
  rangeId: joi.number().allow("1", "2", "3").required(),
  mainImage: joi.string().uri().required(),
  status: joi.bool().allow("true", "false"),
});
