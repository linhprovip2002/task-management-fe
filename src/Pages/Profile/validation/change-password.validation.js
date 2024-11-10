import Joi from "joi";
import { toast } from "react-toastify";

export const changePasswordValidation = Joi.object({
  currentPassword: Joi.string()
    .required()
    .label("currentPassword")
    .messages({ "string.empty": "Current password is required" }),
  newPassword: Joi.string()
    .min(6)
    .pattern(new RegExp("(?=.*[a-z])")) // Chữ cái thường
    .pattern(new RegExp("(?=.*[A-Z])")) // Chữ cái hoa
    .pattern(new RegExp("(?=.*\\d)")) // Số
    .pattern(new RegExp("(?=.*[!@#$%^&*])")) // Ký tự đặc biệt
    .required()
    .label("newPassword")
    .messages({
      "string.pattern.base":
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character."
    })
}).custom((value, helpers) => {
  if (value.newPassword === value.currentPassword) {
    toast.error("New password must be different from the current password");
    return helpers.message(
      "New password must be different from the current password"
    );
  }
  return value;
});
