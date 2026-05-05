import { Table, TableProps } from "@mantine/core";
import { ReactNode } from "react";
import { SafeOmitType } from "../../types/safeOmitType";

interface Data {
    title?: ReactNode
    content?: ReactNode
}

interface CustomDataTableVerticalProps extends SafeOmitType<TableProps, "data"> {
    data?: Data[]
}

export default function CustomDataTableVertical({
    data
}: CustomDataTableVerticalProps) {
    return (
        <Table variant="vertical" layout="fixed" withTableBorder>
            <Table.Tbody>
                {data?.map((item, idx) => (
                    <Table.Tr key={idx}>
                        <Table.Th colSpan={1}>{item.title}</Table.Th>
                        <Table.Td colSpan={2}>{item.content}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    )
}
