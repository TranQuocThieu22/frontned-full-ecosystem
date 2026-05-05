import { ActivityPlan } from "@/interfaces/activityPlan";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { Group } from "@mantine/core";
import { MRT_TableInstance } from "mantine-react-table";
import { useCanEditActivityPlanList } from "@/hooks/useActivityPlanPermissions";
import ExtracurricularPlanRegisterDeleteListButton from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/ExtracurricularPlanRegister/Delete/ExtracurricularPlanRegisterDeleteListButton";
import ExtracurricularPlanRegisterExport from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/ExtracurricularPlanRegister/ImportExport/ExtracurricularPlanRegisterExport";
import ExtracurricularPlanRegisterImport from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/ExtracurricularPlanRegister/ImportExport/ExtracurricularPlanRegisterImport";

interface ExtracurricularPlanToolbarProps {
    table: MRT_TableInstance<ActivityPlan>;
    data: ActivityPlan[];
    isLoading: boolean;
    isRequiredHidden: boolean;
    onToggleRequiredHidden: (checked: boolean) => void;
}

export const ExtracurricularPlanToolbar = ({
    table,
    data,
    isLoading,
    isRequiredHidden,
    onToggleRequiredHidden,
}: ExtracurricularPlanToolbarProps) => {
    const selectedRows =
        table
            .getSelectedRowModel()
            .flatRows.filter((row) => !row.original.events)
            .map((item) => item.original) || [];

    const canEditList = useCanEditActivityPlanList(selectedRows);

    return (
        <Group>
            <ExtracurricularPlanRegisterImport />
            <ExtracurricularPlanRegisterExport table={table} data={data} />
            <ExtracurricularPlanRegisterDeleteListButton
                noPermission={!canEditList}
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
