import * as yup from "yup";

const phoneRegExp = /^01[1250][0-9]{8}$/;

const supervisorSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z\u0600-\u06FF\s]*$/,
      "الاسم يجب أن يحتوي على حروف فقط"
    )
    .min(3, "الاسم لابد أن يكون 3 أحرف على الأقل")
    .required("اسم الاستشارى مطلوب"),
  phone: yup
    .string()
    .matches(phoneRegExp, "رقم الهاتف غير صحيح")
    .required("رقم الهاتف مطلوب"),
});

export default supervisorSchema;
