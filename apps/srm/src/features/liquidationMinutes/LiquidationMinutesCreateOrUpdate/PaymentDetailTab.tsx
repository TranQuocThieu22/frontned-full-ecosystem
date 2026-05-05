import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useEffect, useState } from "react";

interface IProps {
    form: UseFormReturnType<SRMLiquidationMinute>;
    actionType?: "update" | "create";
}

export default function PaymentDetailTab({ form, actionType }: IProps) {
    const [displayTotal, setDisplayTotal] = useState(0);

    useEffect(() => {
        const total = (form.values.centralBudget || 0) +
            (form.values.provincialBudget || 0) +
            (form.values.universityBudget || 0) +
            (form.values.otherBudget || 0);

        setDisplayTotal(total);
        form.setFieldValue("totalCost", total);
    }, [
        form.values.centralBudget,
        form.values.provincialBudget,
        form.values.universityBudget,
        form.values.otherBudget
    ]);

    return (
        <Stack>
            <CustomNumberInput
                label="Tổng kinh phí (thanh toán)"
                value={displayTotal}
                inputType="currency"
                disabled={true}
            />
            <CustomNumberInput
                label="Kinh phí TW (Thanh toán)"
                {...form.getInputProps("centralBudget")}
                inputType="currency"
            />
            <CustomNumberInput
                label="Kinh phí Tỉnh (Thanh toán)"
                {...form.getInputProps("provincialBudget")}
                inputType="currency"
            />
            <CustomNumberInput
                label="Kinh phí Trường (Thanh toán)"
                {...form.getInputProps("universityBudget")}
                inputType="currency"
            />
            <CustomNumberInput
                label="Kinh phí Khác (Thanh toán)"
                {...form.getInputProps("otherBudget")}
                inputType="currency"
            />
        </Stack>
    );
}

