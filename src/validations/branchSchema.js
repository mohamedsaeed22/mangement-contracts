import * as yup from "yup";

const branchSchema = yup.object().shape({
  name: yup.string().required("اسم النشاط مطلوب"),
  description: yup.string().required("وصف النشاط مطلوب"),
});

export default branchSchema;
