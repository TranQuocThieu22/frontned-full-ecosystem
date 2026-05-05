'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';


interface I_v2no90ybat {
    sothutu?: number; // STT
    makhoi?: string; // Mã khối
    tenkhoi?: string; // Tên khối
    tenkhoiEg?: string; // Tên hồ sơ Eg
    ghiChu?: string; // Ghi chú
}
export default function F_v2no90ybat_Create() {
    const form = useForm<I_v2no90ybat>({
        initialValues: {
            makhoi: '', // Mã hồ sơ
            tenkhoi: '', // Tên hồ sơ
            tenkhoiEg: '', // Tên hồ sơ Eg
            ghiChu: '',
        },
        validate:{
            makhoi:(value)=>(value?null:'Mã khối bắt buộc nhập'),
            tenkhoi:(value)=>(value?null:'Tên khối bắt buộc nhập'),
            tenkhoiEg:(value)=>(value?null:'Tên khối Eg bắt buộc nhập'),
            ghiChu:(value)=>(value?null:'Ghi chú bắt buộc nhập')
        }
    });
    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết danh mục khối tuyển sinh'>
              <MyTextInput
                    label="Mã khối"
                    placeholder="Nhập mã hồ sơ"
                    {...form.getInputProps('makhoi')}
                />
                <MyTextInput
                    label="Tên khối"
                    placeholder="Nhập tên khối"
                    {...form.getInputProps('tenkhoi')}
                />
                <MyTextInput
                    label="Tên khối Eg"
                    placeholder="Nhập tên hồ sơ Eg"
                    {...form.getInputProps('tenkhoiEg')}
                />
                <MyTextArea
                    label="Ghi chú"
                    placeholder="Nhập ghi chú"
                    {...form.getInputProps('ghiChu')}
                />
              
        </MyButtonCreate>
    )
}


