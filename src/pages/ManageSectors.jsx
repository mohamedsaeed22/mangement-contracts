import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
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
import actDeleteSector from '../store/sector/act/actDeleteSector';
import actGetSectors from '../store/sector/act/actGetSectors';

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

const manageSectors = () => {
  // const dispatch = useDispatch();
  // const [openModal, setOpenModal] = useState(false);
  // const { sectors } = useSelector((state) => state.sector);

  // useEffect(() => {
  //   dispatch(actGetSectors());
  // }, [dispatch]);

  const handleCloseModal = () => {
    // setOpenModal(false);
  };

  const handleUpdateSector = (sector) => {
    // setUpdatedSector(sector);
    // setOpenModal(true);
  };

  const handleDeleteSector = async (sector) => {
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف ${sector.name}؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      // dispatch(actDeleteSector(sector.id))
      //   .unwrap()
      //   .then((e) => {
      //     dispatch(filterSectors(sector.id));
      //     notifySuccess("تم حذف القطاع");
      //     setOpenModal(false);
      //   })
      //   .catch((err) => {
      //     notifyFailed(err);
      //   });
    }
  };

  return (
    <>
      <MyModal
        // open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات استشارى"
      >
        <ConsultantForm
          isUpdate={true}
          // initialValues={initialConsultant}
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
      >
        {/* <LoadingWrapper error={error} loading={loading}> */}
        <Box>
          <ConsultantForm />
          {/* activities table */}
          <TableContainer sx={{ maxHeight: "75vh", marginTop: "8px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">اسم القطاع</StyledTableCell>
                  {/* <StyledTableCell align="center">عدد المشاريع</StyledTableCell> */}
                  <StyledTableCell align="center">الاجراءات</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[]?.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack direction="row" justifyContent="center" gap={1}>
                        <MyBtn
                          width={100}
                          height={40}
                          icon={EditIcon}
                          title={"تعديل"}
                          handleBtnClick={() => handleUpdateSector(row)}
                        />
                        <MyBtn
                          width={100}
                          height={40}
                          bgColor="red"
                          icon={DeleteIcon}
                          title={"حذف"}
                          handleBtnClick={() => handleDeleteSector(row)}
                        />
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {[]?.length === 0 && (
            <Box textAlign="center" mt={3}>
              لا يوجد قطاعات
            </Box>
          )}
        </Box>
        {/* </LoadingWrapper> */}
      </Box>
    </>
  );
};

export default manageSectors;
