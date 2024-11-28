import Joi from "joi";
const validation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("email"),
});

export default validation;
