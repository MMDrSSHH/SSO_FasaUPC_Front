export class BaseURL {
  static Production = "";
  static Development = "http://localhost:5000/api/";
}

export class APIPath {
  static _signupUrl =
    "/auth/signup?clientId=${clientId}&clientUri=${clientUri}";
  static _signinUrl =
    "/auth/signin?clientId=${clientId}&clientUri=${clientUri}";

  static getSignup() {
    return this._signupUrl;
  }
  static getSignin() {
    return this._signinUrl;
  }
}
