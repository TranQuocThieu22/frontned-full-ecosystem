'use client'
import F_AssignEvaluationUnitTable from "@/features/admin/UncategorizedModules/assign-evaluation-unit/F_AssignEvaluationUnitTable";
import FilterGradeSelect from "@/shared/features/FilterGradeSelect/FilterGradeSelect";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Group, Space, Text } from "@mantine/core";


export default function Page() {
    return (
        <CustomPageContent>
            <Text size="xs" c="red">*Lưu ý: Chức năng phân công đơn vị đánh giá chỉ tải các lựa chọn đơn vị thuộc phân loại &quot;Khoa&quot;</Text>
            <Group mt={10}>
                <FilterGradeSelect />
            </Group>
            <Space />
            <F_AssignEvaluationUnitTable />
        </CustomPageContent>
    )
}
