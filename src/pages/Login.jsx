import { Box, Stack, Typography } from "@mui/material";
import FoeLogo from "../assets/imgs/foeLogo.png";
import FoeBackground from "../assets/imgs/background.svg";
import UserVictor from "../assets/icon/user.svg";
import KeyVictor from "../assets/icon/key-outline.svg";
import Footer from "../components/common/Footer/Footer";

const Login = () => {
  return (
    <Stack alignItems="center" justifyContent="space-between" minHeight="100vh" gap={2}>
      {/* top logo */}
      <Box
        sx={{
          backgroundColor: "#F0F0F0",
          width: "200px",
          marginInline: "auto",
          textAlign: "center",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
        }}
      >
        <img src={FoeLogo} alt="future logo" style={{ width: "180px" }} />
      </Box>

      {/* hero section  */}
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        // bgcolor="#ccc"
        width="100%"
      >
        <Stack
          sx={{
            backgroundColor: "#263238",
            width: "500px",
            maxWidth: "100%",
            marginInline:'10px',
            height: "550px",
            borderRadius: "80px",
          }}
        >
          <Typography
            variant="h3"
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
            style={{ width: "355px", marginInline: "auto", padding: "8px" }}
          >
            <Stack
              sx={{ position: "relative", marginTop: "50px", maxWidth: "100%" }}
            >
              <label htmlFor="userName">اسم المستخدم</label>
              <Stack
                spacing="3px"
                direction="row"
                border="1px solid #eee"
                padding="4px 8px"
                borderRadius="8px"
              >
                <img src={UserVictor} alt="user icon" />
                <input
                  id="userName"
                  type="text"
                  placeholder="ادخل اسم المستخدم"
                  name="userHandle"
                />
              </Stack>
            </Stack>
            <Stack
              sx={{ position: "relative", marginTop: "40px", maxWidth: "100%" }}
            >
              <label htmlFor="password">كلمة المرور</label>
              <Stack
                spacing="3px"
                direction="row"
                border="1px solid #eee"
                padding="4px 8px"
                borderRadius="8px"
              >
                <img
                  src={KeyVictor}
                  alt="user icon"
                  style={{ width: "21px" }}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="ادخل كلمة المرور"
                  name="userHandle"
                />
              </Stack>
            </Stack>
            <input type="submit" value="تسجيل الدخول" />
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
