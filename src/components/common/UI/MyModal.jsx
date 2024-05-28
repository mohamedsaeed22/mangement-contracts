import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

export default function MyModal({ open, handleClose, title, children }) {
  const style = {
    position: "absolute",
    top: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "500px",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "6px",
    overflow: "hidden",
    paddingTop: "50px",
    // paddingBottom: "20px",
    paddingLeft: "10px",
    paddingRight: "10px",
    "::before": {
      content: `'${title ? title : ""}'`,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "50px",
      backgroundColor: "#7266ba",
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
