'use client'
import MyTab from '@/components/Layouts/Tab/MyTab'
import React from 'react'
import SF4_1_Tab_1 from './SF4_1_Tab_1'
import SF4_1_Tab_2 from './SF4_1_Tab_2'
import SF4_1_Tab_3 from './SF4_1_Tab_3'
import SF4_1_Tab_4 from './SF4_1_Tab_4'
import SF4_1_Tab_5 from './SF4_1_Tab_5'
import SF4_1_Tab_6 from './SF4_1_Tab_6'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import SF4_1_Save from './SF4_1_Save'
import { ScrollArea } from '@mantine/core'

export default function F4_1Form() {
    return (
        <MyFlexColumn>
            <MyTab tabList={[
                { label: "Thông tin chung" },
                { label: "Khấu hao" },
                { label: "Nguồn gốc hình thành" },
                { label: "Bộ phận cấu thành" },
                { label: "Dụng cụ phụ tùng" },
                { label: "Biên bản giao nhận" }
            ]}>
                <ScrollArea.Autosize h={'65vh'}>
                    <SF4_1_Tab_1 />
                    <SF4_1_Tab_2 />
                    <SF4_1_Tab_3 />
                    <SF4_1_Tab_4 />
                    <SF4_1_Tab_5 />
                    <SF4_1_Tab_6 />
                </ScrollArea.Autosize>
            </MyTab>
            <SF4_1_Save />
        </MyFlexColumn>
    )
}
