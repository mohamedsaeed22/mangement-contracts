import React from "react";
import MyInput from "./Input/MyInput";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { notifyFailed, notifySuccess } from "../feedback/Alerts/alerts";
import { Box, Stack, TextField } from "@mui/material";
import MyBtn from "../common/UI/MyBtn";
import AddIcon from "../../assets/icon/Vector.svg";
import EditIcon from "../../assets/icon/edit-icon.svg";
import {
  actCreateSector,
  actGetSectors,
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
          dispatch(actGetSectors());
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
          direction={isUpdate ? "column" : "row"}
          gap={2}
          marginBlock={isUpdate ? "1.25rem" : 0}
          alignItems={{ xs: "center", sm: isUpdate ? "center" : "flex-start" }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ minWidth: 220 }}
            name="name"
            label="اسم القطاع *"
            value={values.name}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!touched.name && !!errors.name}
            helperText={
              touched.name && errors.name ? touched.name && errors.name : " "
            }
          />
          <Box alignSelf={isUpdate ? "center" : { xs: "flex-start" }}>
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
