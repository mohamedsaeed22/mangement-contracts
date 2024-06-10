import * as yup from "yup";
const initialSector = {
  name: "",
};

const sectorSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z\u0600-\u06FF\s]*$/,
      "اسم القطاع يجب أن يحتوي على حروف فقط"
    )
    .min(5, "اسم القطاع يجب أن يكون 5 أحرف على الأقل")
    .required("اسم القطاع مطلوب"),
});

export { sectorSchema, initialSector };
