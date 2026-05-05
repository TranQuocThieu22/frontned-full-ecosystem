'use_client'

import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Grid } from '@mantine/core';
import { useForm } from '@mantine/form';

interface F_xnbdhfktmx_Create {
    maChuKi: string;
    tenChuKi: string;
    chucVu1VN: string;
    chucVu2VN: string;
    chucVu3VN: string;
    chucVu1EG: string;
    chucVu2EG: string;
    chucVu3EG: string;
    uploadFile: File | null;
    ghiChu: string;
}

export default function F_xnbdhfktmx_Create() {
    const form = useForm<F_xnbdhfktmx_Create>({
        initialValues: {
            maChuKi: "",
            tenChuKi: "",
            chucVu1VN: "",
            chucVu2VN: "",
            chucVu3VN: "",
            chucVu1EG: "",
            chucVu2EG: "",
            chucVu3EG: "",
            uploadFile: null,
            ghiChu: "",
        },
        validate: {
            maChuKi: (value) => value ? null : "Không được để trống",
            tenChuKi: (value) => value ? null : "Không được để trống",
            chucVu1VN: (value, values) => {
                const hasVNPosition = value || values.chucVu2VN || values.chucVu3VN;
                if (!hasVNPosition) return "Phải nhập ít nhất 1 chức vụ VN";
                return null;
            },
            chucVu1EG: (value, values) => {
                const hasEGPosition = value || values.chucVu2EG || values.chucVu3EG;
                if (!hasEGPosition) return "Phải nhập ít nhất 1 chức vụ EG";
                return null;
            },
            uploadFile: (value) => value ? null : "Vui lòng tải lên file chữ ký"
        },
    });

    return (
        <>
            <MyButtonCreate
                form={form}
                modalSize="lg"
                title="Thêm mới chữ ký"
                onSubmit={async (values) => { }}
            >
                <Grid>
                    <Grid.Col span={6}>
                        <MyTextInput
                            label="Mã chữ ký"
                            {...form.getInputProps("maChuKi")} />
                        <MyTextInput
                            label="Chức vụ 1 VN"
                            {...form.getInputProps("chucVu1VN")} />
                        <MyTextInput
                            label="Chức vụ 2 VN"
                            {...form.getInputProps("chucVu2VN")} />
                        <MyTextInput
                            label="Chức vụ 3 VN"
                            {...form.getInputProps("chucVu3VN")} />
                        <MyFileInput
                            label="Tải lên file"
                            placeholder="Tải lên file chữ ký (jpg, jpeg, png, pdf)"
                            accept=".jpg,.jpeg,.png,.pdf"
                            {...form.getInputProps("uploadFile")} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <MyTextInput
                            label="Tên chữ ký"
                            {...form.getInputProps("tenChuKi")} />
                        <MyTextInput
                            label="Chức vụ 1 EG"
                            {...form.getInputProps("chucVu1EG")} />
                        <MyTextInput
                            label="Chức vụ 2 EG"
                            {...form.getInputProps("chucVu2EG")} />
                        <MyTextInput
                            label="Chức vụ 3 EG"
                            {...form.getInputProps("chucVu3EG")} />
                        <MyTextInput
                            label="Ghi chú"
                            {...form.getInputProps("ghiChu")} />
                    </Grid.Col>
                </Grid>
            </MyButtonCreate >
        </>
    )
}

