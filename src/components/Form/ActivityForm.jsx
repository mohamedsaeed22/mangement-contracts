import React from "react";
import MyInput from "./Input/MyInput";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { notifyFailed, notifySuccess } from "../feedback/Alerts/alerts";
import { Box, Stack } from "@mui/material";
import actUpdateActivity from "../../store/Activity/act/actUpdateActivity";
import actCreateActivity from "../../store/Activity/act/actCreateActivity";
import ActivitySchema from "../../validations/ActivitySchema";
import MyBtn from "../common/UI/MyBtn";
import AddIcon from "../../assets/icon/add-icon.svg";
import EditIcon from "../../assets/icon/edit-icon.svg";

const defaultInitialSupervisor = {
  name: "",
  description: "",
};

const ActivityForm = ({
  initialValues = defaultInitialSupervisor,
  isUpdate = false,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();
  const handleFormSubmit = (values, { resetForm }) => {
    if (isUpdate) {
      dispatch(actUpdateActivity(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم تحديث النشاط بنجاح");
          handleCloseModal();
        })
        .catch((err) => {
          notifyFailed(err + "حدث خطأ أثناء تحديث النشاط");
        });
    } else {
      dispatch(actCreateActivity(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم اضافة النشاط بنجاح");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          notifyFailed(err);
        });
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={ActivitySchema}
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
          id="Activity-form"
          flexWrap="wrap"
          direction={isUpdate && "column"}
          gap={isUpdate ? 0 : 2}
          marginBlock={isUpdate && "1.25rem"}
          alignItems="center"
          onSubmit={handleSubmit}
        >
          <MyInput
            name="name"
            label="اسم النشاط"
            placeholder="ادخل الاسم"
            value={values.name}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.name && !!errors.name}
            helperText={
              touched.name && errors.name ? touched.name && errors.name : " "
            }
          />
          <MyInput
            name="description"
            label="الوصف"
            placeholder="ادخل الوصف"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            size="small"
            width={250}
            error={!!touched.description && !!errors.description}
            helperText={
              touched.description && errors.description
                ? touched.description && errors.description
                : " "
            }
          />
          <Box alignSelf={isUpdate ? "center" : "flex-start"}>
            <MyBtn
              type="submit"
              width={100}
              height={40}
              icon={isUpdate ? EditIcon : AddIcon}
              title={isUpdate ? "تعديل" : "اضافة"}
            />
          </Box>
        </Stack>
      )}
    </Formik>
  );
};

export default ActivityForm;
