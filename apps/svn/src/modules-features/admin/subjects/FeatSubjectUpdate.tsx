"use client"
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MyNumberInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { useEffect } from 'react';
interface ICreateUserViewModel {
    id: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nameEg?: string;
    unitName?: string
    numberPeriod?: number;
    numberCredit?: number;
    note?: string;
    coeUnitId?: number | null;
    coeUnit?: any | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
interface IOption {
    value: string;
    label: string;
}
export default function FeatSubjectUpdate({ lecturerAndExpertValues }: { lecturerAndExpertValues: ICreateUserViewModel }) {
    const form = useForm<ICreateUserViewModel>({

        initialValues: lecturerAndExpertValues,

        validate: {
            code: (value) => (value && value.trim().length > 0 ? null : "không được để trống"),
            name: (value) => (value && value.trim().length > 0 ? null : "không được để trống"),
            coeUnitId: (value) => (value && value ? null : "Vui lòng chọn khoa"),
            numberPeriod: (value) => (value && value > 0 ? null : "Số tiết phải lớn hơn 0"),
            numberCredit: (value) => (value && value > 0 ? null : "Số tiết phải lớn hơn 0"),
        },
    });

    useEffect(() => {
        if (lecturerAndExpertValues) {
            form.setValues(lecturerAndExpertValues);
        }
    }, [lecturerAndExpertValues]);


    console.log(form.values.coeUnitId);

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {

            }}
        >
            <MyTextInput withAsterisk disabled label="Mã môn học" {...form.getInputProps("code")} />
            <MyTextInput withAsterisk label="Tên môn học" {...form.getInputProps("name")} />
            <MyTextInput label="Tên môn học Eg" {...form.getInputProps("nameEg")} />
            <MyNumberInput withAsterisk min={0} label="Số tiết" {...form.getInputProps("numberPeriod")} />
            <MyNumberInput withAsterisk min={0} label="Số tín chỉ" {...form.getInputProps("numberCredit")} />

            <MySelect
                label="Khoa quản lý"
                data={parentData?.map((unit) => ({
                    value: unit.id?.toString() || "",
                    label: unit.name?.trim() || "Không có tên",
                })) || []}
                defaultValue={form.values.coeUnitId?.toString() || ""}
            />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </MyActionIconUpdate>
    )
}

const parentData = [
    { id: '1', name: 'Khoa Kinh tế' },
    { id: '2', name: 'Khoa Lý luận chính trị' },
    { id: '3', name: 'Khoa Khoa học tự nhiên' },
]