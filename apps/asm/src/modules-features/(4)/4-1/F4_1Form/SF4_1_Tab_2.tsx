'use client'
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Checkbox, Grid, Paper, SimpleGrid, Space, Tabs } from '@mantine/core'
import React from 'react'

interface I {
    nguyenGia?: number,
    tyLeKHThang?: number,
    giaTriTinhKH?: number
    tyLeKHNam?: number,
    ngayBatDauKH?: Date,
    giaTriKHThang?: number,
    thoiGianSuDung?: number,
    giaTriKHNam?: number,
    hoaMonLuyKe?: string,
    giaTriConlai?: number,
    giaTriKHApDung?: number,
    gioiHanGiaTriTinhThanKhauHaoTheoLuat?: boolean
}

export default function SF4_1_Tab_2() {
    return (
        <Tabs.Panel value='Khấu hao'>
            <Paper p={'md'}>

                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <MyNumberInput mt={2} thousandSeparator="," label='Nguyên giá' placeholder='Nhập nguyên giá' />
                        <MyNumberInput mt={2} label='Giá trị tính KH' placeholder='Nhập giá trị tính KH' />
                        <MyDateInput mt={2} label='Ngày bắt đầu KH' placeholder='Chọn ngày bắt đầu KH' />
                        <MyNumberInput mt={2} label='Thời gian sử dụng' placeholder='Nhập thời gian sử dụng' />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <MyNumberInput mt={2} label='Tỷ lệ KH tháng (%)' placeholder='Nhập tỷ lệ KH tháng (%)' />
                        <MyNumberInput mt={2} label='Tỷ lệ KH năm (%)' placeholder='Nhập tỷ lệ KH năm (%)' />
                        <MyNumberInput mt={2} label='Giá trị KH tháng' placeholder='Nhập giá trị KH tháng' />
                        <MyNumberInput mt={2} label='Giá trị KH năm' placeholder='Nhập giá trị KH năm' />
                        <MyTextInput mt={2} label='Hao mòn lũy kế' placeholder='Nhập thông tin' />
                        <MyNumberInput mt={2} label='Giá trị còn lại' placeholder='Nhập thông tin' />
                        <MyNumberInput mt={2} label='Giá trị KH áp dụng' placeholder='Nhập giá trị KH áp dụng' />
                    </Grid.Col>
                </Grid>
                <Space></Space>
                <Checkbox label="Giới hạn giá trị tính khấu hao theo luật" />
            </Paper>
        </Tabs.Panel>
    )
}
