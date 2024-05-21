import { Box, Typography, Stack, CircularProgress } from "@mui/material";
  

const LoginForm = () => {
 

  const handleLogin = async (e) => {
    e.preventDefault();
 
  };

  return (
    <Box
      sx={{ xs: { right: "5%", transform: "translate(-50%,-50%)" } }}
      position="absolute"
      zIndex="20"
      top="50%"
      right="20%"
      width={420}
      maxWidth="100%"
      height={580}
      bgcolor="#fff"
      borderRadius="50px"
      padding="40px"
      border="2px solid #ccc"
     >
      <Typography variant="h4" mt={6} color="#000">
        تسجيل الدخول
      </Typography>
      <form onSubmit={handleLogin}>
        <Stack>
          <label htmlFor="userName">ادخل اسم المستخدم</label>
          <input
            id="userName"
            type="text"
            placeholder="اسم المستخدم"
            name="userHandle"
           />
        </Stack>
        <Stack>
          <label htmlFor="password">ادخل كلمة المرور</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="كلمة المرور"
           />
        </Stack>
        {/* <Typography
          variant="body1"
          color="#0508FF"
          textAlign="right"
          fontSize={12}
          mt={1}
          sx={{ cursor: "pointer" }}
        >
          هل نسيت كلمة المرور؟
        </Typography> */}
 
        <Box mt={3} textAlign="center">
          {/* {isLoading ? (
            <CircularProgress mt={4} />
          ) : (
            <input type="submit" value="دخول" />
          )} */}
          دخول
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
