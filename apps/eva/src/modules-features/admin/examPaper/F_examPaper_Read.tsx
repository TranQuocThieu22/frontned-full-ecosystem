import { examSetService } from "@/shared/APIs/examSetService";
import { ExamSet } from "@/shared/interfaces/ExamSet";
import { Box, Group } from "@mantine/core";
import { MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { default as F_examPaper_CreateUpdate } from "./F_examPaper_CreateUpdate/F_examPaper_CreateUpdate";
import F_examPaper_Delete from "./F_examPaper_Delete";
import F_examPaper_PrintAnswers from "./F_examPaper_PrintAnswers";
import F_examPaper_PrintExamSet from "./F_examPaper_PrintExamSet";
import { useS_examPaper } from "./useS_examPaper";

export default function F_examPaper_Read() {
    const store = useS_examPaper();

    const examSetQuery = useMyReactQuery({
        queryKey: ["examSets", store.state.examId, store.state.subjectId],
        axiosFn: () =>
            examSetService.getExamSet({
                examId: parseInt(store.state.examId!),
                subjectId: 1
            }),
        options: {
            enabled: !!store.state.examId && !!store.state.subjectId
        }
    });

    const difficultyTypes = useMemo(() => {
        const set = new Set<string>();
        examSetQuery.data?.forEach((item) => {
            item.difficultyDetailQuanity?.forEach((d) =>
                set.add(d.evaDifficultyDetailName!)
            );
        });
        return Array.from(set); // ["Dễ", "Trung bình", "Khó"] chẳng hạn
    }, [examSetQuery.data]);

    const dynamicColumns = useMemo<MRT_ColumnDef<ExamSet>[]>(() => {
        return difficultyTypes.map((difficultyName) => ({
            header: difficultyName,
            accessorFn: (row) => {
                const found = row.difficultyDetailQuanity?.find(
                    (d) => d.evaDifficultyDetailName === difficultyName
                );
                return found?.evaDifficultyDetailQuantity || 0;
            },
            id: difficultyName // id là bắt buộc nếu dùng accessorFn
        }));
    }, [difficultyTypes]);

    const columns = useMemo<MRT_ColumnDef<ExamSet>[]>(() => [
        {
            header: "Mã đề chuẩn",
            accessorKey: "code"
        },
        {
            header: "Tên đề chuẩn",
            accessorKey: "name"
        },
        {
            header: "Số lượng câu hỏi",
            accessorKey: "quantityQuestion"
        },
        ...dynamicColumns,
    ], [dynamicColumns]);

    return (
        <Box id="F_examPaper_Read">
            <MyDataTable
                columns={columns}
                data={examSetQuery.data || []}
                isLoading={examSetQuery.isLoading}
                isError={examSetQuery.isError}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_examPaper_CreateUpdate />
                        <F_examPaper_PrintExamSet />
                        <F_examPaper_PrintAnswers />
                    </Group>
                )}
                renderRowActions={() => (
                    <MyCenterFull>
                        <F_examPaper_CreateUpdate values={{}} />
                        <F_examPaper_Delete />
                    </MyCenterFull>
                )}
            />
        </Box>
    );
}
