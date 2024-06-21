import React from "react";
import MyInput from "./Input/MyInput";
import { Formik } from "formik";

import { useDispatch } from "react-redux";
import { notifyFailed, notifySuccess } from "../feedback/Alerts/alerts";
import { Box, Grid, Stack, TextField } from "@mui/material";
import MyBtn from "../common/UI/MyBtn";
import AddIcon from "../../assets/icon/add-icon.svg";
import EditIcon from "../../assets/icon/edit-icon.svg";
import {
  consultantSchema,
  initialConsultant,
} from "../../validations/consultantSchema";
import actCreateConsultant from "../../store/consultant/act/actCreateConsultant";
import actUpdateConsultant from "../../store/consultant/act/actUpdateConsultant";
import {
  actCreateContractor,
  actUpdateContractor,
} from "../../store/contractor/contractorSlice";
import { contractorSchema } from "../../validations/contractorSchema";

const ContractorForm = ({
  initialValues = initialConsultant,
  isUpdate = false,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();

  const handleFormSubmit = (values, { resetForm }) => {
    if (isUpdate) {
      dispatch(actUpdateContractor(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم تحديث المقاول بنجاح");
          handleCloseModal();
        })
        .catch((err) => {
          notifyFailed(err + "حدث خطأ أثناء تحديث المقاول");
        });
    } else {
      dispatch(actCreateContractor(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم اضافة المقاول بنجاح");
          resetForm();
        })
        .catch((err) => {
          notifyFailed(err + " حدث خطا ما عند الاضافة");
        });
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={contractorSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Grid
          component="form"
          id="supervisor-form"
          container
          spacing={1}
          marginBlock={isUpdate && "1.25rem"}
          justifyContent={{
            xs: "center",
            md: isUpdate ? "center" : "flex-start",
          }}
          onSubmit={handleSubmit}
        >
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <TextField
              name="name"
              label="اسم المقاول*"
              value={values.name}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.name && !!errors.name}
              helperText={
                touched.name && errors.name ? touched.name && errors.name : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="description"
              label="الوصف"
              placeholder="ادخل الوصف"
              value={values.description}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.description && !!errors.description}
              helperText={
                touched.description && errors.description
                  ? touched.description && errors.description
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="phoneNumber"
              label="رقم الهاتف"
              placeholder="ادخل رقم الهاتف"
              value={values.phoneNumber}
              onChange={handleChange}
              size="small"
              type="number"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.phoneNumber && !!errors.phoneNumber}
              helperText={
                touched.phoneNumber && errors.phoneNumber
                  ? touched.phoneNumber && errors.phoneNumber
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="contactPersonPhone"
              label="رقم هاتف المسؤل"
              placeholder="ادخل رقم الهاتف"
              value={values.contactPersonPhone}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={
                !!touched.contactPersonPhone && !!errors.contactPersonPhone
              }
              helperText={
                touched.contactPersonPhone && errors.contactPersonPhone
                  ? touched.contactPersonPhone && errors.contactPersonPhone
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="contactPersonName"
              label="اسم الشخص المسؤل"
              placeholder="ادخل الاسم"
              value={values.contactPersonName}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.contactPersonName && !!errors.contactPersonName}
              helperText={
                touched.contactPersonName && errors.contactPersonName
                  ? touched.contactPersonName && errors.contactPersonName
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="address"
              label="العنوان"
              placeholder="ادخل العنوان"
              value={values.address}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.address && !!errors.address}
              helperText={
                touched.address && errors.address
                  ? touched.address && errors.address
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="country"
              label="الدوله"
              placeholder="ادخل الدولة"
              value={values.country}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.country && !!errors.country}
              helperText={
                touched.country && errors.country
                  ? touched.country && errors.country
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="specialization"
              label="التخصص"
              placeholder="ادخل التخصص"
              value={values.specialization}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.specialization && !!errors.specialization}
              helperText={
                touched.specialization && errors.specialization
                  ? touched.specialization && errors.specialization
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="experience"
              label="الخبره"
              placeholder="ادخل الخبره"
              value={values.experience}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.experience && !!errors.experience}
              helperText={
                touched.experience && errors.experience
                  ? touched.experience && errors.experience
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isUpdate ? 6 : 3}>
            <MyInput
              name="qualification"
              label="المؤهلات"
              placeholder="ادخل المؤهلات"
              value={values.qualification}
              onChange={handleChange}
              size="small"
              onBlur={handleBlur}
              fullWidth
              error={!!touched.qualification && !!errors.qualification}
              helperText={
                touched.qualification && errors.qualification
                  ? touched.qualification && errors.qualification
                  : " "
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={isUpdate ? 6 : 3}
            display="flex"
            justifyContent={{
              xs: "center",
              md: isUpdate ? "center" : "flex-start",
            }}
          >
            <Box alignSelf={"flex-start"}>
              <MyBtn
                type="submit"
                width={100}
                height={40}
                icon={isUpdate ? EditIcon : AddIcon}
                title={isUpdate ? "تعديل" : "اضافة"}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default ContractorForm;
