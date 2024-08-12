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
import MyIcon from "./../components/common/UI/MyIcon";
import SearchIcon from "../assets/icon/search.svg";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#A0ACD4",
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

const ManageContractor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const { contractors } = useSelector((state) => state.contractor);

  const [updateContractor, setUpdateContractor] = useState(initialContractor);
  const [dataSearch, setDataSearch] = useState([]);
  useEffect(() => {
    dispatch(actGetContractors());
  }, [dispatch]);

  useEffect(() => {
    setDataSearch(contractors);
    console.log(contractors);
  }, [contractors]);

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
  const handleChange = (e) => {
    const filterData = [...contractors];
    console.log(filterData);
    const value = e.target.value;
    const filtered = filterData.filter((contractor) =>
      contractor.name.toLowerCase().includes(value.toLowerCase())
    );
    setDataSearch(filtered);
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
      <Heading title="اداره المقاولين" />
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
          <Stack
            direction="row"
            gap={2}
            justifyContent="space-between"
            sx={{
              justifyContent: { xs: "center", sm: "space-between" },
              marginTop: "10px",
            }}
            alignItems="center"
            flexWrap="wrap"
          >
            <Box position="relative">
              <input
                type="search"
                className="search-input"
                placeholder="ابحث عن اسم المقاول"
                onChange={handleChange}
              />
            </Box>
          </Stack>
          {/* activities table */}
          <TableContainer sx={{ maxHeight: "75vh", marginTop: "8px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">اسم المقاول</StyledTableCell>
                  <StyledTableCell align="center">عدد المشاريع</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSearch.length > 0 ? (
                  dataSearch?.map((row) => (
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
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.totalProjects}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Stack direction="row" justifyContent="right" gap={1}>
                            <MyIcon
                              icon={EditIcon}
                              handleBtnClick={(e) => {
                                e.stopPropagation(); // Stop propagation here
                                handleUpdateContractor(row);
                              }}
                            />
                            {/* <StopPropagation> */}
                            <MyIcon
                              icon={DeleteIcon}
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
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={3}>
                      لا يوجد مقاولين
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

export default ManageContractor;
