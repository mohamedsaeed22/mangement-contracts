 import * as yup from "yup";

const initialProjectValues = {
  name: "",
  description: "",
  startDate: null,
  endDate: null,
  budget: "",
  spentBudget: "",
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
      .min(6, "يجب أن يكون اسم المشروع أطول من 5 أحرف"),
    description: yup.string().required("الوصف مطلوب"),
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
    budget: yup
      .number()
      .required("التكلفة مطلوبة")
      .typeError("التكلفة لابد من ان تكون رقم")
      .min(0, "التكلفة لابد أن تكون قيمة موجبة"),

    spentBudget: yup
      .number()
      .required("المنصرف مطلوب")
      .typeError("المنصرف لابد من ان يكون رقم")
      .min(0, "المنصرف لابد أن يكون قيمة موجبة"),

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
  });

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
