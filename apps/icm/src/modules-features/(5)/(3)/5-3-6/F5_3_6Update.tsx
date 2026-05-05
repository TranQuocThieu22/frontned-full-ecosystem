'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    id?: number;
    soQuyetDinh?: string;
    chuTich?: string;
    tongTien?: number;
    fileThanhToanSrc?: string;
}

export default function F5_3_6Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values,
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Số Quyết Định" {...form.getInputProps("soQuyetDinh")} />
            <MyTextInput label="Chủ Tịch" {...form.getInputProps("chuTich")} />
            <MyNumberInput label="Tổng Tiền" {...form.getInputProps("tongTien")} />
            <MyFileInput label="File Thanh Toán" {...form.getInputProps("fileThanhToanSrc")} />
        </MyActionIconUpdate>
    );
}
