import { useEffect, useState } from "react";
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
  notifyFailed,
  notifySuccess,
  SweatAlert,
} from "../components/feedback/Alerts/alerts";
import BranchForm from "../components/Form/BranchForm";
import EditIcon from "../assets/icon/edit-icon.svg";
import DeleteIcon from "../assets/icon/delete-icon.svg";
import MyBtn from "../components/common/UI/MyBtn";
import ItemForm from "../components/Form/ItemForm";
import actDeleteItem from "../store/item/act/actDeleteItem";
import { actGetItems, filterItems } from "../store/item/itemSlice";

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

const initialItem = {
  name: "",
  description: "",
};

const ManageItems = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { items } = useSelector((state) => state.item);
  const [updatedItem, setUpdatedItem] = useState(initialItem);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(actGetItems());
  }, [dispatch]);

  const handleUpdateItem = (item) => {
    setUpdatedItem(item);
    setOpenModal(true);
  };

  const handleDeleteItem = async (item) => {
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف ${item.name}؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(actDeleteItem(item.id))
        .unwrap()
        .then((e) => {
          dispatch(filterItems(item.id));
          notifySuccess("تم حذف الصنف");
          setOpenModal(false);
        })
        .catch((err) => {
          notifyFailed("حدث خطا ما ..الرجاء المحاوله مره اخرى");
        });
    }
  };

  return (
    <>
      <MyModal
        open={openModal}
        handleClose={handleCloseModal}
        title="تعديل بيانات صنف"
      >
        <ItemForm
          isUpdate={true}
          initialValues={updatedItem}
          handleCloseModal={handleCloseModal}
        />
      </MyModal>
      <Heading title="ادارة الاصناف" />
      <Box
        gap={2}
        p={2}
        border="2px solid #000"
        borderRadius={2}
        m="90px 20px 0px"
        flex={1}
      >
        <Box>
          <ItemForm isUpdate={false} initialValues={updatedItem} />
          {/* items table */}
          <TableContainer sx={{ maxHeight: "80vh", marginTop: "20px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">الصنف</StyledTableCell>
                  <StyledTableCell align="center">الوصف</StyledTableCell>
                  <StyledTableCell align="center">الاجراءات</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.description.length > 30
                        ? row.description.substring(0, 30) + "..."
                        : row.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack direction="row" justifyContent="center" gap={1}>
                        <MyBtn
                          width={100}
                          height={40}
                          icon={EditIcon}
                          title={"تعديل"}
                          handleBtnClick={() => handleUpdateItem(row)}
                        />
                        <MyBtn
                          width={100}
                          height={40}
                          bgColor="red"
                          icon={DeleteIcon}
                          title={"حذف"}
                          handleBtnClick={() => handleDeleteItem(row)}
                        />
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {items?.length === 0 && (
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={3}>
                      لا يوجد اصناف
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

export default ManageItems;
