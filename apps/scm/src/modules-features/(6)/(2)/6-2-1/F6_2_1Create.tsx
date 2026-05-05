'use client';

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, FileInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import F6_1_7Delete from "./F6_2_1Delete";


export interface I6_2_1Create {
  researchNumber?: string; // Research project number
  researchName?: string; // Research project name
  researchGroup?: string; // Research group leader or group name
  leaderName?: string; // Leader's full name
  phoneNumber?: string; // Leader's phone number
  email?: string; // Leader's email
  duration?: string; // Research duration
  direction?: string; // Research direction
  scope?: string; // Research scope
  goal?: string; // Research goal
  application?: string; // Application direction
  budget?: string; // Estimated budget
  field?: string; // Research field
  researchType?: string; // Type of research
  evidenceFile?: string; // Evidence file upload
}

export default function F6_2_1Create() {
  const disc = useDisclosure(false)

  const form = useForm<I6_2_1Create>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Đăng ký"
      modalSize={"70%"}
      disclosure={disc}
      title="Phiếu đăng ký đề tài NCKH nhóm nghiên cứu"
      onSubmit={() => {
      }}
    >
      <TextInput
        label="Mã đề tài:"
        {...form.getInputProps("researchNumber")}
      />
      <TextInput
        label="Tên đề tài:"
        {...form.getInputProps("researchName")}
      />
      <Select
        label="Nhóm nghiên cứu:"
        placeholder="Chọn chủ nhiệm"
        data={["A", "B"]}
        {...form.getInputProps("researchGroup")}
      />
      <MyFlexRow justify={"space-evenly"}>
        <TextInput
          w={"100%"}
          label="Họ tên Trưởng nhóm:"
          placeholder="Nguyễn Văn A"
          {...form.getInputProps("leaderName")}
        />
        <TextInput
          w={"100%"}
          label="Số điện thoại:"
          placeholder="0986853845"
          {...form.getInputProps("phoneNumber")}
        />
        <TextInput
          w={"100%"}
          label="Email:"
          placeholder="Amail@gmail.com"
          {...form.getInputProps("email")}
        />
      </MyFlexRow>
      <TextInput
        label="Thời gian thực hiện:"
        {...form.getInputProps("duration")}
      />
      <TextInput
        label="Hướng nghiên cứu:"
        {...form.getInputProps("direction")}
      />
      <TextInput
        label="Phạm vi nghiên cứu:"
        {...form.getInputProps("scope")}
      />
      <TextInput
        label="Mục tiêu nghiên cứu:"
        {...form.getInputProps("goal")}
      />
      <TextInput
        label="Hướng ứng dụng:"
        {...form.getInputProps("application")}
      />
      <TextInput
        label="Kinh phí dự kiến:"
        {...form.getInputProps("budget")}
      />
      <MyFlexRow justify={"space-evenly"}>
        <Select
          label="Lĩnh vực nghiên cứu:"
          placeholder="Chọn lĩnh vực"
          data={["A", "B"]}
          {...form.getInputProps("field")}
        />
        <Select
          label="Loại hình nghiên cứu:"
          placeholder="Chọn loại hình"
          data={["A", "B"]}
          {...form.getInputProps("researchType")}
        />
      </MyFlexRow>
      <FileInput
        label="Đính kèm file minh chứng:"
        {...form.getInputProps("evidenceFile")}
      />
      <Button
        leftSection={<IconPlus />}
        onClick={() => {
          disc[1].close();
          notifications.show({
            message: "Lưu thành công",
          });
        }}>
        Lưu
      </Button>
    </MyButtonModal>
  );
}
