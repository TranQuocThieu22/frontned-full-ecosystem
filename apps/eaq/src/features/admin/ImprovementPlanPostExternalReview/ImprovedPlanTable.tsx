import ImprovedPlanExport from "@/features/admin/ImprovementPlanPostExternalReview/ImprovedPlanExport";
import ImprovedPlanUpdateMultiple from "@/features/admin/ImprovementPlanPostExternalReview/ImprovedPlanUpdateMultiple";
import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import ImprovedPlanButtonCreateUpdate from "./ImprovedPlanButtonCreateUpdate";
import ImprovedPlanButtonDeleteList from "./ImprovedPlanButtonDeleteList";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function ImprovedPlanTable() {
    const filterStore = useS_Shared_Filter();
    const taskDetailQuery = useCustomReactQuery({
        queryKey: ["taskDetailQuery", filterStore.state.Phase?.id],
        axiosFn: async () => service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
            eaqPhaseId: filterStore.state.Phase?.id || 0,
            analysisType: analysisTypeEnum.Limitation
        }),
        options: {
            enabled: !!filterStore.state.Phase?.id
        }
    })
    const processedData = useMemo(() => {
        return taskDetailQuery.data?.map(row => ({
            ...row,
        })) || [];
    }, [taskDetailQuery.data]);
    const columns = useMemo<CustomColumnDef<ITaskDetailAnalysis>[]>(() => [
        { header: "Mã tiêu chuẩn", accessorKey: "eaqAnalysis.eaqLimitation.eaqCriteria.eaqStandard.code" },
        { header: "Mã tiêu chí", accessorKey: "eaqAnalysis.eaqLimitation.eaqCriteria.code" },
        { header: "Mã hạn chế", accessorKey: "eaqAnalysis.eaqLimitation.code" },
        { header: "Tên hạn chế", accessorKey: "eaqAnalysis.eaqLimitation.name", size: 300 },
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
        <CustomFieldset title="Danh sách hạn chế">
            <CustomDataTable
                isLoading={taskDetailQuery.isLoading}
                isError={taskDetailQuery.isError}
                columns={columns}
                data={processedData || []}
                enableRowSelection
                enableColumnFilters
                enableRowNumbers
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <ImprovedPlanUpdateMultiple />
                        <ImprovedPlanExport table={table} />
                        <ImprovedPlanButtonDeleteList table={table || ''} />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <ImprovedPlanButtonCreateUpdate
                            data={row.original}
                        />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    );
}
