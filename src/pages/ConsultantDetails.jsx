import React, { useEffect } from "react";
import Heading from "../components/common/Heading/Heading";
import MyLabel from "../components/common/UI/MyLabel";
import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { East } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import LoadingWrapper from "../components/feedback/Loading/LoadingWrapper";
import actGetContractorById from "../store/contractor/act/actGetContractorById";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import StatusLabel from "../components/manageContracts/StatusLabel";
import { actGetConsultantById } from "../store/consultant/consultantSlice";
import { actGetProjectsByConsultantId } from "../store/project/projectSlice";

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

const ConsultantDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { consultant, loading, error } = useSelector(
    (state) => state.consultant
  );
  const { projects } = useSelector((state) => state.project);
  console.log(projects);
  console.log("dddddddddd");
  console.log(consultant);
  const { id } = useParams();
  console.log(consultant);
  useEffect(() => {
    if (id) {
      dispatch(actGetConsultantById(id));
      dispatch(actGetProjectsByConsultantId({ id, page: 1 }));
    }
  }, [dispatch, id]);
  const handleShowProject = (project) => {
    navigate(`/project/id/${project.id}`);
  };
  return (
    <LoadingWrapper loading={loading} error={error}>
      <Heading title="تفاصيل استشارى" />
      <Stack
        direction="row"
        mt="60px"
        justifyContent="space-between"
        marginInline={3}
      >
        <Box>
          <Tooltip title="رجوع" placement="top" arrow>
            <IconButton onClick={() => navigate(-1)}>
              <East style={{ color: "black" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <Box
        border="2px solid #000"
        borderRadius={2}
        mt="4px"
        sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
        // marginInline="20px"
        flex={1}
        // bgcolor="#ddd"
      >
        <Stack gap={4} m={2}>
          
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  اسم المقاول
                </Typography>

                {consultant.name}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  الوصف
                </Typography>
                {consultant.description === ""
                  ? "لا يوجد"
                  : consultant.description}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  رقم الهاتف
                </Typography>

                {consultant.phoneNumber === ""
                  ? "لا يوجد"
                  : consultant.phoneNumber}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  اسم الشخص المسؤل
                </Typography>

                {consultant.contactPersonName === ""
                  ? "لا يوجد"
                  : consultant.contactPersonName}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  رقم هاتف المسؤل
                </Typography>

                {consultant.contactPersonPhone === ""
                  ? "لا يوجد"
                  : consultant.contactPersonPhone}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  العنوان
                </Typography>
                {consultant.address === "" ? "لا يوجد" : consultant.address}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  الدوله
                </Typography>

                {consultant.country === "" ? "لا يوجد" : consultant.country}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  التخصص
                </Typography>
                {consultant.specialization === ""
                  ? "لا يوجد"
                  : consultant.specialization}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  الخبره
                </Typography>

                {consultant.qualification === ""
                  ? "لا يوجد"
                  : consultant.qualification}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 15,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  المؤهلات
                </Typography>
                {consultant.qualification === ""
                  ? "لا يوجد"
                  : consultant.qualification}
              </Box>
            </Grid>
          </Grid>

          <TableContainer sx={{ maxHeight: "80vh", marginTop: "8px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">القطاع</StyledTableCell>

                  <StyledTableCell align="center">اسم المشروع</StyledTableCell>
                  <StyledTableCell align="center">الوصف</StyledTableCell>
                  <StyledTableCell align="center">
                    التكلفة المخططة
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    المنصرف الفعلى
                  </StyledTableCell>
                  <StyledTableCell align="center">نسبة الانجاز</StyledTableCell>
                  <StyledTableCell align="center">حالة المشروع</StyledTableCell>
                  <StyledTableCell align="center">
                    بداية المشروع
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    نهاية المشروع
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    هل له مخاطر/معوقات
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects?.map((row) => (
                  <Tooltip title="اضغط لعرض المشروع" placement="top" arrow>
                    <StyledTableRow
                      key={row}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#ddd !important" },
                      }}
                      onClick={() => handleShowProject(row)}
                    >
                      <StyledTableCell align="center">
                        {row.sectorName}
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
        </Stack>
      </Box>
    </LoadingWrapper>
  );
};

export default ConsultantDetails;
