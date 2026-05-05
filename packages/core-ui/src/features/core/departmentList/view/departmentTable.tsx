import { CustomDataTable, CustomDataTableProps } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { MRT_ColumnDef } from "mantine-react-table";


interface IDepartmentRead extends Omit<CustomDataTableProps<Department>, "data"> {
    isLoading: boolean;
    isError: boolean;
    columns: MRT_ColumnDef<Department>[];
    unitData: Department[];
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
        <CustomFlexColumn>
            <CustomDataTable
                isLoading={isLoading}
                isError={isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={unitData || []}
                renderTopToolbarCustomActions={renderTopToolbarCustomActions}
                renderRowActions={renderRowActions}
            />
        </CustomFlexColumn>
    );
}

