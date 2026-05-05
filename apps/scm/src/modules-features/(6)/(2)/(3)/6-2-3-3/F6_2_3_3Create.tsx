'use client';

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Text } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";

import F6_2_3_3Delete from "./F6_2_3_3Delete";
import F6_2_3_3UpdateResearch from "./F6_2_3_3UpdateResearch";
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";



export interface I6_2_3_3Create {
  leader?: string; // Leader's full name (Trưởng ban kiểm phiếu)
  council?: string; // Council decision reference (Hội đồng)
  attended?: string; // Number of members present (Số thành viên hiện diện)
  file?: string; // Path to the meeting minutes file (File biên bản)
  decisionFile?: string; // Path to the decision file (File quyết định)
}

export interface I6_2_3_3Research {
  id: number; // Unique identifier
  researchName: string; // Research project name (Tên đề tài)
  groupName: string; // Research group name (Tên nhóm nghiên cứu)
  leader: string; // Research group leader (Trưởng nhóm)
  averageMark?: number; // Average score (Điểm trung bình)
  completed?: boolean; // Completion status (Thực hiện)
}


export default function F6_2_3_3Create() {
  const disc = useDisclosure(false)

  const form = useForm<I6_2_3_3Create>({
    initialValues: {
    },
  });

  return (
    <MyButtonModal
      label="Thêm"
      modalSize={"90%"}
      disclosure={disc}
      title="Tổng hợp kết quả đánh giá hội đồng"
      onSubmit={() => {
      }}
    >
      <MyFlexRow justify={"space-evenly"}>
        <Select
          label="Trưởng ban kiểm phiếu:"
          placeholder="Chọn thành viên"
          data={["A", "B"]}
          w={"100%"}
          {...form.getInputProps("leader")}
        />
        <Select
          label="Hội đồng:"
          placeholder="Chọn quyết định hội đồng xét duyệt đề cương"
          data={["A", "B"]}
          w={"100%"}
          {...form.getInputProps("council")}
        />
      </MyFlexRow>
      <TextInput
        label="Số thành viên hiện diện:"
        {...form.getInputProps("attended")}
      />
      <MyFileInput
        label="File biên bản:"
        {...form.getInputProps("file")}
      />
    
  
      <MyDataTable
        columns={[
          { header: "Tên đề tài", accessorKey: "researchName" },
          { header: "Tên nhóm nghiên cứu", accessorKey: "groupName" },
          { header: "Trưởng nhóm", accessorKey: "leader" },
          {
              header: "Điểm trung bình",
              accessorKey: "averageMark",
          },
          {
              header: "Thực hiện",
              accessorKey: "completed",
              Cell: ({ cell }) => {
                return <Checkbox
                  checked={cell.row.original.completed || false}
                  onChange={(event) => console.log(event.currentTarget.checked)}
                />
              },
          },
        ]}
        data={researchData} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <MyActionIcon
                crudType="create" />
              <F6_2_3_3UpdateResearch values={row.original} />
              <F6_2_3_3Delete id={row.original.id!} />
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




const researchData: I6_2_3_3Research[] = [
  {
    id: 1,
    researchName: "Nghiên cứu AI trong giáo dục",
    groupName: "Nhóm nghiên cứu AI",
    leader: "Nguyen Van A",
    averageMark: 8.5,
    completed: true,
  },
  {
    id: 2,
    researchName: "Blockchain trong chuỗi cung ứng",
    groupName: "Nhóm nghiên cứu Blockchain",
    leader: "Le Thi B",
    averageMark: 7.8,
    completed: false,
  },
];