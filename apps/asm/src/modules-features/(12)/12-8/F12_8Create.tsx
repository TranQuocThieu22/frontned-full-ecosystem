'use client';

import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';

interface I_F12_8_Form {
    assetTypeCode?: string; // Mã tài sản
    assetTypeName?: string; // Tên tài sản
    objectType?: string; // Thuộc loại
    assetGroup?: string; // Nhóm tài sản
    depreciationRate?: number; // Tỷ lệ hao mòn
    usefulLife?: number; // Số năm sử dụng
    isUse?: boolean; // Sử dụng
    note?: string; // Ghi chú
    isReminder? : boolean; // Thiết lặp nhắc nhở thời gian sắp hết thời gian khấu hao
    typeReminder?: string; // Loại nhắc nhở
    timeReminder?: string; // Thời gian nhắc nhở
}

export default function F12_8Create() {
    const form = useForm<I_F12_8_Form>({
        initialValues: {
            assetTypeCode: '',
            assetTypeName: '',
            objectType: 'Xe công cộng',
            assetGroup: 'Phương tiện truyền dẫn',
            depreciationRate: 0,
            usefulLife: 0,
            isUse: false,
            note: '',
            isReminder: false,
            typeReminder: 'Tháng',
            timeReminder: '1'
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Tài sản' modalSize="70%">
            <MyFlexRow >
                <div style={{ flex: 1 }}>
                    <MyTextInput label='Mã loại tài sản' {...form.getInputProps("assetTypeCode")} />
                    <MyTextInput label='Tên loại tài sản' {...form.getInputProps("assetTypeName")} />
                    <MyTextInput label='Tỷ lệ hao mòn (%)' type="number"  {...form.getInputProps("depreciationRate")} />
                </div>
                <div style={{ flex: 1 }}>
                    <MySelect data={['Xe công cộng']} label='Thuộc loại' {...form.getInputProps("objectType")} />
                    <MySelect data={['Phương tiện truyền dẫn']} label='Nhóm tài sản' {...form.getInputProps("assetGroup")} />
                    <MyTextInput label='Số năm sử dụng' type="number" {...form.getInputProps("usefulLife")} />
                </div>
            </MyFlexRow>
            <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
            <Checkbox label="Thiết lặp nhắc nhở thời gian sắp hết thời gian khấu hao" {...form.getInputProps("isReminder", { type: 'checkbox' })} />
            <MyFlexRow >
                <MySelect data={['Năm', 'Tháng']} label='Chu kỳ nhắc nhở' {...form.getInputProps("typeReminder")} />
                <MySelect data={['1','2']} label=' ' {...form.getInputProps("timeReminder")} />
            </MyFlexRow>
            <Checkbox label="Sử dụng" {...form.getInputProps("isUse", { type: 'checkbox' })} />
        </MyButtonCreate>
    );
}
