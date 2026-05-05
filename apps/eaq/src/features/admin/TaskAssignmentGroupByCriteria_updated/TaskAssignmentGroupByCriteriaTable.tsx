"use client";
import { ITask } from "@/shared/interfaces/task/ITask";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import TaskAssignmentGroupByCriteriaUpdate from "./TaskAssignmentGroupByCriteriaUpdate";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";


export default function TaskAssignmentGroupByCriteriaTable() {
    const store = useS_Shared_Filter();
    const permissionStore = usePermissionStore();

    const queryGetTaskByStandardId_GetAll = useCustomReactQuery({
        queryKey: ["queryGetTaskByStandardId_GetAll", store.state.Phase?.id],
        axiosFn: () => service_EAQEvaluationPlan.GetEAQTasksByEAQPhaseId({
            eaqPhaseId: store.state.Phase?.id,
        })
    })

    const columns = useMemo<MRT_ColumnDef<ITask>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Mã Kế hoạch TDG",
                accessorFn: row => row.eaqEvaluationPlan?.code ?? ''

            },
            {
                id: "trainingProgram",
                header: "Chương trình đào tạo",
                accessorFn: row => row.eaqEvaluationPlan?.eaqPhase?.eaqStandardSetTrainingProgram?.code ?? ''
            },
            {
                accessorKey: "phaseCode",
                header: "Giai đoạn", size: 200,
                accessorFn: row => row.eaqEvaluationPlan?.eaqPhase?.code ?? ''
            },
            {
                id: "groupCode",
                header: "Mã Nhóm Công tác",
                accessorFn: row => row.eaqCouncilGroup?.code ?? ''
            },
            {
                id: "groupName",
                header: "Tên nhóm",
                accessorFn: row => row.eaqCouncilGroup?.name ?? ''
            },
            {
                id: "standardCode",
                header: "Mã Tiêu chuẩn phụ trách",
                accessorFn: row => row.eaqStandard?.code ?? ''
            },
            {
                id: "standardName",
                header: "Tên Tiêu chuẩn phụ trách",
                accessorFn: row => row.eaqStandard?.name ?? ''
            },
            {
                accessorKey: "startDate",
                header: "Ngày bắt đầu",
                accessorFn: row => row.startDate ? dateUtils.toDDMMYYYY(row.startDate) : "",

            },
            {
                accessorKey: "endDate",
                header: "Ngày kết thúc",
                accessorFn: row => row.endDate ? dateUtils.toDDMMYYYY(row.endDate) : "",

            },
            {
                accessorKey: "note",
                header: "Ghi chú",
                size: 300
            },
        ],
        []
    );

    return (
        <CustomFieldset title="Danh sách phân công tiêu chuẩn">
            <CustomDataTable
                isLoading={queryGetTaskByStandardId_GetAll.isLoading}
                isError={queryGetTaskByStandardId_GetAll.isError}
                enableRowSelection
                columns={columns}
                data={queryGetTaskByStandardId_GetAll.data || []}
                displayColumnDefOptions={{
                    "mrt-row-actions": {
                        header: "Phân công nhiệm vụ",
                        size: 180,
                    },
                    "mrt-row-numbers": {
                        Header: "STT",
                        size: 1
                    }
                }}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <TaskAssignmentGroupByCriteriaUpdate
                            readOnly={!permissionStore.state.currentPermissionPage?.isUpdate}
                            task={row.original}
                            loading={queryGetTaskByStandardId_GetAll.isFetching}
                        />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    );
}
