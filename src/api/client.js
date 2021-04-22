import axios from "axios";
import { toast } from "react-toastify";

import config from "../config";

const axiosConfig = {
  baseURL: config.apiUrl,
};

const axiosInstance = axios.create(axiosConfig);
axiosInstance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected server error occurred.", { autoClose: true, delay: 5000 });
  }

  return Promise.reject(error);
});

export default axiosInstance;
