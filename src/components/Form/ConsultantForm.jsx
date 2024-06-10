import React from "react";
import MyInput from "./Input/MyInput";
import { Formik } from "formik";

import { useDispatch } from "react-redux";
import { notifyFailed, notifySuccess } from "../feedback/Alerts/alerts";
import { Box, Stack } from "@mui/material";
import MyBtn from "../common/UI/MyBtn";
import AddIcon from "../../assets/icon/add-icon.svg";
import EditIcon from "../../assets/icon/edit-icon.svg";
import {
  consultantSchema,
  initialConsultant,
} from "../../validations/consultantSchema";
import actCreateConsultant from "../../store/consultant/act/actCreateConsultant";
import actUpdateConsultant from "../../store/consultant/act/actUpdateConsultant";

const ConsultantForm = ({
  initialValues = initialConsultant,
  isUpdate = false,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();

  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    if (isUpdate) {
      dispatch(actUpdateConsultant(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم تحديث الاستشارى بنجاح");
          handleCloseModal();
        })
        .catch((err) => {
          notifyFailed(err + "حدث خطأ أثناء تحديث الاستشارى");
        });
    } else {
      dispatch(actCreateConsultant(values))
        .unwrap()
        .then((e) => {
          console.log(e);
          notifySuccess("تم اضافة الاستشارى بنجاح");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          notifyFailed(err + " حدث خطا ما عند الاضافة");
        });
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={consultantSchema}
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
          direction={"row"}
          gap={2}
          marginBlock={"1.25rem"}
          alignItems="center"
          onSubmit={handleSubmit}
        >
          <MyInput
            name="name"
            label="اسم الاستشارى"
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
            name="description"
            label="الوصف"
            placeholder="ادخل الوصف"
            value={values.description}
            onChange={handleChange}
            size="small"
            onBlur={handleBlur}
            width={250}
            error={!!touched.description && !!errors.description}
            helperText={
              touched.description && errors.description
                ? touched.description && errors.description
                : " "
            }
          />
          <MyInput
            name="phoneNumber"
            label="رقم الهاتف"
            placeholder="ادخل رقم الهاتف"
            value={values.phoneNumber}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.phoneNumber && !!errors.phoneNumber}
            helperText={
              touched.phoneNumber && errors.phoneNumber
                ? touched.phoneNumber && errors.phoneNumber
                : " "
            }
          />
          <MyInput
            name="contactPersonPhone"
            label="رقم هاتف المسؤل"
            placeholder="ادخل رقم الهاتف"
            value={values.contactPersonPhone}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.contactPersonPhone && !!errors.contactPersonPhone}
            helperText={
              touched.contactPersonPhone && errors.contactPersonPhone
                ? touched.contactPersonPhone && errors.contactPersonPhone
                : " "
            }
          />
          <MyInput
            name="contactPersonName"
            label="اسم الشخص المسؤل"
            placeholder="ادخل الاسم"
            value={values.contactPersonName}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.contactPersonName && !!errors.contactPersonName}
            helperText={
              touched.contactPersonName && errors.contactPersonName
                ? touched.contactPersonName && errors.contactPersonName
                : " "
            }
          />
          <MyInput
            name="address"
            label="العنوان"
            placeholder="ادخل  العنوان"
            value={values.address}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.address && !!errors.address}
            helperText={
              touched.address && errors.address
                ? touched.address && errors.address
                : " "
            }
          />
          <MyInput
            name="country"
            label="الدوله"
            placeholder="ادخل الدولة"
            value={values.country}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.country && !!errors.country}
            helperText={
              touched.country && errors.country
                ? touched.country && errors.country
                : " "
            }
          />
          <MyInput
            name="specialization"
            label=" التخصص"
            placeholder="ادخل التخصص"
            value={values.specialization}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.specialization && !!errors.specialization}
            helperText={
              touched.specialization && errors.specialization
                ? touched.specialization && errors.specialization
                : " "
            }
          />
          <MyInput
            name="experience"
            label="الخبره"
            placeholder="ادخل الخبره"
            value={values.experience}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.experience && !!errors.experience}
            helperText={
              touched.experience && errors.experience
                ? touched.experience && errors.experience
                : " "
            }
          />
          <MyInput
            name="qualification"
            label="المؤهلات"
            placeholder="ادخل المؤهلات"
            value={values.qualification}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.qualification && !!errors.qualification}
            helperText={
              touched.qualification && errors.qualification
                ? touched.qualification && errors.qualification
                : " "
            }
          />
          <Box
            margin={isUpdate && "auto"}
            alignSelf={isUpdate ? "center" : "flex-start"}
          >
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

export default ConsultantForm;
