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
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import F6_1_3UpdateMember from "./F6_2_3_1UpdateMember";
import F6_1_3UpdateResearchGroup from "./F6_2_3_1UpdateResearch";
import F6_1_3Delete from "./F6_2_3_1Delete";
import F6_2_3_1UpdateMember from "./F6_2_3_1UpdateMember";
import F6_2_3_1Delete from "./F6_2_3_1Delete";
import F6_2_3_1UpdateResearch from "./F6_2_3_1UpdateResearch";


export interface I6_2_3_1Create {
  decisionNumber?: string; // Decision number
  decisionDate?: string; // Decision date
  decisionName?: string; // Decision name
  decisionFile?: string; // Decision file
}

export interface I6_2_3_1Member {
  id: number; // Unique identifier
  teacherNumber: string; // Teacher ID
  name: string; // Full name
  position: string; // Position in the council
  file: string; // Personal file (e.g., CV)
}

export interface I6_2_3_1Research {
  id: number; // Unique identifier
  researchNumber: string; // Research project number
  researchName: string; // Research project name
  groupName: string; // Research group name
  leader: string; // Research group leader
  phoneNumber: string; // Leader's phone number
  email: string; // Leader's email
}


export default function F6_2_3_1Create() {
  const disc = useDisclosure(false)

  const form = useForm<I6_2_3_1Create>({
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
      <MyFlexRow justify={"space-evenly"}>
            <TextInput w={"100%"} label="Số quyết định:" {...form.getInputProps("decisionNumber")}></TextInput>
            <MyDateInput w={"100%"} label="Ngày quyết định:" placeholder="  /  /" {...form.getInputProps("decisionDate")}></MyDateInput>
          </MyFlexRow>
          <TextInput label="Tên quyết định:" {...form.getInputProps("decisionName")}></TextInput>
      <Text>Danh sách thành viên hội đồng xét duyệt đề cương / thuyết minh</Text>
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
            header: "Mã giảng viên",
            accessorKey: "teacherNumber",
          },
          {
            header: "Họ tên",
            accessorKey: "name",
          },
          {
            header: "Chức vụ hội đồng",
            accessorKey: "position",
          },
          {
            header: "Lý lịch",
            accessorKey: "file",
            Cell: ({ cell }) => {
              return <MyButtonViewPDF />;
            },
            size: 230
          }
        ]}
        data={memberData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F6_2_3_1UpdateMember values={row.original} />
              <F6_2_3_1Delete id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>

      <Text>Đề tài:</Text>
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
            accessorKey: "researchNumber"
        },
        {
            header: "Tên đề tài",
            accessorKey: "researchName"
        },
        {
            header: "Tên nhóm nghiên cứu",
            accessorKey: "groupName"
        },
        {
            header: "Trưởng nhóm",
            accessorKey: "leader"
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        ]}
        data={researchData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F6_2_3_1UpdateResearch values={row.original} />
              <F6_2_3_1Delete id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>
      <MyFileInput
        label="File quyết định:"
        placeholder="Chọn file"
        {...form.getInputProps("decisionFile")} />
        
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


const memberData: I6_2_3_1Member[] = [
  {
    id: 1,
    teacherNumber: "GV001",
    name: "Nguyen Van A",
    position: "Chủ nhiệm",
    file: "cv_nguyenvana.pdf",
  },
  {
    id: 2,
    teacherNumber: "GV002",
    name: "Le Thi B",
    position: "Thành viên",
    file: "cv_lethib.pdf",
  },
];

const researchData: I6_2_3_1Research[] = [
  {
    id: 1,
    researchNumber: "RS001",
    researchName: "Nghiên cứu AI trong giáo dục",
    groupName: "Nhóm nghiên cứu AI",
    leader: "Nguyen Van A",
    phoneNumber: "0123456789",
    email: "nguyenvana@example.com",
  },
  {
    id: 2,
    researchNumber: "RS002",
    researchName: "Blockchain trong chuỗi cung ứng",
    groupName: "Nhóm nghiên cứu Blockchain",
    leader: "Le Thi B",
    phoneNumber: "0987654321",
    email: "lethib@example.com",
  },
];