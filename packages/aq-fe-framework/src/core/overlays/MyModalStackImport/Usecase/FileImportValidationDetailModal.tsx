"use client";
import { Modal, ModalProps, Table, Text } from "@mantine/core";
import { RowDetail } from "./FileImportValidationModal";

interface Props extends Omit<ModalProps, "children"> {
    data: RowDetail[];
}

export default function FileImportValidationDetailModal({
    data,
    ...props
}: Props) {
    if (!data || data.length === 0) {
        return (
            <Modal {...props} title="Chi tiết lỗi">
                <Text>Không có dữ liệu.</Text>
            </Modal>
        );
    }

    const columns = Object.keys(data[0].values || {});

    return (
        <Modal {...props} title="Chi tiết lỗi" size="70%" zIndex={1000}>
            <Table withTableBorder striped>
                <Table.Thead>
                    <Table.Tr>
                        {columns.map((col) => (
                            <Table.Th key={col}>{col}</Table.Th>
                        ))}
                        <Table.Th>Lỗi</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map((row, i) => (
                        <Table.Tr key={i}>
                            {columns.map((col) => (
                                <Table.Td key={col}>{row.values[col]}</Table.Td>
                            ))}
                            <Table.Td>{row.error ?? ""}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Modal>
    );
}
