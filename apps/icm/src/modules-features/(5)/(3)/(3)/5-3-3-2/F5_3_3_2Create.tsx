'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"; // Giả sử bạn có component nhập ngày
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"; // Giả sử bạn có component upload file
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"; // Giả sử bạn có component nhập số
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Flex } from "@mantine/core";
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

export default function F5_3_3_2Create() {
    const form = useForm<I>({
        initialValues: {
            id: undefined, // Sử dụng `undefined` thay vì `null`
            tenDeTai: "",
            chuNhiem: "",
            nguoiDanhGia: "",
            ngayDanhGia: undefined, // Date được khởi tạo là `undefined`
            tongDiem: undefined,
            nhanXet: "",
            fileSrc: ""
        }
    });

    return (
        <MyButtonCreate objectName="Phiếu chấm điểm đề tài NCKH cấp trường" form={form} onSubmit={() => { }}>
            <MyNumberInput
                label="ID"
                {...form.getInputProps("id")}
            />
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MyTextInput
                    label="Đề Tài"
                    {...form.getInputProps("tenDeTai")}
                />
                <MyTextInput label="Chủ nhiệm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Học hàm - học vị" defaultValue="Tiến sĩ" />
            </Flex>
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MyTextInput
                    label="Người Đánh Giá"
                    {...form.getInputProps("nguoiDanhGia")}
                />
                <MyDateInput
                    label="Ngày Đánh Giá"
                    {...form.getInputProps("ngayDanhGia")}
                />
            </Flex>


            <MyNumberInput
                label="Tổng Điểm"
                {...form.getInputProps("tongDiem")}
            />
            <MyTextInput
                label="Nhận Xét"
                {...form.getInputProps("nhanXet")}
            />
            <MyFileInput
                label="File Đánh Giá"
                {...form.getInputProps("fileSrc")}
            />
        </MyButtonCreate>
    );
}
