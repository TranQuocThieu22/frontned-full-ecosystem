'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

interface I_d5dwr9kd2g_Form {
    id?: number; 
    code: string; 
    name: string; 
    birthday: Date; 
    sex: string; 
    class: string; 
    block: string;
    subject: string;
    namesubject: string;
    numbercredit: number;
    point: number; 
    avaragepoint: boolean;
    note?: string;
}

export default function F_d5dwr9kd2g_Create({ data }: { data: I_d5dwr9kd2g_Form }) {
    const form = useForm<I_d5dwr9kd2g_Form>({
        initialValues: data
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
                                    <MySelect data={[{ value: "SV001", label: "Sinh viên 1" },{ value: "SV002", label: "Sinh viên 2" }]} label='mã sinh viên' {...form.getInputProps("code")}/>
                                    <MyTextInput label='tên sinh viên' {...form.getInputProps("name")}/>
                                    <MyDateInput label='ngày sinh' {...form.getInputProps("birthday")}/>
                                    <MySelect data={[{ value: "Nam", label: "Nam" },{ value: "Nữ", label: "Nữ" }]} label='giới tính' {...form.getInputProps("sex")}/>
                                    <MyTextInput label='mã lớp' {...form.getInputProps("class")}/>
                                    <MySelect data={[{ value: "MH001", label: "Môn học 1" },{ value: "MH002", label: "Môn học 2" }]} label='mã môn học' {...form.getInputProps("subject")}/>
                                    <MyTextInput label='tên môn học' {...form.getInputProps("namesubject")}/>
                                    <MyNumberInput min={0} label='số tín chỉ' {...form.getInputProps("numbercredit")}/>
                                    <MyNumberInput min={0} label='điểm tổng kết' {...form.getInputProps("point")}/>
                                    <Checkbox label="Không tính ĐTB" {...form.getInputProps("avaragepoint", { type: "checkbox" })} />
                                    <MyTextInput label='Ghi chú' {...form.getInputProps("note")}/>
        </MyActionIconUpdate>
    );
}