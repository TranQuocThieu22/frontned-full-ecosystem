'use client'

import { Grid, Group, Table } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FacultyEvaluationCouncilChart from "./FacultyEvaluationCouncilChart";
import { FacultyEvaluationCouncilViewModel, FacultyEvaluationCouncilReportInfoViewModel } from "@/modules-features/admin/ModuleEvaluation/EvaluationCouncil/FacultyEvaluationCouncil/interfaces/IFacultyEvaluationCouncilViewModel";
import { CustomDataTable, CustomDataTableProps } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomButtonPrintTablePDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintTablePDF";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { rest } from "lodash";
import { RateInfo } from "@/interfaces/ranking";
interface Props extends SafeOmitType<CustomDataTableProps<FacultyEvaluationCouncilReportInfoViewModel>, "columns"> {
    studentTotalCount?: number,
    rateInfos?: RateInfo[]

}
export default function FacultyEvaluationCouncilTable({

    data,
    studentTotalCount,
    rateInfos,
    ...rest }: Props) {

    const facultyReportColumns = useMemo<MRT_ColumnDef<FacultyEvaluationCouncilReportInfoViewModel>[]>(() => [
        {
            header: "Mã sinh viên", accessorKey: "studentCode",
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Tên sinh viên", accessorKey: "studentName",
            size: 300,
        },
        {
            header: "Tổng điểm", accessorKey: "schoolRankingPoint",
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Xếp loại", accessorKey: "rateName",
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
    ], []);

    const printConfig = {
        fields: [
            { header: "Mã sinh viên", fieldName: "studentCode" },
            { header: "Tên sinh viên", fieldName: "studentName" },
            { header: "Tổng điểm", fieldName: "schoolRankingPoint" },
            { header: "Xếp loại", fieldName: "rateName" },
        ],
        title: `Ngày in: ${new Date().toLocaleDateString()}`,

        showRowNumbers: false,
    }

    return (
        <CustomDataTable
            enablePagination
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={facultyReportColumns}
            data={data || []}
            enableBottomToolbar={true}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <CustomButtonPrintTablePDF
                        printConfig={printConfig}
                        data={data || []}
                    />
                </Group>
            )}
            {...rest}
        />
    )
}
