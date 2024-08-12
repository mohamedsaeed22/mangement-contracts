import * as yup from "yup";

const initialProjectValues = {
  name: "",
  description: "",
  startDate: null,
  endDate: null,

  assindDate: null,
  budget: "",
  budgetArray: [],

  spentDate: null,
  spent: "",
  spentBudgetArray: [],

  percentage: "",
  status: "",
  activityId: "",
  contractorId: "",
  consultantId: "",
  sectorId: "",
  showRisks: "no",
  riskStatus: "",
  riskDescription: "",
  showHandicaps: "no",
  handicapStatus: "",
  handicapDescription: "",
};

const projectSchema = yup.lazy((values) => {
  let schema = yup.object().shape({
    name: yup
      .string()
      .required("اسم المشروع مطلوب")
      .min(6, "يجب أن يكون اسم المشروع أطول من 5 أحرف")
      .max(100, "يجب أن يكون اسم المشروع اقل من 100 حرف"),
    description: yup
      .string()
      .required("الوصف مطلوب")
      .max(2000, "يجب أن يكون وصف المشروع اقل من 2000 حرف"),
    startDate: yup
      .date()
      .required("تاريخ البدايه مطلوب")
      .typeError("التاريخ غير صحيح"),
    endDate: yup
      .date()
      .required("تاريخ النهاية مطلوب")
      .min(
        yup.ref("startDate"),
        "تاريخ النهاية لا يمكن ان يكون قبل تاريخ البدايه"
      )
      .typeError("التاريخ غير صحيح"),
    percentage: yup
      .number()
      .required("النسبة مطلوبة")
      .typeError("النسبة لابد أن تكون رقم")
      .integer("النسبة لابد أن تكون عدد صحيح")
      .min(0, "النسبة لابد أن تكون بين 0 و 100")
      .max(100, "النسبة لابد أن تكون بين 0 و 100"),
    showRisks: yup.string().required(),
    showHandicaps: yup.string().required(),
    status: yup.string().required("حالة المشروع مطلوبة"),
    activityId: yup.string().required("النشاط مطلوب"),
    sectorId: yup.string().required("القطاع مطلوب"),
    consultantId: yup.string(),
    contractorId: yup.string(),
    spentDate: yup.date().nullable().typeError("التاريخ غير صحيح"),
    spent: yup
      .number()
      .typeError("قيمه المنصرف لابد من ان تكون رقم")
      .min(0, "قيمه المنصرف لابد أن تكون قيمة موجبة"),
    assindDate: yup.date().nullable().typeError("التاريخ غير صحيح"),
    budget: yup
      .number()
      .typeError("قيمه المخصص لابد من ان تكون رقم")
      .min(0, "قيمه المخصص لابد أن تكون قيمة موجبة"),
  });

  // if (values.budgetArray && values.budgetArray.length === 0) {
  //   schema = schema.concat(
  //     yup.object().shape({
  //       assindDate: yup
  //         .date()
  //         .nullable()
  //         .required("تاريخ المخصص مطلوب")
  //         .typeError("التاريخ غير صحيح"),
  //       budget: yup
  //         .number()
  //         .required("قيمه المخصص مطلوبة")
  //         .typeError("قيمه المخصص لابد من ان تكون رقم")
  //         .min(0, "قيمه المخصص لابد أن تكون قيمة موجبة"),
  //     })
  //   );
  // }

  // if (values.spentBudgetArray && values.spentBudgetArray.length === 0) {
  //   schema = schema.concat(
  //     yup.object().shape({
  //       spentDate: yup
  //         .date()
  //         .nullable()
  //         .required("تاريخ المنصرف مطلوب")
  //         .typeError("التاريخ غير صحيح"),
  //       spent: yup
  //         .number()
  //         .required("قيمه المنصرف مطلوبة")
  //         .typeError("قيمه المنصرف لابد من ان تكون رقم")
  //         .min(0, "قيمه المنصرف لابد أن تكون قيمة موجبة"),
  //     })
  //   );
  // }

  if (values.showRisks === "yes") {
    schema = schema.concat(
      yup.object().shape({
        riskStatus: yup.string().required("حالة المخاطر مطلوبة"),
        riskDescription: yup
          .string()
          .required("المخاطر مطلوبة")
          .min(6, "يجب أن تحتوي المخاطر على 6 أحرف على الأقل"),
      })
    );
  }

  if (values.showHandicaps === "yes") {
    schema = schema.concat(
      yup.object().shape({
        handicapStatus: yup.string().required("حالة المعوقات مطلوبة"),
        handicapDescription: yup
          .string()
          .required("المعوقات مطلوبة")
          .min(6, "يجب أن تحتوي المعوقات على 6 أحرف على الأقل"),
      })
    );
  }

  return schema;
});

export { projectSchema, initialProjectValues };
