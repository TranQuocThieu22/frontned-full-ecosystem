'use client';
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyNumberInput from '@/components/ui/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { I_oqx2kb9ikm_Read } from "./F_oqx2kb9ikm_Read";

export default function F_oqx2kb9ikm_Update({ values }: { values: I_oqx2kb9ikm_Read }) {
    const form = useForm<I_oqx2kb9ikm_Read>({
        initialValues: {
            statisticalIndicator: values.statisticalIndicator || "",
            bachelor: values.bachelor || 0,
            master: values.master || 0,
            doctorate: values.doctorate || 0,
            reportYear: values.reportYear || "",
            notes: values.notes || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <Select
                label="Chỉ số thống kê"
                {...form.getInputProps("statisticalIndicator")}
                data={[
                    { value: "Số giảng viên toàn thời gian", label: "Số giảng viên toàn thời gian" },
                    { value: "Số giảng viên cơ hữu trong độ tuổi lao động", label: "Số giảng viên cơ hữu trong độ tuổi lao động" },
                    { value: "Số giảng viên toàn thời gian có chỗ làm", label: "Số giảng viên toàn thời gian có chỗ làm" },
                ]}
            />
            <MyNumberInput label="Đại học" {...form.getInputProps("bachelor")} />
            <MyNumberInput label="Thạc sĩ" {...form.getInputProps("master")} />
            <MyNumberInput label="Tiến sĩ" {...form.getInputProps("doctorate")} />
            <MyTextInput readOnly label="Năm báo cáo" {...form.getInputProps("reportYear")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyActionIconUpdate>
    );
}
