'use client';

import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, FileInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import F6_2_7Delete from "./F6_2_7Delete";
import F6_2_7UpdateMember from "./F6_2_7UpdateMember";

export interface I6_2_7Create {
  council?: string; // Research council or decision reference
  total?: string; // Total payment amount
  file?: string; // File path for the council's minutes document
}

export interface I6_2_7Member {
  id: number; // Unique identifier for the member
  memberNumber: string; // Member code
  name: string; // Member's full name
  position: string; // Member's position in the council
  amount: string; // Payment amount for the member
}

export default function F6_2_7Create() {
  const disc = useDisclosure(false)

  const form = useForm<I6_2_7Create>({
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
          w={"50%"}
          label="Hội đồng"
          placeholder="Chọn quyết định hội đồng chọn nhóm nghiên cứu"
          data={["A", "B"]}
          {...form.getInputProps("council")}
          
        />
        <TextInput
        label="Tổng Thù lao chi trả:"
        w={"50%"}
        {...form.getInputProps("total")}
      />
      </MyFlexRow>
      <FileInput label="File biên bản" 
      {...form.getInputProps("file")}/>
      
      <MyDataTable
        columns={[
          { header: "Mã thành viên", accessorKey: "memberNumber" },
          { header: "Họ tên", accessorKey: "name" },
          { header: "Chức vụ", accessorKey: "position" },
          { header: "Thù lao", accessorKey: "amount" },

        ]}
        data={data} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F6_2_7UpdateMember values={row.original} />
              <F6_2_7Delete id={row.original.id!} />
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
const data: I6_2_7Member[] = [
  {
    id: 1,
    memberNumber: "MEM001",
    name: "Nguyen Van A",
    position: "Chairman",
    amount: "5,000,000 VND",
  },
  {
    id: 2,
    memberNumber: "MEM002",
    name: "Le Thi B",
    position: "Secretary",
    amount: "4,000,000 VND",
  },
  {
    id: 3,
    memberNumber: "MEM003",
    name: "Tran Van C",
    position: "Member",
    amount: "3,000,000 VND",
  },
];