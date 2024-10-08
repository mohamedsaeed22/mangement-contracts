import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
} from "@mui/material";
import Heading from "../components/common/Heading/Heading";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import MyModal from "../components/common/UI/MyModal";
import {
  notifyFailed,
  notifySuccess,
  SweatAlert,
} from "../components/feedback/Alerts/alerts";
import EditIcon from "../assets/icon/edit-icon.svg";
import DeleteIcon from "../assets/icon/delete-icon.svg";
import MyBtn from "../components/common/UI/MyBtn";
import { initialContractor } from "../validations/contractorSchema";
import {
  actDeleteContractor,
  filterContractors,
} from "../store/contractor/contractorSlice";
import ContractorForm from "../components/Form/ContractorForm";
import actGetContractors from "../store/contractor/act/actGetContractors";
import { useNavigate } from "react-router-dom";

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
  backgroundColor: "#ddd",
  borderRadius: "10px",
}));

const AddContractor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const { contractors } = useSelector((state) => state.contractor);
  const [updateContractor, setUpdateContractor] = useState(initialContractor);

  useEffect(() => {
    dispatch(actGetContractors());
  }, [dispatch]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateContractor = (contractor) => {
    setUpdateContractor(contractor);
    setOpenModal(true);
  };

  const handleDeleteContractor = async (contractor) => {
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف ${contractor.name}؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(actDeleteContractor(contractor.id))
        .unwrap()
        .then((e) => {
          dispatch(filterContractors(contractor.id));
          notifySuccess("تم حذف الاستشارى");
          setOpenModal(false);
        })
        .catch((err) => {
          notifyFailed(err + "حدث خطا ما");
        });
    }
  };

  return (
    <>
      <MyModal
        width={540}
        open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات مقاول"
      >
        <ContractorForm
          isUpdate={true}
          initialValues={updateContractor}
          handleCloseModal={handleCloseModal}
        />
      </MyModal>
      <Heading title="اضافه المقاولين" />
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
        {/* <LoadingWrapper error={error} loading={loading}> */}
        <Box>
          <ContractorForm
            isUpdate={false}
            initialValues={updateContractor}
            handleCloseModal={handleCloseModal}
          />
          {/* activities table */}
          <TableContainer sx={{ maxHeight: "75vh", marginTop: "8px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">اسم المقاول</StyledTableCell>
                  <StyledTableCell align="center">عدد المشاريع</StyledTableCell>
                  <StyledTableCell align="center">الإجراءات</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contractors?.map((row) => (
                  <Tooltip
                    title="اضغط لعرض المقاول"
                    placement="top"
                    arrow
                    key={row.id}
                  >
                    <StyledTableRow
                      key={row.id}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#ccc !important" },
                      }}
                      onClick={() => navigate(`/contractor/id/${row.id}`)}
                    >
                      <StyledTableCell align="center">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.totalProjects}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack direction="row" justifyContent="center" gap={1}>
                          <MyBtn
                            width={100}
                            height={40}
                            icon={EditIcon}
                            title={"تعديل"}
                            handleBtnClick={(e) => {
                              e.stopPropagation(); // Stop propagation here
                              handleUpdateContractor(row);
                            }}
                          />
                          {/* <StopPropagation> */}
                          <MyBtn
                            width={100}
                            height={40}
                            bgColor="red"
                            icon={DeleteIcon}
                            title={"حذف"}
                            handleBtnClick={(e) => {
                              e.stopPropagation(); // Stop propagation here
                              handleDeleteContractor(row);
                            }}
                          />
                          {/* </StopPropagation> */}
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  </Tooltip>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {contractors?.length === 0 && (
            <Box textAlign="center" mt={3}>
              لا يوجد مقاولين
            </Box>
          )}
        </Box>
        {/* </LoadingWrapper> */}
      </Box>
    </>
  );
};

export default AddContractor;
