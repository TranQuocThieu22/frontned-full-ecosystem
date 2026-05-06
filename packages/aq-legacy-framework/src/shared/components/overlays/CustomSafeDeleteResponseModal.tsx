import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal";
import { Group, Highlight, Pagination, Table, Text } from "@mantine/core";
import { useState } from "react";
import { ConstraintCheckingResponse } from "@aq-fe/aq-legacy-framework/shared/interfaces/SafeDeleteResponse/ConstraintCheckingResponse";
import { textUtils } from "../../utils/textUtils";

export interface CustomSafeDeleteResultModalProps {
    disclosure: [boolean, { open: () => void; close: () => void; toggle: () => void }];
    /** Số lượng bản ghi đã xóa thành công */
    successCount: number;
    /** Danh sách các bản ghi bị chặn do ràng buộc */
    blockedList: ConstraintCheckingResponse[];
    /** Callback xử lý khi đóng modal (ví dụ: invalidateQueries) */
    onConfirm?: () => void;
}

/**
 * Component hiển thị kết quả sau khi thực hiện hành động Safe Delete (Xóa an toàn).
 */
export function CustomSafeDeleteResponseModal({
    disclosure,
    successCount,
    blockedList,
    onConfirm
}: CustomSafeDeleteResultModalProps) {
    const [activePage, setActivePage] = useState(1);

    function handleConfirm() {
        disclosure[1].close();
        setActivePage(1);
        if (onConfirm) onConfirm();
    }

    return (
        <CustomModal
            disclosure={disclosure}
            title="Kết quả xóa dữ liệu"
            description="Một số dữ liệu không thể xóa do ràng buộc dữ liệu"
            size="xl"
        >
            <CustomFlexColumn gap={12}>
                {successCount > 0 && (
                    <Highlight
                        highlight={String(successCount)}
                        color="black"
                        highlightStyles={{
                            fontWeight: 700,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                        p="sm"
                        style={{
                            backgroundColor: 'var(--mantine-color-green-0)',
                            borderLeft: '4px solid var(--mantine-color-green-6)',
                            borderRadius: '4px',
                        }}
                    >
                        {`Đã xóa thành công: ${String(successCount)} dữ liệu`}
                    </Highlight>
                )}

                {blockedList.length > 0 && (
                    <>
                        <Table withTableBorder withColumnBorders striped highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th w={60} style={{ textAlign: "center" }}>STT</Table.Th>
                                    <Table.Th>Chi tiết lỗi ràng buộc</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {blockedList.slice((activePage - 1) * 10, activePage * 10).map((item, index) => {
                                    return (
                                        <Table.Tr key={index}>
                                            <Table.Td align="center">
                                                <Text fw={500} size="sm" c="dimmed">
                                                    {(activePage - 1) * 10 + index + 1}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm">
                                                    Dữ liệu{" "}
                                                    <Text span fw={800} c="dark">
                                                        {textUtils.formatRecordNameResponse(item.code, item.name)}
                                                    </Text>{" "}
                                                    đang có{" "}
                                                    <Text span fw={700} c="red.6">
                                                        {item.constraintCount}
                                                    </Text>{" "}
                                                    liên kết dữ liệu khác.
                                                </Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    );
                                })}
                            </Table.Tbody>
                        </Table>
                    </>
                )}

                <Group justify={blockedList.length > 10 ? "space-between" : "flex-end"} >
                    {blockedList.length > 10 && (
                        <Pagination
                            total={Math.ceil(blockedList.length / 10)}
                            value={activePage}
                            onChange={setActivePage}
                            size="sm"
                            radius="sm"
                            variant="subtle"
                            boundaries={2}
                            siblings={2}
                            gap={3}
                            styles={{
                                control: {
                                    border: "none"
                                },
                            }}
                        />
                    )}
                    <CustomButton actionType="cancel" onClick={handleConfirm}>
                        Đã hiểu
                    </CustomButton>
                </Group>
            </CustomFlexColumn>
        </CustomModal>
    );
}
