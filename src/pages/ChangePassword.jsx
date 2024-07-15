import Heading from "../components/common/Heading/Heading";
import { Box } from "@mui/material";
import ChangePasswordForm from "../components/Form/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <>
      <Heading title="تغيير كلمه المرور" />
      <Box
        gap={2}
        p={2}
        border="2px solid #000"
        borderRadius={2}
        mt="70px"
        sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
        height="calc(100vh - 130px)"
        overflow="auto"
      >
        <ChangePasswordForm />
      </Box>
    </>
  );
};

export default ChangePassword;
