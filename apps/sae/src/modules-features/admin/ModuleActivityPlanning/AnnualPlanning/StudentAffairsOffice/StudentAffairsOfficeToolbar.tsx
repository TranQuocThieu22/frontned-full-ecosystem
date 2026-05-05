import { ActivityPlan } from "@/interfaces/activityPlan";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { Group } from "@mantine/core";
import { MRT_TableInstance } from "mantine-react-table";
import StudentAffairsOfficeImport from "./ImportExport/StudentAffairsOfficeImport";
import StudentAffairsOfficeExport from "./ImportExport/StudentAffairsOfficeExport";
import ExtracurricularPlanInfoDeleteListButton from "./Delete/ExtracurricularPlanInfoDeleteListButton";

interface StudentAffairsOfficeToolbarProps {
    table: MRT_TableInstance<ActivityPlan>;
    data: ActivityPlan[];
    isLoading: boolean;
    isRequiredHidden: boolean;
    onToggleRequiredHidden: (checked: boolean) => void;
}

export const StudentAffairsOfficeToolbar = ({
    table,
    data,
    isLoading,
    isRequiredHidden,
    onToggleRequiredHidden,
}: StudentAffairsOfficeToolbarProps) => {
    const selectedRows =
        table
            .getSelectedRowModel()
            .flatRows.filter((row) => !row.original.events)
            .map((item) => item.original) || [];

    return (
        <Group>
            <StudentAffairsOfficeImport />
            <StudentAffairsOfficeExport table={table} data={data} />
            <ExtracurricularPlanInfoDeleteListButton
                values={selectedRows}
                loading={isLoading}
            />
            <CustomCheckbox
                checked={isRequiredHidden}
                label="Ẩn hoạt động bắt buộc"
                onChange={(e) => onToggleRequiredHidden(e.target.checked)}
            />
        </Group>
    );
};
