import { areaService } from "@/shared/APIs/areaService";
import { SRMArea } from "@/shared/interfaces/SRMArea";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ResearchAreaListCreateOrUpdate from "./ResearchAreaListCreateOrUpdate";

export default function ResearchAreaListTable() {
    const areasQuery = useCustomReactQuery({
        queryKey: [
            "service_ResearchAreaQuery_GetAll",
        ],
        axiosFn: () =>
            areaService.getAll(),
        options: {

        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMArea>[]>(() => [
        {
            header: "Mã lĩnh vực",
            accessorKey: "code",
            importFieldProps: {
                isRequired: true,
                isUnique: true,
            },
        },
        {
            header: "Tên lĩnh vực",
            accessorKey: "name",
            importFieldProps: {
                isRequired: true,
            },
        },
        {
            header: "Mô tả",
            accessorKey: "note",
            importFieldProps: {},
        },
        {
            header: "Không sử dụng",
            accessorKey: "isDeactivate",
            type: 'squareCheck',
            importFieldProps: {
                parseType: "boolean"
            },
        },

    ], []);

    return (
        <>
            <CustomDataTableAPI
                isLoading={areasQuery.isLoading}
                isError={areasQuery.isError}
                columns={columns}
                enableRowSelection
                query={areasQuery}
                exportProps={{
                    fileName: "Danh sách lĩnh vực",
                }}
                deleteListFn={areaService.deleteListIds}
                deleteFn={areaService.delete}
                buttonImportProps={{
                    buttonProps: {
                        loading: areasQuery.isLoading,
                    },
                    fileName: "Mẫu import lĩnh vực",
                    onSubmit: (data) => {
                        return areaService.createOrUpdateList(data);
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <ResearchAreaListCreateOrUpdate />
                        </>
                    )
                }}
                renderRowActions={({ row }) => (
                    <>
                        <ResearchAreaListCreateOrUpdate data={row.original} />
                    </>
                )}
            />
        </>
    )
}
