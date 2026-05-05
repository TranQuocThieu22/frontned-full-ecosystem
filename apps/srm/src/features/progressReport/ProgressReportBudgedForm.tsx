import { IBodyUpdateReportContract, contractService } from "@/shared/APIs/contractService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomLabelValueRow } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomLabelValueRow";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function ProgressReportBudgedForm({ readonly, totalCost, values }: { readonly?: boolean, totalCost: number, values?: IBodyUpdateReportContract }) {
    const form = useForm<IBodyUpdateReportContract>({
        mode: "controlled",
        initialValues: {
            reportedAllocatedBudget: 0,
            allocatedBudget: 0,
            reportedUsedBudget: 0,
            usedBudget: 0,
            remainingBudget: 0,
            nextRequestedBudget: 0,
        },
    });
    const mutation = useCustomReactMutation({
        axiosFn: (body: IBodyUpdateReportContract) => contractService.updateReportContract(body),
        mutationType: "update"
    })
    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
    }, [values])
    return (
        <form onSubmit={form.onSubmit(formValues => {
            mutation.mutate({
                ...formValues,
            })
        })}>
            <Stack>
                <CustomLabelValueRow value={currencyUtils.formatWithSuffix(totalCost, " VNĐ")} label="Tổng kinh phí được phê duyệt" />
                <CustomNumberInput readOnly={readonly} inputType="currency" label="Kinh phí đã cấp kỳ báo cáo" {...form.getInputProps("reportedAllocatedBudget")} />
                <CustomNumberInput readOnly={readonly} inputType="currency" label="Kinh phí đã cấp lũy kế" {...form.getInputProps("allocatedBudget")} />
                <CustomNumberInput readOnly={readonly} inputType="currency" label="Kinh phí đã sử dụng trong kỳ báo cáo" {...form.getInputProps("reportedUsedBudget")} />
                <CustomNumberInput readOnly={readonly} inputType="currency" label="Kinh phí đã sử dụng lũy kế" {...form.getInputProps("usedBudget")} />
                <CustomNumberInput readOnly={readonly} inputType="currency" label="Kinh phí chưa sử dụng, chuyển kỳ sau" {...form.getInputProps("remainingBudget")} />
                <CustomNumberInput readOnly={readonly} inputType="currency" label="Đề nghị cấp kinh phí đợt tiếp theo" {...form.getInputProps("nextRequestedBudget")} />
                <CustomButton hidden={readonly} actionType="save" />
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