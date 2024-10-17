import Joi from "joi";

const validation = Joi.object({
  title: Joi.string().min(5).max(30).required().label("Name"),
  description: Joi.string().min(5).max(50).required().label("Description"),
});

export default validation;