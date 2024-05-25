import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "../../src/assets/icon/search.svg";
import Heading from "../components/common/Heading/Heading";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  TableContainer,
} from "@mui/material";

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

function createData(
  activity,
  name,
  description,
  CustomCost,
  ActualOutgoing,
  accomplished,
  start,
  end
) {
  return {
    activity,
    name,
    description,
    CustomCost,
    ActualOutgoing,
    accomplished,
    start,
    end,
  };
}

const rows = [
  createData(
    "التعدين",
    "مشروع 1",
    "وصف المشروع 1",
    "10000",
    "8000",
    "20%",
    "01/01/2023",
    "06/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 2",
    "وصف المشروع 2",
    "20000",
    "18000",
    "30%",
    "02/01/2023",
    "07/01/2023"
  ),
  createData(
    "الزراعة",
    "مشروع 3",
    "وصف المشروع 3",
    "15000",
    "13000",
    "40%",
    "03/01/2023",
    "08/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 4",
    "وصف المشروع 4",
    "12000",
    "11000",
    "5%",
    "04/01/2023",
    "09/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 5",
    "وصف المشروع 5",
    "25000",
    "23000",
    "25%",
    "05/01/2023",
    "10/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 1",
    "وصف المشروع 1",
    "10000",
    "8000",
    "80%",
    "01/01/2023",
    "06/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 2",
    "وصف المشروع 2",
    "20000",
    "18000",
    "90%",
    "02/01/2023",
    "07/01/2023"
  ),
  createData(
    "الزراعة",
    "مشروع 3",
    "وصف المشروع 3",
    "15000",
    "13000",
    "85%",
    "03/01/2023",
    "08/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 4",
    "وصف المشروع 4",
    "12000",
    "11000",
    "92%",
    "04/01/2023",
    "09/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 5",
    "وصف المشروع 5",
    "25000",
    "23000",
    "95%",
    "05/01/2023",
    "10/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 1",
    "وصف المشروع 1",
    "10000",
    "8000",
    "80%",
    "01/01/2023",
    "06/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 2",
    "وصف المشروع 2",
    "20000",
    "18000",
    "90%",
    "02/01/2023",
    "07/01/2023"
  ),
  createData(
    "الزراعة",
    "مشروع 3",
    "وصف المشروع 3",
    "15000",
    "13000",
    "85%",
    "03/01/2023",
    "08/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 4",
    "وصف المشروع 4",
    "12000",
    "11000",
    "92%",
    "04/01/2023",
    "09/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 5",
    "وصف المشروع 5",
    "25000",
    "23000",
    "95%",
    "05/01/2023",
    "10/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 1",
    "وصف المشروع 1",
    "10000",
    "8000",
    "80%",
    "01/01/2023",
    "06/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 2",
    "وصف المشروع 2",
    "20000",
    "18000",
    "90%",
    "02/01/2023",
    "07/01/2023"
  ),
  createData(
    "الزراعة",
    "مشروع 3",
    "وصف المشروع 3",
    "15000",
    "13000",
    "85%",
    "03/01/2023",
    "08/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 4",
    "وصف المشروع 4",
    "12000",
    "11000",
    "92%",
    "04/01/2023",
    "09/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 5",
    "وصف المشروع 5",
    "25000",
    "23000",
    "95%",
    "05/01/2023",
    "10/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 1",
    "وصف المشروع 1",
    "10000",
    "8000",
    "80%",
    "01/01/2023",
    "06/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 2",
    "وصف المشروع 2",
    "20000",
    "18000",
    "90%",
    "02/01/2023",
    "07/01/2023"
  ),
  createData(
    "الزراعة",
    "مشروع 3",
    "وصف المشروع 3",
    "15000",
    "13000",
    "85%",
    "03/01/2023",
    "08/01/2023"
  ),
  createData(
    "التعدين",
    "مشروع 4",
    "وصف المشروع 4",
    "12000",
    "11000",
    "30%",
    "04/01/2023",
    "09/01/2023"
  ),
  createData(
    "المحاجر",
    "مشروع 5",
    "وصف المشروع 5",
    "25000",
    "23000",
    "95%",
    "05/01/2023",
    "10/01/2023"
  ),
];

const Home = () => {
  return (
    <>
      <Heading title="الصفحة الرئيسية" />
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between">
          <Box position="relative">
            <input type="text" className="search-input" placeholder="بحث" />
            <img
              src={SearchIcon}
              alt="search icon"
              style={{
                position: "absolute",
                zIndex: 5,
                left: 12,
                top: 15,
                width: "15px",
              }}
            />
          </Box>
          <Button variant="outlined">تصنيف</Button>
        </Stack>
        <TableContainer sx={{ maxHeight: "80vh", marginTop: "20px" }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">النشاط</StyledTableCell>
                <StyledTableCell align="center">اسم المشروع</StyledTableCell>
                <StyledTableCell align="center">الوصف</StyledTableCell>
                <StyledTableCell align="center">
                  التكلفة المخصصة
                </StyledTableCell>
                <StyledTableCell align="center">المنصرف الفعلى</StyledTableCell>
                <StyledTableCell align="center">ما تم انجازه</StyledTableCell>
                <StyledTableCell align="center">بداية المشروع</StyledTableCell>
                <StyledTableCell align="center">نهاية المشروع</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.activity}>
                  <StyledTableCell align="center">
                    {row.activity}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.CustomCost}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.ActualOutgoing}
                  </StyledTableCell>
                  <StyledTableCell align="center"  >
                    {row.accomplished}
                    <Box sx={{ width: "100%",marginTop:"2px"}}>
                      <LinearProgress
                        variant="determinate"
                        value={parseInt(row.accomplished)}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.start}</StyledTableCell>
                  <StyledTableCell align="center">{row.end}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Home;
