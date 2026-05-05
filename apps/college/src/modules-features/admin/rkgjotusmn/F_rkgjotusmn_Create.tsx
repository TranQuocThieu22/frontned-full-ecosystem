'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';


interface I {
    id?: number; // STT
    maHoSo?: string; // Mã hồ sơ
    tenHoSo?: string; // Tên hồ sơ
    tenHoSoEg?: string; // Tên hồ sơ Eg
    ghiChu?: string; // Ghi chú
}
export default function F_rkgjotusmn_Create() {
    const form = useForm<I>({
        initialValues: {
            maHoSo: '', // Mã hồ sơ
            tenHoSo: '', // Tên hồ sơ
            tenHoSoEg: '', // Tên hồ sơ Eg
            ghiChu: '', // Ghi chú
        },
        validate:{
            maHoSo:(value)=>(value?null:'Mã hồ sơ bắt buộc nhập'),
            tenHoSo:(value)=>(value?null:'Tên hồ sơ bắt buộc nhập'),
            tenHoSoEg:(value)=>(value?null:'Tên hồ sơ Eg bắt buộc nhập'),
            ghiChu:(value)=>(value?null:'Ghi chú bắt buộc nhập')
        }
    });
    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết hồ sơ sinh viên'>
              <MyTextInput
                    label="Mã hồ sơ"
                    placeholder="Nhập mã hồ sơ"
                    {...form.getInputProps('maHoSo')}
                />
                <MyTextInput
                    label="Tên hồ sơ"
                    placeholder="Nhập tên hồ sơ"
                    {...form.getInputProps('tenHoSo')}
                />
                <MyTextInput
                    label="Tên hồ sơ Eg"
                    placeholder="Nhập tên hồ sơ Eg"
                    {...form.getInputProps('tenHoSoEg')}
                />
                <MyTextArea
                    label="Ghi chú"
                    placeholder="Nhập ghi chú"
                    {...form.getInputProps('ghiChu')}
                />
              
        </MyButtonCreate>
    )
}


