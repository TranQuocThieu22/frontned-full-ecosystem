'use client'
import { MyActionIconUpdate, MyTextInput, MySelect } from 'aq-fe-framework/components';
import { useForm } from '@mantine/form';
import { loaiDonViSelectData, trucThuocSelectData } from './F_u8zfwd46p2_Read';

interface I_F_u8zfwd46p2_Update {
    id?: number; // STT
    agentCode?: string //Mã đơn vị
    agentName?: string //Tên đơn vị
    agentType?: string //Loại đơn vị
    affiliatedOf?: string //Trực thuộc
    ghiChu?: string // ghi chú
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_u8zfwd46p2_Update({ data }: { data: I_F_u8zfwd46p2_Update }) {


    const form = useForm<I_F_u8zfwd46p2_Update>({
        initialValues: data
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} title="Chi tiết đơn vị" >
            <MyTextInput label='Mã đơn vị ' {...form.getInputProps("agentCode")} />
            <MyTextInput label='Tên đơn vị ' {...form.getInputProps("agentName")} />
            <MySelect data={loaiDonViSelectData} label="Loại đơn vị" {...form.getInputProps("agentType")} />
            <MySelect data={trucThuocSelectData} label="Trực thuộc"  {...form.getInputProps("affiliatedOf")} />
            <MyTextInput label='Ghi chú'  {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    );
}
