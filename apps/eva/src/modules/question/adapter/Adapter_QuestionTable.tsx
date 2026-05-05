import { questionService } from "@/shared/APIs/questionService";
import { enum_questionType, enumLabel_questionType } from "@/shared/consts/enum/enum_questionType";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { ComponentProps } from "react";
import Usecase_QuestionTable from "../usecase/Usecase_QuestionTable";

interface Props extends Omit<ComponentProps<typeof Usecase_QuestionTable>, "data"> {
    evaSubjectId?: number
}

export default function Adapter_QuestionTable({
    evaSubjectId,
    ...rest
}: Props) {
    const questionQuery = useMyReactQuery({
        queryKey: ['questions', 'bySubjectId', evaSubjectId],
        axiosFn: () => questionService.getQuestion({ evaSubjectId: evaSubjectId! }),
    })
    return (
        <Usecase_QuestionTable
            data={questionQuery.data?.map(item => ({
                questionCode: item.code,
                questionContent: item.content,
                questionType: enumLabel_questionType[item.evaQuestionTypeId as enum_questionType],
                numberOfAnswer: item.questionQuantity,
                topicCode: item.evaTopic?.code,
                topicName: item.evaTopic?.name,
                difficulty: item.evaDifficultyDetail.name,
                levelOfAwareness: item.evaCognition?.name,

            })) || []}
            isLoading={questionQuery.isLoading}
            isError={questionQuery.isError}
            {...rest}
        />
    )
}
