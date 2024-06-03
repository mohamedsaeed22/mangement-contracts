import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Box,
  Stack,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import MyInput from "../Form/Input/MyInput";
import MyInputsWrapper from "../common/UI/MyInputsWrapper";

const initialValues = {
  showRisks: "no",
  riskStatus: "",
  risks: "",
  showDisables: "no",
  disableStatus: "",
  disables: "",
};

const RisksAndHandicapsForm = ({ risksandDisablesOptions }) => {
  const getValidationSchema = (values) => {
    let schema = Yup.object().shape({
      showRisks: Yup.string().required("Required"),
      showDisables: Yup.string().required("Required"),
    });

    if (values.showRisks === "yes") {
      schema = schema.concat(
        Yup.object().shape({
          riskStatus: Yup.string().required("حالة المخاطر مطلوبة"),
          risks: Yup.string().required("المخاطر مطلوبة"),
        })
      );
    }

    if (values.showDisables === "yes") {
      schema = schema.concat(
        Yup.object().shape({
          disableStatus: Yup.string().required("حالة المعوقات مطلوبة"),
          disables: Yup.string().required("المعوقات مطلوبة"),
        })
      );
    }

    return schema;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const validationSchema = getValidationSchema(values);
        try {
          validationSchema.validateSync(values, { abortEarly: false });
        } catch (err) {
          return err.inner.reduce((errors, currentError) => {
            return { ...errors, [currentError.path]: currentError.message };
          }, {});
        }
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        // <Form>
          <Grid item xs={12}>
            <MyInputsWrapper direction="column" title="المخاطر و المعوقات">
              {/* Risks Section */}
              <Stack width="100%" gap={2}>
                <Box>
                  <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                    <Typography variant="body1" color="initial" mt={1}>
                      هل له مخاطر ؟
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name="showRisks"
                        value={values.showRisks}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="لا"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="نعم"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                    {values.showRisks === "yes" && (
                      <Box ml={2}>
                        <MyInput
                          width={180}
                          name="riskStatus"
                          select
                          label="الحالة"
                          placeholder="اختر الحالة"
                          value={values.riskStatus}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.riskStatus && !!errors.riskStatus}
                          helperText={touched.riskStatus && errors.riskStatus}
                        >
                          {risksandDisablesOptions.map((el) => (
                            <MenuItem key={el.id} value={el.id}>
                              {el.name}
                            </MenuItem>
                          ))}
                        </MyInput>
                      </Box>
                    )}
                  </Stack>
                  {values.showRisks === "yes" && (
                    <MyInput
                      name="risks"
                      label="المخاطر"
                      multiline
                      fullWidth
                      rows={3}
                      placeholder="ادخل المخاطر"
                      value={values.risks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.risks && !!errors.risks}
                      helperText={touched.risks && errors.risks}
                    />
                  )}
                </Box>
              </Stack>

              {/* Disables Section */}
              <Stack width="100%" gap={2}>
                <Box>
                  <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                    <Typography variant="body1" color="initial" mt={1}>
                      هل له معوقات ؟
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name="showDisables"
                        value={values.showDisables}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="لا"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="نعم"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                    {values.showDisables === "yes" && (
                      <Box ml={2}>
                        <MyInput
                          width={180}
                          name="disableStatus"
                          select
                          label="الحالة"
                          placeholder="اختر الحالة"
                          value={values.disableStatus}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.disableStatus && !!errors.disableStatus
                          }
                          helperText={
                            touched.disableStatus && errors.disableStatus
                          }
                        >
                          {risksandDisablesOptions.map((el) => (
                            <MenuItem key={el.id} value={el.id}>
                              {el.name}
                            </MenuItem>
                          ))}
                        </MyInput>
                      </Box>
                    )}
                  </Stack>
                  {values.showDisables === "yes" && (
                    <MyInput
                      name="disables"
                      label="المعوقات"
                      multiline
                      fullWidth
                      rows={3}
                      placeholder="ادخل المعوقات"
                      value={values.disables}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.disables && !!errors.disables}
                      helperText={touched.disables && errors.disables}
                    />
                  )}
                </Box>
              </Stack>
            </MyInputsWrapper>
          </Grid>
        // </Form>
      )}
    </Formik>
  );
};

export default RisksAndHandicapsForm;
