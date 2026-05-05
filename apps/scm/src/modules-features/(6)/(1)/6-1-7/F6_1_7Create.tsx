'use client';

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Text } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import F6_1_6Delete from "./F6_1_7Delete";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import F6_1_7Delete from "./F6_1_7Delete";
import F6_1_7UpdateMember from "./F6_1_7UpdateMember";


export interface I6_1_7Create {
  council?: string; // Council name or decision reference
  total?: number; // Total amount of payment
  file?: string; // File path for the payment document
}


export interface I6_1_7Member {
  id: number; // Unique identifier
  memberNumber: string; // Member code
  name: string; // Full name
  position: string; // Position in the council
  amount: number; // Payment amount for the member
}


export default function I6_1_7Create() {
  const disc = useDisclosure(false)

  const form = useForm<I6_1_7Create>({
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
      <MyFlexRow justify={"space-evenly"}>
        <Select
          label="Hội đồng"
          placeholder="Chọn quyết định hội đồng chọn nhóm nghiên cứu"
          data={["A", "B"]}
          {...form.getInputProps("council")}
          style={{ width: "50%" }}
        />
        <MyTextInput  label="Tổng Thù lao chi trả:" placeholder="25000000" {...form.getInputProps("total")} />
      </MyFlexRow>
      <MyFileInput label="File biên bản" {...form.getInputProps("file")} />

      <MyDataTable
        columns={[
          { header: "Mã thành viên", accessorKey: "memberNumber" },
          { header: "Họ tên", accessorKey: "name" },
          { header: "Chức vụ", accessorKey: "position" },
          { header: "Thù lao", accessorKey: "amount" },

        ]}
        data={GroupData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F6_1_7UpdateMember values={row.original} />
              <F6_1_7Delete id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>
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

const GroupData: I6_1_7Member[] = [
  {
    id: 1,
    memberNumber: "MEM001",
    name: "Nguyen Van A",
    position: "Chủ tịch",
    amount: 5000000,
  },
  {
    id: 2,
    memberNumber: "MEM002",
    name: "Le Thi B",
    position: "Thư ký",
    amount: 4000000,
  },
  {
    id: 3,
    memberNumber: "MEM003",
    name: "Tran Van C",
    position: "Thành viên",
    amount: 3000000,
  },
];