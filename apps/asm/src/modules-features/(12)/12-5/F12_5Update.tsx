'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import { Radio, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface I_F12_5_Update {
    id?: number;
    NccCode?: string; // Mã NCC
    NCCName?: string; // Tên NCC
    NCCType?: string; // Loại NCC
    taxCode?: string; // Mã số thuế
    address?: string; // Địa chỉ
    KH_NCC?: string; // Nhóm KH/NCC
    representers?: string; // Người đại diện
    telephone?: string; // Điện thoại
    telephone2?: string; // Điện thoại 2
    bank?: string; // Ngân hàng Á Châu
    accountName?: string; // Tên chủ TK
    website?: string; // Website
    email?: string; // Email
    email2?: string; // Email 2
    accountNumber?: string; // Số tài khoản
    chiNhanhNH?: string; // Chi nhánh NH
}

export default function F12_5Update({ data }: { data: I_F12_5_Update }) {
    const form = useForm<I_F12_5_Update>({
        initialValues: data
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize="70%">
            <MyFlexRow>
                <div style={{ flex: 1 }}>
                    <MyTextInput label='Mã NCC' {...form.getInputProps("NccCode")} />
                    <MyTextInput label='Tên NCC' {...form.getInputProps("NCCName")} />
                </div>

                <div style={{ flex: 1 }}>
                    <Stack>
                        <Radio
                            value="1"
                            label="Tổ chức"
                            checked={form.values.NCCType === "1"}
                            onChange={() => form.setFieldValue("NCCType", "1")}
                        />
                        <Radio
                            value="2"
                            label="Cá nhân"
                            checked={form.values.NCCType === "2"}
                            onChange={() => form.setFieldValue("NCCType", "2")}
                        />
                    </Stack>
                </div>

            </MyFlexRow>


            <MyTextInput label='Mã số thuế' {...form.getInputProps("taxCode")} style={{ width: '49%' }} />
            <MyTextInput label='Địa chỉ' {...form.getInputProps("address")} />
            <MySelect label='Nhóm KH/NCC' {...form.getInputProps("KH_NCC")} data={['Nhà cung cấp hàng hóa']} defaultValue="Nhà cung cấp hàng hóa" />
            <MyFlexRow>
                <div style={{ flex: 1 }}>
                    <MyTextInput label='Người đại diện' {...form.getInputProps("representers")} />
                    <MyTextInput label='Điện thoại' {...form.getInputProps("telephone")} />
                    <MyTextInput label='Điện thoại 2' {...form.getInputProps("telephone2")} />
                    <MySelect data={['Ngân hàng Á Châu', 'Ngân hàng ACB']} label='Ngân hàng' {...form.getInputProps("bank")} />
                    <MyTextInput label='Tên chủ tài khoản' {...form.getInputProps("accountName")} />
                </div>
                <div style={{ flex: 1 }}>
                    <MyTextInput label='Website' {...form.getInputProps("website")} />
                    <MyTextInput label='Email' {...form.getInputProps("email")} />
                    <MyTextInput label='Email 2' {...form.getInputProps("email2")} />
                    <MyTextInput label='Số tài khoản' {...form.getInputProps("accountNumber")} />
                    <MyTextInput label='Chi nhánh NH' {...form.getInputProps("chiNhanhNH")} />
                </div>
            </MyFlexRow>


        </MyActionIconUpdate>
    );
}
