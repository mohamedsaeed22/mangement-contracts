import { useState } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
} from "@mui/material";
import Heading from "../components/common/Heading/Heading";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/common/UI/MyModal";
import {
  actDeleteActivity,
  filteractivities,
} from "../store/Activity/activitySlice";
import {
  notifyFailed,
  notifySuccess,
  SweatAlert,
} from "../components/feedback/Alerts/alerts";
import ActivityForm from "../components/Form/ActivityForm";
import EditIcon from "../assets/icon/edit-icon.svg";
import DeleteIcon from "../assets/icon/delete-icon.svg";
import MyBtn from "../components/common/UI/MyBtn";
import MyIcon from "../components/common/UI/MyIcon";
import LoadingWrapper from "../components/feedback/Loading/LoadingWrapper";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#A0ACD4",
    color: "#000",
    borderRadius: 2,
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
  backgroundColor: "#ddd",
  borderRadius: "10px",
}));

const initialActivity = {
  name: "",
  description: "",
};

const ManageActivities = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { activities, error, loading } = useSelector((state) => state.activity);
  const [updatedActivity, setUpdatedActivity] = useState(initialActivity);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateActivity = (Activity) => {
    setUpdatedActivity(Activity);
    setOpenModal(true);
  };

  const handleDeleteActivity = async (Activity) => {
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف ${Activity.name}؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(actDeleteActivity(Activity.id))
        .unwrap()
        .then((e) => {
          dispatch(filteractivities(Activity.id));
          notifySuccess("تم حذف النشاط");
          setOpenModal(false);
        })
        .catch((err) => {
          notifyFailed("هذا النشاط مرتبط بمشاريع,رجاء تعديل المشارع او حذفها");
        });
    }
  };

  return (
    <>
      <MyModal
        open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات نشاط"
      >
        <ActivityForm
          isUpdate={true}
          initialValues={updatedActivity}
          handleCloseModal={handleCloseModal}
        />
      </MyModal>
      <Heading title="ادارة الانشطة" />
      <Box
        gap={2}
        p={2}
        border="2px solid #000"
        borderRadius={2}
        mt="70px"
        sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
        overflow="auto"
        height="calc(100vh - 130px)"
      >
        {/* <LoadingWrapper error={error} loading={loading}> */}
        <Box>
          <ActivityForm isUpdate={false} initialValues={updatedActivity} />
          {/* activities table */}
          <TableContainer sx={{ maxHeight: "80vh", marginTop: "8px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">النشاط</StyledTableCell>
                  <StyledTableCell align="center">الوصف</StyledTableCell>
                  <StyledTableCell align="center">عدد المشاريع</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities?.length > 0 ? (
                  activities.map((row) => (
                    <Tooltip
                      title="اضغط لعرض التفاصيل"
                      placement="top"
                      arrow
                      key={row.id}
                    >
                      <StyledTableRow
                        sx={{
                          cursor: "pointer",
                          padding: "50px",

                          "&:hover": { backgroundColor: "#ccc !important" },
                        }}
                        onClick={() => navigate(`/activity/${row.id}`)}
                      >
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.description.length > 30
                            ? row.description.substring(0, 30) + "..."
                            : row.description}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.totalProjects}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Stack direction="row" justifyContent="right" gap={1}>
                            <MyIcon
                              icon={EditIcon}
                              handleBtnClick={(e) => {
                                e.stopPropagation();
                                handleUpdateActivity(row);
                              }}
                            />
                            <MyIcon
                              icon={DeleteIcon}
                              handleBtnClick={(e) => {
                                e.stopPropagation();
                                handleDeleteActivity(row);
                              }}
                            />
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    </Tooltip>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={4}>
                      لا يوجد انشطه
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* </LoadingWrapper> */}
      </Box>
    </>
  );
};

export default ManageActivities;
