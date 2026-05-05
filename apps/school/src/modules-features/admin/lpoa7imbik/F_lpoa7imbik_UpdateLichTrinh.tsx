// src/modules-features/admin/lpoa7imbik/F_lpoa7imbik_UpdateLichTrinh.tsx
'use client';

import { MyActionIconUpdate, MyTextInput } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";

interface LichTrinhFormValues {
    diemDon: string;
    gioDon: string;
}

interface LichTrinhRecord {
    id: number;
    diemDon: string;
    gioDon: string;
}

interface F_lpoa7imbik_UpdateLichTrinhProps {
    data: LichTrinhRecord;
    onUpdate: (id: number, values: LichTrinhFormValues) => void;
}

export default function F_lpoa7imbik_UpdateLichTrinh({ data, onUpdate }: F_lpoa7imbik_UpdateLichTrinhProps) {
    const form = useForm<LichTrinhFormValues>({
        initialValues: {
            diemDon: data.diemDon,
            gioDon: data.gioDon
        },
        validate: {
            diemDon: (value) => value ? null : 'Không được để trống',
            gioDon: (value) => value ? null : 'Không được để trống'
        }
    });

    return (
        <MyActionIconUpdate
            crudType='update'
            title="Cập nhật điểm đón"
            form={form}
            onSubmit={() => onUpdate(data.id, form.values)}
        >
            <MyTextInput label="Điểm đón" placeholder="Nhập điểm đón" {...form.getInputProps("diemDon")} />
            <MyTextInput label="Giờ đón" placeholder="HH:MM" {...form.getInputProps("gioDon")} />
        </MyActionIconUpdate>
    );
}