'use client'
import { levelService } from "@/shared/APIs/levelService";
import { SRMLevel } from "@/shared/interfaces/SRMLevel";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import TopicLevelListCreateOrUpdate from "./TopicLevelListCreateOrUpdate";

export default function TopicLevelListTable() {
    const topicLevelQuery = useCustomReactQuery({
        queryKey: ['topicLevels'],
        axiosFn: () => levelService.getAll()
    })
    const columns = useMemo<MRT_ColumnDef<SRMLevel>[]>(() => [
        {
            header: "Mã cấp đề tài",
            accessorKey: "code",
            importFieldProps: {
                isRequired: true,
                isUnique: true,
            },
        },
        {
            header: "Tên cấp đề tài",
            accessorKey: "name",
            importFieldProps: {
                isRequired: true,
            },
        },
        {
            header: "Không sử dụng",
            accessorKey: "isDeactivate",
            type: 'squareCheck',
            importFieldProps: {
                parseType: "boolean"
            },
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            importFieldProps: {},
        }
    ], [])

    return (
        <CustomFieldset
            title="Danh mục cấp đề tài"
        >
            <CustomDataTableAPI
                columns={columns}
                query={topicLevelQuery}
                isLoading={topicLevelQuery.isLoading}
                isError={topicLevelQuery.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                exportProps={{
                    fileName: "Danh sách cấp đề tài",
                }}
                deleteListFn={levelService.deleteListIds}
                deleteFn={levelService.delete}
                buttonImportProps={{
                    buttonProps: {
                        loading: topicLevelQuery.isLoading,
                    },
                    fileName: "Mẫu import cấp đề tài",
                    onSubmit: (data) => {
                        return levelService.createOrUpdateList(data);
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return <>
                        <TopicLevelListCreateOrUpdate />
                    </>
                }}
                renderRowActions={({ row }) => {
                    return <>
                        <TopicLevelListCreateOrUpdate initValues={row.original!} />
                    </>
                }}
            />
        </CustomFieldset>
    );
}
