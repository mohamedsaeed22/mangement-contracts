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
  actCreateSector,
  actUpdateSector,
} from "../../store/sector/sectorSlice";
import { sectorSchema, initialSector } from "../../validations/sectorSchema";

const SectorForm = ({
  initialValues = initialSector,
  isUpdate = false,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();
  const handleFormSubmit = (values, { resetForm }) => {
    if (isUpdate) {
      dispatch(actUpdateSector(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم تحديث القطاع بنجاح");
          handleCloseModal();
        })
        .catch((err) => {
          notifyFailed(err + " حدث خطأ أثناء تحديث القطاع");
        });
    } else {
      dispatch(actCreateSector(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم اضافة القطاع بنجاح");
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
      validationSchema={sectorSchema}
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
            label="اسم القطاع"
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

export default SectorForm;
