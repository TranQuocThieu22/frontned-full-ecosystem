'use client'
import { ClassActivityPlanService } from "@/api/services/ClassActivityPlanService";
import { ClassActivityPlan } from "@/interfaces/shared-interfaces/ClassActivityPlan";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface ClassActivityPlanDeleteListButtonProps {
    table: MRT_TableInstance<ClassActivityPlan>,
    loading: boolean
}

export default function ClassActivityPlanDeleteListButton({ table, loading }: ClassActivityPlanDeleteListButtonProps) {
    const selectedRows = table.getSelectedRowModel().flatRows.flatMap((row) => row.original);

    return (
        <CustomButtonDeleteList
            loading={loading}
            count={selectedRows.length}
            onSuccess={() => {
                table.resetRowSelection();
            }}
            onSubmit={async () => {
                return ClassActivityPlanService.deleteList(selectedRows);
            }}
        />
    )
}

