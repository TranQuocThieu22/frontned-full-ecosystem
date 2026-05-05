import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Stack, Table, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface ImprovedPlanDetailinfoViewModel {
    form: UseFormReturnType<Partial<Record<keyof ITaskDetail, any>>>
}

export default function QualityAssurancePlanDetailInfo({ form }: ImprovedPlanDetailinfoViewModel) {
    const infoRows = [
        { label: 'Mã yêu cầu', value: form.values.eaqAnalysis?.eaqRequirement?.code },
        { label: 'Tên yêu cầu', value: form.values.eaqAnalysis?.eaqRequirement?.name },
        { label: 'Mã công việc', value: form.values.code },
        { label: 'Tên công việc', value: form.values.name },
    ];
    return (
        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
            <Table.Tbody>
                {infoRows.map((row, index) => (
                    row.value && (
                        <Table.Tr key={index}>
                            <Table.Td width="40%" fw={600} c="dimmed">
                                {row.label}
                            </Table.Td>
                            <Table.Td>{row.value}</Table.Td>
                        </Table.Tr>
                    )
                ))}
            </Table.Tbody>
        </Table>
    )
}
