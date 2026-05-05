"use client";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateEducationRegulation, canDeleteEducationRegulation, canUpdateEducationRegulation } from "@/features/auth/PageAuthorization/governing-education-regulation.auth";
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
import F_EducationRegulationCreate from "./F_EducationRegulationCreate";
import F_EducationRegulationDelete from "./F_EducationRegulationDelete";
import F_EducationRegulationUpdate from "./F_EducationRegulationUpdate";

export interface I_EducationRegulation {
    nameEg?: string,
    regulationId?: number | null,
    note?: string,
    regulation?: I_EducationRegulation | null,
    id?: number,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: boolean,
    // nguoiCapNhat?: string;
    // ngayCapNhat?: Date | undefined;
}

export default function F_EducationRegulationTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const AllRegulation = useQuery<I_EducationRegulation[]>({
        queryKey: ["F_j9ul1u9c2n_Read"],
        queryFn: async () => {
            const result = await baseAxios.get<{ data: I_EducationRegulation[] }>('/COERegulation/GetAll?cols=Regulation');
            return result.data?.data || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_EducationRegulation>[]>(() => [
        { header: "Mã quy chế", accessorKey: "code" },
        { header: "Tên quy chế", accessorKey: "name" },
        {
            header: "Trực thuộc",
            accessorFn: (originalRow) => originalRow.regulation ? originalRow.regulation.name : "",
        },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);

    if (AllRegulation.isLoading) return "Loading...";

    return (
        <CustomFlexColumn>
            <MyDataTable
                columns={columns}
                data={AllRegulation.data || []}
                enableRowSelection={true}
                renderTopToolbarCustomActions={() => (
                    <>
                        <Group>
                            {canCreateEducationRegulation(userStore, userPermissionStore) && <F_EducationRegulationCreate />}
                            <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataRegulation()} />
                        </Group>
                    </>
                )}

                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        {canUpdateEducationRegulation(userStore, userPermissionStore) && <F_EducationRegulationUpdate values={row.original} />}
                        {canDeleteEducationRegulation(userStore, userPermissionStore) && <F_EducationRegulationDelete values={row.original} />}
                    </CustomCenterFull>
                )}
            />
        </CustomFlexColumn>
    );
}
