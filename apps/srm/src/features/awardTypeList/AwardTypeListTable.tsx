'use client'
import { AwardTypeService } from "@/shared/APIs/awardTypeService";
import { SRMAwardType } from "@/shared/interfaces/SRMAwardType";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import { default as AwardTypeListCreateOrUpdate, default as AwardTypeListCreateOrUpdateButton } from "./AwardTypeListCreateOrUpdateButton";
import AwardTypeListDeleteButton from "./AwardTypeListDeleteButton";
import AwardTypeListDeleteListButton from "./AwardTypeListDeleteListButton";
import AwardTypeListExportButton from "./AwardTypeListExportButton";
import AwardTypeListImportButton from "./AwardTypeListImportButton";

export default function AwardTypeListTable() {

    const awardTypeQuery = useCustomReactQuery({
        queryKey: ['awardTypeQuery'],
        axiosFn: () => AwardTypeService.getAll({ cols: ['SRMAwardLevel'] }),
    });

    const awardTypeData = useMemo(() => {
        if (!awardTypeQuery.data) return [];

        return awardTypeQuery.data.map((item: any) => ({
            ...item,
            srmAwardLevelCode: item.srmAwardLevel?.code || "",
        }));
    }, [awardTypeQuery.data]);

    const columns = useMemo<CustomColumnDef<SRMAwardType>[]>(() => [
        {
            header: "Mã loại giải thưởng",
            accessorKey: "code",
            size: 160,
        },
        {
            header: "Tên loại giải thưởng",
            accessorKey: "name",
        },
        {
            header: "Mã cấp giải thưởng",
            accessorKey: "srmAwardLevelCode",
        },
        {
            header: "Thứ tự hiển thị",
            accessorKey: "order",
            size: 120,
        },
        {
            accessorKey: "isDeactivate",
            header: "Không sử dụng",
            type: "squareCheck"
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
        },
    ], []);



    return (
        <CustomFieldset title="Danh mục loại giải thưởng">
            <CustomDataTable
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={false}
                isLoading={awardTypeQuery.isLoading}
                isError={awardTypeQuery.isError}
                data={awardTypeData || []}
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <AwardTypeListCreateOrUpdateButton />
                        <AwardTypeListImportButton />
                        <AwardTypeListExportButton data={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)} />
                        <AwardTypeListDeleteListButton
                            values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
                            clearSelection={table.resetRowSelection}
                        />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <AwardTypeListCreateOrUpdate initValues={row.original} />
                        <AwardTypeListDeleteButton
                            id={row.original.id ?? 0}
                            code={row.original.code ?? ""}
                        />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    );
}
