import * as yup from "yup";

const projectSchema = yup.object().shape({
  name: yup
    .string()
    .required("اسم المشروع مطلوب")
    .min(6, "يجب أن يكون اسم المشروع أطول من 5 أحرف"),
  description: yup.string().required("الوصف مطلوب"),
  startDate: yup
    .date().nullable()
    .required("تاريخ البداية مطلوب")
    .typeError("التاريخ غير صحيح"),
  endDate: yup
    .date().nullable()
    .required("تاريخ النهاية مطلوب")
    .typeError("التاريخ غير صحيح")
    .when(
      "startDate",
      (started, yup) =>
        started &&
        yup.min(started, "تاريخ النهاية يجب أن يكون بعد تاريخ البداية")
    ),
  // .min(yup.ref("startDate"), "تاريخ النهاية يجب أن يكون بعد تاريخ البداية"),
  budget: yup
    .number()
    .required("التكلفة مطلوبة")
    .typeError("التكلفه لابد من ان تكون رقم"),
  spentBudget: yup
    .number()
    .required("المنصرف مطلوب")
    .typeError("المنصرف لابد من ان يكون رقم"),
  percentage: yup
    .number()
    .required("النسبة مطلوبة")
    .typeError("النسبة لابد أن تكون رقم")
    .min(0, "النسبة لابد أن تكون بين 0 و 100")
    .max(100, "النسبة لابد أن تكون بين 0 و 100"),
  status: yup.string().required("حالة المشروع مطلوبة"),
  branchId: yup.string().required("النشاط مطلوب"),
  supervisorId: yup.string().required("اسم المشرف مطلوب"),
});

export default projectSchema;
