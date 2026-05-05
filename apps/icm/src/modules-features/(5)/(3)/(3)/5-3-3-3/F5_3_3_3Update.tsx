'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    id?: number;
    soQuyetDinhHoiDongXetDuyetDeCuong?: string;
    maDeTai?: string;
    tenDeTai?: string;
    chuNhiem?: string;
    diemTrungBinh?: number;
    fileSrc?: string; // File biên bản
}

export default function F5_3_3_3Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values,
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Số Quyết Định Hội Đồng Xét Duyệt Đề Cương" {...form.getInputProps("soQuyetDinhHoiDongXetDuyetDeCuong")} />
            <MyTextInput label="Mã Đề Tài" {...form.getInputProps("maDeTai")} />
            <MyTextInput label="Tên Đề Tài" {...form.getInputProps("tenDeTai")} />
            <MyTextInput label="Chủ Nhiệm" {...form.getInputProps("chuNhiem")} />
            <MyNumberInput label="Điểm Trung Bình" {...form.getInputProps("diemTrungBinh")} />
            <MyFileInput label="File Biên Bản" {...form.getInputProps("fileSrc")} />
        </MyActionIconUpdate>
    );
}
