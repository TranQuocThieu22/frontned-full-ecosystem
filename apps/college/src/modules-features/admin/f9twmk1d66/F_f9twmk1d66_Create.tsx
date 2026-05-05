'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyCheckbox from '@/components/Checkbox/MyCheckbox';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { I_f9twmk1d66_dataBoDem, I_f9twmk1d66_dataDonViTinh, I_f9twmk1d66_dataNhomTVL } from './F_f9twmk1d66_Read';

export interface I {
    id?: number;
    maLoaiThuVL?: string;
    tenLoaiThuVL?: string;
    donViTinh?: string;
    donGia?: number;
    maNhomThuVL?: string;
    maBoDem?: string;
    macDinh?: boolean;
    khongThu?: boolean;
    coThue?: boolean;
    ghiChu?: string;
}

export default function F_f9twmk1d66_Create() {
    const form = useForm<I>({
        initialValues: {
            maLoaiThuVL: "",
            tenLoaiThuVL: "",
            donViTinh: "",
            donGia: 0,
            maNhomThuVL: "",
            maBoDem: "",
            macDinh: false,
            khongThu: false,
            coThue: false,
            ghiChu: ""
        },
        validate: {
            maLoaiThuVL: (value) => (value ? null : 'Mã là bắt buộc'),
        },
    });
    const handleSubmit = (values: I) => {
        const validationErrors = form.validate();
        if (validationErrors.hasErrors) {
            showNotification({
                title: 'Lỗi nhập liệu',
                message: 'Vui lòng điền đầy đủ thông tin vào các trường bắt buộc!',
                color: 'red',
            });
            return;
        }
        console.log('Dữ liệu hợp lệ:', values);
        showNotification({
            title: 'Thành công',
            message: 'Thêm mới thành công!',
            color: 'green',
        });
    };

    return (
        <MyButtonCreate form={form} onSubmit={handleSubmit} objectName='loại thu vãng lai' >
            <MyTextInput label='Mã loại thu VL' {...form.getInputProps("maLoaiThuVL")} />
            <MyTextInput label='Tên loại thu VL' {...form.getInputProps("tenLoaiThuVL")} />
            <Select
                label="Đơn vị tính"
                data={I_f9twmk1d66_dataDonViTinh}
                defaultValue={form.values.donViTinh}
                onChange={(value) => {
                    value && form.setFieldValue('donViTinh', value);
                }}
            />
            <MyTextInput label='Đơn giá' {...form.getInputProps("donGia")} type="number" />
            <Select
                label="Nhóm thu VL"
                data={I_f9twmk1d66_dataNhomTVL}
                defaultValue={form.values.maNhomThuVL}
                onChange={(value) => {
                    value && form.setFieldValue('maNhomThuVL', value);
                }}
            />
            <Select
                label="Bộ đếm"
                data={I_f9twmk1d66_dataBoDem}
                defaultValue={form.values.maBoDem}
                onChange={(value) => {
                    value && form.setFieldValue('maBoDem', value);
                }}
            />
            <MyCheckbox label='Mặc định' {...form.getInputProps("macDinh")} />
            <MyCheckbox label='Có thuế' defaultChecked {...form.getInputProps("coThue")} />
            <MyCheckbox label='Không thu' {...form.getInputProps("khongThu")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />
        </MyButtonCreate>
    )
}