'use client'
import { Button, Group, Radio, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyButtonCreate, MySelect, MyTextArea, MyCheckbox } from 'aq-fe-framework/components';
import { useEffect } from 'react';

export interface I_dud5jq8o3g {
    id?: number;
    maTuyenXe?: string;
    tenTuyenXe?: string;
    maHocSinh?: string;
    hoTen?: string;
    lop?: string;
    gioiTinh?: string;
    ngaySinh?: Date;
    diemDonTra?: string;
    ngayDangKy?: Date;
    loaiDangKy?: string;
    ngayDonTra?: string;
    soNgay?: number;
    taiTuc?: boolean;
    ghiChu?: string;
}

export default function F_dud5jq8o3g_Create() {
    const form = useForm<I_dud5jq8o3g>({
        initialValues: {
            maTuyenXe: '',
            tenTuyenXe: '',
            maHocSinh: '',
            hoTen: '',
            lop: '',
            gioiTinh: '',
            ngaySinh: new Date(),
            diemDonTra: '',
            ngayDangKy: new Date(),
            loaiDangKy: '',
            ngayDonTra: '',
            ghiChu: '',
            soNgay: 0,
            taiTuc: false,
        },
        validate: {
            maTuyenXe: (value) => (value ? null : 'Vui lòng nhập mã tuyến xe'),
            maHocSinh: (value) => (value ? null : 'Vui lòng nhập mã học sinh'),
            loaiDangKy: (value) => (value ? null : 'Vui lòng chọn loại đăng ký'),
            ngayDonTra: (value) => value ? null : 'Ngày đón/trả không được bỏ trống',
        },
    });
    const TUYEN_XE_DATA = [
        { maTuyenXe: 'TX001', tenTuyenXe: 'Tuyến số 1' },
        { maTuyenXe: 'TX002', tenTuyenXe: 'Tuyến số 2' },
        { maTuyenXe: 'TX003', tenTuyenXe: 'Tuyến số 3' },
    ];

    const HOC_SINH_DATA = [
        { maHocSinh: 'HS001', hoTen: 'Nguyễn Văn A', lop: '10A1' },
        { maHocSinh: 'HS002', hoTen: 'Trần Thị B', lop: '10A2' },
        { maHocSinh: 'HS003', hoTen: 'Lê Văn C', lop: '10A3' },
    ];

    const DIEM_DON_TRA_OPTIONS = [
        'Cổng chính',
        'Cổng sau',
        'Nhà xe A',
        'Nhà xe B',
    ];
    const NGAY_DON_TRA_OPTIONS = [
        "30/01/2025-02/03/2025",
        "30/03/2025-02/04/2025",
        "30/04/2025-02/05/2025",
    ];
    useEffect(() => {
        const selected = HOC_SINH_DATA.find(hs => hs.maHocSinh === form.values.maHocSinh);
        if (selected) {
            form.setValues({
                hoTen: selected.hoTen,
                lop: selected.lop
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.values.maHocSinh]);

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Đăng ký tuyến xe'>
            <MySelect
                label="Tuyến xe"
                withAsterisk
                data={TUYEN_XE_DATA.map(tx => ({
                    value: tx.maTuyenXe,
                    label: tx.tenTuyenXe
                }))}
                {...form.getInputProps("maTuyenXe")}
                clearable
            />
            <MySelect
                label="Học sinh"
                data={HOC_SINH_DATA.map(hs => ({
                    value: hs.maHocSinh,
                    label: `${hs.hoTen} - ${hs.maHocSinh} - ${hs.lop}`
                }))}
                {...form.getInputProps("maHocSinh")}
                clearable
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("ghiChu")} />
            <Text size="sm" fw={500}>
                Loại đăng ký
            </Text>
            <Group>
                {['Ngày', 'Tuần', 'Tháng'].map((type) => (
                    <Button
                        key={type}
                        variant={form.values.loaiDangKy === type ? 'filled' : 'light'}
                        color={form.values.loaiDangKy === type ? 'blue' : 'gray'}
                        onClick={() => form.setFieldValue('loaiDangKy', type)}
                    >
                        {type}
                    </Button>
                ))}
            </Group>
            <MySelect
                label="Ngày đón/trả"
                data={NGAY_DON_TRA_OPTIONS.map(option => ({
                    value: option,
                    label: `${option}`
                }))}
                {...form.getInputProps("ngayDonTra")}
                clearable
            />
            <Radio.Group
                label="Chọn điểm đón"
                {...form.getInputProps("diemDonTra")}
            >
                {DIEM_DON_TRA_OPTIONS.map(option => (
                    <Radio my={5} key={option} value={option} label={option} />
                ))}
            </Radio.Group>
            <MyCheckbox
                label="Tái tục"
                {...form.getInputProps("taiTuc", { type: 'checkbox' })}
            />
        </MyButtonCreate>
    )
}
