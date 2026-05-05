'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';

import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import F4_3ReadList from './F4_3ReadList';
import { Button, FileInput, Textarea } from '@mantine/core';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';

export interface I_F4_3_Create {
    documentDate?: Date | null; // Ngày chứng từ
    depreciationCertificate?: string; // Chứng từ khấu hao
    depreciationDate?: Date | null; // Ngày tính khấu hao
    note?: string; // Ghi chú
}

export default function F4_3Create() {
    const dis = useDisclosure();
    const form = useForm<I_F4_3_Create>({
        initialValues: {
            documentDate: null, // Ngày chứng từ
            depreciationCertificate: '', // Chứng từ khấu hao
            depreciationDate: null, // Ngày tính khấu hao
            note: '', // Ghi chú
        },
        validate: {
            documentDate: (value) => (value ? null : 'Ngày chứng từ là bắt buộc'),
            depreciationCertificate: (value) => (value ? null : 'Chứng từ khấu hao là bắt buộc'),
            depreciationDate: (value) => (value ? null : 'Ngày tính khấu hao là bắt buộc'),
        },
    });

    const handleSubmit = (values: I_F4_3_Create) => {
        const validationErrors = form.validate();
        if (validationErrors.hasErrors) {
            showNotification({
                title: 'Lỗi nhập liệu',
                message: 'Vui lòng điền đầy đủ thông tin vào các trường bắt buộc!',
                color: 'red',
            });
            return;
        }
        console.log('Dữ liệu hợp lệ:', values);
        showNotification({
            title: 'Thành công',
            message: 'Thêm mới chứng từ khấu hao thành công!',
            color: 'green',
        });
    };

    return (
        <MyButtonModal
            crudType={'create'}
            onSubmit={() => handleSubmit(form.values)} objectName='Chứng từ khấu hao' disclosure={dis} label="Thêm" modalSize="70%">
            <MyFlexRow>
                <MyDateInput style={{ flex: "1" }} label='Ngày chứng từ' />
                <MyFileInput clearable style={{ flex: "1" }} label="Chứng từ khấu hao"{...form.getInputProps("file")} />
                <MyDateInput style={{ flex: "1" }} label='Ngày tính khấu hao' />
            </MyFlexRow>
            <Textarea label='Ghi chú' placeholder='Nhập ghi chú' minRows={4} />
            <F4_3ReadList />
            <Button>
                Lưu và tính
            </Button>
        </MyButtonModal>
    );
}
