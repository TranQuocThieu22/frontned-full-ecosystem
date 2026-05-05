'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

export interface I_w0d4wkrvnn {
    id?: number; // STT
    monHoc: string;
    hinhThucThi: string;
    soChiTiet: number;
    tinhChatPhong: string;
}
const dataHinhThucThi = ["LT-Lý thuyết", "TH-Thực hành"]
const dataMonHoc = ["M01-Lập trình C#", "M02-Python"]
const dataTinhChatPhong = ["Lý thuyết", "Thực hành"]

export default function F_vnyrext6ag_Create() {
    const form = useForm<I_w0d4wkrvnn>({
        initialValues: {
            monHoc: "",
            hinhThucThi: "",
            soChiTiet: 0,
            tinhChatPhong: "",
        },
        validate: {
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} title='Tính chất thi môn học'>
            <MySelect label='Môn học' data={dataMonHoc} {...form.getInputProps("monHoc")} />
            <MySelect label='Hình thức thi' data={dataHinhThucThi} {...form.getInputProps("hinhThucThi")} />
            <MyTextInput label='Số tiết thi'  {...form.getInputProps("soChiTiet")} />
            <MySelect label='Tính chất phòng' data={dataTinhChatPhong} {...form.getInputProps("tinhChatPhong")} />
        </MyButtonCreate>
    );
}