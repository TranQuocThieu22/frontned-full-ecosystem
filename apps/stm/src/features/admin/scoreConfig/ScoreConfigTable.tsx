'use client'

import ScoreConfigUpdateProgram from "@/features/admin/scoreConfig/ScoreConfigUpdateProgram";
import { programService } from "@/shared/APIs/programService";
import { ScoreFormulaLabel, ScoreSystemLabel } from "@/shared/consts/enum/scoreConfigEnum";
import { Program } from "@/shared/interfaces/program";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";

export default function ScoreConfigTable() {
    const columns = useMemo<CustomColumnDef<Program>[]>(() => [
        { header: "Mã chương trình", accessorKey: "code" },
        { header: "Tên chương trình", accessorKey: "name" },
        { header: "Loại chương trình", accessorKey: "programType.name" },
        { header: "Dừng đào tạo", accessorKey: "isCancel", type: "squareCheck" },
        { header: "Tổng số tiết", accessorKey: "totalClassPeriodNumber" },
        {
            header: "Hệ điểm QT",
            accessorKey: "scoreSystem",
            accessorFn: (row) => ScoreSystemLabel[row.scoreSystem as keyof typeof ScoreSystemLabel] ?? "",
        },
        {
            header: "Cách tổng kết QT",
            accessorKey: "scoreFormula",
            accessorFn: (row) => ScoreFormulaLabel[row.scoreFormula as keyof typeof ScoreFormulaLabel] ?? "",
        },
        { header: "Ngưỡng đạt QT", accessorKey: "scorePass" },
        {
            header: "Thành phần điểm QT",
            accessorKey: "scoreConfigs",
            accessorFn: (row) =>
                row.scoreConfigs
                    ?.filter((item) => item.scoreType === 1)
                    .map((item) => item.name)
                    .join("\n") ?? "",
        },
        {
            header: "Hệ điểm Thi",
            accessorKey: "testScoreSystem",
            accessorFn: (row) => ScoreSystemLabel[row.testScoreSystem as keyof typeof ScoreSystemLabel] ?? "",
        },
        {
            header: "Cách tổng kết Thi",
            accessorKey: "testScoreFormula",
            accessorFn: (row) => ScoreFormulaLabel[row.testScoreFormula as keyof typeof ScoreFormulaLabel] ?? "",
        },
        { header: "Ngưỡng đạt Thi", accessorKey: "testScorePass" },
        {
            header: "Thành phần điểm Thi",
            accessorKey: "scoreConfigsThi",
            accessorFn: (row) =>
                row.scoreConfigs
                    ?.filter((item) => item.scoreType === 2)
                    .map((item) => item.name)
                    .join("\n") ?? "",
        },
    ], []);

    const scoreConfigQuery = useCustomReactQuery({
        queryKey: ["scoreConfigs"],
        axiosFn: () => programService.getAll({ cols: ["ProgramType", "ScoreConfigs"] }),
    });

    return (
        <CustomFieldset title="Cấu hình điểm của chương trình học">
            <CustomDataTableAPI
                enableRowSelection
                query={scoreConfigQuery}
                columns={columns}
                deleteFn={programService.delete}
                deleteListFn={programService.deleteListIds}
                exportProps={{
                    fileName: "Danh sách cấu hình điểm của chương trình học"
                }}
                renderRowActions={({ row }) => (
                    <ScoreConfigUpdateProgram data={row.original as any} />
                )}
            />
        </CustomFieldset>
    );
}

