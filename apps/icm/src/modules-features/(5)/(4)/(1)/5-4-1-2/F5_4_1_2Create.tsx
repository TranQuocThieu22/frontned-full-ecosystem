'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"; // Component nhập ngày
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"; // Component upload file
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"; // Component nhập số
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Flex } from "@mantine/core";
import { useForm } from "@mantine/form";

interface I {
    id?: number;
    maDeTai?: string;
    tenDeTai?: string;
    chuNhiem?: string;
    nguoiDanhGia?: string;
    ngayDanhGia?: Date;
    tongDiem?: number;
    nhanXet?: string;
    fileDanhGiaSrc?: string;
}

export default function F5_4_1_2Create() {
    const form = useForm<I>({
        initialValues: {
            id: undefined, // Giá trị khởi tạo `undefined` cho số
            maDeTai: "",
            tenDeTai: "",
            chuNhiem: "",
            nguoiDanhGia: "",
            ngayDanhGia: undefined, // Giá trị khởi tạo `undefined` cho ngày
            tongDiem: undefined,
            nhanXet: "",
            fileDanhGiaSrc: ""
        }
    });

    return (
        <MyButtonCreate objectName="Phiếu điểm tài nghiên cứu khoa học" form={form} onSubmit={() => { }}>
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MyTextInput
                    label="Mã Đề Tài"
                    {...form.getInputProps("maDeTai")}
                />
                <MyTextInput label="Chủ nhiệm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Học hàm - Học vị" defaultValue="Thạc sỹ" />
            </Flex>
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MyTextInput
                    label="Họ tên người Đánh Giá"
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
                label="Ý kiến khác"
                {...form.getInputProps("nhanXet")}
            />
            <MyFileInput
                label="File Đánh Giá"
                {...form.getInputProps("fileDanhGiaSrc")}
            />
        </MyButtonCreate>
    );
}
