'use client';

import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, getSize, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { useDisclosure } from "@mantine/hooks";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";

export interface I7_2_2_2CreateGrading {
  research?: string;
  headOfDepartment?: string;
  class?: string;
  department?: string;
  markerName?: string;
  markingDate?: Date;
  totalMark?: string;
  comment?: string;
  markingFile?: string;
  decisionName?: string;
}


export default function F7_2_2_1CreateGrading() {
  const disc = useDisclosure(false)

  const form = useForm<I7_2_2_2CreateGrading>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Phiếu điểm đề tài nghiên cứu khoa học"
      onSubmit={() => {
      }}
    >
      <MyFlexRow>
        <Select
          label="Đề tài:"
          placeholder="Chọn đề tài đã có thuyết minh"
          {...form.getInputProps("research")}
          style={{ width: "30%" }}
        />
        <TextInput
          label="Chủ nhiệm:"
          placeholder="Nguyễn Văn A"
          {...form.getInputProps("headOfDepartment")}
          style={{ flex: 1 }}
        />
        <TextInput
          label="Lớp:"
          placeholder="IT18001"
          {...form.getInputProps("class")}
          style={{ flex: 1 }}
        />
        <TextInput
          label="Khoa:"
          placeholder="Công nghệ thông tin"
          {...form.getInputProps("department")}
          style={{ flex: 1 }}
        />
      </MyFlexRow>

      <MyFlexRow>
        <Select
          label="Họ tên người đánh giá:"
          placeholder="Chọn thành viên trong hội đồng đánh giá"
          {...form.getInputProps("markerName")}
          style={{ width: "50%" }}
        />
        <MyDateInput
          label="Ngày đánh giá:"
          {...form.getInputProps("markingDate")} // Matches 'markingDate' field in the interface
          style={{ flex: 1 }}
        />
      </MyFlexRow>

      <TextInput
        label="Tổng điểm:"
        {...form.getInputProps("totalMark")} // Matches 'totalMark' field in the interface
      />
      <MyTextEditor
        label="Ý kiến khác:"
        {...form.getInputProps("comment")} // Matches 'comment' field in the interface
        
      />

      <MyFileInput
        label="File đánh giá"
        placeholder="Chọn file"
        {...form.getInputProps("markingFile")} />
      <Button
        onClick={() => {
          disc[1].close();
        }}
      >
        Lưu
      </Button>
    </MyButtonModal>
  );
}
