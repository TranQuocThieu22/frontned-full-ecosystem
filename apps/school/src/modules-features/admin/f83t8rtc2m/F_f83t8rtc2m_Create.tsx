'use client'

import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyButtonCreate, MyTextInput, MySelect, MyTextArea, MyDateInput } from 'aq-fe-framework/components';

export interface I_f83t8rtc2m_Create {
    eventCode?: string,
    eventName?: string,
    eventDate?: Date,
    assign?: string,
    mission?: string,
    completeDate?: Date | null,
    reportContent?: string,
    reportDate?: Date | null,
    complete?: boolean,
}

export default function F_f83t8rtc2m_Create() {
    const form = useForm<I_f83t8rtc2m_Create>({
        initialValues: {
            eventCode: "",
            eventName: "",
            eventDate: new Date(),
            assign: "",
            mission: "",
            completeDate: new Date(),
            reportDate: new Date(),
            reportContent: "",
            complete: false,
        },
        validate: {
            eventCode: (value) => ((value ?? '').length < 1 ? 'Mã module không được để trống' : null),
            eventName: (value) => ((value ?? '').length < 1 ? 'Tên module không được để trống' : null),
        }
    })

    const listAssign = [
        { value: "NS002", label: "Tô Ngọc Lâm - NS002" },
        { value: "NS003", label: "Tô Ngọc Tèo - NS003" },
        { value: "NS004", label: "Tô Ngọc Tí - NS004" },
    ];

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} >
            <MyTextInput
                label="Mã sự kiện"
                {...form.getInputProps('eventCode')}
                required
            />
            <MyTextInput
                label="Tên sự kiện"
                {...form.getInputProps('eventName')}
                required
            />
            <MyDateInput
                label="Ngày tổ chức"
                {...form.getInputProps("eventDate")}
            />
            <MySelect
                data={listAssign} label="Họ Tên"
                {...form.getInputProps('assign')}
            />
            <MyTextInput
                label="Nhiệm vụ"
                {...form.getInputProps('mission')}
            />
            <MyDateInput
                label="Ngày cần hoàn thành"
                {...form.getInputProps("completeDate")}
            />
            <MyDateInput
                label="Ngày báo cáo"
                {...form.getInputProps("reportDate")}
            />
            <MyTextArea
                label="Nội dung báo cáo"
                {...form.getInputProps('note')}
            />
            <Checkbox
                label="Đã hoàn thành" defaultChecked={form.values.complete}
                {...form.getInputProps('complete')}
            />
            <MyDateInput
                {...form.getInputProps("completeDate")}
            />

        </MyButtonCreate>
    )
}


