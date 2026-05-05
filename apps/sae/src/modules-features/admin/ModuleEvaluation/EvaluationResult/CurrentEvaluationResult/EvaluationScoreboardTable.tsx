"use client";

import { service_ranking } from "@/api/services/service_ranking";
import { ReportCurrentPlan } from "@/interfaces/ranking";
import EvaluationScoreboardFilter from "@/modules-features/admin/ModuleEvaluation/EvaluationResult/CurrentEvaluationResult/EvaluationScoreboardFilter";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import EvaluationScoreboardExport from "@/shared/features/EvaluationScoreboardExport";
import { CustomButtonPrintTablePDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintTablePDF";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Center } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import EvaluationScoreboardButtonModal from "./EvaluationScoreboardButtonModal";

interface IFilter {
    pageIndex: number,
    pageSize: number,
    facultyId?: number,
    name?: string,
    activityPlanId?: number,
}

export default function EvaluationScoreboardTable() {
    const permissionStore = usePermissionStore();
    const activityPlanStore = useS_Shared_ActivityPlan();
    const [dataFilter, setDataFilter] = useState<IFilter>({
        pageIndex: 0,
        pageSize: 30,
        facultyId: undefined,
        name: undefined,
        activityPlanId: undefined,
    });

    const queryReportCurrentPlan = useCustomReactQuery({
        queryKey: ["getReportCurrentPlan", dataFilter],
        axiosFn: () => service_ranking.getReportCurrentPlan({
            facultyId: dataFilter.facultyId,
            name: dataFilter.name,
            activityPlanId: dataFilter.activityPlanId,
            pageNumber: dataFilter.pageIndex + 1,
            pageSize: dataFilter.pageSize
        }),
        options: {
            refetchOnWindowFocus: false,
        }
    });

    useEffect(() => {
        if (!activityPlanStore) return
        setDataFilter((prev) => ({
            ...prev,
            activityPlanId: activityPlanStore.state.ActivityPlan?.id,
        }));
    }, [activityPlanStore.state.ActivityPlan])

    const columns = useMemo<MRT_ColumnDef<ReportCurrentPlan>[]>(() => [
        { header: "Mã sinh viên", accessorKey: "studentCode" },
        { header: "Tên sinh viên", accessorKey: "studentName" },
        { header: "Khoa", accessorKey: "facultyName" },
        { header: "Điểm SV tự đánh giá", accessorKey: "studentRankingPoint" },
        {
            header: "Xem bảng điểm",
            size: 125,
            Cell: ({ row }) => (
                <Center>
                    <EvaluationScoreboardButtonModal reportCurrentPlan={row.original} />
                </Center>
            ),
        }
    ], []);

    const printConfig = {
        fields: [
            { header: "Mã sinh viên", fieldName: "studentCode" },
            { header: "Tên sinh viên", fieldName: "studentName" },
            { header: "Khoa", fieldName: "facultyName" },
            { header: "Điểm SV tự đánh giá", fieldName: "studentRankingPoint" },
        ],
        title: "Kết quả đánh giá rèn luyện",
        showRowNumbers: true,
    };

    return (
        <>
            <EvaluationScoreboardFilter setDataFilter={setDataFilter} />
            <CustomDataTable
                manualPagination
                columns={columns}
                rowCount={queryReportCurrentPlan.dataCount}
                getRowId={(data) => String(data.studentId)}
                state={{ pagination: dataFilter }}
                onPaginationChange={setDataFilter}
                data={queryReportCurrentPlan.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    const studentIds = table.getSelectedRowModel().rows.map((item) => item.original.studentId!)
                    return (
                        <>
                            {permissionStore.state.currentPermissionPage?.isPrint &&
                                <CustomButtonPrintTablePDF
                                    printConfig={printConfig}
                                    data={queryReportCurrentPlan.data || []}
                                >In</CustomButtonPrintTablePDF>
                            }
                            {/* <EvaluationScoreboardExportOld /> */}
                            <EvaluationScoreboardExport
                                studentIds={studentIds}
                                facultyIds={dataFilter.facultyId ? [dataFilter.facultyId] : []}
                            />
                        </>
                    )
                }}
                enableRowNumbers
                enableRowSelection={true}
                isLoading={queryReportCurrentPlan.isLoading}
                isError={queryReportCurrentPlan.isError}
            />
        </>
    );
}
