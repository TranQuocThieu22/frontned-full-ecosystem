import { conclusionService } from "@/shared/APIs/conclusionService";
import { SRMConclusionSet } from "@/shared/interfaces/SRMConclusionSet";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import ConclusionSetCreateOrUpdateButton from "./ConclusionSetCreateOrUpdateButton";
import ConclusionSetImportButton from "./ConclusionSetImportButton";


export default function ConclusionSetTable() {
    const conclusionSetQuery = useCustomReactQuery({
        queryKey: ['ConclusionSetList'],
        axiosFn: () => conclusionService.getAll({ cols: ["SRMConclusions"] }),
    })

    const columns = useMemo<CustomColumnDef<SRMConclusionSet>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã bộ kết luận",
        },
        {
            accessorKey: "name",
            header: "Tên bộ kết luận",
        },
        {
            accessorKey: "note",
            header: "Ghi chú",
            size: 300
        },
        {
            accessorKey: "isDeactivate",
            header: "Không sử dụng",
            type: "squareCheck"
        }
    ], []);
    return (
        <CustomFieldset title="Danh sách bộ kết luận" >
            <CustomDataTableAPI
                query={conclusionSetQuery}
                columns={columns}
                deleteFn={conclusionService.delete}
                deleteListFn={conclusionService.deleteListIds}
                exportProps={{
                    fileName: "Danh sách bộ kết luận"
                }}
                enableRowSelection
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <ConclusionSetCreateOrUpdateButton />
                            <ConclusionSetImportButton />
                        </>
                    )
                }}
                renderRowActions={({ row, table }) => {
                    return (
                        <>
                            <ConclusionSetCreateOrUpdateButton
                                conclusionSet={row.original}
                                loading={conclusionSetQuery.isFetching}
                            />
                        </>
                    )
                }}
            />
        </CustomFieldset>
    );
}
