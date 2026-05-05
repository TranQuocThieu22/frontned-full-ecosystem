'use client';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MySelect from '@/components/Combobox/Select/MySelect';
import { useForm } from '@mantine/form';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import { MyNumberInput } from 'aq-fe-framework/components';

export interface I_lxffbhdefm {
    id?: number;
    ngay?: Date;
    buoi?: string;
    nhomHocSinh?: string;
    cheDoAn?: string;
    thucDon?: string;
    dingDuong?: string;
    gia?: number;
}

const BUOI_OPTIONS = ['Sáng', 'Trưa', 'Chiều'];
const NHOM_HOC_SINH_OPTIONS = ['Tiểu học', 'Trung học', 'Phổ thông'];
const CHE_DO_AN_OPTIONS = ['Ăn chay', 'Ăn kiêng', 'Bình thường'];

export default function F_lxffbhdefm_Update({ data }: { data: I_lxffbhdefm }) {
    const form = useForm<I_lxffbhdefm>({
        initialValues: { ...data },
        validate: {
            ngay: (value) => (value ? null : 'Vui lòng chọn ngày'),
            buoi: (value) => (value ? null : 'Vui lòng chọn buổi'),
            nhomHocSinh: (value) => (value ? null : 'Vui lòng chọn nhóm học sinh'),
            cheDoAn: (value) => (value ? null : 'Vui lòng chọn chế độ ăn'),
        },
    });

    return (
        <MyActionIconUpdate title="Chi tiết thực đơn" form={form} onSubmit={() => { }}>
            <MyDateInput label="Ngày" withAsterisk {...form.getInputProps("ngay")} />

            <MySelect
                label="Buổi"
                withAsterisk
                data={BUOI_OPTIONS.map(b => ({ value: b, label: b }))}
                {...form.getInputProps("buoi")}
                clearable
            />

            <MySelect
                label="Nhóm học sinh"
                withAsterisk
                data={NHOM_HOC_SINH_OPTIONS.map(n => ({ value: n, label: n }))}
                {...form.getInputProps("nhomHocSinh")}
                clearable
            />

            <MySelect
                label="Chế độ ăn"
                data={CHE_DO_AN_OPTIONS.map(c => ({ value: c, label: c }))}
                {...form.getInputProps("cheDoAn")}
                clearable
            />

            <MyTextArea label="Thực đơn" {...form.getInputProps("thucDon")} />

            <MyTextArea label="Dinh dưỡng" {...form.getInputProps("dingDuong")} />

            <MyNumberInput min={0} label="Giá" placeholder="VND" {...form.getInputProps("gia")} hideControls/>
        </MyActionIconUpdate>
    );
}
