'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { I_drcwtvzsom_Create } from './F_drcwtvzsom_Create';



export default function F_drcwtvzsom_Update({ value }: { value: I_drcwtvzsom_Create }) {
    const form = useForm<I_drcwtvzsom_Create>({
        initialValues: value,
        validate: {
            tenNganHang: (value) => (!value ? 'Tên ngân hàng không được để trống' : null),
            tenNganHangEg: (value) => (!value ? 'Tên ngân hàng english không được để trống' : null),
        },
    })

    return (
        <MyActionIconUpdate modalSize={"40%"} form={form} onSubmit={() => { }} >
           <MyTextInput
                label='Mã ngân hàng'
                disabled
                placeholder='Nhập mã ngân hàng'
                {...form.getInputProps('maNganHang')}

            />
            <MyTextInput
                label='Tên ngân hàng'
                placeholder='Nhập tên ngân hàng'
                {...form.getInputProps('tenNganHang')}
            />
            <MyTextInput
                label='Tên ngân hàng Eg'
                placeholder='Nhập tên ngân hàng english'
                {...form.getInputProps('tenNganHangEg')}
            />
            <MyTextArea
                label='Ghi chú'
                placeholder='Nhập ghi chú'
                {...form.getInputProps('ghiChu')}
            />
        </MyActionIconUpdate>
    )
}
