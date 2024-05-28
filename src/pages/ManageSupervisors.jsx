import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import Heading from "../components/common/Heading/Heading";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/common/UI/MyModal";
import {
  actCreateSupervisor,
  actDeleteSupervisor,
  actUpdateSupervisor,
  filterSupervisores,
  filterSupervisors,
} from "../store/supervisor/supervisorSlice";
import {
  notifyFailed,
  notifySuccess,
  SweatAlert,
} from "../components/feedback/alerts";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#BECAF9",
    color: "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  maxHeight: "8px",
  "@media print": {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#070F2B",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#F3F3F3",
  borderRadius: "10px",
}));

const initialSupervisor = {
  name: "",
  phone: "",
};
const phoneRegExp = /^01[1250][0-9]{8}$/;
const MangeBranches = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { supervisors } = useSelector((state) => state.supervisor);
  const [supervisor, setSupervisor] = useState(initialSupervisor);
  const [updatedSupervisor, setUpdatedSupervisor] = useState(initialSupervisor);

  const handleSupervisorValues = (e) => {
    setSupervisor({
      ...supervisor,
      [e.target.name]: e.target.value,
    });
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangeSupervisor = (e) => {
    setUpdatedSupervisor({
      ...updatedSupervisor,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSupervisor = (supervisor) => {
    setUpdatedSupervisor(supervisor);
    setOpenModal(true);
  };

  const updateSupervisor = async () => {
    dispatch(actUpdateSupervisor(updatedSupervisor))
      .unwrap()
      .then((e) => {
        notifySuccess("تم تعديل البيانات بنجاح");
        setOpenModal(false);
      })
      .catch((err) => {
        notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
      });
  };

  const handleDeleteBranch = async (supervisor) => {
    console.log(supervisor);
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف ${supervisor.name}؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(actDeleteSupervisor(supervisor.id))
        .unwrap()
        .then((e) => {
          dispatch(filterSupervisors(supervisor.id));
          notifySuccess("تم حذف المسؤل");
          setOpenModal(false);
        })
        .catch((err) => {
          notifyFailed("هذا المسؤل لدية مشاريع,رجاء تعديل المشارع او حذفها");
        });
    }
  };

  const handleAddSuprvisor = () => {
    dispatch(actCreateSupervisor(supervisor))
      .unwrap()
      .then((e) => {
        notifySuccess("تم اضافة المسؤل بنجاح");
        setSupervisor(initialSupervisor);
      })
      .catch((err) => {
        notifyFailed("هذا المسؤل موجود مسبقا");
      });
  };

  return (
    <>
      <MyModal
        open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات مسؤل"
      >
        <Stack gap={2} alignItems="center" m={3}>
          <TextField
            size="small"
            id="supervisor-name"
            label="تعديل الاسم"
            variant="outlined"
            value={updatedSupervisor.name}
            name="name"
            fullWidth
            onChange={handleChangeSupervisor}
          />
          <TextField
            size="small"
            id="project-phone"
            label="تعديل رقم الهاتف"
            variant="outlined"
            value={updatedSupervisor.phone}
            name="phone"
            fullWidth
            type="number"
            onChange={handleChangeSupervisor}
          />
          <Button variant="contained" onClick={updateSupervisor}>
            تعديل
          </Button>
        </Stack>
      </MyModal>
      <Heading title="ادارة المسؤلين" />
      <Box p={2}>
        {/* add supervisor */}
        <Stack direction="row" gap={2} alignItems="center">
          <TextField
            size="small"
            id="supervisor-name"
            label="اسم المسؤل"
            variant="outlined"
            sx={{ width: "250px" }}
            value={supervisor.name}
            name="name"
            onChange={handleSupervisorValues}
          />
          <TextField
            size="small"
            id="project-desc"
            label="رقم المحمول"
            variant="outlined"
            sx={{ width: "250px" }}
            value={supervisor.phone}
            name="phone"
            type="number"
            onChange={handleSupervisorValues}
          />
          <Button
            variant="contained"
            disabled={!supervisor.name | !supervisor.phone}
            startIcon={<Add />}
            onClick={handleAddSuprvisor}
          >
            اضافة
          </Button>
        </Stack>
        {/* supervisors table */}
        <TableContainer sx={{ maxHeight: "80vh", marginTop: "20px" }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">اسم المسؤل</StyledTableCell>
                <StyledTableCell align="center">رقم الهاتف</StyledTableCell>
                <StyledTableCell align="center">الاجراءات</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supervisors?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdateSupervisor(row)}
                      >
                        تعديل
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "red",
                          "&:hover": {
                            backgroundColor: "red",
                            color: "#fff",
                          },
                          marginLeft: "10px",
                        }}
                        onClick={() => handleDeleteBranch(row)}
                      >
                        حذف
                      </Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {supervisors?.length === 0 && (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={3}>
                    لا يوجد مسؤلين
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MangeBranches;
