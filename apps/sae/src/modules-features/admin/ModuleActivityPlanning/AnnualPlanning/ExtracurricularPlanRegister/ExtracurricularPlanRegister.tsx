"use client";

import { useState } from "react";
import { Event } from "@/interfaces/event";
import { service_activityPlan } from "@/api/services/service_activityPlan";
import { schoolCode } from "@/constants/object/schoolCode";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useActivityPlanColumns } from "@/hooks/useActivityPlanColumns";
import { useFilteredActivityPlans } from "@/hooks/useFilteredActivityPlans";
import {
    getDefaultTableInitialState,
    getRowId,
    getSubRows,
} from "@/utils/activityPlanTableConfig";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { ExtracurricularPlanRowActions } from "./ExtracurricularPlanRowActions";
import { ExtracurricularPlanToolbar } from "./ExtracurricularPlanToolbar";
import ExtracurricularPlanRegisterCreateUpdateModal from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/ExtracurricularPlanRegister/CreateUpdate/ExtracurricularPlanRegisterCreateUpdateModal";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { APP_CONFIG } from "@/shared/configs/appConfig";

export default function ExtracurricularPlanRegister() {
    const [isRequiredHidden, setIsRequiredHidden] = useState<boolean>(true);

    const futurePlanQuery = useCustomReactQuery({
        queryKey: ["ExternalFuturePlan"],
        axiosFn: () => service_activityPlan.getExternalFuturePlan({}),
    });

    // Custom column override for "Điều" column
    const standardCodeColumnOverride: CustomColumnDef<ActivityPlan> = {
        header: "Điều",
        accessorFn: (row) => {
            if (row.events) {
                return <ExtracurricularPlanRegisterCreateUpdateModal futurePlanId={row.id!} />;
            }
            return (
                <CustomCenterFull>
                    {(row as Event).standardCode}
                </CustomCenterFull>
            )
        },
    };

    const columns = useActivityPlanColumns({
        excludeColumns: APP_CONFIG.schoolCode === schoolCode.FTU ? ["reviewedName"] : [],
        customColumnOverrides: {
            standardCode: standardCodeColumnOverride,
        },
    });

    const filteredData = useFilteredActivityPlans({
        data: futurePlanQuery.data,
        hideRequired: isRequiredHidden,
    });

    return (
        <CustomDataTable
            initialState={{
                ...getDefaultTableInitialState(),
            }}
            enableColumnPinning
            isLoading={futurePlanQuery.isLoading}
            isError={futurePlanQuery.isError}
            enableRowSelection
            enableRowNumbers={false}
            enableExpanding={true}
            enableExpandAll={true}
            renderTopToolbarCustomActions={({ table }) => (
                <ExtracurricularPlanToolbar
                    table={table}
                    data={filteredData}
                    isLoading={futurePlanQuery.isFetching}
                    isRequiredHidden={isRequiredHidden}
                    onToggleRequiredHidden={setIsRequiredHidden}
                />
            )}
            columns={columns}
            data={filteredData}
            renderRowActions={({ row }) => (
                <ExtracurricularPlanRowActions
                    activityPlan={row.original}
                    isLoading={futurePlanQuery.isFetching}
                />
            )}
            getRowId={getRowId}
            getSubRows={getSubRows}
        />
    );
}
