'use client'
import MySelect from '@/components/Combobox/Select/MySelect'
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import { NumberInput, Paper, Select, SimpleGrid, Space, Tabs, TextInput } from '@mantine/core'
import { YearPickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import React from 'react'

interface I {
    soChungTu?: string,
    donViSuDung?: string,
    ngayGhiTang?: Date,
    nhaSanXuat?: string,
    maTaiSan?: string,
    namSanXuat?: number,
    tenTaiSan?: string,
    nuocSanXuat?: string,
    loaiTaiSan?: string,
    tinhTrang?: string,
    nhaCungCap?: string,
    chatLuongHoatDong?: String,
    thoiGianbaoThanh?: number,
    soLuong?: number,
    dieuKienBaoHanh?: string
}
export default function SF4_1_Tab_1() {
    const form = useForm<I>({

    })
    return (
        <Tabs.Panel value='Thông tin chung'>
            <Paper p={'md'}>
                <form >
                    <SimpleGrid cols={2}>
                        <MyTextInput label='Số chứng từ' />
                        <MySelect label='Loại tài sản' defaultValue={"Phòng kế toán"}
                            data={[
                                'Phòng kế toán',
                                'Phòng đào tạo',
                                'Phòng tin học',
                                'Khoa CNTT',
                                'Khoa QTKD'
                            ]} />
                        <MyDateInput label='Ngày ghi tăng' />
                        <TextInput label='Nhà sản xuất' placeholder='Nhập thông tin nhà sản xuất' />
                        <MyTextInput label='Mã tài sản' />
                        <YearPickerInput label='Năm sản xuất' placeholder='Chọn năm sản xuất' />
                        <MyTextInput label='Tên tài sản' />
                        <MyTextInput label='Nước sản xuất' />
                        <MySelect label='Loại tài sản' defaultValue={"Phòng kế toán"}
                            data={[
                                'Phòng kế toán',
                                'Phòng đào tạo',
                                'Phòng tin học',
                                'Khoa CNTT',
                                'Khoa QTKD'
                            ]} />
                        <MySelect label='Tình trạng' data={['Mới', 'Cũ']} />
                        <MySelect label='Nhà cung cấp' data={['Công ty Anh Quân', "Công ty Edusoft"]} />
                        <MySelect label='Chất lượng' data={['Hoạt động tốt', 'Hoạt động tệ']} />
                        <MyTextInput label='Thời gian bảo hành' />
                        <NumberInput label='Số lượng' placeholder='Nhập số lượng' />
                    </SimpleGrid>
                    <Space></Space>
                    <MyTextArea label='Điều kiện bảo hành' />
                </form>
            </Paper>
        </Tabs.Panel>

    )
}
