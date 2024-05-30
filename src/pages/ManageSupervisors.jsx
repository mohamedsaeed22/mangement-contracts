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

import SupervisorForm from "../components/manageContracts/SupervisorForm";

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

const MangeBranches = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { supervisors } = useSelector((state) => state.supervisor);
  const [updatedSupervisor, setUpdatedSupervisor] = useState(initialSupervisor);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateSupervisor = (supervisor) => {
    setUpdatedSupervisor(supervisor);
    setOpenModal(true);
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

  return (
    <>
      <MyModal
        open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات مسؤل"
      >
        <SupervisorForm
          isUpdate={true}
          initialValues={updatedSupervisor}
          handleCloseModal={handleCloseModal}
        />
      </MyModal>
      <Heading title="ادارة المسؤلين" />
      <Box p={2} mt={4}>
        {/* add supervisor */}
        <SupervisorForm isUpdate={false} handleCloseModal={handleCloseModal}/>
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
