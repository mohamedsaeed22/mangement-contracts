import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import Heading from "../components/common/Heading/Heading";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
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
} from "../components/feedback/Alerts/alerts";
import BranchForm from "../components/Form/BranchForm";
import EditIcon from "../assets/icon/edit-icon.svg";
import DeleteIcon from "../assets/icon/delete-icon.svg";
import MyBtn from "../components/common/UI/MyBtn";


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

  console.log(branch);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateBranch = (branch) => {
    setUpdatedBranch(branch);
    setOpenModal(true);
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

  return (
    <>
      <MyModal
        open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات نشاط"
      >
        <BranchForm
          isUpdate={true}
          initialValues={updatedBranch}
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
        // flex={1}
        height="calc(100vh - 130px)"

      >
        <Box>
          <BranchForm isUpdate={false} initialValues={updatedBranch} />
          {/* add branch */}
          {/* <Stack direction="row" gap={2} alignItems="center">
          <TextField
            size="small"
            id="project-name"
            label="اسم النشاط"
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
        </Stack> */}
          {/* branches table */}
          <TableContainer sx={{ maxHeight: "80vh", marginTop: "8px" }}>
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
                      <Stack direction="row" justifyContent="center" gap={1}>
                        <MyBtn
                          width={100}
                          height={40}
                          icon={EditIcon}
                          title={"تعديل"}
                          handleBtnClick={() => handleUpdateBranch(row)}
                        />
                        <MyBtn
                          width={100}
                          height={40}
                          bgColor="red"
                          icon={DeleteIcon}
                          title={"حذف"}
                          handleBtnClick={() => handleDeleteBranch(row)}
                        />
                      </Stack>
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
      </Box>
    </>
  );
};

export default MangeBranches;
