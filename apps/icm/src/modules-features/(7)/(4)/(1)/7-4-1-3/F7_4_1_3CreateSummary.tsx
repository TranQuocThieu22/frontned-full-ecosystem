'use client';

import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import { useDisclosure } from "@mantine/hooks";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import F7_4_1_3DeleteSummary from "./F7_4_1_3DeleteSummary";
import F7_4_1_3Research from "./F7_4_1_3UpdateResearch";

export interface I7_4_1_3Summary {
  leader?: string;
  council?: string;
  numberOfMember?: string;
  file?: string;
}


export default function F7_4_1_3CreateSummary() {
  const disc = useDisclosure(false)

  const form = useForm<I7_4_1_3Summary>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Tổng hợp kết quả đánh giá hội đồng nghiệm thu đề tài"
      onSubmit={() => {
      }}
    >
      <MyFlexRow>
        <Select
          label="Trưởng ban kiểm phiếu:"
          placeholder="Chọn thành viên"
          {...form.getInputProps("leader")}
          style={{ width: "50%" }}
        />
        <Select
          label="Hội đồng:"
          placeholder="Chọn quyết định thành lập hội đồng"
          {...form.getInputProps("council")}
          style={{ width: "50%" }}
        />
        </MyFlexRow>
        <TextInput
          label="Số thành viên ban kiểm phiếu:"
          {...form.getInputProps("numberOfMember")}
          style={{ flex: 1 }}
        />
       <MyFileInput
        label="File biên bản"
        placeholder="Chọn file"
        {...form.getInputProps("file")} />
      <MyDataTable
        columns={[
          { header: "Mã đề tài", accessorKey: "researchNumber", size: 150 },
          { header: "Tên đề tài", accessorKey: "researchName", size: 300 },
          { header: "Chủ nhiệm", accessorKey: "headOfDepartment", size: 200 },
          { header: "Điểm trung bình", accessorKey: "averageMark", size: 100 },
          { header: "Đánh giá", accessorKey: "comment", size: 300 },
        ]}
        data={researchData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F7_4_1_3Research values={row.original} />
              <F7_4_1_3DeleteSummary id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>
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

export interface I7_4_1_3Research{
  id?: number;
  researchNumber?: string;
  researchName?: string;
  headOfDepartment?: string;
  averageMark?: string;
  comment?: string;
}

const researchData: I7_4_1_3Research[] = [
  {
    researchNumber: "R001",
    researchName: "Optimization of Renewable Energy Systems",
    headOfDepartment: "Dr. John Smith",
    averageMark: "85",
    comment: "Excellent contribution to sustainable energy research.",
  },
  {
    researchNumber: "R002",
    researchName: "Artificial Intelligence in Healthcare",
    headOfDepartment: "Dr. Emily Davis",
    averageMark: "92",
    comment: "Groundbreaking findings in predictive healthcare models.",
  },
  {
    researchNumber: "R003",
    researchName: "Climate Change and Its Effects",
    headOfDepartment: "Dr. Michael Johnson",
    averageMark: "78",
    comment: "Informative but requires more robust data analysis.",
  },
  {
    researchNumber: "R004",
    researchName: "Advancements in Quantum Computing",
    headOfDepartment: "Dr. Linda Wilson",
    averageMark: "89",
    comment: "Well-written and innovative approach to computation.",
  },
  {
    researchNumber: "R005",
    researchName: "Blockchain Technology in Finance",
    headOfDepartment: "Dr. Sarah Brown",
    averageMark: "80",
    comment: "Promising potential for real-world financial applications.",
  },
];