
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import CustomButtonModalSync from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync";
import { departmentLabel, departmenType } from "@aq-fe/core-ui/shared/consts/enum/departmentEnum";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import DepartmentDelete from "../view/departmentDelete";
import DepartmentDeleteList from "../view/departmentDeleteList";
import DepartmentTable from "../view/departmentTable";
import DepartmentCreateOrUpdateFeature from "./departmentCreateOrUpdateFeature";
import DepartmentExport from "./DepartmentExport";
import DepartmentImportButton from "./DepartmentImportButton";
export function DepartmentFeature({
    showSyncFromEdusoftButton = true
}: {
    showSyncFromEdusoftButton?: boolean
}) {
    const query = useCustomReactQuery({
        queryKey: ["UnitRead"],
        axiosFn: () => departmentService.getAll()
    })
    const columns = useMemo<CustomColumnDef<Department>[]>(() => [
        { header: "Mã đơn vị", accessorKey: "code" },
        {
            header: "Tên đơn vị",
            accessorKey: "name",
            size: columnSizeObject.name,
        },
        {
            header: "Loại đơn vị",
            accessorKey: "type",
            accessorFn: (row) => {
                return departmentLabel[row.type as departmenType]
            }
        },
        {
            header: "Trực thuộc",
            accessorKey: "unit.name",
        },
        {
            header: "Đơn vị ngoài trường",
            accessorKey: "isWorkingUnit",
            Cell: ({ row }) => (
                <CustomCenterFull>
                    <CustomThemeIconSquareCheck checked={!row.original.isWorkingUnit} />
                </CustomCenterFull>
            ),
        },
        {
            header: "Người cập nhật", accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật", accessorKey: "modifiedWhen",
            type: 'ddMMyyyy',
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "unitCode", header: "Mã đơn vị" },
            { fieldName: "unitName", header: "Tên đơn vị" },
            { fieldName: "type", header: "Loại đơn vị" },
            { fieldName: "affiliated", header: "Trực thuộc" },
        ],
    };
    return (
        <DepartmentTable
            columns={columns}
            isError={query.isError}
            isLoading={query.isLoading}
            unitData={query.data || []}
            exportConfig={exportConfig}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <DepartmentCreateOrUpdateFeature mode="create" />
                    {showSyncFromEdusoftButton && <CustomButtonModalSync axiosFn={() => AQDataSynchronizationService.AQDataAQDataUnit()} />}
                    <DepartmentImportButton />
                    <DepartmentExport data={table.getSelectedRowModel().flatRows.map(item => item.original)} />

                    <DepartmentDeleteList
                        values={table.getSelectedRowModel().flatRows.map(row => row.original)}
                        table={table} />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <DepartmentCreateOrUpdateFeature mode="update" data={row.original} />
                    <DepartmentDelete values={row.original} />
                </CustomCenterFull>
            )}
        />
    )
}
