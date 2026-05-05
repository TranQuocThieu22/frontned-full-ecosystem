import { IBodyUpdateReportContract, contractService } from "@/shared/APIs/contractService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { useEffect } from "react";
import ProgressReportReportSubmitted from "./ProgressReportReportSubmitted";

export default function ProgressReportSelfAssessmentForm({ readOnly, disc, values }: { readOnly?: boolean, disc?: UseDisclosureReturnValue, values?: IBodyUpdateReportContract }) {
    const form = useForm<IBodyUpdateReportContract>({
        mode: "controlled",
        initialValues: {
            implementationProgress: 0,
            incompleteTask: "",
            selfAssessment: "",
            nextStep: "",
            conclusionRecommendation: "",
        }
    })
    const mutation = useCustomReactMutation({
        axiosFn: (body: IBodyUpdateReportContract) => contractService.updateReportContract(body),
        mutationType: "update"
    })
    useEffect(() => {
        if (!values) return
        form.setValues({
            ...values,
            implementationProgress: values.implementationProgress ?? 0,
            incompleteTask: values.incompleteTask ?? "",
            selfAssessment: values.selfAssessment ?? "",
            nextStep: values.nextStep ?? "",
            conclusionRecommendation: values.conclusionRecommendation ?? "",
        })
        form.setInitialValues(values)
    }, [values])
    return (
        <form onSubmit={form.onSubmit(formValues => {
            mutation.mutate({
                ...formValues,
            })
        })}>
            <Stack>
                <CustomNumberInput readOnly={readOnly} label="Tiến độ thực hiện (%)"  {...form.getInputProps("implementationProgress")} />
                <CustomTextArea readOnly={readOnly} label="Công việc chưa hoàn thành, vấn đề phát sinh, thay đổi so với kế hoạch ban đầu (Nêu nguyên nhân, nếu có):"
                    {...form.getInputProps("incompleteTask")}
                />
                <CustomTextArea readOnly={readOnly} label="Tự nhận xét và đánh giá kết quả đạt được so với dự kiến ban đầu (Vượt tiến độ/ theo đúng tiến độ/ chậm tiến độ...)"
                    {...form.getInputProps("selfAssessment")}
                />
                <CustomTextArea readOnly={readOnly} label="Những công việc cần triển khai tiếp trong thời gian tới"
                    {...form.getInputProps("nextStep")}
                />
                <CustomTextArea readOnly={readOnly} label="Kết luận và kiến nghị"
                    {...form.getInputProps("conclusionRecommendation")}
                />
                {!readOnly && (
                    <CustomFlexEnd>
                        <ProgressReportReportSubmitted disc={disc} />
                        <CustomButton actionType="save" />
                    </CustomFlexEnd>
                )}
            </Stack>
        </form>
    )
}



//  /** Kinh phí đã báo cáo phân bổ */
//     reportedAllocatedBudget?: number
//     /** Kinh phí đã phân bổ */
//     allocatedBudget?: number
//     /** Kinh phí đã báo cáo sử dụng */
//     reportedUsedBudget?: number
//     /** Kinh phí đã sử dụng */
//     usedBudget?: number
//     /** Kinh còn lại */
//     remainingBudget?: number
//     /** Kinh phí yêu cầu tiếp theo */
//     nextRequestedBudget?: number