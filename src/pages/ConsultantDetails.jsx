import React, { useEffect } from "react";
import Heading from "../components/common/Heading/Heading";
import MyLabel from "../components/common/UI/MyLabel";
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
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

  return (
    <LoadingWrapper loading={loading} error={error}>
      <Heading title="تفاصيل مقاول" />
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
          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <MyLabel label="اسم المقاول" value={consultant.name} />
            <MyLabel label=" وصف" value={consultant.description} />
            <MyLabel label="رقم الهاتف" value={consultant.phoneNumber} />
          </Stack>

          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <MyLabel
              label="اسم الشخص المسؤل"
              value={consultant.contactPersonName}
            />
            <MyLabel
              label="رقم هاتف المسؤل"
              value={consultant.contactPersonPhone}
            />
            <MyLabel label="العنوان" value={consultant.address} />
          </Stack>

          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <MyLabel label="الدوله" value={consultant.country} />
            <MyLabel label="التخصص" value={consultant.specialization} />
            <MyLabel label="الخبره" value={consultant.experience} />
          </Stack>
          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <MyLabel label="المؤهلات" value={consultant.qualification} />
          </Stack>

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
                      // onClick={() => handleShowProject(row)}
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
