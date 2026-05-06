import { Table } from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

export interface CustomInfoRow {
    label: string;
    value: any;
}

type CustomSyncDataTableProps = {
    customInfoRows?: CustomInfoRow[];
} & Omit<ComponentPropsWithoutRef<typeof Table>, "children">;

export default function CustomSyncDataTable({ customInfoRows, ...rest }: CustomSyncDataTableProps) {
    return (
        <Table {...rest} fz={15} verticalSpacing="sm" striped highlightOnHover withTableBorder>
            <Table.Tbody>
                {customInfoRows?.map((row, index) => {
                    const hasValue = row.value !== undefined && row.value !== null && row.value !== "";
                    if (!hasValue) return null;
                    return (
                        <Table.Tr key={index}>
                            <Table.Td width="35%" fw={600} c="#4D5154">
                                {row.label}
                            </Table.Td>
                            <Table.Td>{row.value}</Table.Td>
                        </Table.Tr>
                    );
                })}
            </Table.Tbody>
        </Table>
    );
}