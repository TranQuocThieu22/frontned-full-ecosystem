"use client";

import { service_activityPlan } from "@/api/services/service_activityPlan";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useActivityPlanColumns } from "@/hooks/useActivityPlanColumns";
import { useFilteredActivityPlans } from "@/hooks/useFilteredActivityPlans";
import {
  getDefaultTableInitialState,
  getRowId,
  getSubRows,
} from "@/utils/activityPlanTableConfig";
import { MRT_ColumnDef } from "mantine-react-table";
import { ActivityPlan } from "@/interfaces/activityPlan";
import PlanningApprovalViewModal from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/PlanningApproval/CreateUpdate/PlanningApprovalUpdateModal";
import ActivityButtonApprove from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/PlanningApproval/ActivityButtonApprove";

export default function PlanningApprovalTable() {
  const futurePlanQuery = useCustomReactQuery({
    queryKey: ["FuturePlan_WaitingForApproval"],
    axiosFn: () =>
      service_activityPlan.getExternalFuturePlan({
        standardId: 0,
        host: undefined,
        facultyId: undefined,
        searchText: "",
        startDate: undefined,
        endDate: undefined,
        pageNumber: 1,
        pageSize: 0,
      }),
  });

  // Additional column specific to this table
  const noteColumn: MRT_ColumnDef<ActivityPlan> = {
    header: "Nhận xét",
    accessorKey: "note",
    size: 400,
  };

  const columns = useActivityPlanColumns({
    additionalColumns: [noteColumn],
  });

  const filteredData = useFilteredActivityPlans({
    data: futurePlanQuery.data,
    hideRequired: true,
  });

  return (
    <CustomDataTable
      initialState={getDefaultTableInitialState()}
      enableColumnPinning
      isLoading={futurePlanQuery.isLoading}
      isError={futurePlanQuery.isError}
      enableRowSelection={false}
      enableRowNumbers={false}
      enableExpanding={true}
      enableExpandAll={true}
      columns={columns}
      data={filteredData}
      rowActionSize={300}
      renderRowActions={({ row }) => {
        if (row.original.events) return null;
        return (
          <CustomCenterFull>
            <PlanningApprovalViewModal
              values={row.original}
              futurePlanId={row.original.id!}
              loading={futurePlanQuery.isFetching}
            />
            <ActivityButtonApprove
              eventId={row.original.id || 0}
              approvalStatus={row.original.approvalStatus || 0}
              loading={futurePlanQuery.isFetching}
            />
          </CustomCenterFull>
        );
      }}
      getRowId={getRowId}
      getSubRows={getSubRows}
    />
  );
}
