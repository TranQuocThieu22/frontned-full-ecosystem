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

import F6_1_1UpdateMember from "./F6_1_1UpdateMember";
import F6_1_1Delete from "./F6_1_1Delete";
import F6_1_1UpdateOuterMember from "./F6_1_1UpdateOuterMember";

export interface I6_1_1Create {
  groupNameVN?: string; // Vietnamese group name
  groupNameEN?: string; // English group name
  field?: string; // Field of activity
  signUpFile?: string;
  file?: string;
}

export interface I6_1_1Member {
  id: number;
  teacherNumber: string; // Teacher ID
  name: string; // Full name
  level: string; // Academic rank
  degree: string; // Academic degree
  position: string; // Position in the group
  unit: string; // Affiliated unit
  email: string; // Contact email
  phoneNumber: string; // Contact phone number
}

export interface I6_1_1OutMember {
  id: number;
  teacherNumberO: string; // Outer member ID
  nameO: string; // Full name
  levelO: string; // Academic rank and degree
  positionO: string; // Position in the group
  unitO: string; // Affiliated unit
  emailO: string; // Contact email
  phoneNumberO: string; // Contact phone number
  addLetter: string; // Additional commitment letter file path
  agreeLetter: string; // Agreement letter file path
}


export default function I6_1_1Create() {
  const disc = useDisclosure(false)

  const form = useForm<I6_1_1Create>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Đăng ký nhóm nghiên cứu"
      onSubmit={() => {
      }}
    >
      <TextInput
        label="Tên nhóm nghiên cứu (Tiếng Việt):"
        placeholder="Nhập tên nhóm nghiên cứu bằng Tiếng Việt"
        {...form.getInputProps("groupNameVN")}
      />
      <TextInput
        label="Tên nhóm nghiên cứu (Tiếng Anh):"
        placeholder="Enter English name of the group"
        {...form.getInputProps("groupNameEN")}
      />
      <MyFlexRow justify={'flex-star'}>
        <Select
          label="Lĩnh vực hoạt động:"
          placeholder="Chọn lĩnh vực"
          data={["Khoa học tự nhiên", "Khoa học xã hội"]}
          {...form.getInputProps("field")}
          />
      </MyFlexRow>
      <Text>Danh sách thành viên trong trường</Text>
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
        Thêm thành viên
      </Button>
      <MyDataTable
        columns={[
          { header: "Mã GV", accessorKey: "teacherNumber" },
          { header: "Họ và tên", accessorKey: "name" },
          { header: "Học hàm", accessorKey: "level", size: 200 },
          { header: "Học vị", accessorKey: "degree" },
          { header: "Vai trò", accessorKey: "position" },
          { header: "Đơn vị công tác", accessorKey: "unit", size: 270 },
          { header: "Email", accessorKey: "email", size: 270 },
          { header: "Số điện thoại", accessorKey: "phoneNumber", size: 200 },
        ]}
        data={memberData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F6_1_1UpdateMember values={row.original} />
              <F6_1_1Delete id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>

      <Text>Danh sách thành viên ngoài trường</Text>
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
        Thêm thành viên
      </Button>
      <MyDataTable
        columns={[
          {
            header: "Mã GV",
            accessorKey: "teacherNumberO",
        },
        {
            header: "Họ và tên",
            accessorKey: "nameO",
        },
        {
            header: "Học hàm - học vị",
            accessorKey: "levelO",
            size: 240
        },
        {
            header: "Vai trò",
            accessorKey: "positionO",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "unitO",
             size: 270
        },
        {
            header: "Email",
            accessorKey: "emailO",
            size: 270,
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumberO",
            size: 200
        },
        {
            header: "Đính kèm thư cam kết",
            accessorKey: "addLetter",
            Cell: ({ cell }) => {
                return <MyFileInput />;
            },
            size: 270
        },
        {
            mantineTableBodyCellProps: {
                align: 'center',
            },
            header: "Thư cam kết",
            accessorKey: "agreeLetter",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
            size: 230
        },
        ]}
        data={OutMemData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F6_1_1UpdateOuterMember values={row.original} />
              <F6_1_1Delete id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>
      <MyFileInput
        label="Đính kèm đơn đăng ký:"
        placeholder="Chọn file"
        {...form.getInputProps("signUpFile")} />
        <MyFileInput
        label="Đính kèm thuyết minh nhóm:"
        placeholder="Chọn file"
        {...form.getInputProps("file")} />
      <Button
        onClick={() => {
          disc[1].close();
        }}
      >
        Đăng ký
      </Button>
    </MyButtonModal>
  );
}


const memberData: I6_1_1Member[] = [
  {
    id: 1,
    teacherNumber: "GV001",
    name: "Nguyen Van A",
    level: "PGS",
    degree: "TS",
    position: "Chủ nhiệm",
    unit: "Khoa Công nghệ thông tin",
    email: "nguyenvana@university.edu",
    phoneNumber: "0123456789",
  },
  {
    id: 2,
    teacherNumber: "GV002",
    name: "Le Thi B",
    level: "GS",
    degree: "TS",
    position: "Thành viên",
    unit: "Khoa Kinh tế",
    email: "lethib@university.edu",
    phoneNumber: "0987654321",
  },
];

const OutMemData: I6_1_1OutMember[] = [
  {
    id: 1,
    teacherNumberO: "OUT001",
    nameO: "Tran Van C",
    levelO: "GS, TS",
    positionO: "Advisor",
    unitO: "Khoa Công nghệ Sinh học",
    emailO: "tranvanc@university.edu",
    phoneNumberO: "0345678912",
    addLetter: "commitment.pdf",
    agreeLetter: "agreement.pdf",
  },
];