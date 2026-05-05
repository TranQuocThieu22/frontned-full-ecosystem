'use client';

import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, FileInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";


export interface I6_2_3_2Create {
  researchName?: string; // Research project name
  researchGroup?: string; // Research group name
  evaluatorName?: string; // Name of the evaluator
  evaluationDate?: string | Date; // Date of evaluation
  totalScore?: number; // Total score given
  comments?: string; // Additional comments or remarks
  evaluationFile?: string; // Path to the uploaded evaluation file
}

export default function F6_2_3_2Read() {
  const disc = useDisclosure(false)

  const form = useForm<I6_2_3_2Create>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Phiếu đăng ký đề tài NCKH nhóm nghiên cứu"
      onSubmit={() => {
      }}
    >
      <MyFlexRow justify={"space-evenly"}>
        <Select
          label="Đề tài"
          placeholder="Chọn đề tài đã có thuyết minh"
          data={[
            'Nghiên cứu AI cấp nhà nước',
            'Nghiên cứu Blockchain',
            'Nghiên cứu IoT',
            'Nghiên cứu Big Data',
            'Nghiên cứu Machine Learning',
            'Nghiên cứu Cyber Security'
          ]}
          searchable
          style={{ width: "50%" }}
          {...form.getInputProps("researchName")}
        />
        <TextInput label="Tên nhóm nghiên cứu" defaultValue="Nhóm A KHTN" style={{ width: "50%" }} {...form.getInputProps("researchGroup")}/>
      </MyFlexRow>

      <MyFlexRow justify={"space-evenly"}>
        <Select
          label="Họ tên người đánh giá"
          placeholder="Chọn thành viên trong hội đồng đánh giá"
          data={[
            'Nguyễn Văn A',
            'Nguyễn Văn B',
            'Nguyễn Văn C',
            'Nguyễn Văn D',
            'Nguyễn Văn E',
            'Nguyễn Văn F'
          ]}
          searchable
          style={{ width: "50%" }}
          {...form.getInputProps("evaluatorName")}
        />
        <MyDateInput label="Ngày đánh giá" placeholder=" /  /" style={{ width: "50%" }}  {...form.getInputProps("evaluationDate")}/>
      </MyFlexRow>
      <MyNumberInput label="Tổng điểm" {...form.getInputProps("totalScore")} />
      <Textarea
        label="Ý kiến khác"
        placeholder="Nhập nội dung nhận xét"
        size="sm"
        radius="xs"
        autosize
        minRows={4}
        {...form.getInputProps("comments")} 
      />
      <FileInput
        w={"100%"}
        accept=".pdf,.doc,.docx"
        label="File đánh giá"
        description="Định dạng hợp lệ: PDF, doc, docx"
        placeholder="chọn file"
        {...form.getInputProps("evaluationFile")} 
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
