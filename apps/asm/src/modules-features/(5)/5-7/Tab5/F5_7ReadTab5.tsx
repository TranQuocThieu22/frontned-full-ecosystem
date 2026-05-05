'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Fieldset, Group, NumberInput, TextInput } from '@mantine/core';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import F5_7ReadTableTab5 from './F5_7ReadTableTab5';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';

interface I_F5_7ReadTab5 {
    deliveryReceipt?: string; // Biên bản giao nhận
    basisOfDecision?: string; // Căn cứ quyết định
    minutesDate?: Date | null; // Ngày biên bản
    decisionDate?: Date | null; // Ngày quyết định
    ofPartners?: string; // Của đối tác
}

export default function DeliveryDecisionCreate() {
    const form = useForm<I_F5_7ReadTab5>({
        initialValues: {
            deliveryReceipt: '',
            basisOfDecision: '',
            minutesDate: null,
            decisionDate: null,
            ofPartners: '',
        },

    });


    return (
        <Fieldset>
            <MyFlexColumn>
                <MyFlexRow>
                    <div style={{ flex: "1" }}>
                        <MyTextInput label='Biên bản giao nhận' {...form.getInputProps('deliveryReceipt')} />
                        <MyTextInput label='Căn cứ quyết định' {...form.getInputProps('basisOfDecision')} />
                    </div>
                    <div style={{ flex: "1" }}>
                        <MyDateInput label='Ngày biên bản' {...form.getInputProps('minutesDate')} />
                        <MyDateInput label='Ngày quyết định' {...form.getInputProps('decisionDate')} />
                    </div>
                </MyFlexRow>
                <TextInput label='Của đối tác' placeholder='Nhập thông tin đối tác'{...form.getInputProps('ofPartners')} />
                <F5_7ReadTableTab5 />
                <MyTextInput label="Địa điểm giao/ nhận" {...form.getInputProps('address')} />
                <NumberInput w={"30%"} label="Giá mua" placeholder='Nhập giá mua'
                // {...form.getInputProps('price')}
                />
                <Group w={"100%"} gap={80}>
                    <NumberInput
                        w={"30%"}
                        label="Phí vận chuyển"
                        placeholder='Nhập phí vận chuyển'
                    // {...form.getInputProps('price')}
                    />
                    <NumberInput
                        w={"30%"}
                        label="Phí chạy thử"
                        placeholder='Nhập phí chạy thử'
                    />
                </Group>
                <MyFileInput label="Tài liệu kỹ thuật kèm theo" />
                <Group justify="flex-end">
                    <MyButton crudType="save" />
                </Group>
            </MyFlexColumn>



        </Fieldset>


    );
}
