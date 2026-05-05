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
import F6_1_6Delete from "./F6_1_6Delete";


export interface I6_1_6Create {
  decisionNumber?: string; // Decision number
  decisionDate?: string; // Decision date
  decisionName?: string; // Decision name
  decisionFile?: string; // Decision file
}



export interface I6_1_6ResearchGroup {
  id: number;
  groupName: string; // Research group name
  leader: string; // Research group leader
  level: string; // Academic rank
  department: string; // Field of activity
  signUpFile: string; // Sign-up file
  explanationFile: string; // Group explanation file
}


export default function I6_1_6Create() {
  const disc = useDisclosure(false)

  const form = useForm<I6_1_6Create>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Quyết định Thành lập nhóm nghiên cứu"
      onSubmit={() => {
      }}
    >
      <MyFlexRow justify={"space-evenly"}>
            <TextInput w={"100%"} label="Số quyết định:" {...form.getInputProps("decisionNumber")}></TextInput>
            
            <MyDateInput w={"100%"} label="Ngày quyết định:" placeholder="  /  /" {...form.getInputProps("decisionDate")}></MyDateInput>
          </MyFlexRow>
          <TextInput label="Tên quyết định:"{...form.getInputProps("decisionName")}></TextInput>
      <Text>Danh sách đăng ký nhóm nghiên cứu</Text>
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
            header: "Tên nhóm nghiên cứu",
            accessorKey: "name",
        },
        {
            header: "Trưởng nhóm",
            accessorKey: "leader",
        },
        {
            header: "Học hàm - Học vị",
            accessorKey: "level",
        },
        {
            header: "Lĩnh vực hoạt động",
            accessorKey: "field",
        },
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
        ]}
        data={GroupData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F6_1_6Delete id={row.original.id!} />
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

const GroupData: I6_1_6ResearchGroup[] = [
  {
    id: 1,
    groupName: "Nhóm nghiên cứu AI",
    leader: "Nguyen Van A",
    level: "PGS, TS",
    department: "Khoa học Máy tính",
    signUpFile: "ai_signup.pdf",
    explanationFile: "ai_explanation.pdf",
  },
  {
    id: 2,
    groupName: "Nhóm nghiên cứu Blockchain",
    leader: "Le Thi B",
    level: "GS, TS",
    department: "Công nghệ thông tin",
    signUpFile: "blockchain_signup.pdf",
    explanationFile: "blockchain_explanation.pdf",
  },
];