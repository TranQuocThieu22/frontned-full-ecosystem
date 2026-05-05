'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';


export interface I_v16j3xr0cc {
    sothutu?: number; // STT
    malop?: string; // Mã lớp
    tenlop?: string; // Tên lớp
    makhoa?: string; // Mã khóa
    tenkhoa?: string; // Tên khóa
    makhoa1?: string; //mã khoa
    tenkhoa1?: string; // tên khoa
    mabache?: string; // Mã bậc hệ
    tenbache?: string; // tên bậc hệ
    machuongtrinh?: string; // Mã chương trình/Ngành/Nghề
}
export default function F_v16j3xr0cc_Create() {
    const form = useForm<I_v16j3xr0cc>({
        initialValues: {
            malop: '', 
            tenlop: '',
            makhoa: '',
            tenkhoa: '',
            makhoa1: '',
            tenkhoa1: '',
            mabache: '',
            tenbache: '',
            machuongtrinh: '',
        },
        validate:{
            malop:(value)=>(value?null:'Mã lớp bắt buộc nhập'),
            tenlop:(value)=>(value?null:'Tên lớp bắt buộc nhập'),
            makhoa:(value)=>(value?null:'Mã khóa bắt buộc nhập'),
            tenkhoa:(value)=>(value?null:'Tên khóa bắt buộc nhập'),
            makhoa1:(value)=>(value?null:'Mã khoa bắt buộc nhập'),
            tenkhoa1:(value)=>(value?null:'Tên khoa bắt buộc nhập'),
            mabache:(value)=>(value?null:'Mã bậc hệ bắt buộc nhập'),
            tenbache:(value)=>(value?null:'Tên bậc hệ bắt buộc nhập'),
            machuongtrinh:(value)=>(value?null:'Mã chương trình bắt buộc nhập')
        }
    });
    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết danh mục khối tuyển sinh'>
              <MyTextInput
                    label="Mã lớp"
                    placeholder="Nhập mã lớp"
                    {...form.getInputProps('malop')}
                />
                <MyTextInput
                    label="Tên lớp "
                    placeholder="Nhập tên lớp"
                    {...form.getInputProps('tenlop')}
                />
                <MyTextInput
                    label="Mã khóa"
                    placeholder="Nhập mã khóa"
                    {...form.getInputProps('makhoa')}
                />
                <MyTextInput
                    label="Tên khóa"
                    placeholder="Nhập tên khóa"
                    {...form.getInputProps('tenkhoa')}
                />
               <MyTextInput
                    label="Mã khoa"
                    placeholder="Nhập mã khoa"
                    {...form.getInputProps('makhoa1')}
                />
                <MyTextInput
                    label="Tên khoa"
                    placeholder="Nhập tên khoa"
                    {...form.getInputProps('tenkhoa1')}
                />
                <MyTextInput
                    label="Mã bậc hệ"
                    placeholder="Nhập mã bậc hệ"
                    {...form.getInputProps('mabache')}
                />
                <MyTextInput
                    label="Tên bậc hệ"
                    placeholder="Nhập tên bậc hệ"
                    {...form.getInputProps('tenbache')}
                />
                <MyTextInput
                    label="Mã chương trình"
                    placeholder="Nhập mã chương trình"
                    {...form.getInputProps('machuongtrinh')}
                />
              
        </MyButtonCreate>
    )
}


