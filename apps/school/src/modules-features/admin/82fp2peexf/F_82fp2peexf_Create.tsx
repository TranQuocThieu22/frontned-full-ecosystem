'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MySelect from '@/components/Combobox/Select/MySelect';
import { useEffect } from 'react';
import { I_82fp2peexf } from './F_82fp2peexf_Read';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';


export default function F_82fp2peexf_Create() {
    const form = useForm<I_82fp2peexf>({
        initialValues: {
            maHocSinh: '',
            hoTen: '',
            lop: '',
            doiTuongKhieuNai: '',
            nguoiGui: '',
            loaiKhieuNai: '',
            noiDungKhieuNai: '',
            ngayGui: undefined,
            trangThaiPhanHoi: '',
            noiDungPhanHoi: '',
            fileDinhKem: '',
            danhGiaMucDoHaiLong: '',
            noiDungDanhGia: '',
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
        <MyButtonCreate modalSize={'xl'} form={form} onSubmit={(values) => {
            console.log("Submit form: ", values);
        }} title='Phản hồi khiếu nại'>
            <MySelect
                label="Học sinh"
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
                placeholder='Chất lượng món ăn'
                data={["Chất lượn món ăn", "Vệ sinh", "Phục vụ", "Thanh toán"]}
                {...form.getInputProps("loaiKhieuNai")}
                clearable
            />
            <MyTextArea label="Nội dung khiếu nại" {...form.getInputProps("noiDungKhieuNai")} />
            <MyTextArea label="Nội dung phản hồi" {...form.getInputProps("noiDungPhanHoi")} />
            <MyFileInput label="Đính kèm file" {...form.getInputProps("fileDinhKem")} />
            <MySelect
                label="Trạng thái"
                data={["Đã xử lý", "Chưa xử lý"]}
                {...form.getInputProps("trangThaiPhanHoi")}
                clearable
            />
        </MyButtonCreate>
    );
}