"use client";
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyButtonCreate, MySelect, MyTextInput } from 'aq-fe-framework/components';
import { useEffect, useState } from 'react';

export interface ICreateUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number | null;
    unitId?: number | null;
    note?: string;
    unit?: ICreateUnit | null;
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

export default function FeatUnitCreate() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<ICreateUnit>({
        initialValues: {
            id: 0,
            code: "",
            name: "",
            concurrencyStamp: "",
            isEnabled: true,
            unitType: 1,
            unitId: null,
            note: "",
            unit: null,
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            unitType: (value) => (value !== null && value !== undefined) ? null : 'Không được để trống',
        }
    });
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });



    useEffect(() => {
        form_multiple.setValues({ importedData: fileData });
    }, [fileData]);



    const handleUnitSelectChange = (value: string | null) => {
        form.setFieldValue("unitId", value ? parseInt(value) : null);
    };

    return (
        <Group>
            <MyButtonCreate
                objectName='đơn vị'
                form={form}
                onSubmit={() => {

                }}
            >
                <MyTextInput withAsterisk label="Mã đơn vị" {...form.getInputProps("code")} />
                <MyTextInput withAsterisk label="Tên đơn vị" {...form.getInputProps("name")} />

                <MySelect
                    data={unitTypeData?.map((unit) => ({
                        value: unit.id?.toString() || "",
                        label: unit.name?.trim() || "Không có tên",
                    })) || []}
                    label="Loại đơn vị"
                    defaultValue={unitTypeData[0]?.id?.toString() || ""}
                    error={form.errors.unitType}
                />

                <MySelect
                    clearable
                    data={parentData?.map((unit) => ({
                        value: unit.id?.toString() || "",
                        label: unit.name?.trim() || "Không có tên",
                    })) || []}
                    label="Trực thuộc"
                    defaultValue={parentData[0]?.id?.toString() || ""}
                    error={form.errors.unitId}
                />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyButtonCreate>
        </Group >
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