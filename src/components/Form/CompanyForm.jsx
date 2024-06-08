import React from "react";
import MyInput from "./Input/MyInput";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { notifyFailed, notifySuccess } from "../feedback/Alerts/alerts";
import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import MyBtn from "../common/UI/MyBtn";
import AddIcon from "../../assets/icon/add-icon.svg";
import EditIcon from "../../assets/icon/edit-icon.svg";
import itemSchema from "../../validations/itemSchema";
import { actCreateItem, actUpdateItem } from "../../store/item/itemSlice";
import {
  companySchema,
  countries,
  initialCompany,
} from "../../validations/companySchema";
import {
  actCreateCompany,
  actUpdateCompany,
} from "../../store/company/companySlice";

const CompanyForm = ({
  initialValues = initialCompany,
  isUpdate = false,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();
  const handleFormSubmit = (values, { resetForm }) => {
    if (isUpdate) {
      dispatch(actUpdateCompany(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم تحديث الشركة بنجاح");
          handleCloseModal();
        })
        .catch((err) => {
          notifyFailed("حدث خطأ أثناء تحديث الشركة");
        });
    } else {
      dispatch(actCreateCompany(values))
        .unwrap()
        .then((e) => {
          notifySuccess("تم اضافة الشركة بنجاح");
          resetForm();
        })
        .catch((err) => {
          notifyFailed(err + "حدث خطا ما ");
        });
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={companySchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Stack
          component="form"
          id="branch-form"
          flexWrap="wrap"
          direction={isUpdate && "column"}
          gap={isUpdate ? 0 : 2}
          marginBlock={isUpdate && "1.25rem"}
          alignItems="center"
          onSubmit={handleSubmit}
        >
          <MyInput
            name="companyName"
            label="اسم الشركة"
            placeholder="ادخل الاسم"
            value={values.companyName}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.companyName && !!errors.companyName}
            helperText={
              touched.companyName && errors.companyName
                ? touched.companyName && errors.companyName
                : " "
            }
          />
          <MyInput
            name="investorName"
            label="اسم المستثمر"
            placeholder="ادخل الاسم"
            value={values.investorName}
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            width={250}
            error={!!touched.investorName && !!errors.investorName}
            helperText={
              touched.investorName && errors.investorName
                ? touched.investorName && errors.investorName
                : " "
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
            <Autocomplete
              id="country-select-demo"
              sx={{ width: 250 ,alignSelf:'flex-start'}}
              size="small"
              options={countries.map((option) => option.lable)}
              autoHighlight
              // value={values.country}
              getOptionLabel={(option) => option ? option.label : ""}
              renderOption={(props, option) => (
                <Box
                   component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {/* <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  /> */}
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="اختر الدولة"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          <Box alignSelf="flex-start">
          </Box>

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

export default CompanyForm;
