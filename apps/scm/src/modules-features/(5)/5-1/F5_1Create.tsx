'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"; // Component nhập ngày
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I5_1 {
    id?: number;
    maDeTai?: string;
    tenDeTai?: string;
    capDeTai?: string;
    loaiDeTai?: string;
    thoiGianBatDau?: Date;
    thoiGianKetThuc?: Date;
    nguonKinhPhi?: string;
    trangThai?: string;
}

export default function F5_1Create() {
    const form = useForm<I5_1>({
        initialValues: {
            id: undefined, // Khởi tạo `undefined` cho số
            maDeTai: "",
            tenDeTai: "",
            capDeTai: "",
            loaiDeTai: "",
            thoiGianBatDau: undefined, // Giá trị ngày khởi tạo là `undefined`
            thoiGianKetThuc: undefined,
            nguonKinhPhi: "",
            trangThai: ""
        }
    });

    return (
        <MyButtonCreate label="Đăng ký" form={form} onSubmit={() => { }}>
            <MyTextInput
                label="Mã Đề Tài"
                {...form.getInputProps("maDeTai")}
            />
            <MyTextInput
                label="Tên Đề Tài"
                {...form.getInputProps("tenDeTai")}
            />
            <MySelect
                label="Cấp Đề Tài"
                {...form.getInputProps("capDeTai")}
                data={["Cấp trường", "Cấp khoa", "Cấp tỉnh"]} // Ví dụ về lựa chọn cấp đề tài
            />
            <MySelect
                label="Loại Đề Tài"
                {...form.getInputProps("loaiDeTai")}
                data={["Loại A", "Loại B", "Loại C"]} // Ví dụ về lựa chọn loại đề tài
            />
            <MyDateInput
                label="Thời Gian Bắt Đầu"
                {...form.getInputProps("thoiGianBatDau")}
            />
            <MyDateInput
                label="Thời Gian Kết Thúc"
                {...form.getInputProps("thoiGianKetThuc")}
            />
            <MyTextInput
                label="Nguồn Kinh Phí"
                {...form.getInputProps("nguonKinhPhi")}
            />
            <MySelect
                data={['Đang thực hiện', 'Đã thanh lý', 'Trễ hạn', 'Gia hạn']}
                label="Trạng Thái"
                {...form.getInputProps("trangThai")}
            />
        </MyButtonCreate>
    );
}
