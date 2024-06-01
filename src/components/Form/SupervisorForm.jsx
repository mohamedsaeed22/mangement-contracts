import React from "react";
import MyInput from "./Input/MyInput";
import { Formik } from "formik";
import {
  actCreateSupervisor,
  actUpdateSupervisor,
} from "../../store/supervisor/supervisorSlice";
import { useDispatch } from "react-redux";
import { notifyFailed, notifySuccess } from "../feedback/Alerts/alerts";
import supervisorSchema from "../../validations/supervisorSchema";
import { Box, Stack } from "@mui/material";
import MyButton from "../common/UI/MyButton";

const defaultInitialSupervisor = {
  name: "",
  phone: "",
};

const SupervisorForm = ({
  initialValues = defaultInitialSupervisor,
  isUpdate = false,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();

  const handleFormSubmit = (values, { resetForm }) => {
    if (isUpdate) {
      dispatch(actUpdateSupervisor(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم تحديث المسؤل بنجاح");
          handleCloseModal();
        })
        .catch((err) => {
          notifyFailed("حدث خطأ أثناء تحديث المسؤل");
        });
    } else {
      dispatch(actCreateSupervisor(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم اضافة المسؤل بنجاح");
          resetForm();
        })
        .catch((err) => {
          notifyFailed("هذا المسؤل موجود مسبقا");
        });
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={supervisorSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Stack
          component="form"
          id="supervisor-form"
          flexWrap="wrap"
          direction={isUpdate && "column"}
          gap={isUpdate ? 0 : 2}
          marginBlock={isUpdate && "1.25rem"}
          alignItems="center"
          onSubmit={handleSubmit}
        >
          <MyInput
            name="name"
            label="اسم المشرف"
            placeholder="ادخل الاسم"
            value={values.name}
            onChange={handleChange}
            size="small"
            onBlur={handleBlur}
            width={250}
            error={!!touched.name && !!errors.name}
            helperText={
              touched.name && errors.name ? touched.name && errors.name : " "
            }
          />
          <MyInput
            name="phone"
            label="رقم الهاتف"
            placeholder="ادخل رقم الهاتف"
            value={values.phone}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.phone && !!errors.phone}
            helperText={
              touched.phone && errors.phone
                ? touched.phone && errors.phone
                : " "
            }
          />
          <Box mt={1}>
            <MyButton
              type="submit"
              width={100}
              height={40}
              label={isUpdate ? "تعديل" : "اضافة"}
            />
          </Box>
        </Stack>
      )}
    </Formik>
  );
};

export default SupervisorForm;