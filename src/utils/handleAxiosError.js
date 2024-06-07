import axios from "axios";

export const handleAxiosError = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.status || error.message;
  } else {
    return "حدث خطا فى الشبكة";
  }
};
