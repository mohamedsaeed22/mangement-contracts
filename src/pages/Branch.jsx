import React from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/common/Heading/Heading";
import TopStat from "../components/manageContracts/TopStat";
import BottomStat from "../components/manageContracts/BottomStat";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  LinearProgress,
  Pagination,
  Stack,
  TableContainer,
} from "@mui/material";
import StatusLabel from "../components/manageContracts/StatusLabel";
import { useSelector } from "react-redux";

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

const Branch = () => {
  const params = useParams();
  const { projects, totalItems, loading, error } = useSelector(
    (state) => state.project
  );
  console.log(params.id);
  return (
    <>
      <Heading title="تفاصيل نشاط المالية" />
      <Box p={2} mt={3} bgcolor="#ddd" borderRadius={2}>
        <TopStat />
        <BottomStat />
      </Box>
        <TableContainer sx={{ maxHeight: "80vh", marginTop: "20px" }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">النشاط</StyledTableCell>
                <StyledTableCell align="center">المشرف</StyledTableCell>
                <StyledTableCell align="center">اسم المشروع</StyledTableCell>
                <StyledTableCell align="center">الوصف</StyledTableCell>
                <StyledTableCell align="center">
                  التكلفة المخططة
                </StyledTableCell>
                <StyledTableCell align="center">المنصرف الفعلى</StyledTableCell>
                <StyledTableCell align="center">نسبة الانجاز</StyledTableCell>
                <StyledTableCell align="center"> حالة المشروع</StyledTableCell>
                <StyledTableCell align="center">بداية المشروع</StyledTableCell>
                <StyledTableCell align="center">نهاية المشروع</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">
                    {row.branchName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.supervisorName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.budget}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.spentBudget}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.percentage}
                    <Box sx={{ width: "100%", marginTop: "2px" }}>
                      <LinearProgress
                        variant="determinate"
                        value={parseInt(row.percentage)}
                      />
                    </Box>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Box sx={{ width: "100%", marginTop: "2px" }}>
                      <StatusLabel status={row.status} />
                    </Box>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.startDate.split("T")[0]}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.endDate.split("T")[0]}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          justifyContent="center"
          alignItems="center"
          marginInline="auto"
          mt={3}
        >
          {error && error.message && error.message}
          {totalItems > 0 ? (
            <Pagination
              count={Math.ceil(totalItems / 10)}
              page={page}
              onChange={handleChange}
            />
          ) : (
            "لا يوجد مشاريع"
          )}
        </Stack>
    </>
  );
};

export default Branch;
