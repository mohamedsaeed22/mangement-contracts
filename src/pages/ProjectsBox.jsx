import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "../assets/icon/search.svg";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TableContainer,
  TextField,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Heading from "../components/common/Heading/Heading";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import MyBtn from "../components/common/UI/MyBtn";
import FilterIcon from "../assets/icon/filter-icon.svg";
import { actGetProjects } from "../store/project/projectSlice";
import StatusLabel from "../components/manageContracts/StatusLabel";
import dayjs from "dayjs";
import { RestartAlt } from "@mui/icons-material";

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

const projectStateOptions = [
  { id: 1, label: "لم يتم البدء" },
  { id: 2, label: "جار العمل علية" },
  { id: 3, label: "اكتمل" },
  { id: 4, label: "معلق" },
];

const getIsoDate = () => {};

const ProjectsBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, totalItems, loading, error } = useSelector(
    (state) => state.project
  );
  const { branches } = useSelector((state) => state.branch);
  const { supervisors } = useSelector((state) => state.supervisor);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [plannedCost, setPlannedCost] = useState("");
  const [branche, setBranch] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [projectState, setProjectState] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [isoStartDate, setIsoStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [isoEndDate, setIsoEndDate] = useState("");
  const [page, handleChangePge] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const handleChangeProjectState = (event) => {
    setProjectState(event.target.value);
  };

  const handleChange = (event, value) => {
    handleChangePge(value);
  };

  const handleResetForm = () => {
    setPlannedCost("");
    setBranch("");
    setSupervisor("");
    setProjectState("");
    setStartDate(null);
    setIsoStartDate("");
    setEndDate(null);
    setIsoEndDate("");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    dispatch(
      actGetProjects({
        page,
        search: debouncedSearch,
        status: projectState,
        startDate: isoStartDate,
        endDate: isoEndDate,
        BranchId: branche,
        SupervisorId: supervisor,
        SpentBudget: plannedCost,
      })
    );
  }, [
    dispatch,
    page,
    debouncedSearch,
    projectState,
    isoStartDate,
    isoEndDate,
    branche,
    supervisor,
    plannedCost,
  ]);

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
    const selectedDate = dayjs(newValue);
    const previousDay = selectedDate.subtract(1, "day");
    const isoStartDate = previousDay.toISOString();
    setIsoStartDate(isoStartDate);
    setStartDate(previousDay);
  };

  const handleEndDateChange = (newValue) => {
    const { $y, $M, $d } = newValue;
    const dayjsDate = dayjs([$y, $M + 1, $d.getDate()]);
    const isoEndDate = dayjsDate.toISOString();
    setIsoEndDate(isoEndDate);
    setEndDate(newValue);
  };

  return (
    <>
      <Heading title="صندوق المشاريع" />
      <Box
        gap={2}
        p={2}
        border="2px solid #000"
        borderRadius={2}
        mt="70px"
        sx={{
          marginInline: { xs: "5px", sm: "10px", md: "20px" },
          overflowY: "auto",
        }}
        // flex={1}
        height="calc(100vh - 130px)"
      >
        {/* filteration box */}
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
          alignItems="center"
          flexWrap="wrap"
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
          <MyBtn
            title="تصنيف"
            icon={FilterIcon}
            handleBtnClick={handleToggleFilter}
          />
        </Stack>
        <Stack
          direction="row"
          gap={3}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          {toggleFilter && (
            <Stack
              direction="row"
              mt="10px"
              justifyContent="center"
              gap={2}
              flexWrap="wrap"
              alignItems="center"
            >
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="demo-simple-select-branche">النشاط</InputLabel>
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
                    justifyContent: "center",
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
                  <Box>
                    <Tooltip title="مسح" placement="top" arrow>
                      <IconButton onClick={handleResetForm}>
                        <RestartAlt style={{ color: "black" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </LocalizationProvider>
            </Stack>
          )}
        </Stack>

        <TableContainer
          sx={{
            marginTop: "10px",
          }}
        >
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
                <Tooltip
                  title="اضغط لعرض المشروع"
                  placement="top"
                  arrow
                  key={row.id}
                >
                  <StyledTableRow
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#fff !important" },
                    }}
                    onClick={() => navigate(`/project/id/${row.id}`)}
                  >
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
                    <StyledTableCell align="center">
                      {row.budget}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.spentBudget}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.percentage}%
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
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          justifyContent="center"
          alignItems="center"
          marginInline="auto"
          mt={2}
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
      </Box>
    </>
  );
};

export default ProjectsBox;