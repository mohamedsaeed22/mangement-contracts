import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

export default function MyModal({
  open,
  width = 500,
  handleClose,
  title,
  children,
}) {
  const style = {
    position: "absolute",
    top: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    width: {
      xs: "90%",  // Full width on small screens
      sm: "80%",  // Slightly reduced width on medium screens
      md: width, // Custom width on larger screens
    },
    maxWidth: width,
    maxHeight: "calc(100vh - 80px)", // Ensure the modal does not exceed the screen height
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "6px",
    overflowY: "auto", // Make the modal content scrollable if it overflows vertically
    paddingTop: "50px",
    paddingLeft: "10px",
    paddingRight: "10px",
    "::before": {
      content: `'${title ? title : ""}'`,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "50px",
      backgroundColor: "#2E3344",
      display: "flex",
      alignItems: "center",
      fontWeight: "bold",
      justifyContent: "center",
      color: "#fff",
    },
  };

  const closeStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "15px",
    cursor: "pointer",
  };

  const handleClickClose = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClickClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
        }}
      >
        <div onClick={handleClickClose} style={closeStyle}>
          <CloseIcon sx={{ color: "#fff" }} />
        </div>
        {children}
      </Box>
    </Modal>
  );
}
