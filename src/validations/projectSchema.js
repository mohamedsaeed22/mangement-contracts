import dayjs from "dayjs";
import * as yup from "yup";

const initialProjectValues = {
  name: "",
  description: "",
  startDate: dayjs().toISOString(), // Set initial date to current date
  endDate: dayjs().toISOString(),
  budget: "",
  spentBudget: "",
  percentage: "",
  status: "",
  ActivityId: "",
  supervisorId: "",
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
      )
      ,
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
      .integer("النسبة لابد أن تكون عدد صحيح")
      .min(0, "النسبة لابد أن تكون بين 0 و 100")
      .max(100, "النسبة لابد أن تكون بين 0 و 100"),
    showRisks: yup.string().required(),
    showHandicaps: yup.string().required(),
    status: yup.string().required("حالة المشروع مطلوبة"),
    ActivityId: yup.string().required("النشاط مطلوب"),
    supervisorId: yup.string().required("اسم الاستشارى مطلوب"),
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
