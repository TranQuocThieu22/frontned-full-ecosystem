'use client';
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { NumberInput, Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { I_l7idby7k2q_Read } from "./F_l7idby7k2q_Read";

export default function F_l7idby7k2q_Update({ values }: { values: I_l7idby7k2q_Read }) {
    const form = useForm<I_l7idby7k2q_Read>({
        initialValues: {
            statisticalIndicator: values.statisticalIndicator || "",
            quantity: values.quantity || 0,
            reportYear: values.reportYear || new Date().getFullYear().toString(), // Default to current year
            notes: values.notes || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <Select
                label="Chỉ số thống kê"
                {...form.getInputProps("statisticalIndicator")}
                data={[
                    "Số đầu sách điện tử có thể truy cập trực tuyến",
                    "Số đầu sách có bản in",
                    "Số đầu sách in có thể mượn trực tiếp"
                ]}
            />
            <NumberInput label="Số lượng" {...form.getInputProps("quantity")} min={0} />
            <MyTextInput readOnly label="Năm báo cáo" {...form.getInputProps("reportYear")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyActionIconUpdate>);
}
