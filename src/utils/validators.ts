import Joi from "joi";

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

export default {
  addUserSchema,
};
