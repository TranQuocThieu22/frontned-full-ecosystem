"use client";

import {
    Button,
    Group,
    Modal,
    ModalProps,
    Table
} from "@mantine/core";

export interface RowDetail {
    values: Record<string, string>;
    error?: string;
}

export interface ValidationResult {
    result: string;
    count: number;
    detail?: string;
    rows?: RowDetail[];
}

interface Props extends Omit<ModalProps, "onSubmit"> {
    data: ValidationResult[];
    onExecute: () => void;
    onBack: () => void;
    onCloseAll: () => void;
    onOpenDetail: (rows: RowDetail[]) => void;
}

export default function FileImportValidationModal({
    data,
    onExecute,
    onBack,
    onCloseAll,
    onOpenDetail,
    ...modalProps
}: Props) {
    return (
        <Modal {...modalProps} title="Kết quả kiểm tra">
            <Table withTableBorder striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Kết quả</Table.Th>
                        <Table.Th>Số lượng</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map((item, i) => (
                        <Table.Tr key={i}>
                            <Table.Td>{item.result}</Table.Td>
                            <Table.Td>{item.count}</Table.Td>
                            <Table.Td>
                                {item.rows && item.rows.length > 0 && (
                                    <Button variant="light" onClick={() => onOpenDetail(item.rows!)}>
                                        Xem chi tiết
                                    </Button>
                                )}
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Group justify="space-between" mt="md">
                <Button variant="default" onClick={onBack}>
                    Quay lại
                </Button>
                <Button onClick={onExecute}>Thực hiện import</Button>
            </Group>
        </Modal>
    );
}