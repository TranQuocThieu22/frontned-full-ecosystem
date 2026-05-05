'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateEducationFormat, canDeleteEducationFormat, canUpdateEducationFormat } from "@/features/auth/PageAuthorization/education-format.auth";
import SyncDataEdusoftButton from "@/shared/components/SyncDataEdusoftButton";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_EducationFormatCreate from "./F_EducationFormatCreate";
import F_EducationFormatDelete from "./F_EducationFormatDelete";
import F_EducationFormatUpdate from "./F_EducationFormatUpdate";

export interface I_EducationFormatTable {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    note: string;
    updatedBy?: string;
    updatedAt?: Date | undefined;
}


export default function F_EducationFormatTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_EducationFormatTable[]>({
        queryKey: ["F_hahgkfzpul_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("/COETrainingSystem/GetAll");
            return result.data.data || [];
        }
    });
    const columns = useMemo<MRT_ColumnDef<I_EducationFormatTable>[]>(() => [
        { header: "Mã hệ", accessorKey: "code" },
        { header: "Tên hệ", accessorKey: "name" },
        { header: "Ghi chú", accessorKey: "note" },
        // { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.updatedAt!)),
        // },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <CustomFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                {canCreateEducationFormat(userStore, userPermissionStore) && <F_EducationFormatCreate />}
                                <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataSystem()} />
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={AllUserQuery.data || []}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            {canUpdateEducationFormat(userStore, userPermissionStore) &&
                                <F_EducationFormatUpdate values={row.original} />
                            }
                            {canDeleteEducationFormat(userStore, userPermissionStore) &&
                                <F_EducationFormatDelete values={row.original} />
                            }
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFlexColumn>
    );
}

// const data: I_4hi65qkj5n_Read[] = [
//     {
//         id: 1,
//         code: "CQ",
//         name: "Chính quy",
//         nameEg: "Offline",
//     },
//     {
//         id: 2,
//         code: "TX",
//         name: "Từ xa",
//         nameEg: "Online",

//     },
// ];