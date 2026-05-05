import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate } from "aq-fe-framework/components";
import { MyButtonCreateUpdate, MySelect, MyTextInput } from "aq-fe-framework/core";

export default function StudentLevelFormulaCreate() {
    const form = useForm<any>({
        initialValues: {},
    });  
    return (
        <MyButtonCreate 
        onSubmit={() => { }} 
        form={form} 
        >
            <SimpleGrid cols={1} spacing="md">
                <Stack>
                    <MySelect
                        label="Phân loại"
                        data={mockCategoryList}
                        {...form.getInputProps("category")}
                    />
                    <MySelect
                        label="Tiêu chí"
                        data={mockCriteriaList}
                        {...form.getInputProps("criteria")}
                    />
                    <MyTextInput
                        label="Mức độ"
                        {...form.getInputProps("level")}
                    />
                </Stack>
            </SimpleGrid>
        </MyButtonCreate>
    )
}

// Mock cho select category
export const mockCategoryList = ["Chuyên cần", "Điểm"];

// Mock cho select criteria
export const mockCriteriaList = [
    "Nghỉ phép 1 buổi",
    "Nghỉ phép 2 buổi liên tiếp",
    "Nghỉ phép 2 buổi/tháng",
    "Nghỉ phép 3 buổi/tháng",
    "Chưa làm BTVN 1 buổi",
    "Chưa làm BTVN 2 buổi/tháng",
    "Chưa làm BTVN 3 buổi/tháng",
    "CCG 1 buổi",
    "CCG 2 buổi",
    "CCG 3 buổi",
    "5 điểm 2 buổi liên tiếp",
    "5 điểm 3 buổi/tháng",
    "Quên vở 1 buổi",
    "Quên vở 2 buổi",
    "Điểm kiểm tra tháng CCG"
];
