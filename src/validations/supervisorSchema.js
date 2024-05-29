import * as yup from "yup";

const phoneRegExp = /^01[1250][0-9]{8}$/;

const supervisorSchema = yup.object().shape({
  name: yup.string().required("اسم المشرف مطلوب"),
  phone: yup
    .string() // Change from number() to string()
    .matches(phoneRegExp, "رقم الهاتف غير صحيح")
    .required("رقم الهاتف مطلوب"),
});

export default supervisorSchema;
