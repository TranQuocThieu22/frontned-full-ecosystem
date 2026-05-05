'use client';
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { NumberInput, Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { I_c5ncinr9mi_Read } from "./F_c5ncinr9mi_Read";

export default function F_c5ncinr9mi_Update({ values }: { values: I_c5ncinr9mi_Read }) {
    const form = useForm<I_c5ncinr9mi_Read>({
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
                    "Tốc độ hoặc băng thông đường truyền internet (Mbps)",
                    "Tổng số học phần giảng dạy trong năm học",
                    "Tổng số học phần sẵn sàng dạy trực tuyến > 50%"
                ]}
            />
            <NumberInput label="Số lượng" {...form.getInputProps("quantity")} min={0} />
            <MyTextInput readOnly label="Năm báo cáo" {...form.getInputProps("reportYear")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyActionIconUpdate>
    );
}
