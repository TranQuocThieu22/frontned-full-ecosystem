import QualityAssurancePlanExport from "@/features/admin/ModuleQualityAssurancePlan/QualityAssurancePlanExport";
import QualityAssurancePlanUpdateMultiple from "@/features/admin/ModuleQualityAssurancePlan/QualityAssurancePlanUpdateMultiple";
import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import QualityAssurancePlanCreateUpdate from "./QualityAssurancePlanCreateUpdate";
import QualityAssurancePlanDeleteList from "./QualityAssurancePlanDeleteList";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function QualityAssurancePlanTable() {
    const filterStore = useS_Shared_Filter();
    const taskDetailQuery = useCustomReactQuery({
        queryKey: ["QualityAssurancePlanTable_TaskDetail", filterStore.state.Phase?.id],
        axiosFn: async () => service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
            eaqPhaseId: filterStore.state.Phase?.id || 0,
            analysisType: analysisTypeEnum.Requirement
        }),
        options: {
            enabled: !!filterStore.state.Phase?.id
        }
    })

    const columns = useMemo<CustomColumnDef<ITaskDetailAnalysis>[]>(() => [
        { header: "Mã tiêu chuẩn", accessorKey: "eaqAnalysis.eaqRequirement.eaqCriteria.eaqStandard.code" },
        { header: "Mã tiêu chí", accessorKey: "eaqAnalysis.eaqRequirement.eaqCriteria.code" },
        { header: "Mã yêu cầu", accessorKey: "eaqAnalysis.eaqRequirement.code" },
        { header: "Tên yêu cầu", accessorKey: "eaqAnalysis.eaqRequirement.name", size: 300 },
        { header: "Mã công việc", accessorKey: "code" },
        { header: "Tên công việc", accessorKey: "name", size: 250 },
        {
            header: "Minh chứng dự kiến",
            accessorKey: "taskDetailEvidenceCodes",
            size: 500,
            accessorFn: (row) => row.eaqTaskDetailEvidences?.map(item => `${item.code} - ${item.name}`),
            type: 'list',
        },
        // { header: "Tên minh chứng dự kiến", accessorKey: "taskDetailEvidenceNames", size: 250 },
        { header: "Đơn vị chủ trì", accessorKey: "hostUnit.name" },
        { header: "Đơn vị phối hợp", accessorKey: "supportUnit", size: 200 },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);


    return (
        <CustomFieldset title="Danh sách nội dung phân tích yêu cầu">
            <CustomDataTable
                isLoading={taskDetailQuery.isLoading}
                isError={taskDetailQuery.isError}
                columns={columns}
                data={taskDetailQuery.data || []}
                enableRowSelection
                enableColumnFilters
                enableRowNumbers
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <QualityAssurancePlanUpdateMultiple />
                        <QualityAssurancePlanExport table={table} />
                        <QualityAssurancePlanDeleteList table={table || ''} />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <QualityAssurancePlanCreateUpdate
                            data={row.original}
                        />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    );
}
