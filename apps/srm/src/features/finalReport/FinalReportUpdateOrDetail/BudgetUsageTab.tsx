import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

const MAX_NUMBER_INPUT_VALUE = 2 ** 63 - 1;

interface IProps {
    form: UseFormReturnType<formValuesType<SRMContract>>;
    actionType?: "update" | "viewDetail";
}

export default function BudgetUsageTab({ form, actionType }: IProps) {

    return (
        <Stack>
            <CustomNumberInput
                label="Tổng kinh phí (Thanh toán)"
                {...form.getInputProps("usedTotalCost")}
                inputType="currency"
                max={MAX_NUMBER_INPUT_VALUE}
                readOnly={actionType === "viewDetail"}
            />
            <CustomNumberInput
                label="Kinh phí TW (Thanh toán)"
                {...form.getInputProps("usedCentralBudget")}
                inputType="currency"
                max={MAX_NUMBER_INPUT_VALUE}
                readOnly={actionType === "viewDetail"}
                onChange={e => {
                    form.setFieldValue("usedCentralBudget", e ?? 0)
                    form.setFieldValue(
                        'usedTotalCost',
                        (form.values.usedProvincialBudget ?? 0) + (form.values.usedUniversityBudget ?? 0) + (form.values.usedOtherBudget ?? 0) + (e ?? 0)
                    )
                }}
            />
            <CustomNumberInput
                label="Kinh phí Tỉnh (Thanh toán)"
                {...form.getInputProps("usedProvincialBudget")}
                inputType="currency"
                max={MAX_NUMBER_INPUT_VALUE}
                readOnly={actionType === "viewDetail"}
                onChange={e => {
                    form.setFieldValue("usedProvincialBudget", e ?? 0)
                    form.setFieldValue(
                        'usedTotalCost',
                        (form.values.usedCentralBudget ?? 0) + (form.values.usedUniversityBudget ?? 0) + (form.values.usedOtherBudget ?? 0) + (e ?? 0)
                    )
                }}
            />
            <CustomNumberInput
                label="Kinh phí Trường (Thanh toán)"
                {...form.getInputProps("usedUniversityBudget")}
                inputType="currency"
                max={MAX_NUMBER_INPUT_VALUE}
                readOnly={actionType === "viewDetail"}
                onChange={e => {
                    form.setFieldValue("usedUniversityBudget", e ?? 0)
                    form.setFieldValue(
                        'usedTotalCost',
                        (form.values.usedCentralBudget ?? 0) + (form.values.usedProvincialBudget ?? 0) + (form.values.usedOtherBudget ?? 0) + (e ?? 0)
                    )
                }}
            />
            <CustomNumberInput
                label="Kinh phí Khác (Thanh toán)"
                {...form.getInputProps("usedOtherBudget")}
                inputType="currency"
                max={MAX_NUMBER_INPUT_VALUE}
                readOnly={actionType === "viewDetail"}
                onChange={e => {
                    form.setFieldValue("usedOtherBudget", e ?? 0)
                    form.setFieldValue(
                        'usedTotalCost',
                        (form.values.usedCentralBudget ?? 0) + (form.values.usedUniversityBudget ?? 0) + (form.values.usedProvincialBudget ?? 0) + (e ?? 0)
                    )
                }}
            />
        </Stack>
    );
}

