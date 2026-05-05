'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    id?: number;
    tenDeTai?: string;
    chuNhiem?: string;
    nguoiDanhGia?: string;
    ngayDanhGia?: Date;
    tongDiem?: number;
    nhanXet?: string;
    fileSrc?: string; // File đánh giá
}

export default function F5_3_3_2Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values,
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Tên Đề Tài" {...form.getInputProps("tenDeTai")} />
            <MyTextInput label="Chủ Nhiệm" {...form.getInputProps("chuNhiem")} />
            <MyTextInput label="Người Đánh Giá" {...form.getInputProps("nguoiDanhGia")} />
            <MyDateInput label="Ngày Đánh Giá" {...form.getInputProps("ngayDanhGia")} />
            <MyNumberInput label="Tổng Điểm" {...form.getInputProps("tongDiem")} />
            <MyTextArea label="Nhận Xét" {...form.getInputProps("nhanXet")} />
            <MyFileInput label="File Đánh Giá" {...form.getInputProps("fileSrc")} />
        </MyActionIconUpdate>
    );
}
