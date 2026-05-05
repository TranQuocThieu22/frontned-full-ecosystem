"use client";
import { useForm } from '@mantine/form';
import { MyButtonCreate, MyNumberInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';

interface ICreateUserViewModel {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    numberPeriod: number;
    numberCredits: number;
    note: string;
    coeUnitId: number | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

interface IOption {
    value: string;
    label: string;
}

export default function FeatSubjectCreate() {


    const form = useForm<ICreateUserViewModel>({
        mode: "uncontrolled",
        initialValues: {
            id: 0,
            code: "",
            name: "",
            concurrencyStamp: "",
            isEnabled: true,
            nameEg: "",
            numberPeriod: 0,
            numberCredits: 0,
            note: "",
            coeUnitId: null,
        },
        validate: {
            code: (value) => (value.trim().length > 0 ? null : "không được để trống"),
            name: (value) => (value.trim().length > 0 ? null : "không được để trống"),
            coeUnitId: (value) => (value ? null : "Vui lòng chọn khoa"),
            numberPeriod: (value) => (value > 0 ? null : "Số tiết phải lớn hơn 0"),
            numberCredits: (value) => (value > 0 ? null : "Số tiết phải lớn hơn 0"),
        },
    });
    return (
        <MyButtonCreate
            form={form}
            onSubmit={(values) => {

            }}
        >
            <MyTextInput withAsterisk label="Mã môn học" {...form.getInputProps("code")} />
            <MyTextInput withAsterisk label="Tên môn học" {...form.getInputProps("name")} />
            <MyTextInput label="Tên môn học Eg" {...form.getInputProps("nameEg")} />
            <MyNumberInput withAsterisk min={0} label="Số tiết" {...form.getInputProps("numberPeriod")} error={form.errors.numberPeriod} />
            <MyNumberInput withAsterisk min={0} label="Số tín chỉ" {...form.getInputProps("numberCredits")} error={form.errors.numberCredits} />
            <MySelect
                label="Khoa quản lý"
                data={parentData?.map((unit) => ({
                    value: unit.id?.toString() || "",
                    label: unit.name?.trim() || "Không có tên",
                })) || []}
                defaultValue={parentData[0]?.id.toString() || ''}
            />



            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </MyButtonCreate>
    );
}


const parentData = [
    { id: '1', name: 'Khoa Kinh tế' },
    { id: '2', name: 'Khoa Lý luận chính trị' },
    { id: '3', name: 'Khoa Khoa học tự nhiên' },
]