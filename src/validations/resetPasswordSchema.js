import * as yup from "yup";

const resetPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("كلمه المرور القديمه مطلوبة"),
  newPassword: yup.string().required("كلمه المرور الجديده مطلوبة"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "كلمه المرور يجب أن تتطابق")
    .required("تاكيد كلمه المرور مطلوب"),
});

export default resetPasswordSchema;
