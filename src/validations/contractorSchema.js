import * as yup from "yup";

const initialContractor = {
  name: "",
  description: "",
  phoneNumber: "",
  contactPersonPhone: "",
  contactPersonName: "",
  address: "",
  country: "",
  specialization: "",
  experience: "",
  qualification: "",
};

const contractorSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\u0600-\u06FF\s]*$/, "الاسم يجب أن يحتوي على حروف فقط")
    .min(5, "الاسم لابد أن يكون 5 أحرف على الأقل")
    .required("اسم المقاول مطلوب"),
  description: yup.string(),
  phoneNumber: yup.string(),
  contactPersonPhone: yup.string(),
  contactPersonName: yup.string(),
  address: yup.string(),
  country: yup.string(),
  specialization: yup.string(),
  experience: yup.string(),
  qualification: yup.string(),
});

export { contractorSchema, initialContractor };
