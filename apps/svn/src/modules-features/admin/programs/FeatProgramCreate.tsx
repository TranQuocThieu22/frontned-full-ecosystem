'use client'
import { useForm } from '@mantine/form';
import { MyButtonCreate, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';

export interface I_h7op7f4nav_Create {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
    coeUnitId?: number | null;
    coeUnit?: number | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    updatedBy?: string;
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


export default function FeatProgramCreate() {



    const form = useForm<I_h7op7f4nav_Create>({
        initialValues: {
            code: "",
            name: "",
            note: "",
            coeUnitId: null,
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    })
    return (
        <MyButtonCreate form={form} onSubmit={() => {

        }} >
            <MyTextInput withAsterisk label='Mã chương trình' {...form.getInputProps("code")} />
            <MyTextInput withAsterisk label='Tên chương trình' {...form.getInputProps("name")} />
            <MySelect
                data={mockUnit.map(unit => ({
                    value: unit.id.toString(),
                    label: unit.name
                }))
                }
                label="Khoa quản lý"
                onChange={(value) => form.setFieldValue("coeUnitId", value ? parseInt(value) : undefined)}
                error={form.errors.coeUnitId}
                defaultValue={mockUnit[2].id.toString()}
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />


        </MyButtonCreate>
    )
}


const mockUnit: any[] = [
    { id: 1, name: 'Kinh tế' },
    { id: 2, name: 'Công nghệ thông tin' },
    { id: 3, name: 'Ngoại ngữ' },
]
