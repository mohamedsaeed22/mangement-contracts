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
import ItemForm from "../components/Form/ItemForm";
import {
  actDeleteCompany,
  actGetCompanies,
  filterCompanies,
} from "../store/company/companySlice";
import CompanyForm from "../components/Form/CompanyForm";
import { initialCompany } from "../validations/companySchema";

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

const ManageCompanies = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { companies } = useSelector((state) => state.company);
  const [updateCompany, setUpdateCompany] = useState(initialCompany);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(actGetCompanies());
  }, [dispatch]);

  const handleUpdateActivity = (company) => {
    setUpdateCompany(company);
    setOpenModal(true);
  };

  const handleDeleteItem = async (company) => {
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف ${company.name}؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(actDeleteCompany(company.id))
        .unwrap()
        .then((e) => {
          dispatch(filterCompanies(company.id));
          notifySuccess("تم حذف الشركة");
          setOpenModal(false);
        })
        .catch((err) => {
          notifyFailed("حدث خطا ما ..الرجاء المحاوله مره اخرى");
        });
    }
  };

  return (
    <>
      <MyModal
        open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات شركة"
      >
        <ItemForm
          isUpdate={true}
          initialValues={updateCompany}
          handleCloseModal={handleCloseModal}
        />
      </MyModal>
      <Heading title="ادارة الاصناف" />
      <Box
        gap={2}
        p={2}
        border="2px solid #000"
        borderRadius={2}
        m="90px 20px 0px"
        flex={1}
      >
        <Box>
          <CompanyForm isUpdate={false} initialValues={updateCompany} />
          {/* items table */}
          <TableContainer sx={{ maxHeight: "80vh", marginTop: "20px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">الشركة</StyledTableCell>
                  <StyledTableCell align="center">اسم المستثمر</StyledTableCell>
                  <StyledTableCell align="center"> رقم الهاتف</StyledTableCell>
                  <StyledTableCell align="center">الدولة</StyledTableCell>
                  <StyledTableCell align="center">الاجراءات</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies?.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">
                      {row.companyName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.investorName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.phone}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.country}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack direction="row" justifyContent="center" gap={1}>
                        <MyBtn
                          width={100}
                          height={40}
                          icon={EditIcon}
                          title={"تعديل"}
                          handleBtnClick={() => handleUpdateActivity(row)}
                        />
                        <MyBtn
                          width={100}
                          height={40}
                          bgColor="red"
                          icon={DeleteIcon}
                          title={"حذف"}
                          handleBtnClick={() => handleDeleteItem(row)}
                        />
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {companies?.length === 0 && (
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={3}>
                      لا يوجد اصناف
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

export default ManageCompanies;
