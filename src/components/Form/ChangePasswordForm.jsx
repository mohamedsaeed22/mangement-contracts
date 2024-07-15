import React from "react";
import MyInput from "./Input/MyInput";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { notifyFailed, notifySuccess } from "../feedback/Alerts/alerts";
import { Box, Stack, TextField } from "@mui/material";
import actUpdateActivity from "../../store/Activity/act/actUpdateActivity";
import actCreateActivity from "../../store/Activity/act/actCreateActivity";
import ActivitySchema from "../../validations/ActivitySchema";
import MyBtn from "../common/UI/MyBtn";
import AddIcon from "../../assets/icon/Vector.svg";
import EditIcon from "../../assets/icon/edit-white.svg";
import resetPasswordSchema from "../../validations/resetPasswordSchema";
import { actChangepassword } from "../../store/users/userSlice";

const defualtUserObj = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = ({
  initialValues = defualtUserObj,
  isUpdate = false,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();
  const handleFormSubmit = (values, { resetForm }) => {
    const { currentPassword, newPassword } = values;
    dispatch(actChangepassword({ currentPassword, newPassword }))
      .unwrap()
      .then((e) => {
        notifySuccess("تم تحديث كلمه المرور بنجاح");
        resetForm();
      })
      .catch((err) => {
        notifyFailed(err + "حدث خطأ أثناء تحديث كلمه المرور");
      });
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={resetPasswordSchema}
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
          gap={1}
          marginBlock={isUpdate && "1.25rem"}
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-start" }}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ minWidth: 220 }}
            name="currentPassword"
            label="كلمه المرور القديمه"
            value={values.currentPassword}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!touched.currentPassword && !!errors.currentPassword}
            helperText={
              touched.currentPassword && errors.currentPassword
                ? touched.currentPassword && errors.currentPassword
                : " "
            }
            type="password"
          />
          <TextField
            sx={{ minWidth: 220 }}
            name="newPassword"
            label="كلمه المرور الجديده"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            size="small"
            error={!!touched.newPassword && !!errors.newPassword}
            helperText={
              touched.newPassword && errors.newPassword
                ? touched.newPassword && errors.newPassword
                : " "
            }
            type="password"
          />
          <TextField
            sx={{ minWidth: 220 }}
            name="confirmPassword"
            label="تاكيد كلمه المرور"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            size="small"
            error={!!touched.confirmPassword && !!errors.confirmPassword}
            helperText={
              touched.confirmPassword && errors.confirmPassword
                ? touched.confirmPassword && errors.confirmPassword
                : " "
            }
            type="password"
          />
          <Box alignSelf={isUpdate ? "center" : "flex-start"}>
            <MyBtn
              type="submit"
              width={100}
              height={40}
              icon={EditIcon}
              title={"تعديل"}
            />
          </Box>
        </Stack>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
