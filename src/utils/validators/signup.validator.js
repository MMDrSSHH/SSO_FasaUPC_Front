import Joi from "joi";

class SignupSchema {
  _personalDataSchema = Joi.object({
    firstName: Joi.string().max(25).required(),
    lastName: Joi.string().max(25).required(),
    studentNo: Joi.string().length(7).required(),
    birthDate: Joi.date().optional(),
    nationalCode: Joi.string()
      .pattern(new RegExp(/^\d{10}$/))
      .required(),
  });

  _userDataSchema = Joi.object({
    username: Joi.string().min(3).max(25).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .optional(),
    phone: Joi.string().optional(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
  });

  getPersonalDataSchema() {
    return this._personalDataSchema;
  }

  getUserDataSchema() {
    return this._userDataSchema;
  }
}

export default SignupSchema;
