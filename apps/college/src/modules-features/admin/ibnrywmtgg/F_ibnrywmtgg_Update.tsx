'use client';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

interface I {
    id?: number;
    ngay?: Date | null; // Chuỗi ISO hoặc null
    ghiChu?: string;
}

export default function F_ibnrywmtgg_Update({ data }: { data: I }) {
    const form = useForm<I>({
        initialValues: {
            ...data,
            ngay: data.ngay ? new Date(data.ngay) : null, // Chuyển đổi chuỗi ISO thành Date hoặc null
        },
    });

    const validateDate = (date: any) => {
        return date instanceof Date && !isNaN(date.getTime());
    };

    if (data.ngay && !validateDate(new Date(data.ngay))) {
        console.error("Ngày không hợp lệ:", data.ngay);
    }

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyDateInput
                label="Ngày"
                value={form.values.ngay || null}
                {...form.getInputProps("ngay")}
            />
            <MyTextInput label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    );
}
