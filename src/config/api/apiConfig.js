import axios from "axios";
import { BaseURL } from "../../utils/constants/apiPath";

const api = axios.create({
  baseURL: BaseURL.Development,
  validateStatus: (status) => {
    // Prevent the axios to throw exceptions on 4.. and 5.. status codes
    return status;
  },
});

export default api;
