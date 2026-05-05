import { SRMMainTask } from "@/shared/interfaces/SRMMainTask";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProgressReportMainJobsCreateUpdate from "./ProgressReportMainJobsCreateUpdate";
import ProgressReportMainJobsDelete from "./ProgressReportMainJobsDelete";
import ProgressReportMainJobsExport from "./ProgressReportMainJobsExport";

export default function ProgressReportMainJobsTable({ readOnly, mainTasksData }: { readOnly?: boolean, mainTasksData?: SRMMainTask[] }) {
    const columns = useMemo<MRT_ColumnDef<SRMMainTask>[]>(() => [
        {
            header: 'Nội dung công việc (Theo thuyết minh)',
            accessorKey: "content"
        },
        {
            header: "Kết quả sản phẩm (Theo thuyết minh)",
            accessorKey: "plannedOutcome"
        },
        {
            header: "Thời gian bắt đầu",
            accessorKey: "startDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row.startDate)
        },
        {
            header: "Thời gian kết thúc",
            accessorKey: "endDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row.endDate)
        },
        {
            header: "Kết quả sản phẩm đạt được",
            accessorKey: "actualOutcome"
        },
        {
            header: "Dự toán kinh phí thực hiện (đồng)",
            accessorKey: "estimatedBudget",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.estimatedBudget)
        },
        {
            header: "Ghi chú",
            accessorKey: "note"
        },
        {
            header: "Minh chứng file",
            accessorKey: "attachmentPath",
            accessorFn: (row) => <CustomButtonViewFileAPI filePath={row.attachmentPath} />
        }
    ], [])
    return (
        <CustomDataTable
            data={mainTasksData || []}
            columns={columns}
            enableRowSelection
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <Group>
                        {readOnly == false && <>
                            <ProgressReportMainJobsCreateUpdate />
                        </>}
                        <ProgressReportMainJobsExport table={table} />
                    </Group>
                )
            }}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <ProgressReportMainJobsCreateUpdate values={row.original} />
                    <ProgressReportMainJobsDelete id={row.original.id!} code={row.original.content || ""} />
                </CustomCenterFull>
            )}
            enableRowActions={!readOnly}
        />
    )
}
