"use client";
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MySelect, MyTextInput } from 'aq-fe-framework/components';
import { useEffect } from 'react';

export interface IUpdateUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number | null;
    unitId?: number | null;
    note?: string;
    unit?: IUpdateUnit | null;
    parentId?: number;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

const unitType: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};

export default function FeatUnitUpdate({ data }: { data: IUpdateUnit }) {
    const form = useForm<IUpdateUnit>({
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });



    useEffect(() => {
        form.setValues(data);
    }, [data]);

    const getUnitTypeData = () => {
        return Object.entries(unitType).map(([key, label]) => ({
            value: key,
            label,
        }));
    };

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={() => {

                }}
            >
                <MyTextInput withAsterisk disabled label="Mã đơn vị" {...form.getInputProps("code")} />
                <MyTextInput withAsterisk label="Tên đơn vị" {...form.getInputProps("name")} />

                <MySelect
                    data={unitTypeData?.map((unit) => ({
                        value: unit.id?.toString() || "",
                        label: unit.name?.trim() || "Không có tên",
                    })) || []}
                    label="Loại đơn vị"
                    defaultValue={form.values.unitType?.toString() || ""}
                    error={form.errors.unitType}
                />

                <MySelect
                    clearable
                    data={parentData?.map((unit) => ({
                        value: unit.id?.toString() || "",
                        label: unit.name?.trim() || "Không có tên",
                    })) || []}
                    label="Trực thuộc"
                    defaultValue={form.values.parentId?.toString() || ""}
                    error={form.errors.unitId}
                />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyActionIconUpdate>
        </Group>
    );
}
const unitTypeData = [
    { id: '1', name: 'Khoa' },
    { id: '2', name: 'Bộ môn' },
    { id: '3', name: 'Phòng' },
    { id: '4', name: 'Trung tâm' },
]
const parentData = [
    { id: '1', name: 'Khoa Công nghệ thông tin' },
    { id: '2', name: 'Khoa Lý luận chính trị' },
    { id: '3', name: 'Khoa Khoa học tự nhiên' },
]