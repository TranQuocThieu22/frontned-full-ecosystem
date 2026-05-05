import { IExamSection } from '@/shared/APIs/examSectionService'
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils'
import { Table } from '@mantine/core'
import { MyFieldset } from 'aq-fe-framework/components'
export default function ExamSectionInfo({ data }: { data: IExamSection }) {
    // Data rows for the table
    const rows = [
        { label: "Mã môn", value: data.subjectCode || "N/A" },
        { label: "Tên môn", value: data.subjectName || "N/A" },
        { label: "Nhóm", value: data.group || "N/A" },
        { label: "Ngày thi", value: dateUtils.toDDMMYYYY(new Date(data.startDate || '')) || "N/A" },
        { label: "Giờ thi", value: data.startTime || "N/A" },
        { label: "Thời gian", value: data.duration ? `${data.duration} phút` : "N/A" },
    ]

    return (
        <MyFieldset title='Thông tin kỳ thi'>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Tbody>
                    {rows.map((row, index) => (
                        <Table.Tr key={index}>
                            <Table.Td fw={500} w={150}>
                                {row.label}
                            </Table.Td>
                            <Table.Td>{row.value}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </MyFieldset>
    )
}
