import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "../../assets/icon/search.svg";
import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  Stack,
  TableContainer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Heading from "../common/Heading/Heading";
import { actGetBranches } from "../../store/branch/branchSlice";
import { actGetProjects } from "../../store/project/projectSlice";

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

function addBranchNameToProjects(projects, branches) {
  const branchMap = {};
  branches?.forEach((branch) => {
    branchMap[branch.id] = branch.name;
  });

  const projectsWithBranchName = projects?.map((project) => ({
    ...project,
    branchName: branchMap[project.branchId],
  }));

  return projectsWithBranchName;
}

const ProjectsTable = () => {
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const { projects, totalItems, loading, error } = useSelector(
    (state) => state.project
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(actGetBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actGetBranches());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    dispatch(actGetProjects({ page, search: debouncedSearch }));
  }, [dispatch, page, debouncedSearch]);

  const projectsWithBranchName = addBranchNameToProjects(projects, branches);

  return (
    <>
      <Heading title="الصفحة الرئيسية" />
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between">
          <Box position="relative">
            <input
              type="text"
              className="search-input"
              placeholder="بحث"
              onChange={(e) => setSearch(e.target.value)}
            />
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
          <Button variant="outlined">عدد المشاريع {totalItems}</Button>
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
              {projectsWithBranchName?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">
                    {row.branchName}
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
      </Box>
    </>
  );
};

export default ProjectsTable;
