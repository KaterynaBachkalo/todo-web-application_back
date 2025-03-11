import Joi from "joi";
import { title } from "process";

const addUserSchema = Joi.object({
  name: Joi.string().min(1).allow("").default("NONAME"),

  password: Joi.string().min(6).required().messages({
    "any.required": "Set password for user",
  }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Set email for user" }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(1).allow(""),

  phone: Joi.number(),
});

const addPetSchema = Joi.object({
  name: Joi.string().min(1),
  title: Joi.string().min(1),
  birthday: Joi.string().min(10).max(10),
  species: Joi.string(),
  sex: Joi.string(),
  imgURL: Joi.alternatives().try(Joi.object(), Joi.any().valid(null)),
});

export default {
  addUserSchema,
  updateUserSchema,
  addPetSchema,
};
