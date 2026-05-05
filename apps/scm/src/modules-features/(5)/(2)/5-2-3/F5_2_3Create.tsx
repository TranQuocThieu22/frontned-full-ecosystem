'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"; // Giả định bạn có một NumberInput custom
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface I {
    id?: number;
    tenDeTai?: string; // Tên đề tài
    linhVuc?: string; // Lĩnh vực
    giangVienDangKy?: string; // Giảng viên đăng ký
    donViCongTac?: string; // Đơn vị công tác
    kinhPhiDuKien?: number; // Kinh phí dự kiến
    thoiGianDuKien?: number; // Thời gian dự kiến (tháng)
    ketQuaPhanbien?: string; // Kết quả phản biện
    yKienHoidong?: string; // Ý kiến hội đồng
    dongY?: boolean; // Đồng ý
}

export default function F5_2_3Create() {
    const form = useForm<I>({
        initialValues: {
            id: undefined, // ID (ẩn hoặc không cần input)
            tenDeTai: "", // Tên đề tài
            linhVuc: "", // Lĩnh vực
            giangVienDangKy: "", // Giảng viên đăng ký
            donViCongTac: "", // Đơn vị công tác
            kinhPhiDuKien: undefined, // Kinh phí dự kiến
            thoiGianDuKien: undefined, // Thời gian dự kiến (tháng)
            ketQuaPhanbien: "", // Kết quả phản biện
            yKienHoidong: "", // Ý kiến hội đồng
            dongY: false, // Đồng ý
        },
    });

    return (
        <MyButtonCreate objectName="đề tài" form={form} onSubmit={() => { }}>
            <MyTextInput label="Tên đề tài" {...form.getInputProps("tenDeTai")} />
            <MySelect
                label="Lĩnh vực"
                data={[
                    { value: "linh_vuc_1", label: "Lĩnh vực 1" },
                    { value: "linh_vuc_2", label: "Lĩnh vực 2" },
                ]}
                {...form.getInputProps("linhVuc")}
            />
            <MyTextInput
                label="Giảng viên đăng ký"
                {...form.getInputProps("giangVienDangKy")}
            />
            <MyTextInput
                label="Đơn vị công tác"
                {...form.getInputProps("donViCongTac")}
            />
            <MyNumberInput
                label="Kinh phí dự kiến"
                min={0}
                step={1000}
                {...form.getInputProps("kinhPhiDuKien")}
            />
            <MyNumberInput
                label="Thời gian dự kiến (tháng)"
                min={1}
                step={1}
                {...form.getInputProps("thoiGianDuKien")}
            />
            <Textarea
                label="Kết quả phản biện"
                autosize
                minRows={2}
                {...form.getInputProps("ketQuaPhanbien")}
            />
            <Textarea
                label="Ý kiến hội đồng"
                autosize
                minRows={2}
                {...form.getInputProps("yKienHoidong")}
            />
            <Checkbox label="Đồng ý" {...form.getInputProps("dongY", { type: "checkbox" })} />
        </MyButtonCreate>
    );
}
