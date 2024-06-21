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
import ConsultantForm from "../components/Form/ConsultantForm";
import { initialConsultant } from "../validations/consultantSchema";
import actGetConsultants from "../store/consultant/act/actGetConsultants";
import actDeleteConsultant from "../store/consultant/act/actDeleteConsultant";
import { filterConsultants } from "../store/consultant/consultantSlice";
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
  backgroundColor: "#fff",
  borderRadius: "10px",
}));

const ManageConsultants = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { consultants } = useSelector((state) => state.consultant);
  const [updateConsultant, setUpdateConsultant] = useState(initialConsultant);

  useEffect(() => {
    dispatch(actGetConsultants());
  }, [dispatch]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateConsultant = (consultant) => {
    setUpdateConsultant(consultant);
    setOpenModal(true);
  };

  const handleDeleteConsultant = async (consultant) => {
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف ${consultant.name}؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(actDeleteConsultant(consultant.id))
        .unwrap()
        .then((e) => {
          dispatch(filterConsultants(consultant.id));
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
        title="تعديل بيانات استشارى"
      >
        <ConsultantForm
          isUpdate={true}
          initialValues={updateConsultant}
          handleCloseModal={handleCloseModal}
        />
      </MyModal>
      <Heading title="ادارة الاستشاريين" />
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
          <ConsultantForm
            isUpdate={false}
            initialValues={updateConsultant}
            handleCloseModal={handleCloseModal}
          />
          {/* activities table */}
          <TableContainer sx={{ maxHeight: "75vh", marginTop: "8px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    اسم الاستشارى
                  </StyledTableCell>
                  <StyledTableCell align="center">عدد المشاريع</StyledTableCell>
                  <StyledTableCell align="center">الإجراءات</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {consultants?.length > 0 ? (
                  consultants.map((row) => (
                    <Tooltip
                      title="اضغط لعرض الاستشارى"
                      placement="top"
                      arrow
                      key={row.id}
                    >
                      <StyledTableRow
                        key={row.id}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#fff !important" },
                        }}
                        onClick={() => navigate(`/consultant/id/${row.id}`)}
                      >
                        <StyledTableCell align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.totalProjects}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Stack
                            direction="row"
                            justifyContent="center"
                            gap={1}
                          >
                            <MyBtn
                              width={100}
                              height={40}
                              icon={EditIcon}
                              title={"تعديل"}
                              handleBtnClick={(e) => {
                                e.stopPropagation();
                                handleUpdateConsultant(row);
                              }}
                            />
                            <MyBtn
                              width={100}
                              height={40}
                              bgColor="red"
                              icon={DeleteIcon}
                              title={"حذف"}
                              handleBtnClick={(e) => {
                                e.stopPropagation();
                                handleDeleteConsultant(row);
                              }}
                            />
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    </Tooltip>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={3}>
                      لا يوجد استشاريين
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* </LoadingWrapper> */}
      </Box>
    </>
  );
};

export default ManageConsultants;
