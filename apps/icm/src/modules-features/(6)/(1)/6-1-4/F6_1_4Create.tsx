'use client';

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Text } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";

import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";


export interface I6_1_4Create {
  decisionNumber?: string; // Decision number
  decisionDate?: string; // Decision date
  location?: string; // Decision name
  total?: number; // Decision file
  attended?: number;
}

export interface I6_1_4ResearchGroup {
  id: number; // Unique identifier
  groupName: string; // Research group name
  leader: string; // Research group leader
  academicRank: string; // Academic rank (e.g., Professor, Associate Professor)
  field: string; // Field of research
  signUpFile: string; // Path to the sign-up file
  explanationFile: string; // Path to the explanation file
  evaluation: string; // Evaluation result
  conclusion: string; // Conclusion or comments
}

export default function I6_1_4Create() {
  const disc = useDisclosure(false)
  const disc1 = useDisclosure(false)

  const form = useForm<I6_1_4Create>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Biên bản họp xét hội đồng chọn nhóm nghiên cứu"
      onSubmit={() => {
      }}
    >
      <MySelect
        label="Số quyết định thành lập hội đồng:"
        placeholder="Chọn quyết định hội đồng chọn nhóm nghiên cứu"
        data={["hội đồng A", "hội đồng B"]}
        {...form.getInputProps("decisionNumber")}
      />
      <MyFlexRow justify={"space-evenly"}>
        <MyDateInput w={"100%"} label="Ngày họp:" placeholder="  /  /"         {...form.getInputProps("decisionDate")}
        ></MyDateInput>
      </MyFlexRow>
      <TextInput label="Địa điểm:" {...form.getInputProps("location")}></TextInput>
      <MyFlexRow justify={"space-evenly"}>
        <TextInput label="Tổng số thành viên hội đồng:" {...form.getInputProps("total")}></TextInput>
        <TextInput label="Có mặt:" {...form.getInputProps("attended")}></TextInput>
      </MyFlexRow>
      <Text>Danh sách đăng ký nhóm nghiên cứu</Text>
      <MyDataTable
        columns={[
          { header: "Tên nhóm nghiên cứu", accessorKey: "groupName", size: 300 },
          { header: "Trưởng nhóm", accessorKey: "leader" },
          { header: "Học hàm - Học vị", accessorKey: "academicRank", size: 240 },
          { header: "Lĩnh vực hoạt động", accessorKey: "field", size: 240 },
          {
            
            header: "Đơn đăng ký",
            accessorKey: "signUpFile",
            Cell: ({ cell }) => {
              return <MyButtonViewPDF />;
            },
            size: 230
          },
          {

            header: "Thuyết minh nhóm",
            accessorKey: "explanationFile",
            Cell: ({ cell }) => {
              return <MyButtonViewPDF />;
            },
            size: 230
          },
          { header: "Đánh giá", accessorKey: "evaluation" },
          { header: "Kết luận", accessorKey: "conclusion", size: 250 },
        ]}
        data={researchGroup} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyButtonModal
              modalSize="xl"
              disclosure={disc1}
              color="orange"
              variant="light"
              label="Đánh giá"
              title="Đánh giá nhóm nghiên cứu"
            >
              <Switch label="Đạt:" color="green"></Switch>
              <MyTextEditor label="Kết luận:" onChange={() => { }}></MyTextEditor>
              <Button variant="filled" color="orange">
                Cập nhật
              </Button>
            </MyButtonModal>
          );
        }}
      ></MyDataTable>


      <MyFileInput
        label="File biên bản họp:"
        placeholder="Chọn file"
        {...form.getInputProps("file")} />

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

const researchGroup: I6_1_4ResearchGroup[] = [
  {
    id: 1,
    groupName: "Nhóm nghiên cứu AI",
    leader: "Nguyen Van A",
    academicRank: "PGS, TS",
    field: "Khoa học Máy tính",
    signUpFile: "ai_signup.pdf",
    explanationFile: "ai_explanation.pdf",
    evaluation: "Đạt yêu cầu",
    conclusion: "Hội đồng phê duyệt, đề tài có tiềm năng ứng dụng cao.",
  },
  {
    id: 2,
    groupName: "Nhóm nghiên cứu Blockchain",
    leader: "Le Thi B",
    academicRank: "GS, TS",
    field: "Công nghệ thông tin",
    signUpFile: "blockchain_signup.pdf",
    explanationFile: "blockchain_explanation.pdf",
    evaluation: "Đạt yêu cầu",
    conclusion: "Cần bổ sung thêm tài liệu chi tiết.",
  },
  {
    id: 3,
    groupName: "Nhóm nghiên cứu Công nghệ Sinh học",
    leader: "Tran Van C",
    academicRank: "TS",
    field: "Công nghệ Sinh học",
    signUpFile: "biotech_signup.pdf",
    explanationFile: "biotech_explanation.pdf",
    evaluation: "Không đạt yêu cầu",
    conclusion: "Đề tài chưa đủ điều kiện triển khai.",
  },
];