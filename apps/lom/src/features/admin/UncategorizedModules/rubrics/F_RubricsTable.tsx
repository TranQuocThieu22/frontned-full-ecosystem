'use client';

import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateRubricsData, canDeleteRubricsData, canUpdateRubricsData } from "@/features/auth/PageAuthorization/rubrics-data.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_RubricsCreate from "./F_RubricsCreate";
import F_RubricsDelete from "./F_RubricsDelete";
import F_RubricsUpdate from "./F_RubricsUpdate";


export interface I_RubricsTable {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    point: number;
    isStorage: boolean;
    note: string;
    order?: number | null;
    isFailed?: boolean | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_RubricsTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const COERubricsMethodQuery = useQuery<I_RubricsTable[]>({
        queryKey: ["F_fmc2n1ftq1_Read"],
        queryFn: async () => {
            const response = await baseAxios.get("/COERubricsMethod/GetAll");
            return response.data.data || [];
        },
    })

    const columns = useMemo<MRT_ColumnDef<I_RubricsTable>[]>(() => [
        { header: "Thứ tự", accessorKey: "order" },
        { header: "Xếp loại", accessorKey: "name" },
        { header: "Xếp loại tiếng Anh", accessorKey: "nameEg" },
        { header: "Điểm >=", accessorKey: "point" },
        {
            header: "Không đạt",
            accessorKey: "isFailed",
            accessorFn: (row) => {
                return (
                    <Checkbox checked={row.isFailed ?? false}
                        onChange={(event) => { }
                        }
                    />
                )
            },
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
        },
    ], []);

    if (COERubricsMethodQuery.isLoading) return "Loading...";
    if (COERubricsMethodQuery.isError) return "Loading...";

    return (
        <CustomFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        {canCreateRubricsData(userStore, userPermissionStore) && <F_RubricsCreate />}
                        {/* <PrototypeImportButton/>
                        <PrototypeExportButton/>
                        <PrototypeDeleteAllButton/> */}
                    </Group>
                )}
                columns={columns}
                data={COERubricsMethodQuery.data || []}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        {canUpdateRubricsData(userStore, userPermissionStore) && <F_RubricsUpdate data={row.original || {}} />}
                        {canDeleteRubricsData(userStore, userPermissionStore) && <F_RubricsDelete id={row.original.id!} />}
                    </CustomCenterFull>
                )}
            />
        </CustomFlexColumn>
    );
}

// const rankData: F_fmc2n1ftq1_Read[] = [
//     {
//         id: 1,
//         order: 1,
//         rank: "Xuất sắc",
//         englishRank: "",
//         point: 9,
//         notArchived: false,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 2,
//         order: 2,
//         rank: "Giỏi",
//         englishRank: "",
//         point: 8,
//         notArchived: false,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 3,
//         order: 3,
//         rank: "Khá",
//         englishRank: "",
//         point: 6.5,
//         notArchived: false,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 4,
//         order: 4,
//         rank: "Trung bình",
//         englishRank: "",
//         point: 4,
//         notArchived: false,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 5,
//         order: 5,
//         rank: "Không đạt",
//         englishRank: "",
//         point: 0,
//         notArchived: true,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     }
// ];