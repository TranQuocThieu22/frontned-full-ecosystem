'use client';
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { NumberInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { I_h8kz9e8j7d_Read } from "./F_h8kz9e8j7d_Read";

export default function F_h8kz9e8j7d_Update({ values }: { values: I_h8kz9e8j7d_Read }) {
    const form = useForm<I_h8kz9e8j7d_Read>({
        initialValues: {
            indicatorCode: values.indicatorCode || "",
            indicatorName: values.indicatorName || "",
            targetValue: values.targetValue || 0,
            resultValue: values.resultValue || 0,
            reportYear: values.reportYear || "",
            remarks: values.remarks || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã chỉ số" {...form.getInputProps("indicatorCode")} />
            <MyTextInput label="Tên chỉ số" {...form.getInputProps("indicatorName")} />
            <NumberInput label="Chi tiêu" {...form.getInputProps("targetValue")} min={0} />
            <NumberInput label="Kết quả" {...form.getInputProps("resultValue")} min={0} />
            <MyTextInput readOnly label="Năm báo cáo" {...form.getInputProps("reportYear")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("remarks")} />
        </MyActionIconUpdate>);
}
