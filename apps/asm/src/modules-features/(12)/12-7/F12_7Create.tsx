'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface I_F12_7_Form {
    counterCode?: string; // Mã bộ đếm
    counterName?: string; // Tên bộ đếm
    professionType?: string; // Loại nghiệp vụ
    objectType?: string; // Loại đối tượng
    repeatingCycle?: string; // Chu kỳ lặp lại
    prefix?: string; // Tiền tố
    suffix?: string; // Hậu tố
    length?: number; // Chiều dài
    useZeroPadding?: boolean; // Có dùng số 0
}

export default function F12_7Create() {
    const form = useForm<I_F12_7_Form>({
        initialValues: {
            counterCode: '', // Mã bộ đếm
            counterName: '', // Tên bộ đếm
            professionType: 'Hồ sơ thí sinh', // Loại nghiệp vụ
            objectType: 'Toàn đơn vị', // Loại đối tượng
            repeatingCycle: 'Không lặp lại', // Chu kỳ lặp lại
            prefix: '', // Tiền tố
            suffix: '', // Hậu tố
            length: 0, // Chiều dài
            useZeroPadding: false, // Mặc định checkbox được chọn
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() =>{}} objectName='Chi tiết bộ đếm'>
            <MyTextInput label='Mã bộ đếm' {...form.getInputProps("counterCode")} />
            <MyTextInput label='Tên bộ đếm' {...form.getInputProps("counterName")} />
            <MySelect data={['Hồ sơ thí sinh','Phiếu báo học phí','Giấy chứng nhận sinh viên','Mã vạch tài sản']} label='Loại nghiệp vụ' {...form.getInputProps("professionType")} />
            <MySelect data={['Toàn đơn vị','Từng user']} label='Loại đối tượng' {...form.getInputProps("objectType")} />
            <MySelect data={['Không lặp lại','Theo năm','Theo tháng năm']} label='Chu kỳ lặp lại' {...form.getInputProps("repeatingCycle")} />
            <MyTextInput label='Tiền tố' {...form.getInputProps("prefix")} />
            <MyTextInput label='Hậu tố' {...form.getInputProps("suffix")} />
            <MyTextInput label='Chiều dài' type="number" {...form.getInputProps("length")} />  
            <Checkbox label="Có dùng số 0" {...form.getInputProps("useZeroPadding", { type: 'checkbox' })}/>
        </MyButtonCreate>
    );
}
