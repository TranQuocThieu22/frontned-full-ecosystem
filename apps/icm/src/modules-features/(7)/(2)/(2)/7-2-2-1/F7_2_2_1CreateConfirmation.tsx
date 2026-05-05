'use client';

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Text } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import F7_2_2_1DeleteConfirmation from "./F7_2_2_1DeleteConfirmation";
import F7_2_2_1UpdateMember from "./F7_2_2_1UpdateMember";
import F7_2_2_1UpdateProposal from "./F7_2_2_1UpdateProposal";

export interface I7_2_2_1CreateConfirmation {
  decisionNumber?: string;
  decisionDate?: Date;
  decisionName?: string;
}

export interface I7_2_2_1Member {
  id: number;
  memberCode?: string; // Member code
  memberName?: string; // Full name
  position?: string; // Position/Title
  file?: string;
}


export default function F7_2_2_1CreateConfirmation() {
  const disc = useDisclosure(false)

  const form = useForm<I7_2_2_1CreateConfirmation>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Quyết định Thành lập hội đồng xét duyệt đề cương/ thuyết minh"
      onSubmit={() => {
      }}
    >
      <MyFlexRow>
        <TextInput
          label="Số quyết định: "
          {...form.getInputProps("decisionNumber")}
          style={{ flex: 1 }}
        />
        <MyDateInput
          label="Ngày quyết định:"
          {...form.getInputProps("decisionDate")}
          style={{ flex: 1 }}
        />
      </MyFlexRow>
      <TextInput
        label="Tên quyết định: "
        {...form.getInputProps("decisionName")}
      />

      <Text>Danh sách thành viên hội đồng</Text>
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
          { header: "Mã giảng viên", accessorKey: "memberCode", size: 200 },
          { header: "Họ tên", accessorKey: "memberName" },
          { header: "Chức vụ hội đồng", accessorKey: "position", size: 200 },
          {
            header: "Lý lịch", accessorKey: "file", size: 100, Cell: ({ cell }) => {
              return <MyButtonViewPDF />; // Renders PDF viewer button
            },
          },
        ]}
        data={memberData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F7_2_2_1UpdateMember values={row.original} />
              <F7_2_2_1DeleteConfirmation id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>

      <Text>Danh sách đề xuất đã cập nhật thuyết minh</Text>
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
          { header: "Mã đề tài", accessorKey: "researchCode", size: 100 },
          { header: "Tên đề tài", accessorKey: "researchName", size: 200 },
          { header: "Chủ nhiệm đề tài", accessorKey: "researchLeader", size: 200 },
          { header: "Lớp", accessorKey: "class", size: 100 },
          { header: "Khoa", accessorKey: "department", size: 150 },
        ]}
        data={proposalData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F7_2_2_1UpdateProposal values={row.original} />
              <F7_2_2_1DeleteConfirmation id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>
      <MyFileInput
        label="File quyết định"
        placeholder="Chọn file"
        {...form.getInputProps("file")} />
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

export interface I7_2_2_1Proposal {
  id: number;
  researchCode?: string;
  researchName?: string;
  researchLeader?: string;
  class?: string;
  department?: string;
}

const proposalData: I7_2_2_1Proposal[] = [
  {
    id: 1,
    researchCode: "RC001",
    researchName: "AI in Healthcare",
    researchLeader: "Nguyen Van A",
    class: "CS101",
    department: "Computer Science"
  },
  {
    id: 2,
    researchCode: "RC002",
    researchName: "Blockchain for Financial Services",
    researchLeader: "Le Thi B",
    class: "CS102",
    department: "Information Technology"
  },
  {
    id: 3,
    researchCode: "RC003",
    researchName: "Quantum Computing Algorithms",
    researchLeader: "Tran Minh C",
    class: "CS103",
    department: "Electrical Engineering"
  }
];


// Sample member data for the data table
const memberData: I7_2_2_1Member[] = [
  {
    id: 1,
    memberCode: "MEM001",
    memberName: "Nguyen Van A",
    position: "Chairman",
    file: "file1.pdf",
  },
  {
    id: 2,
    memberCode: "MEM002",
    memberName: "Le Thi B",
    position: "Secretary",
    file: "file2.pdf",
  },
  {
    id: 3,
    memberCode: "MEM003",
    memberName: "Tran Van C",
    position: "Member",
    file: "file3.pdf",
  },
];