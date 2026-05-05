'use client'
import { MyDataTable, MyDataTableProps } from "@/components/DataDisplay/DataTable/MyDataTable";
import { MyFlexColumn } from "@/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { IDepartment } from "../../../../../interfaces";


interface IDepartmentRead extends Omit<MyDataTableProps<IDepartment>, "data"> {
    isLoading: boolean;
    isError: boolean;
    columns: MRT_ColumnDef<IDepartment>[];
    unitData: IDepartment[];
    exportConfig: ExportConfig;
}

interface ExportConfig {
    fields: {
        fieldName: string;
        header: string;
    }[];
}

export default function DepartmentTable({
    isLoading,
    isError,
    columns,
    exportConfig,
    unitData,
    renderRowActions,
    renderTopToolbarCustomActions
}: IDepartmentRead) {
    return (
        <MyFlexColumn>
            <MyDataTable
                isLoading={isLoading}
                isError={isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={unitData || []}
                renderTopToolbarCustomActions={renderTopToolbarCustomActions}
                renderRowActions={renderRowActions}
            />
        </MyFlexColumn>
    );
}

