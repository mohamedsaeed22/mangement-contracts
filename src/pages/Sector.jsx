import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Tooltip,
  Typography,
} from "@mui/material";
import StatusLabel from "../components/manageContracts/StatusLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  actGetProjectByActivity,
  actGetProjects,
  actGetProjectsBySector,
} from "../store/project/projectSlice";
import CenterStat from "../components/manageContracts/CenterStat";
import {
  actGetStatByProjectId,
  actGetStatBySectorId,
  resetStat,
} from "../store/Statistics/statSlice";
import LoadingWrapper from "../components/feedback/Loading/LoadingWrapper";

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

const Sector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    projects,
    error: projectError,
    loading: projectLoading,
    totalItems,
  } = useSelector((state) => state.project);
  const {
    stats,
    error: statError,
    loading: statLoading,
  } = useSelector((state) => state.stat);

  const [page, handleChangePge] = useState(1);

  const handleChangePage = (event, value) => {
    handleChangePge(value);
  };

  useEffect(() => {
    dispatch(
      actGetProjectsBySector({
        page,
        id,
      })
    );
    dispatch(actGetStatBySectorId(id));
    return () => {
      dispatch(resetStat());
    };
  }, [dispatch, id, page]);

  const handleShowProject = (project) => {
    navigate(`/project/id/${project.id}`);
  };

  return (
    <>
      <Heading title="تفاصيل القطاع" />
      <Box
        gap={2}
        p={1}
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
        <Box borderRadius={2}>
          <LoadingWrapper loading={projectLoading} error={statError}>
            <TopStat stats={stats} />
            {/* center paper */}
            <CenterStat stats={stats} />
            {/* bottom paper */}
            <BottomStat stats={stats} />
            {!projects?.length > 0 ? (
              <>
                <Stack textAlign="center" mt={4}>
                  <Typography variant="h6" color="initial">
                    لا يوجد مشاريع لهذا القطاع
                  </Typography>
                </Stack>
              </>
            ) : (
              <>
                <Typography variant="h6" color="initial" mt={1}>
                  المشاريع الخاصة بـ {""}
                  <Typography
                    component="span"
                    variant="span"
                    color="initial"
                    fontWeight="bold"
                  >
                    {projects.length > 0 && projects[0].sectorName}
                  </Typography>
                </Typography>
                <TableContainer sx={{ maxHeight: "80vh", marginTop: "8px" }}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">النشاط</StyledTableCell>

                        <StyledTableCell align="center">
                          اسم المشروع
                        </StyledTableCell>
                        <StyledTableCell align="center">الوصف</StyledTableCell>
                        <StyledTableCell align="center">
                          التكلفة المخططة
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          المنصرف الفعلى
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          نسبة الانجاز
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          حالة المشروع
                        </StyledTableCell>
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
                        <Tooltip
                          title="اضغط لعرض المشروع"
                          placement="top"
                          arrow
                        >
                          <StyledTableRow
                            key={row}
                            sx={{
                              cursor: "pointer",
                              "&:hover": { backgroundColor: "#ddd !important" },
                            }}
                            onClick={() => handleShowProject(row)}
                          >
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
                              {row?.risks?.length > 0 ||
                              row?.handicaps?.length > 0
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
                  <Pagination
                    count={Math.ceil(totalItems / 10)}
                    page={page}
                    onChange={handleChangePage}
                  />
                </Stack>
              </>
            )}
          </LoadingWrapper>
        </Box>
      </Box>
    </>
  );
};

export default Sector;
