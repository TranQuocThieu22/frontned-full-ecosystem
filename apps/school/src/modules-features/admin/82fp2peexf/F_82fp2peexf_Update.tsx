'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MySelect from '@/components/Combobox/Select/MySelect';
import { useEffect } from 'react';
import { I_82fp2peexf } from './F_82fp2peexf_Read';
import {
    IconMoodSad,
    IconMoodNeutral,
    IconMoodHappy,
} from '@tabler/icons-react';
import { ActionIcon, Group, Text } from '@mantine/core';



export default function F_82fp2peexf_Update({ data }: { data: I_82fp2peexf }) {
    const form = useForm<I_82fp2peexf>({
        initialValues: {
            ...data
        },
        validate: {
            maHocSinh: (value) => (value ? null : 'Vui lòng chọn học sinh'),
            doiTuongKhieuNai: (value) => (value ? null : 'Vui lòng chọn đối tượng khiếu nại'),
            nguoiGui: (value) =>
                value && value.length >= 2 ? null : 'Tên người gửi phải có ít nhất 2 ký tự',
            loaiKhieuNai: (value) => (value ? null : 'Vui lòng chọn loại khiếu nại'),
            noiDungKhieuNai: (value) =>
                value && value.length >= 10
                    ? null
                    : 'Nội dung khiếu nại phải có ít nhất 10 ký tự',
            trangThaiPhanHoi: (value) => (value ? null : 'Vui lòng chọn trạng thái phản hồi'),
            noiDungPhanHoi: (value) =>
                value && value.length >= 10
                    ? null
                    : 'Nội dung phản hồi phải có ít nhất 10 ký tự',
            fileDinhKem: (value) => (value ? null : 'Vui lòng đính kèm file'),
        },
    });

    const HOC_SINH_DATA = [
        { maHocSinh: 'HS001', hoTen: 'Nguyễn Văn A', lop: '10A1' },
        { maHocSinh: 'HS002', hoTen: 'Trần Thị B', lop: '10A2' },
        { maHocSinh: 'HS003', hoTen: 'Lê Văn C', lop: '10A3' },
    ];
    const DOI_TUONG_KN_DATA = [
        { doiTuongKhieuNai: 'Phụ huynh' },
        { doiTuongKhieuNai: 'Học sinh' },
    ];

    useEffect(() => {
        const selected = HOC_SINH_DATA.find(hs => hs.maHocSinh === form.values.maHocSinh);
        if (selected) {
            form.setValues({
                hoTen: selected.hoTen,
                lop: selected.lop,
            });
        }
    }, [form.values.maHocSinh]);

    return (
        <MyButtonCreate label='Phản hồi' modalSize={'xl'} title='Đánh giá xử lý khiếu nại' form={form} onSubmit={() => { }}>
            <MySelect
                label="Học sinh"
                disabled
                withAsterisk
                data={HOC_SINH_DATA.map(hs => ({
                    value: hs.maHocSinh,
                    label: `${hs.hoTen} - ${hs.maHocSinh} - ${hs.lop}`
                }))}
                {...form.getInputProps("maHocSinh")}
                clearable
            />
            <MySelect
                label="Đối tượng khiếu nại"
                disabled
                data={DOI_TUONG_KN_DATA.map(tx => ({
                    value: tx.doiTuongKhieuNai,
                    label: tx.doiTuongKhieuNai
                }))}
                {...form.getInputProps("doiTuongKhieuNai")}
                clearable
            />
            <MyTextInput label="Người gửi" {...form.getInputProps("nguoiGui")} />
            <MySelect
                label="Loại khiếu nại"
                disabled
                placeholder='Chất lượng món ăn'
                data={["Chất lượng món ăn", "Vệ sinh", "Phục vụ", "Thanh toán"]}
                {...form.getInputProps("loaiKhieuNai")}
                clearable
            />
            <MyTextArea label="Nội dung khiếu nại" {...form.getInputProps("noiDungKhieuNai")} />
            <MyTextArea label="Nội dung phản hồi" {...form.getInputProps("noiDungPhanHoi")} />

            <MySelect
                label="Trạng thái"
                disabled
                data={["Đã xử lý", "Chưa xử lý"]}
                {...form.getInputProps("trangThaiPhanHoi")}
                clearable
            />
            <Text size="sm" fw={500} mb={4}>Mức độ hài lòng</Text>
            <Group gap="xl" mb="md">
                <ActionIcon
                    variant={form.values.danhGiaMucDoHaiLong === 'Không hài lòng' ? 'filled' : 'default'}
                    color={form.values.danhGiaMucDoHaiLong === 'Không hài lòng' ? 'red' : 'gray'}
                    size="60"
                    radius="xl"
                    onClick={() => form.setFieldValue('danhGiaMucDoHaiLong', 'Không hài lòng')}
                >
                    <IconMoodSad style={{ width: 55, height: 55 }} stroke={1} />
                </ActionIcon>
                <ActionIcon
                    variant={form.values.danhGiaMucDoHaiLong === 'Bình thường' ? 'filled' : 'default'}
                    color={form.values.danhGiaMucDoHaiLong === 'Bình thường' ? 'yellow' : 'gray'}
                    size="60"
                    radius="xl"
                    onClick={() => form.setFieldValue('danhGiaMucDoHaiLong', 'Bình thường')}
                >
                    <IconMoodNeutral style={{ width: 55, height: 55 }} stroke={1} />
                </ActionIcon>
                <ActionIcon
                    variant={form.values.danhGiaMucDoHaiLong === 'Hài lòng' ? 'filled' : 'default'}
                    color={form.values.danhGiaMucDoHaiLong === 'Hài lòng' ? 'green' : 'gray'}
                    size="60"
                    radius="xl"
                    onClick={() => form.setFieldValue('danhGiaMucDoHaiLong', 'Hài lòng')}
                >
                    <IconMoodHappy style={{ width: 55, height: 55 }} stroke={1} />
                </ActionIcon>
            </Group>
            <MyTextArea label="Nội dung đánh giá" {...form.getInputProps("noiDungDanhGia")} />
        </MyButtonCreate>
    );
}