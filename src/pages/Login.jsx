import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FoeLogo from "../assets/imgs/foeLogo.png";
import FoeBackground from "../assets/imgs/background.svg";
import UserVictor from "../assets/icon/user.svg";
import KeyVictor from "../assets/icon/key-outline.svg";
import Footer from "../components/common/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { actAuthLogin } from "../store/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingWrapper from "../components/feedback/Loading/LoadingWrapper";

const validationSchema = Yup.object({
  userHandle: Yup.string().required("اسم المستخدم مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { error, loading, accessToken } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      userHandle: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        actAuthLogin({
          userHandle: values.userHandle,
          password: values.password,
        })
        // .unwrap()
        // .then((res) => {
        //           //   navigate("/");
        // })
      );
    },
  });

  if (accessToken) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      minHeight="100vh"
      gap={2}
    >
      <Box
        sx={{
          backgroundColor: "#263238",
          width: "200px",
          marginInline: "auto",
          textAlign: "center",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
        }}
      >
        <img src={FoeLogo} alt="future logo" style={{ width: "180px" }} />
      </Box>

      {/* hero section */}
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
      >
        <Stack
          sx={{
            backgroundColor: "#263238",
            width: "500px",
            maxWidth: "100%",
            marginInline: "10px",
            height: "550px",
            borderRadius: "80px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#FFC100",
              fontWeight: 700,
              paddingTop: "80px",
              textAlign: "center",
            }}
          >
            تسجيل الدخول
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{ width: "355px", marginInline: "auto", padding: "8px" }}
          >
            <Stack
              sx={{ position: "relative", marginTop: "40px", maxWidth: "100%" }}
            >
              <label id="login-label-username" htmlFor="userHandle">
                اسم المستخدم
              </label>
              <Stack
                spacing="3px"
                direction="row"
                border="1px solid #eee"
                padding="4px 8px"
                borderRadius="8px"
                alignItems="center"
              >
                <img src={UserVictor} alt="user icon" />
                <TextField
                  id="my-input-userName"
                  name="userHandle"
                  type="text"
                  placeholder="ادخل اسم المستخدم"
                  value={formik.values.userHandle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{ flex: 1 }}
                />
              </Stack>
              {formik.touched.userHandle && formik.errors.userHandle && (
                <Typography color="#ffc100" sx={{ mt: 1, fontSize: "12px" }}>
                  {formik.errors.userHandle}
                </Typography>
              )}
            </Stack>
            <Stack
              sx={{ position: "relative", marginTop: "30px", maxWidth: "100%" }}
            >
              <label id="login-label-password" htmlFor="password">
                كلمة المرور
              </label>
              <Stack
                spacing="3px"
                direction="row"
                border="1px solid #eee"
                padding="4px 8px"
                borderRadius="8px"
                alignItems="center"
              >
                <img
                  src={KeyVictor}
                  alt="user icon"
                  style={{ width: "21px" }}
                />
                <TextField
                  id="my-input-password"
                  name="password"
                  type="password"
                  placeholder="ادخل كلمة المرور"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{ flex: 1 }}
                />
              </Stack>
              {formik.touched.password && formik.errors.password && (
                <Typography color="#ffc100" sx={{ mt: 1, fontSize: "12px" }}>
                  {formik.errors.password}
                </Typography>
              )}
            </Stack>
            <Box textAlign="center" mt="30px">
              {error && (
                <span
                  style={{
                    display: "inline-block",
                    color: "#ffc100",
                    marginBottom: "10px",
                    fontSize: "12px",
                  }}
                >
                  {error}
                </span>
              )}
              <Box position="relative" mt={2}>
                <LoadingWrapper loading={loading}>
                  <input type="submit" value="تسجيل" id="sumbit-login" />
                </LoadingWrapper>
              </Box>
            </Box>
          </form>
        </Stack>

        <Box className="image-container">
          <img
            src={FoeBackground}
            alt="future background"
            style={{ width: "600px" }}
          />
        </Box>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default Login;
