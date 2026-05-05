'use client'
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    MyActionIconUpdate,
    MyDateInput,
    MyFileInput,
    MySelect,
    MyTextArea,
    MyTextInput
} from "aq-fe-framework/components";
import { I_CooperationPlanTable } from "./CooperationPlanTable";

export default function CooperationPlanUpdate({ values }: { values: I_CooperationPlanTable }) {
    const form = useForm<I_CooperationPlanTable>({
        initialValues: values,
    });
    return (
        <MyActionIconUpdate modalSize="70%" form={form} onSubmit={() => { }} title="Chi tiết thỏa thuận">
            <SimpleGrid cols={2} spacing="md">
                <Stack>
                    <MyTextInput label="Mã thỏa thuận" {...form.getInputProps("code")}></MyTextInput>
                    <MyTextInput label="Tên thỏa thuận" {...form.getInputProps("name")}></MyTextInput>
                    <MySelect label="Mã đối tác" data={codeMockData} {...form.getInputProps("partnerCode")}></MySelect>
                    <MySelect label="Loại thỏa thuận" data={typeMockData} {...form.getInputProps("type")}></MySelect>
                    <MyFileInput label="Tệp đính kèm" ></MyFileInput>
                    <MyTextArea label="Tóm tắt nội dung" pt={78} {...form.getInputProps("summary")}></MyTextArea>
                </Stack>
                <Stack>
                    <MyDateInput label="Ngày ký" {...form.getInputProps("signDate")}></MyDateInput>
                    <MyDateInput label="Ngày hiệu lực" {...form.getInputProps("effectiveDate")}></MyDateInput>
                    <MyDateInput label="Ngày hết hạn" {...form.getInputProps("expireDate")}></MyDateInput>
                    <MySelect label="Lĩnh vực hợp tác" data={fieldMockData} {...form.getInputProps("field")}></MySelect>
                    <MySelect label="Trạng thái hiệu lực" data={mockDataStatus} {...form.getInputProps("status")}></MySelect>
                    <MySelect label="Người phụ trách" data={managerMockData} {...form.getInputProps("manager")}></MySelect>
                    <MyTextArea label="Ghi chú" {...form.getInputProps("note")}></MyTextArea>
                </Stack>
            </SimpleGrid>
        </MyActionIconUpdate>
    );
}

const codeMockData = ["DTQT-001", "DTQT-002", "DTQT-003", "DTQT-005", "DTQT-007"]
const fieldMockData = [
    "Công nghệ thông tin; Trí tuệ nhân tạo",
    "Y sinh; Sinh học",
    "Kỹ thuật; Năng lượng tái tạo",
    "Khoa học Vật liệu; Kỹ thuật Nano",
    "Công nghệ thông tin; Tự động hóa"
]
const mockDataStatus = ["Còn hiệu lực", "Hết hiệu lực"]
const managerMockData = [
  "Phòng Hợp tác Quốc tế",
  "Khoa Y",
  "Khoa Kỹ thuật",
  "Phòng KHCN",
  "Trung tâm Chuyển giao Công nghệ"
]
const typeMockData = [
  "MOU - Biên bản Ghi nhớ (MOU)",
  "MOA - Biên bản Thỏa thuận (MOA)",
  "DA - Hợp đồng Dự án",
  "HHT - Hợp đồng Hợp tác",
  "CV - Thư chấp thuận/Thư thỏa thuận"
]



