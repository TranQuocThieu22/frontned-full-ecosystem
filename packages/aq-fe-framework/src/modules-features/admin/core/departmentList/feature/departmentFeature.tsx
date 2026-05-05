
import { departmentService } from "@/APIs/departmentService";
import { MyCenterFull } from "@/components/CenterFull/MyCenterFull";
import { useMyReactQuery } from "@/hooks";
import { IDepartment } from "@/interfaces";
import { utils_date_dateToDDMMYYYString } from "@/utils/utils_date";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { CustomThemeIconSquareCheck } from "../../../../../core";
import DepartmentDelete from "../view/departmentDelete";
import DepartmentDeleteList from "../view/departmentDeleteList";
import DepartmentTable from "../view/departmentTable";
import DepartmentCreateOrUpdateFeature from "./departmentCreateOrUpdateFeature";
import DepartmentExport from "./DepartmentExport";
const type: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};

export function DepartmentFeature() {
    const query = useMyReactQuery({
        queryKey: ["UnitRead"],
        axiosFn: () => departmentService.getAll()
    })
    const columns = useMemo<MRT_ColumnDef<IDepartment>[]>(() => [
        { header: "Mã đơn vị", accessorKey: "code" },
        { header: "Tên đơn vị", accessorKey: "name" },
        {
            header: "Loại đơn vị",
            accessorKey: "type",
            accessorFn: (row) => {
                return type[row.type as number] || ""
            }
        },
        {
            header: "Trực thuộc", accessorKey: "unit.name",
            accessorFn: (row) => row.unit?.name || ""
        },
        {
            header: "Đơn vị ngoài trường", accessorKey: "isWorkingUnit",
            Cell: ({ row }) => (
                <MyCenterFull>
                    <CustomThemeIconSquareCheck checked={!row.original.isWorkingUnit} />
                </MyCenterFull>
            )
        },
        {
            header: "Người cập nhật", accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật", accessorKey: "modifiedWhen",
            accessorFn: row => row.modifiedWhen ? utils_date_dateToDDMMYYYString(new Date(row.modifiedWhen)) : "",
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
                    {/* <MyButton actionType="import" /> */}
                    <DepartmentExport data={table.getSelectedRowModel().flatRows.map(item => item.original)} />

                    <DepartmentDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <DepartmentCreateOrUpdateFeature mode="update" data={row.original} />
                    <DepartmentDelete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    )
}
