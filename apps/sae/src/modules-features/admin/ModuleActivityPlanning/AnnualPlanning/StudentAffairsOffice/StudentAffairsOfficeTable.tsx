"use client";

import { service_activityPlan } from "@/api/services/service_activityPlan";
import { schoolCode } from "@/constants/object/schoolCode";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { Event } from "@/interfaces/event";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useEffect, useState } from "react";
import StudentAffairsOfficeActivityCreateUpdateModal from "./CreateUpdate/StudentAffairsOfficeActivityCreateUpdateModal";
import { useActivityPlanColumns } from "@/hooks/useActivityPlanColumns";
import { useFilteredActivityPlans } from "@/hooks/useFilteredActivityPlans";
import { StudentAffairsOfficeToolbar } from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/StudentAffairsOffice/StudentAffairsOfficeToolbar";
import { StudentAffairsOfficeRowActions } from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/StudentAffairsOffice/StudentAffairsOfficeRowActions";
import { APP_CONFIG } from "@/shared/configs/appConfig";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";

interface StudentAffairsOfficeTableProps {
  setFixedActivityPointRatio: (value: string) => void;
  standardId: string | null;
}

export default function StudentAffairsOfficeTable({
  standardId,
  setFixedActivityPointRatio,
}: StudentAffairsOfficeTableProps) {
  const [isRequiredHidden, setIsRequiredHidden] = useState<boolean>(true);
  const activityPlanStore = useS_Shared_ActivityPlan();
  const futurePlanQuery = useCustomReactQuery({
    queryKey: ["FuturePlan", standardId, activityPlanStore.state.ActivityPlan?.id],
    axiosFn: () =>
      service_activityPlan.getFuturePlan({
        activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
        standardId: standardId ? Number(standardId) : 0,
        host: undefined,
        facultyId: undefined,
        searchText: "",
        startDate: undefined,
        endDate: undefined,
        pageNumber: 1,
        pageSize: 0,
      }),
  });
  const StandardCodeColumnOverride: CustomColumnDef<ActivityPlan> = {
    header: "Điều",
    accessorFn: (row) => {
      if (row.events) {
        return <StudentAffairsOfficeActivityCreateUpdateModal futurePlanId={row.id!} />;
      }
      return (
        <CustomCenterFull>
          {(row as Event).standardCode}
        </CustomCenterFull>
      )
    }
  }
  const columns = useActivityPlanColumns({
    excludeColumns: APP_CONFIG.schoolCode === schoolCode.FTU ? ["reviewedName"] : [],
    customColumnOverrides: {
      standardCode: StandardCodeColumnOverride
    }
  })
  const filteredData = useFilteredActivityPlans({
    data: futurePlanQuery.data,
    hideRequired: isRequiredHidden
  })
  useEffect(() => {
    if (!isRequiredHidden && futurePlanQuery.data) return;

    let totalMinPoint = 0;
    let totalMaxPoint = 0;

    futurePlanQuery.data?.forEach((row) => {
      row.events?.forEach((event) => {
        totalMinPoint += event.minPoint || 0;
        totalMaxPoint += event.maxPoint || 0;
      });
    });

    setFixedActivityPointRatio(`${totalMinPoint}/${totalMaxPoint}`);
  }, [futurePlanQuery.data, isRequiredHidden]);

  return (
    <>
      <CustomDataTable
        initialState={{
          showColumnFilters: false,
          pagination: { pageIndex: 0, pageSize: 30 },
          sorting: [{ id: "standardCode", desc: false }],
          expanded: true,
        }}
        enableColumnPinning
        isError={futurePlanQuery.isError}
        isLoading={futurePlanQuery.isLoading}
        enableRowSelection
        enableRowNumbers={false}
        enableExpanding={true}
        enableExpandAll={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <StudentAffairsOfficeToolbar
              table={table}
              data={filteredData}
              isLoading={futurePlanQuery.isFetching}
              isRequiredHidden={isRequiredHidden}
              onToggleRequiredHidden={setIsRequiredHidden}
            />
          );
        }}
        columns={columns}
        data={filteredData}
        renderRowActions={({ row }) => {
          if (!row.original.events) {
            return (
              <StudentAffairsOfficeRowActions
                activityPlan={row.original}
                isLoading={futurePlanQuery.isFetching}
              />
            );
          }
        }}
        getRowId={(row, index, parent) => {
          if (row.events) {
            return `plan-${row.id}-planIndex-${index}`;
          }
          return `event-${row.id}-eventIndex-${index}-parent-${parent?.id ?? 'root'}`;
        }}
        getSubRows={(row) => (row.events as ActivityPlan[]) || []}
      />
    </>
  );
}
