"use client";
import { ActionIcon, Flex, Group, Tooltip } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import { service_COEProgram } from "@/api/services/service_COEProgram";
import { canDeletePLODelegate, canExportPLODelegate, canImportPLODelegate, canUpdatePLODelegate } from "@/features/auth/PageAuthorization/PLO-delegate.auth";
import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { notifications } from "@mantine/notifications";
import { IconArrowBackUp, IconUserMinus } from "@tabler/icons-react";
import ProgramDelegateDeleteListButton from "./program-delegate-delete-list-button";
import ProgramDelegateExportButton from "./program-delegate-export-button";
import ProgramDelegateImportButton from "./program-delegate-import-button";
import DelegatedLecturerModal from "./program-delegate-personel-modal";
import ProgramDelegateSaveButton from "./program-delegate-save-button";

export default function ProgramDelegateTable() {
    const [pendingChanges, setPendingChanges] = useState<Record<string, Account | null>>({});

    const authenticateStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const programQuery = useCustomReactQuery({
        queryKey: ["Programs"],
        axiosFn: () => service_COEProgram.getAll({
            cols: ["Department", "User"]
        }),
        options: {
            refetchOnWindowFocus: false,
        }
    });

    // Tạo map các program phục vụ render khi chọn/xóa user cho chương trình 
    const originalProgramMap = useMemo(() => {
        const map: Record<string, COEProgram> = {};

        (programQuery.data ?? []).forEach(row => {
            map[String(row.id)] = row;
        });

        return map;
    }, [programQuery.data]);

    const handlePersonelSelect = (rowData: COEProgram, selectedPersonel: Account) => {
        const programId = String(rowData.id);
        if (pendingChanges[programId]?.id === selectedPersonel.id) return;

        setPendingChanges(prev => ({
            ...prev,
            [programId]: selectedPersonel
        }));

        notifications.clean();
        notifications.show({
            title: 'Đã chọn nhân sự',
            message: `Đã chọn ${selectedPersonel.fullName} cho chương trình ${rowData?.code}. Nhấn "Lưu" để xác nhận.`,
            color: 'green',
            autoClose: 3000,
        });
    };

    const handlePersonelRemove = (rowData: COEProgram) => {
        const programId = String(rowData.id);
        const originalRow = originalProgramMap[programId];
        const originalUser = originalRow?.user;
        const pendingUser = pendingChanges[programId];

        setPendingChanges(prev => {
            const clone = { ...prev };

            // Nếu Ban đầu không có user, trở về trạng thái ban đầu
            if (!originalUser && pendingUser) {
                delete clone[programId];
                return clone;
            }

            // Nếu ban đầu có user A, pending đang là user B (khác A), trở về trạng thái ban đầu
            if (originalUser && pendingUser && pendingUser.id !== originalUser.id) {
                delete clone[programId];
                return clone;
            }

            // Nếu ban đầu có user A, hiện đang pending null, trở về trạng thái ban đầu
            if (originalUser && pendingUser === null) {
                delete clone[programId];
                return clone;
            }

            clone[programId] = null;
            return clone;
        });

        notifications.show({
            title: "Đã cập nhật nhân sự",
            message: `Nhấn "Lưu" để xác nhận thay đổi cho chương trình ${rowData.code}.`,
            color: "orange",
            autoClose: 3000,
        });
    };

    const processedProgramData = useMemo(() => {
        return programQuery.data?.map(row => {
            const key = String(row.id);

            // Nếu row này không có pending thì giữ nguyên
            if (!(key in pendingChanges)) {
                return row;
            }

            const pendingUser = pendingChanges[String(row.id)];

            return {
                ...row,
                user: pendingUser,
                userId: pendingUser?.id
            } as COEProgram;
        }) ?? [];
    }, [programQuery.data, pendingChanges]);

    const programColumns = useMemo<MRT_ColumnDef<COEProgram>[]>(() => [
        { header: "Mã chương trình", accessorKey: "code" },
        { header: "Tên chương trình", accessorKey: "name" },
        { header: "Khoa quản lý", accessorKey: "department.name" },
        {
            header: "Mã viên chức phụ trách", accessorKey: "user.code",
            Cell: ({ row }) => {
                const rowId = String(row.original.id);
                const pendingUser = pendingChanges?.[rowId]
                const isPending = rowId in pendingChanges;
                const isAdded = isPending && pendingUser != null;
                const isRemoved = isPending && pendingUser == null;
                const isNotEmpty = row.original.user?.code != null;

                return (
                    <Flex justify="space-between" align="center" gap="xs">
                        <span style={{
                            flex: 1,
                            color: isNotEmpty ? 'inherit' : '#868e96'
                        }}>
                            {row.original.user?.code ?? "(Chưa chọn)"}
                        </span>
                        {canUpdatePLODelegate(authenticateStore, userPermissionStore) && (<Flex gap="xs">
                            {(isAdded || isRemoved) && (
                                <Tooltip label={
                                    isRemoved
                                        ? "Khôi phục nhân sự ban đầu"
                                        : "Xóa nhân sự phụ trách vừa thêm"
                                }>
                                    <ActionIcon
                                        color="red"
                                        size="md"
                                        my="2"
                                        onClick={() => handlePersonelRemove(row.original)}
                                    >
                                        {
                                            isRemoved
                                                ? <IconArrowBackUp />
                                                : <IconUserMinus />
                                        }
                                    </ActionIcon >
                                </Tooltip>
                            )}
                            <Tooltip label="Chọn nhân sự phụ trách">
                                <DelegatedLecturerModal
                                    data={row.original}
                                    onSelect={(selectedPersonel) => handlePersonelSelect(row.original, selectedPersonel)}
                                    onRemove={() => handlePersonelRemove(row.original)}
                                />
                            </Tooltip>
                        </Flex>)
                        }
                    </Flex >
                );
            },
        },
        {
            header: "Họ tên viên chức phụ trách", accessorKey: "user.fullName",
            Cell: ({ row }) => {
                const isNotEmpty = row.original.user?.fullName != null;

                return (
                    <Flex justify="space-between" align="center" gap="xs">
                        <span style={{
                            flex: 1,
                            color: isNotEmpty ? 'inherit' : '#868e96'
                        }}>
                            {row.original.user?.fullName ?? "(Chưa chọn)"}
                        </span>
                    </Flex>
                );
            },
        },
    ], [pendingChanges]);

    return (
        <>
            <CustomDataTable
                isLoading={programQuery.isLoading}
                isError={programQuery.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={programColumns}
                data={processedProgramData}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        {
                            canUpdatePLODelegate(authenticateStore, userPermissionStore) &&
                            <ProgramDelegateSaveButton
                                loading={programQuery.isLoading}
                                processedData={processedProgramData}
                                pendingChanges={pendingChanges}
                                clearPendingChanges={async () => {
                                    // Refetch the menuData to get updated values
                                    await programQuery.refetch();

                                    // Clear pending changes
                                    setPendingChanges({});
                                }} />}
                        {
                            canImportPLODelegate(authenticateStore, userPermissionStore) &&
                            <ProgramDelegateImportButton
                                table={table}
                                loading={programQuery.isLoading}
                                setPendingChanges={setPendingChanges}
                            />
                        }
                        {
                            canExportPLODelegate(authenticateStore, userPermissionStore) &&
                            <ProgramDelegateExportButton
                                table={table}
                                loading={programQuery.isLoading}
                            />
                        }
                        {
                            canDeletePLODelegate(authenticateStore, userPermissionStore) &&
                            <ProgramDelegateDeleteListButton
                                table={table}
                                loading={programQuery.isLoading}
                                setPendingChanges={setPendingChanges}
                            />
                        }
                    </Group>
                )}
            />
        </>
    );
}

