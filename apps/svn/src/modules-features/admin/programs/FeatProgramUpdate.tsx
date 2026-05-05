'use client';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { useEffect } from "react";

export interface I_h7op7f4nav_Update {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
    coeUnitId?: number;
    coeUnit?: number | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    updatedBy?: string;
    unitId?: number;
    updatedAt?: Date | undefined;
}

export interface IUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number;
    unitId?: number;
    note?: string;
    unit?: IUnit;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function FeatProgramUpdate({ values }: { values: I_h7op7f4nav_Update }) {

    const form = useForm<I_h7op7f4nav_Update>({
        initialValues: values
    });





    useEffect(() => {
        form.setValues(values);
    }, [values]);

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {

            }}
        >
            <MyTextInput withAsterisk required disabled label='Mã chương trình' {...form.getInputProps("code")} />
            <MyTextInput withAsterisk required label='Tên chương trình' {...form.getInputProps("name")} />
            <MySelect
                data={mockUnit.map(unit => ({
                    value: unit.id.toString(),
                    label: unit.name
                }))}
                label="Khoa quản lý"
                defaultValue={form.values.unitId?.toString() || ""}
                onChange={(value) => form.setFieldValue("coeUnitId", value ? parseInt(value) : undefined)}
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
        </MyActionIconUpdate>);
}

const mockUnit: any[] = [
    { id: 1, name: 'Kinh tế' },
    { id: 2, name: 'Công nghệ thông tin' },
    { id: 3, name: 'Ngoại ngữ' },
]
