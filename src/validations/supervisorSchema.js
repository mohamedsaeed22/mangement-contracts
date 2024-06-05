import * as yup from "yup";

const phoneRegExp = /^01[1250][0-9]{8}$/;

const supervisorSchema = yup.object().shape({
  name: yup.string().required("اسم الاستشارى مطلوب"),
  phone: yup
    .string()
    .matches(phoneRegExp, "رقم الهاتف غير صحيح")
    .required("رقم الهاتف مطلوب"),
});

export default supervisorSchema;
