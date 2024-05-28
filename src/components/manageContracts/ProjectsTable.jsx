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
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TableContainer,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Heading from "../common/Heading/Heading";
import { actGetBranches } from "../../store/branch/branchSlice";
import { actGetProjects } from "../../store/project/projectSlice";
import StatusLabel from "./StatusLabel";
import { FilterAlt, FilterAltOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

const projectStateOptions = [
  { id: 1, label: "لم يتم البدء" },
  { id: 2, label: "جار العمل علية" },
  { id: 3, label: "اكتمل" },
  { id: 4, label: "مرفوض" },
  { id: 5, label: "معلق" },
];

const ProjectsTable = () => {
  const dispatch = useDispatch();
  const { projects, totalItems, loading, error } = useSelector(
    (state) => state.project
  );
  const { branches } = useSelector((state) => state.branch);
  const { supervisors } = useSelector((state) => state.supervisor);
  const [plannedCost, setPlannedCost] = useState("");
  const [toggleFilter, setToggleFilter] = useState(false);

  const [branche, setBranch] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [projectState, setProjectState] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, handleChangePge] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const handleChangeProjectState = (event) => {
    setProjectState(event.target.value);
  };
console.log(error)
  const handleChange = (event, value) => {
    handleChangePge(value);
  };

  // useEffect(() => {
  //   dispatch(actGetBranches());
  // }, [dispatch]);

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

  const handleChangeBranche = (event) => {
    setBranch(event.target.value);
  };
  const handleChangeSupervisor = (event) => {
    setSupervisor(event.target.value);
  };
  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setEndDate(null);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };
  return (
    <>
      <Heading title="الصفحة الرئيسية" />
      <Box p={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Box position="relative">
            <input
              type="text"
              className="search-input"
              placeholder="بحث عن اسم / وصف مشروع"
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
          <Stack direction="row" gap={3} flexWrap="wrap" justifyContent="center" alignItems="center">
            {toggleFilter && (
              <Stack
                 direction="row"
                // justifyContent="space-between"
                gap={2}
                alignItems="center"
              >
                <FormControl sx={{ minWidth: 150 }} size="small">
                  <InputLabel id="demo-simple-select-branche">
                    النشاط
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-branche"
                    id="demo-simple-selectBranch"
                    value={branche}
                    label="النشاط"
                    onChange={handleChangeBranche}
                  >
                    {branches?.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }} size="small">
                  <InputLabel id="demo-simple-select-supervisor">
                    مشرف المشروع
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-supervisor"
                    id="demo-simple-selectSupervisor"
                    value={supervisor}
                    label="مشرف المشروع"
                    onChange={handleChangeSupervisor}
                  >
                    {supervisors?.map((supervisor) => (
                      <MenuItem key={supervisor.id} value={supervisor.id}>
                        {supervisor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  id="planned-cost"
                  type="number"
                  label="التكلفة المخططة"
                  variant="outlined"
                  sx={{ width: "150px" }}
                  value={plannedCost}
                  onChange={(e) => setPlannedCost(e.target.value)}
                />
                <FormControl sx={{ minWidth: 150 }} size="small">
                  <InputLabel id="demo-simple-select-projectState">
                    حالة المشروع
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-projectState"
                    id="demo-simple-selectProjectState"
                    value={projectState}
                    label="حالة المشروع"
                    onChange={handleChangeProjectState}
                  >
                    {projectStateOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      // mt: 2,
                      gap: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{ width: "150px" }}>
                      <DatePicker
                        label="بداية المشروع"
                        slotProps={{ textField: { size: "small" } }}
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="MM/DD/YYYY"
                      />
                    </Box>
                    <Box sx={{ width: "150px" }}>
                      <DatePicker
                        label="نهاية المشروع"
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="MM/DD/YYYY"
                        slotProps={{ textField: { size: "small" } }}
                      />
                    </Box>
                  </Box>
                </LocalizationProvider>
              </Stack>
            )}
            <Button
              variant="contained"
              endIcon={toggleFilter ? <FilterAltOff /> : <FilterAlt />}
              onClick={handleToggleFilter}
            >
              تصنيف
            </Button>
          </Stack>
        </Stack>

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
          {
            error && error.message && error.message
          }
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
