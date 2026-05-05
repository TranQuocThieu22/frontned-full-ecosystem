
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomColumnDef, CustomDataTable, PaginationState } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomSearchInput, useCustomSearchInputState } from "@aq-fe/core-ui/shared/components/input/CustomSearchInput";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomButtonModalSync } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync";
import { DepartmentLabel, DepartmentType } from "@aq-fe/core-ui/shared/consts/enum/departmentEnum";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { Group } from "@mantine/core";
import { useMemo, useState } from "react";
import DepartmentDelete from "../view/departmentDelete";
import DepartmentDeleteList from "../view/departmentDeleteList";
import { DepartmentCreateOrUpdateFeature } from "./DepartmentCreateOrUpdateFeature";
import DepartmentExport from "./DepartmentExport";
import DepartmentImportButton from "./DepartmentImportButton";

export function DepartmentFeature() {
    const { searchInputState, debouncedSearch } = useCustomSearchInputState();

    const pagingState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 30,
    });

    const departmentQuery = useCustomReactQuery({
        queryKey: ["Departments", pagingState[0], debouncedSearch],
        axiosFn: () => departmentService.getAllDepartments({
            searchValue: debouncedSearch,
            pageNumber: pagingState[0].pageIndex + 1,
            pageSize: pagingState[0].pageSize
        }),
        options: {
            refetchOnWindowFocus: false,
        }
    });

    const departmentColumns = useMemo<CustomColumnDef<Department>[]>(() => [
        {
            header: "Mã đơn vị",
            accessorKey: "code"
        },
        {
            header: "Tên đơn vị",
            accessorKey: "name",
            size: columnSizeObject.name,
        },
        {
            header: "Loại đơn vị",
            accessorKey: "type",
            accessorFn: (row) => {
                return DepartmentLabel[row.type as DepartmentType]
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
        }
    ], []);

    return (
        <CustomFlexColumn>
            <CustomDataTable
                columns={departmentColumns}
                isError={departmentQuery.isError}
                isLoading={departmentQuery.isLoading}
                rowCount={departmentQuery.dataCount}
                manualPagination
                pagination={pagingState[0]}
                onPaginationChange={pagingState[1]}
                enableRowSelection={true}
                enableRowNumbers={true}
                data={departmentQuery.data ?? []}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <CustomSearchInput
                            value={searchInputState[0]}
                            onChange={(e) => searchInputState[1](e.currentTarget.value)}
                        />
                        <DepartmentCreateOrUpdateFeature mode="create" />
                        <CustomButtonModalSync axiosFn={() => AQDataSynchronizationService.AQDataAQDataUnit()} />
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
                        <DepartmentDelete value={row.original} />
                    </CustomCenterFull>
                )}
            />
        </CustomFlexColumn>
    )
}
