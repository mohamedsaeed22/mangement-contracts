import { isAxiosError } from "axios";

const axiosErrorHandler = (error) => {
  if (isAxiosError(error)) {
    return (
      error.response?.data || error.response?.data.message || error.message
    );
  } else {
    return "خطا غير معروف";
  }
};

export default axiosErrorHandler;
