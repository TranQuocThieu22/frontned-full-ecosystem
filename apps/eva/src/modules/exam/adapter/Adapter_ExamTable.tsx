import { examSetService } from "@/shared/APIs/examSetService";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { ComponentProps } from "react";
import Usecase_ExamTable, { ExamTableDomain } from "../usecase/Usecase_ExamTable";

interface Adapter_ExamTableProps extends Omit<ComponentProps<typeof Usecase_ExamTable>, "data"> {
    examId?: number,
    subjectId?: number
}

export default function Adapter_ExamTable({
    examId,
    subjectId,
    ...rest
}: Adapter_ExamTableProps) {
    const examSetQuery = useMyReactQuery({
        queryKey: ["examSets", examId, subjectId],
        axiosFn: () =>
            examSetService.getExamSet({
                examId: examId,
                subjectId: 1
            }),
        options: {
            enabled: !!examId && !!subjectId
        }
    });
    return (
        <Usecase_ExamTable
            isLoading={examSetQuery.isLoading}
            isError={examSetQuery.isError}
            data={examSetQuery.data?.map(examSet => ({
                id: examSet.id?.toString(),
                examCode: examSet.code,
                examName: examSet.name,
                numberOfQuestion: examSet.quantityQuestion,
                difficultys: examSet.difficultyDetailQuanity?.map(item => ({
                    name: item.evaDifficultyDetailName,
                    numberOfDifficulty: item.evaDifficultyDetailQuantity,
                })) as ExamTableDomain["difficultys"]
            })) || []}
            {...rest}
        />
    )
}


