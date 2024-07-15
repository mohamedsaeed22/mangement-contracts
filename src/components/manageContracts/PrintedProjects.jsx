import React, { forwardRef, useEffect } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Typography, Stack, TableContainer, Box } from "@mui/material";
import Logo from "../../assets/imgs/foeLogo.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { actBrowseAll } from "../../store/project/projectSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
  borderRight: "1px solid #ddd !important",
  maxHeight: "8px",
  "@media print": {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#070F2B",
      "-webkit-print-color-adjust": "exact",
      colorAdjust: "exact",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#ddd",
  borderRadius: "10px",
}));

const PrintedProjects = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { printedProjects: projects } = useSelector((state) => state.project);
  return (
    <div id="printed-table" ref={ref}>
      <Stack id="head-name" sx={{ direction: "ltr" }}>
        <Typography
          sx={{
            fontWeight: "400",
            textAlign: "center",
            fontSize: "14px",
            color: "#401F71",
          }}
        >
          جمهورية مصر العربية
          <br />
          وزارة الدفاع
          <br />
          جهاز مستقبل مصر للتنمية المستدامة
          <br />
          الادارة المالية والتجارية
          <br />
          التاريخ 1/7/2024
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginTop: "180px",
            fontWeight: "600",
            fontsize: "20px",
            position: "absolute",
            //   left: "50%",
            //   transform: "translatex(-50%)",
            color: "#401F71",
          }}
        >
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "6px",
              color: "#401F71",
            }}
          >
            مخصصات مالية مصدق عليها من الامانة العامة لوزارة الدفاع وتم توقيع
            بروتوكول مع هيئة الشئون المالية ق.م بشأنها{" "}
          </span>
        </Typography>
        <img
          src={Logo}
          alt="logo"
          style={{
            width: "166px",
            height: "130px",
            objectFit: "cover",
          }}
        />
      </Stack>
      <Stack>
        <TableContainer
          className="print-only"
          sx={{
            marginTop: "10px",
          }}
        >
          <Table
            aria-label="customized table"
            sx={{ direction: "ltr", marginTop: "60px" }}
          >
            <TableHead>
              <TableRow sx={{ fontsize: "12px" }}>
                <StyledTableCell align="center">م</StyledTableCell>
                <StyledTableCell align="center">
                  تاريخ البروتوكول
                </StyledTableCell>
                <StyledTableCell align="center">اسم المخصص</StyledTableCell>
                <StyledTableCell align="center">قيمه المخصص</StyledTableCell>
                <StyledTableCell align="center">المنصرف</StyledTableCell>
                <StyledTableCell align="center">المتبقى</StyledTableCell>
                <StyledTableCell align="center"> نسبه الصرف</StyledTableCell>
                <StyledTableCell align="center">بداية المشروع</StyledTableCell>
                <StyledTableCell align="center">نهاية المشروع</StyledTableCell>
                <StyledTableCell align="center">
                  مده تنفيذ المشروع
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects?.map((row, index) => (
                <StyledTableRow>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.assindBudgets.length > 0
                      ? row.assindBudgets[
                          row.assindBudgets.length - 1
                        ].assindDate.split("T")[0]
                      : "لا يوجد"}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.name.length > 20
                      ? row.name.substring(0, 20) + "..."
                      : row.name}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.budget == null ? 0 : row.budget?.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.spentBudget?.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.remaining?.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {Math.floor(row.percentageSpent)}%
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.startDate.split("T")[0]}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.endDate.split("T")[0]}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.totalMonths === 0
                      ? "اقل من شهر"
                      : `${row.totalMonths} شهر`}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
});

export default PrintedProjects;
