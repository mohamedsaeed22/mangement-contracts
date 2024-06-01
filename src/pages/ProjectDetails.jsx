import React from "react";
import Heading from "../components/common/Heading/Heading";
import MyLabel from "../components/common/UI/MyLabel";
import { Box, Stack, Typography } from "@mui/material";
import MyBtn from "../components/common/UI/MyBtn";
import EditIcon from "../assets/icon/edit-icon.svg";
import { NavLink, useParams } from "react-router-dom";
const ProjectDetails = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <Stack>
      <Heading title="تفاصيل مشروع" />
      <Box sx={{ position: "absolute", right: "22px", top: "88px" }}>
        <NavLink to={`/project/edit/${id}`}>
          <MyBtn icon={EditIcon} title="تعديل المشروع" />
        </NavLink>
      </Box>
      <Stack gap={4} m={2}>
        <Stack
          p={1}
          direction="row"
          justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
        >
          <MyLabel label="اسم المشروع" value="مشروع محاجر" />
          <MyLabel label=" تكلفة المشروع" value=" 121,214" />
          <MyLabel label="المنصرف الفعلى" value=" 85,847" />
        </Stack>
        <Stack
          p={1}
          direction="row"
          justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
        >
          <MyLabel label="حالة المشروع" value="تم البدء" />
          <MyLabel label=" النشاط" value="زراعى" />
          <MyLabel label="المشرف" value="اسامة" />
        </Stack>
        <Stack
          p={1}
          direction="row"
          justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
        >
          <MyLabel label="ما تم انجازة" value="50%" />
          <MyLabel label="تاريخ البداية" value=" 12-05-2024" />
          <MyLabel label="تاريخ النهايه" value=" 19-08-2024" />
        </Stack>
        <Box
          sx={{
            backgroundColor: "#F5F5F5 !important",
            border: "2px solid #000",
            borderRadius: "6px",
            padding: "15px 10px",
            position: "relative",
            maxWidth: 700,
            marginTop: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "13px",
              position: "absolute",
              top: "-12px",
              backgroundColor: "#F5F5F5",
              left: 20,
              zIndex: 10,
              paddingInline: "6px",
            }}
          >
            تفاصيل المشروع
          </Typography>
          يجب أن يتضمن عقد التشييد والبناء جدولًا زمنيًا دقيقًا يحدد مراحل
          الإنجاز وتواريخها، وجدول دفعات مرتبط بهذه المراحل لضمان التدفق المالي
          السلس. كما يجب تحديد الشروط الجزائية بوضوح لمعالجة التأخيرات وضمان
          الالتزام بالمواصفات الفنية. بالإضافة إلى ذلك.
        </Box>
      </Stack>
    </Stack>
  );
};

export default ProjectDetails;
