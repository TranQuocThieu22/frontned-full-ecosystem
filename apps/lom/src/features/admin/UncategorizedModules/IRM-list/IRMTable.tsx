import { COEIRMService } from "@/api/services/COEIRMService";
import IRMViewCreateUpdate from "@/features/admin/UncategorizedModules/IRM-list/IRMViewCreateUpdate";
import { COEIRM } from "@/interfaces/shared-interfaces/COEIRM";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";

export default function IRMTable() {

    const IRMListQuery = useCustomReactQuery({
        queryKey: ["IRMs"],
        axiosFn: () => COEIRMService.getAll(),
    })

    const columns = useMemo<CustomColumnDef<COEIRM>[]>(() => [
        {
            header: "Mã thang đo",
            accessorKey: "code",
            importFieldProps: {
                isRequired: true,
                isUnique: true
            }
        },
        {
            header: "Tên thang đo",
            accessorKey: "name",
            importFieldProps: {
                isRequired: true
            }
        },
        {
            header: "I",
            accessorKey: "i",
            size: 100,
            importFieldProps: {
                isRequired: true,
                parseType: 'number'
            }
        },
        {
            header: "R",
            accessorKey: "r",
            size: 100,
            importFieldProps: {
                isRequired: true,
                parseType: 'number'
            }
        },
        {
            header: "M",
            accessorKey: "m",
            size: 100,
            importFieldProps: {
                isRequired: true,
                parseType: 'number'
            }
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            importFieldProps: {}
        },
    ], []);


    return <>
        <CustomDataTableAPI
            enableRowSelection
            query={IRMListQuery}
            columns={columns}
            deleteFn={(id) => COEIRMService.delete(id)}
            deleteListFn={(ids) => COEIRMService.deleteListIds(ids)}
            exportProps={{
                fileName: "Danh sách thang đo IRM"
            }}
            buttonImportProps={{
                fileName: "Mẫu import thang đo IRM",
                onSubmit: (values) => COEIRMService.createList(values),
            }}
            renderRowActions={({ row }) => {
                return <>
                    <IRMViewCreateUpdate readOnly data={row.original} />
                    <IRMViewCreateUpdate data={row.original} />
                </>
            }}
            renderTopToolbarCustomActions={() => {
                return <>
                    <IRMViewCreateUpdate />
                </>
            }}
        />
    </>
};
