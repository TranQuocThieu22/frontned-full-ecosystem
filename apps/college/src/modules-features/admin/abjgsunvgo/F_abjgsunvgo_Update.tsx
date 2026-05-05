'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    bacHeCode?: string; // Mã sinh viên
    name?: string //tên bậc hệ
    nameEg?: string //tên bậc hệ Eg
    quyChe?: string 
    bac?: string 
    he?: string 
   
    soHocKyCT?: number 
    soHocKyMax?: number 
    soHocKyNamHoc?: number 
    vietTatTS?: string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_abjgsunvgo_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong

    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
           <MyTextInput label='Mã bậc hệ' {...form.getInputProps("bacHeCode")} />
            <MyTextInput label='Tên bậc hệ' {...form.getInputProps("name")} />
            <MyTextInput label='Tên bậc hệ Eg' {...form.getInputProps("nameEg")} />
            <Select
                label="Quy chế"
                data={[
                    { value: "1", label: "Thông tư 08" },
                    { value: "2", label: "Thông tư 09" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("quyChe", value?.toString())}
                />
                <Select
                
                label="Bậc đào tạo"
                data={[
                    { value: "1", label: "Cao đẳng" },
                    { value: "2", label: "Liên thông" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("bac", value?.toString())}
                />
                <Select
              
                label="Hệ đào tạo"
                data={[
                    { value: "1", label: "Chính quy" },
                    { value: "2", label: "Liên thông" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("he", value?.toString())}
                />
           
           
            <MyTextInput label='Số học kỳ chương trình' {...form.getInputProps("soHocKyCT")} />
            <MyTextInput label='Số học kỳ tối đa' {...form.getInputProps("soHocKyMax")} />
            <MyTextInput label='Số học kỳ năm học' {...form.getInputProps("soHocKyNamHoc")} />
            <MyTextInput label='Viết tắt tuyển sinh' {...form.getInputProps("vietTatTS")} />
        </MyActionIconUpdate>
    )
}