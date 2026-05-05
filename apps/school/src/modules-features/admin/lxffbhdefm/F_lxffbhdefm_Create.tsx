'use client';

import { useForm } from '@mantine/form';
import { MyButtonCreate, MyDateInput, MyNumberInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';

export interface I_lxffbhdefm {
    id?: number;
    ngay?: Date;
    buoi?: string;
    nhomHocSinh?: string;
    cheDoAn?: string;
    thucDon?: string;
    dingDuong?: string;
    gia?: string;
}

const BUOI_OPTIONS = ['Sáng', 'Trưa', 'Chiều'];
const NHOM_HOC_SINH_OPTIONS = ['Tiểu học', 'Trung học', 'Phổ thông'];
const CHE_DO_AN_OPTIONS = ['Ăn chay', 'Ăn kiêng', 'Bình thường'];

export default function F_lxffbhdefm_Create() {
    const form = useForm<I_lxffbhdefm>({
        initialValues: {
            ngay: undefined,
            buoi: '',
            nhomHocSinh: '',
            cheDoAn: '',
            thucDon: '',
            dingDuong: '',
            gia: '',
        },
        validate: {
            ngay: (value) => (value ? null : 'Vui lòng chọn ngày'),
            buoi: (value) => (value ? null : 'Vui lòng chọn buổi'),
            nhomHocSinh: (value) => (value ? null : 'Vui lòng chọn nhóm học sinh'),
            cheDoAn: (value) => (value ? null : 'Vui lòng chọn chế độ ăn'),
        },
    });

    return (
        <MyButtonCreate title="Chi tiết thực đơn" form={form} onSubmit={() => { }}>
            <MyDateInput label="Ngày" withAsterisk {...form.getInputProps("ngay")} />

            <MySelect
                label="Buổi"
                withAsterisk
                defaultValue={BUOI_OPTIONS[0]}
                data={BUOI_OPTIONS.map(b => ({ value: b, label: b }))}
                {...form.getInputProps("buoi")}
                clearable
            />

            <MySelect
                label="Nhóm học sinh"
                withAsterisk
                defaultValue={NHOM_HOC_SINH_OPTIONS[0]}
                data={NHOM_HOC_SINH_OPTIONS.map(n => ({ value: n, label: n }))}
                {...form.getInputProps("nhomHocSinh")}
                clearable
            />

            <MySelect
                label="Chế độ ăn"
                defaultValue={CHE_DO_AN_OPTIONS[0]}
                data={CHE_DO_AN_OPTIONS.map(c => ({ value: c, label: c }))}
                {...form.getInputProps("cheDoAn")}
                clearable
            />
            <MyTextArea label="Thực đơn" {...form.getInputProps("thucDon")} />
            <MyTextArea label="Dinh dưỡng" {...form.getInputProps("dingDuong")} />
            <MyNumberInput label="Giá" placeholder="VND" {...form.getInputProps("gia")} hideControls/>
        </MyButtonCreate>
    );
}
