'use client';
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { NumberInput, Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { I_zvsdgn3tko_Read } from "./F_zvsdgn3tko_Read";

export default function F_zvsdgn3tko_Update({ values }: { values: I_zvsdgn3tko_Read }) {
    const form = useForm<I_zvsdgn3tko_Read>({
        initialValues: {
            campusCode: values.campusCode || "",
            campusName: values.campusName || "",
            usageType: values.usageType || "",
            landArea: values.landArea || 0,
            campusCoefficient: values.campusCoefficient || 0,
            convertedArea: values.convertedArea || 0,
            address: values.address || "",
            remarks: values.remarks || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã khuôn viên" {...form.getInputProps("campusCode")} />
            <MyTextInput label="Tên khuôn viên" {...form.getInputProps("campusName")} />
            <Select
                label="Hình thức sử dụng"
                {...form.getInputProps("usageType")}
                data={["Sở hữu", "Liên kết", "Thuê lâu năm"]}
            />
            <NumberInput label="Diện tích đất" {...form.getInputProps("landArea")} min={0} />
            <NumberInput label="Hệ số khuôn viên" {...form.getInputProps("campusCoefficient")} min={0} />
            <NumberInput label="Diện tích quy đổi" {...form.getInputProps("convertedArea")} min={0} />
            <MyTextInput label="Địa chỉ" {...form.getInputProps("address")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("remarks")} />
        </MyActionIconUpdate>);
}
