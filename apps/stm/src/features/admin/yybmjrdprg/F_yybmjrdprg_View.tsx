'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconUpload, IconZoomScan } from '@tabler/icons-react';
import F_yybmjrdprg_ListStudent from './F_yybmjrdprg_ListStudent';

export interface I_yybmjrdprg {
    id?: number,
    ngayGui?: string,
    tieuDe?: string,
    loaiDoiTuong?: string,
    soLuong?: number
}
export interface I {
    maHV?: string;
    name?: string;
    sex?: string;
    dateOfBirth?: string;
    sdt?: string;
    email?: string;
    cccd?: string;
    ngaycap?: string;
    noicap?: string;
    diachi?: string;
    soqd?: string;
    ngayqd?: string;
    chungchi?: string;
    maKH?: string;
    maKT?: string;
}
export default function F_yybmjrdprg_View({ values }: { values: I_yybmjrdprg }) {
    const dics = useDisclosure();

    const form = useForm<I_yybmjrdprg>({
        initialValues: {
            ...values
        },
        validate: {
        },
    });

    return (
        <>
            <MyButtonCreate
                form={form}
                onSubmit={() => { }}
                label='Xem'
                title='Chi tiết nội dung thông báo'
                modalSize="60%"
                leftSection={<IconZoomScan />}
            >
                <MyTextInput label="Tiêu đề" {...form.getInputProps('tieuDe')} />
                <MySelect
                    data={["Học viên có quyết định cấp chứng chỉ", "Học viên đang học"]}
                    label="Loại đối tượng"
                    {...form.getInputProps('loaiDoiTuong')}
                />
                <MyTextInput label="Người nhận" leftSection={<IconSearch />} onClick={dics[1].open} readOnly />
                <MyTextArea label="Nội dung thông báo" {...form.getInputProps('noidung')} />
                <MyFileInput label="File đính kèm" leftSection={<IconUpload />} {...form.getInputProps('filedk')} />
            </MyButtonCreate>
            <F_yybmjrdprg_ListStudent disclosure={dics} />
        </>
    );
}
