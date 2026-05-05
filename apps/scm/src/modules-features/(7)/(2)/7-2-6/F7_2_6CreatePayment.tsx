'use client';

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import F7_2_6DeletePayment from "./F7_2_6DeletePayment";
import F7_2_6UpdatePaymentMember from "./F7_2_6UpdatePaymentMember";

// Interface for payment creation form
interface I7_2_6CreatePayment {
  concil?: string;
  totalRemunerationPaid?: string;
  reportFile?: string;
}

// Interface for payment member data
export interface I7_2_6PaymentMember {
  id: number;
  memberCode: string; // Member code
  fullName: string; // Full name
  position: string; // Position/Title
  remuneration: number; // Payment amount
}

// Sample member data for the data table
const memberData: I7_2_6PaymentMember[] = [
  {
    id: 1,
    memberCode: "MEM001",
    fullName: "Nguyen Van A",
    position: "Chairman",
    remuneration: 1000000,
  },
  {
    id: 2,
    memberCode: "MEM002",
    fullName: "Le Thi B",
    position: "Secretary",
    remuneration: 750000,
  },
  {
    id: 3,
    memberCode: "MEM003",
    fullName: "Tran Van C",
    position: "Member",
    remuneration: 500000,
  },
];

export default function F7_2_6CreatePayment() {
  const form = useForm<I7_2_6CreatePayment>({
    initialValues: {
    },
  });

  return (
    <MyButtonCreate
      modalSize={"90%"}
      title="Thanh toán thù lao hội đồng xét duyệt đề cương/ thuyết minh"
      form={form}
      onSubmit={() => {
      }}
    >
      <MyFlexRow>
        <Select
          data={['Khoa', 'Trường']}
          label="Hội đồng"
          placeholder="Chọn quyết định hội đồng xét duyệt đề cương"
          style={{ width: "50%" }}
          {...form.getInputProps("concil")}
        />
        <TextInput
          label="Tổng Thù lao chi trả: "
          style={{ width: "50%" }}
          {...form.getInputProps("totalRemunerationPaid")}
        />
      </MyFlexRow>
      <MyFileInput label="File biên bản" {...form.getInputProps("reportFile")} />

      <MyDataTable
        columns={[
          { header: "Mã thành viên", accessorKey: "memberCode", size: 300 },
          { header: "Họ tên", accessorKey: "fullName" },
          { header: "Chức vụ", accessorKey: "position", size: 240 },
          { header: "Thù lao", accessorKey: "remuneration", size: 240 },
        ]}
        data={memberData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F7_2_6UpdatePaymentMember values={row.original} />
              <F7_2_6DeletePayment id={row.original.id} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>
    </MyButtonCreate>
  );
}
