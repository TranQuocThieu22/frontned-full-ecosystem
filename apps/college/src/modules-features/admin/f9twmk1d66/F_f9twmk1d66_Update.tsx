'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyCheckbox from '@/components/Checkbox/MyCheckbox';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
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

export default function F_f9twmk1d66_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
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
            <MyCheckbox label='Mặc định' {...form.getInputProps("macDinh", { type: 'checkbox' })} />
            <MyCheckbox label='Có thuế' {...form.getInputProps("coThue", { type: 'checkbox' })} />
            <MyCheckbox label='Không thu' {...form.getInputProps("khongThu", { type: 'checkbox' })} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    )
}