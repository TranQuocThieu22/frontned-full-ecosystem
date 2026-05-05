'use client';
import { Text } from "@mantine/core";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import F7_2_6DeletePayment from "./F7_2_7DeleteResearchDecision";
import F7_2_6UpdatePayment from "./F7_2_7UpdateResearchDecision";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import F7_2_7DeleteResearchDecision from "./F7_2_7DeleteResearchDecision";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import F7_2_7UpdateResearchDecisionInCreate from "./F7_2_7UpdateResearchDecisionInCreate";

interface I7_2_7CreateDecision {
  decisionNumber?: string;
  decisionDate?: Date;
  decisionName?: string;
}

export interface I7_2_7Propose {
  id: number;
  researchNumber?: string;
  researchName?: string;
  headOfDepartment: string;
  class: string;
  department: number;
  advisor?: string;
  cost?: string;
}

const memberData: I7_2_7Propose[] = [
  {
    id: 1,
    researchNumber: "RN001",
    researchName: "Nghiên cứu AI trong Y tế",
    headOfDepartment: "Nguyen Van A",
    class: "CS101",
    department: 1,
    advisor: "Le Thi B",
    cost: "120,000,000 VND",
  },
  {
    id: 2,
    researchNumber: "RN002",
    researchName: "Ứng dụng Blockchain trong Quản lý",
    headOfDepartment: "Tran Van C",
    class: "CS102",
    department: 2,
    advisor: "Nguyen Thi D",
    cost: "150,000,000 VND",
  },
  {
    id: 3,
    researchNumber: "RN003",
    researchName: "Phân tích dữ liệu lớn trong Marketing",
    headOfDepartment: "Le Minh E",
    class: "KT101",
    department: 3,
    advisor: "Tran Thi F",
    cost: "90,000,000 VND",
  },
  {
    id: 4,
    researchNumber: "RN004",
    researchName: "Phân tích tác động của ChatGPT",
    headOfDepartment: "Pham Hoang G",
    class: "CS103",
    department: 1,
    advisor: "Nguyen Huu H",
    cost: "110,000,000 VND",
  },
];

export default function F7_2_2CreateResearchDecision() {
  const disc = useDisclosure(false)
  const form = useForm<I7_2_7CreateDecision>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"100%"}
      title="Quyết định giao đề tài"
      onSubmit={() => {
      }}
      disclosure={disc}  >
      <MyFlexRow>
        <TextInput
          label="Số quyết định:"
          {...form.getInputProps("decisionNumber")}
          style={{ flex: 1 }}
        />

        {/* Input for Decision Date */}
        <MyDateInput
          label="Ngày quyết định:"
          valueFormat="DD/MM/YYYY"
          {...form.getInputProps("decisionDate")}
          style={{ flex: 1 }}
        />
      </MyFlexRow>
      <TextInput
        label="Tên quyết định:"
        {...form.getInputProps("decisionName")}
      />
      <Text>Danh sách đề xuất đã cập nhật thuyết minh </Text>
      <Button
        onClick={() => {
          disc[1].close();
        }}
        style={{
          fontSize: '12px', // Smaller font size
          padding: '5px 10px', // Smaller padding for a smaller button
          marginTop: '10px', // Adds space between text and button
          alignSelf: 'flex-end', // Align the button to the right within its container
          width: '10%', // Makes the button 25% of its parent's width
        }}>
        Thêm
      </Button>
      <MyDataTable
        columns={[
          {
            header: "Mã đề tài",
            accessorKey: "researchNumber", // Maps to 'id' field in the interface
            size: 200
          },
          {
            header: "Tên đề tài",
            accessorKey: "researchName", // Maps to 'researchName' field in the interface
            size: 300
          },
          {
            header: "Chủ nhiệm",
            accessorKey: "headOfDepartment", // Maps to 'headOfDepartment' field in the interface
            size: 240
          },
          {
            header: "Lớp",
            accessorKey: "class", // Maps to 'class' field in the interface
            size: 200
          },
          {
            header: "Khoa",
            accessorKey: "department", // Maps to 'department' field in the interface
            Cell: ({ cell }) => {
              return `Khoa ${cell.row.original.department}`; // Example transformation for display
            },
            size: 240
          },
          {
            header: "Cố vấn",
            accessorKey: "advisor", // Maps to 'advisor' field in the interface
            size: 240
          },
          {
            header: "Kinh phí",
            accessorKey: "cost", // Maps to 'cost' field in the interface
            size: 240
          },
        ]}
        data={memberData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F7_2_7UpdateResearchDecisionInCreate values={row.original} />
              <F7_2_7DeleteResearchDecision id={row.original.id} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>
      <MyFileInput label="File quyết định:" placeholder="Chọn file" />
      <Button
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
