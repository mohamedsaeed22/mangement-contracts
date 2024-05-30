import React from "react";
import MyInput from "../common/UI/MyInput";
import { Formik } from "formik";
import {
  actCreateSupervisor,
  actUpdateSupervisor,
} from "../../store/supervisor/supervisorSlice";
import { useDispatch } from "react-redux";
import { notifyFailed, notifySuccess } from "../feedback/alerts";
import supervisorSchema from "../../validations/supervisorSchema";
import { Button, Stack } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";

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
          direction={isUpdate && "column"}
          gap={2}
          marginBlock={isUpdate && "1.25rem"}
          alignItems="center"
          onSubmit={handleSubmit}
        >
          <MyInput
            name="name"
            label="اسم المسؤل"
            value={values.name}
            onChange={handleChange}
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
            value={values.phone}
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
          <Button
            variant="contained"
            startIcon={isUpdate ? <Edit /> : <Add />}
            type="submit"
            sx={{ alignSelf: "flex-start", marginInline: isUpdate && "auto" }}
          >
            {isUpdate ? "تعديل" : "اضافة"}
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export default SupervisorForm;
