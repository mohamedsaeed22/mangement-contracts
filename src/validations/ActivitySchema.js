import * as yup from "yup";

const ActivitySchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z\u0600-\u06FF\s]*$/,
      "اسم النشاط يجب أن يحتوي على حروف فقط"
    )
    .min(3, "اسم النشاط يجب أن يكون 3 أحرف على الأقل")
    .required("اسم النشاط مطلوب"),
  description: yup
    .string()
    .matches(
      /^[a-zA-Z\u0600-\u06FF\s]*$/,
      "وصف النشاط يجب أن يحتوي على حروف فقط"
    )
    .min(3, "وصف النشاط يجب أن يكون 3 أحرف على الأقل")
    .required("وصف النشاط مطلوب"),
});

export default ActivitySchema;
