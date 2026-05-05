import RoadmapReportExport from "@/features/admin/ModuleRoadmapReport/RoadmapReportExport";
import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { Group, } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CycleTable from "./RoadMapReportUpdate/CycleTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function RoadmapReportTable() {

    const RoadmapReportQuery = useCustomReactQuery({
        queryKey: ["RoadmapReportTable", "GetAll"],
        axiosFn: () =>
            service_EAQTrainingProgram.GetAllAccreditationTrainingPrograms({}),
    })

    const columns = useMemo<MRT_ColumnDef<StandardSetTrainingProgram>[]>(() => {
        // Find the maximum number of cycles across all training programs
        const maxCycles = Math.max(
            ...(RoadmapReportQuery.data?.map(item => item.eaqCycles?.length || 0) || [0])
        );
        // Create dynamic cycle columns
        const cycleColumns = Array.from({ length: maxCycles }, (_, index) => ({
            accessorFn: (row: StandardSetTrainingProgram) => {
                const cycle = row.eaqCycles?.find(c => c.order === index + 1);
                return cycle?.startYear?.toString() || '';
            },
            header: `Năm chu kỳ ${index + 1}`,
            id: `cycleYear${index + 1}`,
        }));
        return [
            { accessorKey: "eaqTrainingProgram.code", header: "Mã CTĐT" },
            { accessorKey: "eaqTrainingProgram.name", header: "Tên chương trình đào tạo" },
            { accessorKey: "eaqStandardSet.code", header: "Mã bộ tiêu chuẩn" },
            { header: "Năm bắt đầu tuyển sinh", accessorKey: "eaqTrainingProgram.admissionStartYear" },
            { header: "Năm tốt nghiệp khóa đầu", accessorKey: "eaqTrainingProgram.firstGraduationYear" },
            ...cycleColumns, // Spread the dynamic cycle columns
        ];
    }, [RoadmapReportQuery.data]);

    return (
        <CustomFieldset title="Danh sách lộ trình thực hiện báo cáo tự đánh giá">
            <CustomDataTable
                data={RoadmapReportQuery.data || []}
                isLoading={RoadmapReportQuery.isLoading}
                isError={RoadmapReportQuery.isError}
                columns={columns}
                enableRowSelection
                enableRowNumbers

                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <CustomButton actionType={"update"} />
                        <RoadmapReportExport table={table} />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <CycleTable eaqStandardSetTrainingProgram={row.original} />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    );
}
