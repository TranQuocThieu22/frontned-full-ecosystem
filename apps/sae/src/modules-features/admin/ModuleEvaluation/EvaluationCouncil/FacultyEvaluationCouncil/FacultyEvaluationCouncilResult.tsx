'use client'
import { Flex, Table, useMantineColorScheme } from "@mantine/core";
import { RateInfo } from "@/interfaces/ranking";
import FacultyEvaluationCouncilChart from "@/modules-features/admin/ModuleEvaluation/EvaluationCouncil/FacultyEvaluationCouncil/FacultyEvaluationCouncilChart";
interface Props {
    rateInfos?: RateInfo[]

}
export default function FacultyEvaluationCouncilResult({ rateInfos }: Props) {
    const { colorScheme } = useMantineColorScheme()
    if (!rateInfos || rateInfos.length === 0) {
        return null; // Hoặc có thể hiển thị một thông báo nào đó nếu không có dữ liệu
    }

    return (
        <Flex direction={'row'} mt={20} align={'start'} gap={10} style={{ width: '100%' }}>
            <Flex flex={1}>
                <Table highlightOnHover withTableBorder withColumnBorders >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th
                                bg={colorScheme === "dark" ?
                                    'var(--mantine-color-dark-4)' : "#cfe2ff"}
                                style={{
                                    textAlign: 'center',
                                    borderColor: colorScheme === "dark" ?
                                        'var(--mantine-color-dark-4)' :
                                        "#a6b5cc"
                                }}>Xếp loại</Table.Th>
                            <Table.Th
                                bg={colorScheme === "dark" ?
                                    'var(--mantine-color-dark-4)' : "#cfe2ff"}
                                style={{
                                    textAlign: 'center',
                                    borderColor: colorScheme === "dark" ?
                                        'var(--mantine-color-dark-4)' :
                                        "#a6b5cc"
                                }}>Số lượng</Table.Th>
                            <Table.Th
                                bg={colorScheme === "dark" ?
                                    'var(--mantine-color-dark-4)' : "#cfe2ff"}
                                style={{
                                    textAlign: 'center',
                                    borderColor: colorScheme === "dark" ?
                                        'var(--mantine-color-dark-4)' :
                                        "#a6b5cc"
                                }}>Tỉ lệ</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            rateInfos.map((item, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td style={{ textAlign: 'center' }}>{item.rateName}</Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }}>{item.count}</Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }}>
                                        {item.count && item.count > 0 ? ((item.count ?? 0) / rateInfos.reduce((sum, item) => sum + (item.count ?? 0), 0) * 100).toFixed(2) : 0} %
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        }
                    </Table.Tbody>
                </Table>
            </Flex>
            <FacultyEvaluationCouncilChart rankingSchoolReport={rateInfos} />
        </Flex>
    );
}
