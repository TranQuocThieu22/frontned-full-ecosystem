// RoadmapDetailModal.tsx
import CycleDelete from "@/features/admin/ModuleRoadmapReport/RoadMapReportUpdate/CycleDelete";
import CycleDeleteList from "@/features/admin/ModuleRoadmapReport/RoadMapReportUpdate/CycleDeleteList";
import CycleExport from "@/features/admin/ModuleRoadmapReport/RoadMapReportUpdate/CycleExport";
import CycleImport from "@/features/admin/ModuleRoadmapReport/RoadMapReportUpdate/CycleImport";
import { Cycle } from "@/shared/interfaces/cycle/Cycle";
import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group, } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { CycleCreateUpdate } from "./CycleCreateUpdate";

interface Props {
    eaqStandardSetTrainingProgram: StandardSetTrainingProgram
}

export default function CycleTable({ eaqStandardSetTrainingProgram }: Props) {
    const disc = useDisclosure();
    const RoadmapCycleQuery = useCustomReactQuery({
        queryKey: ["CycleTable", "GetAll", eaqStandardSetTrainingProgram.id],
        axiosFn: () =>
            service_EAQTrainingProgram.GetEAQCyclesByEAQStandardSetTrainingProgramId(eaqStandardSetTrainingProgram.id!),
        options: {
            enabled: disc[0]
        }
    })
    const columns = useMemo<MRT_ColumnDef<Cycle>[]>(() => [
        {
            accessorKey: "programCode",
            header: "Mã CTĐT",
            accessorFn: () => eaqStandardSetTrainingProgram.eaqTrainingProgram?.code
        },
        {
            accessorKey: "programName",
            header: "Tên chương trình đào tạo",
            accessorFn: () => eaqStandardSetTrainingProgram.eaqTrainingProgram?.name
        },
        {
            accessorKey: "order", header: "Thứ tự chu kỳ"

        },
        { accessorKey: "startYear", header: "Năm đánh giá" },
    ], []);

    return (
        <CustomButtonModal
            isActionIcon
            actionIconProps={{
                actionType: 'update'
            }}
            modalProps={{
                title: `Danh sách chu kỳ kiểm định`,
                size: "70%"
            }}
            disclosure={disc}>
            <CustomDataTable
                isLoading={RoadmapCycleQuery.isLoading}
                isError={RoadmapCycleQuery.isError}
                data={RoadmapCycleQuery.data || []}
                columns={columns}
                enableRowNumbers
                enableRowSelection
                enableMultiRowSelection
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <CycleCreateUpdate standardSetTrainingProgram={eaqStandardSetTrainingProgram} />
                            <CycleImport
                                standardSetCode={eaqStandardSetTrainingProgram?.eaqStandardSet?.code || ""}
                                tranningProgramCode={eaqStandardSetTrainingProgram?.eaqTrainingProgram?.code || ""}
                            />
                            <CycleExport
                                table={table}
                                eaqStandardSetTrainingProgram={eaqStandardSetTrainingProgram}
                            />
                            <CycleDeleteList table={table} isLoading={false} />
                        </Group>
                    )
                }}

                renderRowActions={({ row, table }) => (
                    <CustomCenterFull>
                        <CycleCreateUpdate
                            isUpdate
                            currentCycle={row.original}
                            standardSetTrainingProgram={eaqStandardSetTrainingProgram}
                        />
                        <CycleDelete
                            data={row.original}
                            resetRowSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                )}
            />
        </CustomButtonModal>
    );
}
