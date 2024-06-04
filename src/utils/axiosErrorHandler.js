const axiosErrorHandler = (action) => {
  if (
    action?.payload?.response?.status === 401 ||
    action?.payload?.status === 404
  ) {
    return "خطا فى اسم المستخدم او كلمة المرور";
  } else if (action?.payload?.response?.status === 500) {
    return "حدث خطا ما فى السيرفر";
  } else {
    return "حدث خطا فى الشبكة";
  }
};

export default axiosErrorHandler;
