import { fillTemplate } from "../utils/helpers/string";

class BaseService {
  _formatURLTemplate = (urlTemplate, data) => {
    return fillTemplate(urlTemplate, data);
  };

  _getServiceResponse = async (response) => {
    const responseData = await response.data;
    const statusCode = response.status;
    const status = responseData.code;
    const body = responseData.body;
    const hasError = responseData.error;
    const serviceResponse = new ServiceResponse()
      ._setBody(body)
      ._setHasError(hasError)
      ._setStatus(status)
      ._setStatusCode(statusCode);

    return serviceResponse;
  };
}

export class ServiceResponse {
  body;
  hasError = false;
  statusCode;
  status;
  _setStatus(status) {
    this.status = status;
    return this;
  }
  _setBody(body) {
    this.body = body;
    return this;
  }
  _setHasError(hasError) {
    this.hasError = hasError;
    return this;
  }
  _setStatusCode(statusCode) {
    this.statusCode = statusCode;
    return this;
  }
}

export default BaseService;
