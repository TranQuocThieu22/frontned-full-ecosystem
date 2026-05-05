'use client';

import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Checkbox, getSize, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { useDisclosure } from "@mantine/hooks";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import F7_2_2_3DeleteGradingConfirmation from "./F7_2_2_3DeleteGradingConfirmation";
import F7_2_2_3UpdateInAction from "./F7_2_2_3UpdateInAction";
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";

export interface I7_2_2_3GradingResult {
  headOfConfirmation?: string;
  council?: string;
  numberOfMember?: string;
  file?: string;
}


export default function F7_2_2_3CreateGradingConfirmation() {
  const disc = useDisclosure(false)

  const form = useForm<I7_2_2_3GradingResult>({
    initialValues: {
    },
  });

  return (
    <MyButtonCreate
      label="Thêm"
      modalSize={"90%"}
      title="Tổng hợp kết quả đánh giá hội đồng"
      onSubmit={() => {
      }}
      form={form}   >
      <MyFlexRow>
        <Select
          label="Trưởng ban kiểm phiếu:"
          placeholder="Chọn thành viên"
          {...form.getInputProps("headOfConfirmation")}
          style={{ width: "50%" }}
        />
        <Select
          label="Hội đồng:"
          placeholder="Chọn quyết định hội đồng xét duyệt đề cương"
          {...form.getInputProps("council")}
          style={{ width: "50%" }}
        />
      </MyFlexRow>

      <TextInput
        label="Số thành viên ban kiểm phiếu:"
        {...form.getInputProps("numberOfMember")} // Matches 'totalMark' field in the interface
      />

      <MyFileInput
        label="File biên bản"
        placeholder="Chọn file"
        {...form.getInputProps("markingFile")} />
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
            header: "Tên đề tài",
            accessorKey: "researchName",
            size: 100
          },
          {
            header: "Chủ nhiệm",
            accessorKey: "headOfDepartment",
            size: 100
          },
          {
            header: "Điểm trung bình",
            accessorKey: "averageMark",
            size: 100
          },
          {
            header: "Thực hiện",
            accessorKey: "doing",
            Cell: ({ cell }) => {
              return <Checkbox
                checked={cell.row.original.doing || false}
                onChange={(event) => console.log(event.currentTarget.checked)}
              />
            },
            size: 100
          }
        ]}
        data={data} // Fixed data binding (removed nested array)
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <MyActionIcon
                crudType="create" />
              <F7_2_2_3UpdateInAction values={row.original} />
              <F7_2_2_3DeleteGradingConfirmation id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      ></MyDataTable>
    </MyButtonCreate>
  );
}

export interface I7_2_2_3table {
  id: number;
  researchName?: string;
  headOfDepartment?: string;
  averageMark?: string;
  doing: boolean;
}

const data: I7_2_2_3table[] = [
  {
    id: 1,
    researchName: "Nghiên cứu ứng dụng AI trong giáo dục",
    headOfDepartment: "Nguyễn Văn A",
    averageMark: "8.5",
    doing: true,
  },
  {
    id: 2,
    researchName: "Phát triển hệ thống blockchain quản lý tài sản",
    headOfDepartment: "Lê Thị B",
    averageMark: "7.8",
    doing: false,
  },
  {
    id: 3,
    researchName: "Phân tích dữ liệu lớn trong ngành y tế",
    headOfDepartment: "Trần Minh C",
    averageMark: "9.2",
    doing: true,
  },
  {
    id: 4,
    researchName: "Nghiên cứu các thuật toán lượng tử",
    headOfDepartment: "Hoàng Thị D",
    averageMark: "8.0",
    doing: false,
  },
  {
    id: 5,
    researchName: "Ứng dụng công nghệ IoT trong nông nghiệp thông minh",
    headOfDepartment: "Phạm Văn E",
    averageMark: "8.7",
    doing: true,
  },
];
