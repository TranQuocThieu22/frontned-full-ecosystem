'use client'
import { MyButtonCreate, MySelect, MyTextInput } from 'aq-fe-framework/components';
import { useForm } from '@mantine/form';
import { loaiDonViSelectData, trucThuocSelectData } from './F_u8zfwd46p2_Read';

interface I_u8zfwd46p2_Create {
    id?: number; // STT
    agentCode?: string //Mã đơn vị
    agentName?: string //Tên đơn vị
    agentType?: string //Loại đơn vị
    affiliatedOf?: string //Trực thuộc
    ghiChu?: string // ghi chú
}

export default function F_u8zfwd46p2_Create() {
    const form = useForm<I_u8zfwd46p2_Create>({
        initialValues: {
            agentCode: "",
            agentName: "",
            ghiChu: '',
        },
        validate: {
            agentCode: (value) => (value ? null : 'Mã đơn vị là bắt buộc'),
            agentName: (value) => (value ? null : 'Tên đơn vị là bắt buộc'),

        },
    });

    return (
        <MyButtonCreate
            title='Chi tiết đơn vị'
            form={form}
            onSubmit={() => { }}
            objectName='Chi tiết đơn vị'
        >
            <MyTextInput label='Mã đơn vị' {...form.getInputProps("agentCode")} />
            <MyTextInput label='Tên đơn vị' {...form.getInputProps("agentName")} />
            <MySelect
                data={loaiDonViSelectData}
                defaultSearchValue={loaiDonViSelectData[3]?.value}
                label="Loại đơn vị"
                {...form.getInputProps("agentType")}
            />
            <MySelect
                data={trucThuocSelectData}
                label="Trực thuộc"
                defaultSearchValue={trucThuocSelectData[0]?.value}
                {...form.getInputProps("affiliatedOf")}
            />
            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />
        </MyButtonCreate>
    );
}
