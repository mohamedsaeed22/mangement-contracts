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
import EditIcon from "../assets/icon/edit-icon.svg";
import DeleteIcon from "../assets/icon/delete-icon.svg";

import SupervisorForm from "../components/Form/SupervisorForm";
import {
  notifyFailed,
  notifySuccess,
  SweatAlert,
} from "../components/feedback/Alerts/alerts";
import MyBtn from "../components/common/UI/MyBtn";

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
  backgroundColor: "#fff",
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

  const handleDeleteSupervisor = async (supervisor) => {
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
        title="تعديل بيانات مشرف"
      >
        <SupervisorForm
          isUpdate={true}
          initialValues={updatedSupervisor}
          handleCloseModal={handleCloseModal}
        />
      </MyModal>
      <Heading title="ادارة المشرفين" />
      <Box
        gap={2}
        p={2}
        border="2px solid #000"
        borderRadius={2}
        mt="70px"
        sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
        // flex={1}
        height="calc(100vh - 130px)"
      >
        <Box>
          {/* add supervisor */}
          <SupervisorForm
            isUpdate={false}
            handleCloseModal={handleCloseModal}
          />
          {/* supervisors table */}
          <TableContainer sx={{ maxHeight: "80vh", marginTop: "8px" }}>
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
                    <StyledTableCell align="center">
                      {row.phone}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack direction="row" justifyContent="center" gap={1}>
                        <MyBtn
                          width={100}
                          height={40}
                          icon={EditIcon}
                          title={"تعديل"}
                          handleBtnClick={() => handleUpdateSupervisor(row)}
                        />
                        <MyBtn
                          width={100}
                          height={40}
                          bgColor="red"
                          icon={DeleteIcon}
                          title={"حذف"}
                          handleBtnClick={() => handleDeleteSupervisor(row)}
                        />
                      </Stack>
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
      </Box>
    </>
  );
};

export default MangeBranches;
