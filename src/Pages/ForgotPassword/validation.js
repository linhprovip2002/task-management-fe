import Joi from "joi";
const validation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("email"),
});

export const resetPasswordValidation = Joi.object({
  secretToken: Joi.string().required(),
  newPassword: Joi.string()
    .min(6)
    .pattern(new RegExp("(?=.*[a-z])")) // Chữ cái thường
    .pattern(new RegExp("(?=.*[A-Z])")) // Chữ cái hoa
    .pattern(new RegExp("(?=.*\\d)")) // Số
    .pattern(new RegExp("(?=.*[!@#$%^&*])")) // Ký tự đặc biệt
    .required()
    .label("password")
    .messages({
      "string.pattern.base":
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.",
    }),
});

export default validation;
