import dayjs from "dayjs";
import * as yup from "yup";

// const projectSchema = yup.object().shape({
//   name: yup
//     .string()
//     .required("اسم المشروع مطلوب")
//     .min(6, "يجب أن يكون اسم المشروع أطول من 5 أحرف"),
//   description: yup.string().required("الوصف مطلوب"),
//   startDate: yup
//     .date()
//     .nullable()
//     .required("تاريخ البداية مطلوب")
//     .typeError("التاريخ غير صحيح"),
//   endDate: yup
//     .date()
//     .nullable()
//     .required("تاريخ النهاية مطلوب")
//     .typeError("التاريخ غير صحيح")
//     .when(
//       "startDate",
//       (started, yup) =>
//         started &&
//         yup.min(started, "تاريخ النهاية يجب أن يكون بعد تاريخ البداية")
//     ),
//   // .min(yup.ref("startDate"), "تاريخ النهاية يجب أن يكون بعد تاريخ البداية"),
//   budget: yup
//     .number()
//     .required("التكلفة مطلوبة")
//     .typeError("التكلفه لابد من ان تكون رقم"),
//   spentBudget: yup
//     .number()
//     .required("المنصرف مطلوب")
//     .typeError("المنصرف لابد من ان يكون رقم"),
//   percentage: yup
//     .number()
//     .required("النسبة مطلوبة")
//     .typeError("النسبة لابد أن تكون رقم")
//     .min(0, "النسبة لابد أن تكون بين 0 و 100")
//     .max(100, "النسبة لابد أن تكون بين 0 و 100"),
//   showRisks: yup.string().required(),
//   showDisables: yup.string().required(),
//   riskStatus: yup.string().when(["showRisks", "showDisables"], {
//     is: (showRisks, showDisables) =>
//       showRisks === "yes" || showDisables === "yes",
//     then: yup.string().required("حالة المخاطر مطلوبة"),
//   }),
//   risks: yup.string().when("showRisks", {
//     is: "yes",
//     then: yup.string().required("المخاطر مطلوبة"),
//   }),
//   disableStatus: yup.string().when(["showRisks", "showDisables"], {
//     is: (showRisks, showDisables) =>
//       showRisks === "yes" || showDisables === "yes",
//     then: yup.string().required("حالة المعوقات مطلوبة"),
//   }),
//   disables: yup.string().when("showDisables", {
//     is: "yes",
//     then: yup.string().required("المعوقات مطلوبة"),
//   }),
// });
const initialProjectValues = {
  name: "",
  description: "",
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),
  budget: "",
  spentBudget: "",
  percentage: "",
  status: "",
  branchId: "",
  supervisorId: "",
  showRisks: "no",
  riskStatus: "",
  risks: "",
  showDisables: "no",
  disableStatus: "",
  disables: "",
};

const projectSchema = yup.lazy((values) => {
  let schema = yup.object().shape({
    name: yup
      .string()
      .required("اسم المشروع مطلوب")
      .min(6, "يجب أن يكون اسم المشروع أطول من 5 أحرف"),
    description: yup.string().required("الوصف مطلوب"),
    startDate: yup
      .date()
      .nullable()
      .required("تاريخ البداية مطلوب")
      .typeError("التاريخ غير صحيح"),
    endDate: yup
      .date()
      .nullable()
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
    showRisks: yup.string().required(),
    showDisables: yup.string().required(),
    status: yup.string().required("حالة المشروع مطلوبة"),
    branchId: yup.string().required("النشاط مطلوب"),
    supervisorId: yup.string().required("اسم المشرف مطلوب"),
  });

  if (values.showRisks === "yes") {
    schema = schema.concat(
      yup.object().shape({
        riskStatus: yup.string().required("حالة المخاطر مطلوبة"),
        risks: yup.string().required("المخاطر مطلوبة"),
      })
    );
  }

  if (values.showDisables === "yes") {
    schema = schema.concat(
      yup.object().shape({
        disableStatus: yup.string().required("حالة المعوقات مطلوبة"),
        disables: yup.string().required("المعوقات مطلوبة"),
      })
    );
  }

  return schema;
});
export { projectSchema, initialProjectValues };
