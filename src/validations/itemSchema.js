import * as yup from "yup";

const itemSchema = yup.object().shape({
  name: yup
    .string()
    .required("اسم الصنف مطلوب")
    .min(3, "يجب أن يكون طول الاسم على الأقل 3 أحرف"),
  description: yup
    .string()
    .required("الوصف مطلوب")
    .min(3, "يجب أن يكون طول الوصف على الأقل 3 أحرف"),
});

export default itemSchema;
