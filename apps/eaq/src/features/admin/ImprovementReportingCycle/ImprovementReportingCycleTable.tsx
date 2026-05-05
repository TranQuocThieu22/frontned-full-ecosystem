import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import {
    limitationTypeEnumColor,
    limitationTypeEnumIcon,
    limitationTypeEnumLabel
} from "@/shared/constants/enum/LimitationTypeEnum";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import AssignReportDateButton from "./AssignReportDateButton";
import ImprovementReportingCycleExportButton from "./ImprovementReportingCycleExportButton";
import ImprovementReportingCycleUpdateButton from "./ImprovementReportingCycleUpdateButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";


export default function ImprovementReportingCycleTable() {
    const filterStore = useS_Shared_Filter();

    const queryTaskDetailAnalysis = useCustomReactQuery({
        queryKey: ["task_detail_analysis_report_cycle_list", filterStore.state.Phase?.id],
        axiosFn: () => service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
            eaqPhaseId: filterStore.state.Phase?.id,
            analysisType: analysisTypeEnum.Limitation
        })
    });


    const columns = useMemo<CustomColumnDef<ITaskDetailAnalysis>[]>(
        () => [
            {
                accessorKey: "criteriaCode",
                header: "Mã tiêu chí",
                accessorFn: (row) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code
            },
            {
                accessorKey: "criteriaName",
                header: "Tên tiêu chí",
                size: 500,
                accessorFn: (row) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.name
            },
            {
                accessorKey: "weaknessCode",
                header: "Mã hạn chế",
                accessorFn: (row) => row.eaqAnalysis?.eaqLimitation?.code
            },
            {
                accessorKey: "weakness",
                header: "Hạn chế",
                size: 500,
                accessorFn: (row) => row.eaqAnalysis?.eaqLimitation?.name
            },
            {
                accessorKey: "weaknessType",
                header: "Loại hạn chế",
                size: 400,
                accessorFn: (row) => <CustomEnumBadge
                    value={row.eaqAnalysis?.eaqLimitation?.limitationType}
                    enumLabel={limitationTypeEnumLabel}
                    enumColor={limitationTypeEnumColor}
                    enumIcon={limitationTypeEnumIcon}
                />
            },
            {
                accessorKey: "code",
                header: "Mã công việc"
            },
            {
                accessorKey: "name",
                header: "Tên công việc",
                size: 500
            },
            {
                accessorKey: "evidenceCode",
                header: "Mã minh chứng dự kiến",
                type: 'list',
                accessorFn: (row) => row.eaqTaskDetailEvidences?.map(item => `${item.code} - ${item.name}`),
                size: 1000
            },
            // {
            //     accessorKey: "evidenceName",
            //     header: "Tên minh chứng dự kiến",
            //     size: 500,
            //     type: 'list',
            //     accessorFn: (row) => row.eaqTaskDetailEvidences?.map(i => i.name)
            // },
            {
                accessorKey: "duration",
                header: "Thời hạn"
            },
            {
                accessorKey: "expectedResult",
                header: "Kết quả dự kiến",
                size: 500
            },
            {
                accessorKey: "hostUnit",
                header: "Tên đơn vị chủ trì",
                accessorFn: (row) => row.hostUnit ? `${row.hostUnit?.code} - ${row.hostUnit?.name}` : ""
            },
            {
                accessorKey: "supportUnit",
                header: "Đơn vị phối hợp",
            },
            {
                accessorKey: "assignedPerson",
                header: "Nhân sự phụ trách",
                accessorFn: (row) => row.user?.fullName
            },
            {
                accessorKey: "reportCount",
                header: "Số lần báo cáo"
            },
        ],
        []
    );

    return (
        <CustomFieldset title="Danh sách hạn chế">
            <CustomDataTableAPI
                enableRowSelection
                columns={columns}
                exportProps={{
                    fileName: 'Danh sách công việc'
                }}
                query={queryTaskDetailAnalysis}
                deleteListFn={(ids) => {
                    return service_EAQAnalysis.deleteListEAQTaskDetailReportByTaskDetailIds(ids)
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (<>
                        <AssignReportDateButton table={table} analysisType={analysisTypeEnum.Limitation} />
                        {/* <ImprovementReportingCycleExportButton table={table} /> */}
                    </>);
                }}
                renderRowActions={({ row, table }) => {
                    return (
                        <CustomCenterFull>
                            <ImprovementReportingCycleUpdateButton taskDetailId={row.original.id} />
                        </CustomCenterFull>
                    );
                }}
            />
        </CustomFieldset>
    );
};


