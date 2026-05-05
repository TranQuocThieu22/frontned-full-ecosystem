'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateSubjectGroup, canDeleteSubjectGroup, canUpdateSubjectGroup } from "@/features/auth/PageAuthorization/subject-group.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_SubjectGroupCreate from "./F_SubjectGroupCreate";
import F_SubjectGroupDelete from "./F_SubjectGroupDelete";
import F_SubjectGroupUpdate from "./F_SubjectGroupUpdate";

export interface I_subject_group {
    id?: number; // STT
    code?: string; // Mã nhóm môn học
    name?: string; // Tên nhóm môn học
    note?: string; // Ghi chú
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_SubjectGrouTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const form = useForm<I_subject_group>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const query = useQuery<I_subject_group[]>({
        queryKey: ["F_zudcgcvda8_Read"],
        queryFn: async () => {
            const result = await baseAxios.get(`/COESubjectGroup/GetAll`);
            return result.data?.data || []
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_subject_group>[]>(() => [
        { header: "Mã nhóm môn học", accessorKey: "code" },
        { header: "Tên nhóm môn học", accessorKey: "name" },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã nhóm môn học" },
            { fieldName: "name", header: "Tên nhóm môn học" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <CustomFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            {canCreateSubjectGroup(userStore, userPermissionStore) && <F_SubjectGroupCreate />}
                            {/* <Button leftSection={<IconTablePlus />} color="green" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Import</Button>
                            <Button leftSection={<IconTableExport />} color="teal" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Export</Button>
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button> */}
                        </Group>
                    );
                }}
                columns={columns}
                data={query.data || []}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            {canUpdateSubjectGroup(userStore, userPermissionStore) && <F_SubjectGroupUpdate data={row.original} />}
                            {canDeleteSubjectGroup(userStore, userPermissionStore) && <F_SubjectGroupDelete values={row.original} />}
                        </CustomCenterFull>
                    );
                }}
            />
        </CustomFlexColumn>
    );
}
