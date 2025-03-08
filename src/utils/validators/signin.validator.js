import Joi from "joi";

class SigninSchema {
  static _signinSchema = Joi.object({
    identifier: Joi.alternatives(
      // email
      Joi.string().email({ tlds: { allow: false } }),
      // username
      Joi.string().min(3).max(50),
      // studentNo
      Joi.string().pattern(new RegExp(/^\d{7}$/)),
      // nationalCode
      Joi.string().pattern(new RegExp(/^\d{10}$/))
    ).required(),
    password: Joi.string(),
  });

  static getSigninSchema = () => {
    return this._signinSchema;
  };
}

export default SigninSchema;
