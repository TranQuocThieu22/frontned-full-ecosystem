'use client';

import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useDisclosure } from "@mantine/hooks";
import F7_4_1_3Research from "./F7_4_2UpdatePayment";
import F7_4_1_3DeleteSummary from "./F7_4_2DeleteDecision";
import F7_4_2UpdateMember from "./F7_4_2UpdateMember";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";

export interface I7_4_2Decision {
  council?: string;
  total?: string;
  file?: string;
}

export interface I7_4_2Member {
  id: number;
  memberCode?: string; // Member code
  memberName?: string; // Full name
  position?: string; // Position/Title
  money?: string;
  received?: boolean;
}


export default function F7_4_2CreateDecision() {
  const disc = useDisclosure(false)

  const form = useForm<I7_4_2Decision>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Thanh toán thù lao"
      onSubmit={() => {
      }}
    >
      <MyFlexRow>
        <Select
          label="Hội đồng:"
          placeholder="Chọn quyết định hội đồng nghiệm thu cấp trường"
          {...form.getInputProps("leader")}
          style={{ width: "50%" }}
        />
        <TextInput
          label="Tổng thù lao chi trả:"
          {...form.getInputProps("numberOfMember")}
          style={{ flex: 1 }}
        />
      </MyFlexRow>

      <MyFileInput
        label="File biên bản"
        placeholder="Chọn file"
        {...form.getInputProps("file")} />
      <MyDataTable
        columns={[
          { header: "Mã thành viên", accessorKey: "memberCode", size: 150 }, // Member Code
          { header: "Họ tên", accessorKey: "memberName", size: 200 }, // Full Name
          { header: "Chức vụ", accessorKey: "position", size: 150 }, // Position/Title
          { header: "Thù lao", accessorKey: "money", size: 100 }, // Money Allocated
          {
            header: "Đã nhận",
            accessorKey: "received",
            size: 100,
            Cell: ({ cell }) => {
              return (
                <Checkbox
                  checked={cell.row.original.received || false} // Reflects 'agree' status
                  onChange={(event) => console.log(event.currentTarget.checked)} // Placeholder for update logic
                />
              );
            },
          },

        ]}
        data={memberData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F7_4_2UpdateMember values={row.original} />
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

export interface I7_4_1_3Research {
  id?: number;
  researchNumber?: string;
  researchName?: string;
  headOfDepartment?: string;
  averageMark?: string;
  comment?: string;
}


const memberData: I7_4_2Member[] = [
  {
    id: 1,
    memberCode: "M001",
    memberName: "Nguyễn Văn A",
    position: "Giảng viên chính",
    money: "10,000,000 VND",
    received: true,
  },
  {
    id: 2,
    memberCode: "M002",
    memberName: "Lê Thị B",
    position: "Phó giáo sư",
    money: "15,000,000 VND",
    received: false,
  },
  {
    id: 3,
    memberCode: "M003",
    memberName: "Phạm Minh C",
    position: "Giáo sư",
    money: "20,000,000 VND",
    received: true,
  },
  {
    id: 4,
    memberCode: "M004",
    memberName: "Trần Văn D",
    position: "Tiến sĩ",
    money: "12,000,000 VND",
    received: false,
  },
  {
    id: 5,
    memberCode: "M005",
    memberName: "Hoàng Thị E",
    position: "Nghiên cứu viên",
    money: "8,000,000 VND",
    received: true,
  },
];