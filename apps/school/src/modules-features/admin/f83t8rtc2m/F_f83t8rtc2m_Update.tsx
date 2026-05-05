'use client'
import { Checkbox } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { I_f83t8rtc2m_Table } from './F_f83t8rtc2m_Table';


export default function F_f83t8rtc2m_Update({ data }: { data: I_f83t8rtc2m_Table }) {
    const form = useForm<I_f83t8rtc2m_Table>({
        initialValues: {
            eventCode: data.eventCode,
            eventName: data.eventName,
            eventDate: data.eventDate,
            assign: data.assign,
            mission: data.mission,
            completeDate: data.completeDate,
            reportDate: data.reportDate,
            reportContent: data.reportContent,
            complete: data.complete,
        },
    })
    const listAssign = [
        { value: "NS002", label: "Tô Ngọc Lâm - NS002" },
        { value: "NS003", label: "Tô Ngọc Tèo - NS003" },
        { value: "NS004", label: "Tô Ngọc Tí - NS004" },
    ];

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput
                label="Mã sự kiện"
                {...form.getInputProps('eventCode')}
            />
            <MyTextInput
                label="Tên sự kiện"
                {...form.getInputProps('eventName')}
            />
            <DateInput
                label="Ngày tổ chức"
                {...form.getInputProps("eventDate")}
            />
            <MySelect
                data={listAssign} label="Họ Tên"
                defaultValue={form.getValues().assign}
                {...form.getInputProps('assign')}
            />
            <MyTextInput
                label="Nhiệm vụ"
                {...form.getInputProps('mission')}
            />
            <DateInput
                label="Ngày cần hoàn thành"
                {...form.getInputProps("completeDate")}
            />
            <DateInput
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
            <DateInput
                {...form.getInputProps("completeDate")}
            />

        </MyActionIconUpdate>
    )
}


