'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
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

export default function F5_4_1_2Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values,
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
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
        </MyActionIconUpdate>
    );
}
