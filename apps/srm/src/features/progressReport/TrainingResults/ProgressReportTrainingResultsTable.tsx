import { SRMTrainingOutcome } from "@/shared/interfaces/SRMTrainingOutcome";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProgressReportTrainingResultsCreateUpdate from "./ProgressReportTrainingResultsCreateUpdate";
import ProgressReportTrainingResultsDelete from "./ProgressReportTrainingResultsDelete";
import TrainingResultsExport from "./TrainingResultsExport";

export default function ProgressReportTrainingResultsTable({ readonly, trainingOutcomesData }: { readonly?: boolean, trainingOutcomesData?: SRMTrainingOutcome[] }) {
    const columns = useMemo<MRT_ColumnDef<SRMTrainingOutcome>[]>(() => [
        {
            header: "Họ và tên",
            accessorKey: "fullName"
        },
        {
            header: "Thời gian bắt đầu",
            accessorKey: "startDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row.startDate)
        },
        {
            header: 'Thời gian kết thúc',
            accessorKey: "endDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row.endDate)
        },
        {
            header: "Đã bảo vệ",
            accessorKey: "degree"
        },
        {
            header: "Tình trạng",
            accessorKey: "status"
        },
        {
            header: "Minh chứng",
            accessorKey: "attachmentPath",
            accessorFn: (row) => <CustomButtonViewFileAPI filePath={row.attachmentPath} />
        }
    ], [])
    return (
        <CustomDataTable
            columns={columns}
            data={trainingOutcomesData || []}
            enableRowSelection
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <Group>
                        {!readonly && <ProgressReportTrainingResultsCreateUpdate />}
                        <TrainingResultsExport table={table} />
                    </Group>
                )
            }}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <ProgressReportTrainingResultsCreateUpdate values={row.original} />
                    <ProgressReportTrainingResultsDelete code={row.original.fullName || ""} id={row.original.id!} />
                </CustomCenterFull>
            )}
            enableRowActions={!readonly}
        />
    )
}
