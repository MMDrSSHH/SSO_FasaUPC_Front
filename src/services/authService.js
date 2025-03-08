import { AxiosError } from "axios";
import api from "../config/api/apiConfig";
import { APIPath } from "../utils/constants/apiPath";
import BaseService from "./baseService";

class AuthService extends BaseService {
  signup = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("nationalCode", data.nationalCode);
      formData.append("studentNo", data.studentNo);
      formData.append("username", data.username);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("studentCard", data.studentCard);
      const apiUrl = this._formatURLTemplate(APIPath.getSignup(), {
        clientId: data.clientId,
        clientUri: data.clientUri,
      });

      const res = await api.post(apiUrl, formData);
      const serviceResponse = await this._getServiceResponse(res);

      return serviceResponse;
    } catch (error) {
      // if (error instanceof AxiosError) {
      //   console.log(await error.response.data);
      // }
      console.log(error);
    }
  };
}

export default AuthService;
