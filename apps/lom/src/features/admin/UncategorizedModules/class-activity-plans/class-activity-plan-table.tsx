'use client'
import { ClassActivityPlanService } from "@/api/services/ClassActivityPlanService";
import { canCreateClassActivityPlanData, canDeleteClassActivityPlanData, canExportClassActivityPlanData, canUpdateClassActivityPlanData } from "@/features/auth/PageAuthorization/class-activity-plan-data.auth";
import { ClassActivityPlan } from "@/interfaces/shared-interfaces/ClassActivityPlan";
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ClassActivityPlanCreateButton from "./class-activity-plan-create-button";
import ClassActivityPlanDeleteButton from "./class-activity-plan-delete-button";
import ClassActivityPlanDeleteListButton from "./class-activity-plan-delete-list-button";
import ClassActivityPlanExportButton from "./class-activity-plan-export-button";
import ClassActivityPlanSyncButton from "./class-activity-plan-sync-button";

export default function ClassActivityPlanTable() {
    const authenticateStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const activityPlanStore = useS_Shared_ActivityPlan().state;

    const classActivityPlanQuery = useCustomReactQuery({
        queryKey: ["ClassActivityPlans", activityPlanStore.ActivityPlan?.id],
        axiosFn: () => ClassActivityPlanService.getByActivityPlan({
            activityPlanId: activityPlanStore.ActivityPlan?.id
        }),
        options: {
            refetchOnWindowFocus: false
        }
    })

    const columns = useMemo<MRT_ColumnDef<ClassActivityPlan>[]>(() => [
        { header: "Mã lớp", accessorKey: "class.code" },
        { header: "Tên lớp", accessorKey: "class.name" },
        { header: "Mã khóa", accessorKey: "class.coeGrade.code" },
        { header: "Mã chương trình", accessorKey: "class.coeGrade.coeProgram.code" },
        { header: "Mã bậc hệ", accessorKey: "class.coeGrade.coeDegreeLevelCode" },
        { header: "Năm học - Học kỳ vào", accessorKey: "class.coeGrade.activityPlanStart.name" },
        { header: "Năm học - Học kỳ ra", accessorKey: "class.coeGrade.activityPlanEnd.name" },
        { header: "Sĩ số lớp", accessorKey: "studentCount" },
    ], []);

    const existingClassIds = useMemo(
        () => (classActivityPlanQuery.data || [])
            .map((item) => item.classId ?? item.class?.id)
            .filter((value): value is number => value !== undefined),
        [classActivityPlanQuery.data]
    );

    return (
        <CustomFlexColumn>
            <CustomFieldset title={`Danh sách lớp học kỳ`}>
                <CustomDataTable
                    isLoading={classActivityPlanQuery.isLoading}
                    isError={classActivityPlanQuery.isError}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return <Group>
                            {canCreateClassActivityPlanData(authenticateStore, userPermissionStore) && (
                                <ClassActivityPlanCreateButton
                                    activityPlanId={activityPlanStore.ActivityPlan?.id}
                                    loading={classActivityPlanQuery.isLoading}
                                    addedClassIds={existingClassIds}
                                />
                            )}
                            {canExportClassActivityPlanData(authenticateStore, userPermissionStore) && <ClassActivityPlanExportButton table={table} loading={classActivityPlanQuery.isLoading} />}
                            {canDeleteClassActivityPlanData(authenticateStore, userPermissionStore) && <ClassActivityPlanDeleteListButton table={table} loading={classActivityPlanQuery.isLoading} />}
                            {canUpdateClassActivityPlanData(authenticateStore, userPermissionStore) && <ClassActivityPlanSyncButton activityPlanCode={Number(activityPlanStore.ActivityPlan?.code)} loading={classActivityPlanQuery.isLoading} />}
                        </Group>
                    }}
                    columns={columns}
                    data={classActivityPlanQuery.data || []}
                    renderRowActions={({ row }) => (
                        <CustomCenterFull>
                            {canDeleteClassActivityPlanData(authenticateStore, userPermissionStore) && <ClassActivityPlanDeleteButton id={row.original.id} classCode={row.original?.class?.code} />}
                        </CustomCenterFull>
                    )}
                />
            </CustomFieldset>
        </CustomFlexColumn>
    );
}
