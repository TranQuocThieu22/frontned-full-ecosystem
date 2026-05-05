'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    id?: number;
    maChungChi?: string; // Mã chứng chỉ
    tenChungChi?: string; // Tên chứng chỉ
    phanLoai?: string; // Phân loại
    trungTam?: string; // Trung tâm cấp chứng chỉ
    maLienKet?: string
    ghiChu?: string,
}

export default function F7_2Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput
                label="Mã Chứng Chỉ"
                {...form.getInputProps("maChungChi")}
            />
            <MyTextInput
                label="Tên Chứng Chỉ"
                {...form.getInputProps("tenChungChi")}
            />
            <MySelect
                label="Phân Loại"
                {...form.getInputProps("phanLoai")}
                data={["Chứng chỉ", "Chứng nhận"]} // Ví dụ các loại phân loại
            />
            <MySelect
                label="Trung Tâm kỹ năng"
                {...form.getInputProps("trungTam")}
                data={["Công nghệ thông tin", "Trung tâm ngoại ngữ - tin học"]} // Ví dụ các loại phân loại
            />
            <MyTextInput
                label="Mã liên kết"
                {...form.getInputProps("maLienKet")}
            />
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("ghiChu")}
            />
        </MyActionIconUpdate>
    );
}
