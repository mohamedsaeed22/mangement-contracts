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
import { RestartAlt } from "@mui/icons-material";
import AddIcon from "../assets/icon/add-icon.svg";
import LoadingWrapper from "../components/feedback/Loading/LoadingWrapper";
import { projectStateOptions } from "../utils/statusList";
import actGetConsultants from "../store/consultant/act/actGetConsultants";

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

// const getIsoDate = () => {};
const initialFormData = {
  activityId: "",
  status: "",
  sectorId: "",
  spentBudget: "",
  startDate: null,
  endDate: null,
  contractorId: "",
  consultantId: "",
};

const ProjectsBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, totalItems } = useSelector((state) => state.project);
  const { activities } = useSelector((state) => state.activity);
  const { sectors } = useSelector((state) => state.sector);
  const { contractors } = useSelector((state) => state.contractor);
  const { consultants } = useSelector((state) => state.consultant);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [page, handleChangePge] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [formData, setFormData] = useState(initialFormData);
  const handleChangePage = (event, value) => {
    handleChangePge(value);
  };

  useEffect(() => {
    dispatch(actGetConsultants());
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
    dispatch(
      actGetProjects({
        page,
        search: debouncedSearch,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
        activityId: formData.activityId,
        sectorId: formData.sectorId,
        spentBudget: formData.spentBudget,
        contractorId: formData.contractorId,
      })
    );
  }, [dispatch, page, search, formData, debouncedSearch]);

  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  const handleChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleResetForm = () => {
    setFormData(initialFormData);
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
        height="calc(100vh - 130px)"
      >
        {/* <LoadingWrapper error={error} loading={loading}> */}
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
          <Stack direction="row" gap={1}>
            <MyBtn
              title="تصنيف"
              icon={FilterIcon}
              handleBtnClick={handleToggleFilter}
            />
            {/* <MyBtn
              type="submit"
              width={100}
              height={40}
              icon={AddIcon}
              handleBtnClick={() => navigate("/project/add")}
              title={"اضافة"}
            /> */}
          </Stack>
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
                <InputLabel id="demo-simple-select-Activitye">
                  النشاط
                </InputLabel>
                <Select
                  labelId="demo-simple-select-Activitye"
                  id="demo-simple-selectActivity"
                  value={formData.activityId}
                  label="النشاط"
                  name="activityId"
                  onChange={(e) => handleChange("activityId", e.target.value)}
                >
                  {activities?.map((Activity) => (
                    <MenuItem key={Activity.id} value={Activity.id}>
                      {Activity.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="demo-simple-select-supervisor">
                  القطاع
                </InputLabel>
                <Select
                  labelId="demo-simple-select-supervisor"
                  id="demo-simple-selectSupervisor"
                  value={formData.sectorId}
                  name="sectorId"
                  label="القطاع"
                  onChange={(e) => handleChange("sectorId", e.target.value)}
                >
                  {sectors?.map((supervisor) => (
                    <MenuItem key={supervisor.id} value={supervisor.id}>
                      {supervisor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="demo-simple-select-supervisor">
                  المقاول
                </InputLabel>
                <Select
                  labelId="demo-simple-select-supervisor"
                  id="demo-simple-selectSupervisor"
                  value={formData.contractorId}
                  name="contractorId"
                  label="المقاول"
                  onChange={(e) => handleChange("contractorId", e.target.value)}
                >
                  {contractors?.map((supervisor) => (
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
                label="المنصرف الفعلى"
                variant="outlined"
                sx={{ width: "150px" }}
                value={formData.spentBudget}
                name="spentBudget"
                onChange={(e) => handleChange("spentBudget", e.target.value)}
              />
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="demo-simple-select-projectState">
                  حالة المشروع
                </InputLabel>
                <Select
                  labelId="demo-simple-select-projectState"
                  id="demo-simple-selectProjectState"
                  value={formData.status}
                  label="حالة المشروع"
                  name="status"
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  {projectStateOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
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
                      name="startDate"
                      value={formData.startDate}
                      onChange={(value) => handleChange("startDate", value)}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="MM/DD/YYYY"
                    />
                  </Box>
                  <Box sx={{ width: "150px" }}>
                    <DatePicker
                      label="نهاية المشروع"
                      value={formData.endDate}
                      name="endDate"
                      onChange={(value) => handleChange("endDate", value)}
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
                <StyledTableCell align="center">القطاع</StyledTableCell>
                <StyledTableCell align="center">النشاط</StyledTableCell>
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
                <StyledTableCell align="center">
                  هل له مخاطر/معوقات
                </StyledTableCell>
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
                      {row.sectorName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.activityName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.name.length > 20
                        ? row.name.substring(0, 20) + "..."
                        : row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.description.length > 20
                        ? row.description.substring(0, 20) + "..."
                        : row.description}
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
                    <StyledTableCell align="center">
                      {row?.risks?.length > 0 || row?.handicaps?.length > 0
                        ? "يوجد"
                        : "لا يوجد"}
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
          {totalItems > 0 ? (
            <Pagination
              count={Math.ceil(totalItems / 10)}
              page={page ? page : 1}
              onChange={handleChangePage}
            />
          ) : (
            "لا يوجد مشاريع"
          )}
        </Stack>
        {/* </LoadingWrapper> */}
      </Box>
    </>
  );
};

export default ProjectsBox;
