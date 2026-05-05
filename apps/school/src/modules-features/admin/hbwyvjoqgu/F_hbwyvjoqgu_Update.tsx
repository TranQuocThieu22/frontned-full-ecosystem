'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';

import { useForm } from '@mantine/form';
import { MyDateInput, MyTextInput } from "aq-fe-framework/components";
import { I_hbwyvjoqgu } from './F_hbwyvjoqgu_Read';


export default function F_o4e65ewrwy_Update({ data }: { data: I_hbwyvjoqgu }) {


    const form = useForm<I_hbwyvjoqgu>({
        initialValues: data
    });

    return (
        <MyActionIconUpdate modalSize={"50%"} form={form} onSubmit={() => { }} title="Chi tiết chăm sóc sức khỏe hằng ngày học sinh" >
           <MyTextInput
                disabled
                label="Học sinh"
                withAsterisk
                value={`${form.values.studentCode ?? ''} - ${form.values.surname ?? ''} ${form.values.name ?? ''}`.trim()}
            />

        <MyDateInput label='Ngày sinh' {...form.getInputProps("birthDate")}/>
        <MyTextInput disabled label='Giới tính ' withAsterisk {...form.getInputProps("sex")} />
        <MyTextInput label='Tiền sử bệnh lý'  {...form.getInputProps("medicalHistory")} />
        <MyTextInput label='Kết luận y tế '  {...form.getInputProps("conclude")} />
        <MyDateInput label='Ngày khám' {...form.getInputProps("hospitalDate")}/>
            <MyTextInput label='Tình trạng sức khỏe ' withAsterisk {...form.getInputProps("healthStatus")} />
            <MyTextInput label='Chuẩn đoán cơ sở ' withAsterisk {...form.getInputProps("diagnosis")} />
            <MyTextInput label='Chỉ định thuốc '  {...form.getInputProps("medic")} />
            <MyTextInput label='Đề nghị y tế '  {...form.getInputProps("suggestion")} />
            <MyTextInput label='Kết quả xử lý đề nghị '  {...form.getInputProps("result")} />
        </MyActionIconUpdate>
    );
}