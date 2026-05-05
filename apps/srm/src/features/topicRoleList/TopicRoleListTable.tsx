'use client'

import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import TopicRoleListCreateUpdateModal from "./TopicRoleListCreateUpdateModal";
import TopicRoleListDelete from "./TopicRoleListDelete";
import TopicRoleListDeleteList from "./TopicRoleListDeleteList";
import TopicRoleListImportButton from "./TopicRoleListImportButton";

export default function TopicRoleListTable() {

    const query = useCustomReactQuery({
        queryKey: ['topicRoleList'],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.ResearchProject),
    });

    const columns = useMemo<MRT_ColumnDef<SRMTitle>[]>(() => [
        {
            header: "Mã vai trò",
            accessorKey: "code",
        },
        {
            header: "Tên vai trò",
            accessorKey: "name",
        },
        {
            header: "Không sử dụng",
            accessorKey: "isDeactivate",
            Cell: ({ row }) =>
                <CustomCenterFull>
                    <CustomThemeIconSquareCheck checked={row.original.isDeactivate} />
                </CustomCenterFull>,
        },
        {
            header: "Là chủ nhiệm",
            accessorKey: "isLeader",
            Cell: ({ row }) =>
                <CustomCenterFull>
                    <CustomThemeIconSquareCheck checked={row.original.isLeader} />
                </CustomCenterFull>,
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
        },
    ], [query.data]);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã vai trò" },
            { fieldName: "name", header: "Tên vai trò" },
            { fieldName: "isDeactivate", header: "Không sử dụng" },
            { fieldName: "isLeader", header: "Là chủ nhiệm" },
            { fieldName: "note", header: "Ghi chú" },
        ],
    };

    return (
        <CustomFieldset title="Danh mục vai trò thực hiện đề tài" >
            <CustomDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={query.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original) || [];

                    const isHavingLeader = table.getRowModel().flatRows.some((item) => item.original.isLeader);

                    return (
                        <>
                            <TopicRoleListCreateUpdateModal isHavingLeader={isHavingLeader} />
                            <TopicRoleListImportButton />
                            <AQButtonExportData
                                objectName="Danh sách vai trò thực hiện đề tài"
                                data={selectedRows.length > 0 ? selectedRows : query.data || []}
                                exportConfig={exportConfig}
                            />
                            <TopicRoleListDeleteList values={selectedRows} table={table} />
                        </>
                    )
                }}
                renderRowActions={({ row, table }) => {
                    const isHavingLeader = table.getRowModel().flatRows.some((item) => item.original.isLeader);

                    return (
                        <CustomCenterFull>
                            <TopicRoleListCreateUpdateModal
                                values={row.original}
                                isHavingLeader={isHavingLeader}
                            />
                            <TopicRoleListDelete
                                id={row.original.id || 0}
                                code={row.original.code}
                            />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    )
}
