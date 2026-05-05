import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { IStandard } from "@/shared/interfaces/standard/Standard";
import { ITask } from "@/shared/interfaces/task/ITask";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import AssignReportDateButton from "../ImprovementReportingCycle/AssignReportDateButton";
import AssuranceReportingCycleExport from "./AssuranceReportingCycleExport";
import AssuranceReportingCycleUpdate from "./AssuranceReportingCycleUpdate";
import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";


export default function AssuranceReportingCycleTable() {
    const filterStore = useS_Shared_Filter();

    const queryTaskDetailAnalysis = useCustomReactQuery({
        queryKey: ["task_detail_analysis_report_cycle_list", filterStore.state.Phase?.id],
        axiosFn: () => service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
            eaqPhaseId: filterStore.state.Phase?.id,
            analysisType: analysisTypeEnum.Requirement
        })
    });


    const columns = useMemo<CustomColumnDef<ITaskDetailAnalysis>[]>(
        () => [
            {
                accessorKey: "standard.code",
                header: "Mã tiêu chuẩn",
                accessorFn: (row) => row.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code
            },
            {
                accessorKey: "criteria.code",
                header: "Mã tiêu chí",
                accessorFn: (row) => row.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code
            },
            {
                accessorKey: "requirement.code",
                header: "Mã yêu cầu",
                accessorFn: (row) => row.eaqAnalysis?.eaqRequirement?.code
            },
            {
                accessorKey: "requirement.name",
                header: "Tên yêu cầu",
                size: 500,
                accessorFn: (row) => row.eaqAnalysis?.eaqRequirement?.name
            },
            {
                accessorKey: "code",
                header: "Mã công việc",
            },
            {
                accessorKey: "name",
                header: "Tên công việc",
                size: 500,
            },
            {
                accessorKey: "hostingUnit",
                header: "Tên đơn vị chủ trì",
                accessorFn: (row) => row.hostUnit ? `${row.hostUnit?.code} - ${row.hostUnit?.name}` : ""
            },
            {
                accessorKey: "affiliatedPerson",
                header: "Nhân sự phụ trách",
                accessorFn: (row) => row.user?.fullName
            },
            {
                accessorKey: "reportCount",
                header: "Số lần báo cáo",
            },
            {
                accessorKey: "supportUnit",
                header: "Tên đơn vị phối hợp",
            },
            {
                accessorKey: "note",
                header: "Ghi chú",
                size: 500,
            },
        ],
        []
    );

    return (
        <CustomFieldset title="Danh sách công việc">
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
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <AssignReportDateButton table={table} analysisType={analysisTypeEnum.Requirement} />
                        {/* <AssuranceReportingCycleExport table={table} loading={queryTaskDetailAnalysis.isFetching} /> */}
                    </>
                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <AssuranceReportingCycleUpdate taskDetailId={row.original.id} requiedmentCode={row.original.eaqAnalysis?.eaqRequirement?.code} />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    )
}

export interface ITaskReportAnual extends BaseEntity {
    standard?: IStandard;
    criteria?: ICriteria;
    requirement?: IRequirement;
    task?: ITask;
    hostingUnit: string;
    affiliatedPerson: string;
    reportDateCount?: number;
    startDate?: string;
    endDate?: string;
    reportCycle?: number;
    reportCount: number;
    reportDates: string[];
    collabUnit: string[];
    note: string;
}

export interface ITaskReportSchedule extends BaseEntity {
    requirement?: IRequirement;
    task?: ITask;
    accountCode?: string;
    affiliatedPerson?: string;
    reportDateOrder?: number;
    reportDate?: string;
    startDate?: string;
    endDate?: string;
    reportCycle?: number;
}
