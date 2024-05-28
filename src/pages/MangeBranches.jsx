import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import Heading from "../components/common/Heading/Heading";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/common/UI/MyModal";
import {
  actCreateBranch,
  actDeleteBranch,
  actUpdateBranch,
  filterBranches,
} from "../store/branch/branchSlice";
import {
  notifyFailed,
  notifySuccess,
  SweatAlert,
} from "../components/feedback/alerts";

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

const initialBranch = {
  name: "",
  description: "",
};

const MangeBranches = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { branches } = useSelector((state) => state.branch);
  const [branch, setbranch] = useState(initialBranch);
  const [updatedBranch, setUpdatedBranch] = useState(initialBranch);

  const handleBranchValues = (e) => {
    setbranch({
      ...branch,
      [e.target.name]: e.target.value,
    });
  };
  console.log(branch);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangeBranch = (e) => {
    setUpdatedBranch({
      ...updatedBranch,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateBranch = (branch) => {
    setUpdatedBranch(branch);
    setOpenModal(true);
  };

  const updateBranch = async () => {
    dispatch(actUpdateBranch(updatedBranch))
      .unwrap()
      .then((e) => {
        notifySuccess("تم تعديل البيانات بنجاح");
        setOpenModal(false);
      })
      .catch((err) => {
        notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
      });
  };

  const handleDeleteBranch = async (branch) => {
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف ${branch.name}؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(actDeleteBranch(branch.id))
        .unwrap()
        .then((e) => {
          dispatch(filterBranches(branch.id));
          notifySuccess("تم حذف النشاط");
          setOpenModal(false);
        })
        .catch((err) => {
          notifyFailed("هذا النشاط مرتبط بمشاريع,رجاء تعديل المشارع او حذفها");
        });
    }
  };

  const handleAddBranch = () => {
    dispatch(actCreateBranch(branch))
      .unwrap()
      .then((e) => {
        notifySuccess("تم اضافة النشاط بنجاح");
        setbranch(initialBranch);
      })
      .catch((err) => {
        notifyFailed("هذا النشاط موجود مسبقا");
      });
  };

  return (
    <>
      <MyModal
        open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات نشاط"
      >
        <Stack gap={2} alignItems="center" m={3}>
          <TextField
            size="small"
            id="project-name"
            label="تعديل الاسم"
            variant="outlined"
            value={updatedBranch.name}
            name="name"
            fullWidth
            onChange={handleChangeBranch}
          />
          <TextField
            size="small"
            id="project-description"
            label="تعديل وصف"
            variant="outlined"
            value={updatedBranch.description}
            name="description"
            fullWidth
            onChange={handleChangeBranch}
            multiline
            rows={3}
          />
          <Button variant="contained" onClick={updateBranch}>
            تعديل
          </Button>
        </Stack>
      </MyModal>
      <Heading title="ادارة الانشطة" />
      <Box p={2}>
        {/* add branch */}
        <Stack direction="row" gap={2} alignItems="center">
          <TextField
            size="small"
            id="project-name"
            label="اضافة نشاط"
            variant="outlined"
            sx={{ width: "250px" }}
            value={branch.name}
            name="name"
            onChange={handleBranchValues}
          />
          <TextField
            size="small"
            id="project-desc"
            label="الوصف"
            variant="outlined"
            sx={{ width: "250px" }}
            value={branch.description}
            name="description"
            onChange={handleBranchValues}
          />
          <Button
            variant="contained"
            disabled={!branch.name | !branch.description}
            startIcon={<Add />}
            onClick={handleAddBranch}
          >
            اضافة
          </Button>
        </Stack>
        {/* branches table */}
        <TableContainer sx={{ maxHeight: "80vh", marginTop: "20px" }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">النشاط</StyledTableCell>
                <StyledTableCell align="center">الوصف</StyledTableCell>
                <StyledTableCell align="center">الاجراءات</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdateBranch(row)}
                      >
                        تعديل
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "red",
                          "&:hover": {
                            backgroundColor: "red",
                            color: "#fff",
                          },
                          marginLeft: "10px",
                        }}
                        onClick={() => handleDeleteBranch(row)}
                      >
                        حذف
                      </Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {branches?.length === 0 && (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={3}>
                    لا يوجد انشطه
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MangeBranches;
