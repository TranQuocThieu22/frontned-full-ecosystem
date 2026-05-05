'use client'
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import { MyButtonCreate, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';


export interface I_v16j3xr0cc_Create {
    eventcode?: string,
    eventname?: string,
    eventdate?: Date,
    fullname?: string,
    mission?: string,
    completedate?: Date,
    note?: string,
}

export default function F_tjx179fay4_Create() {
    const form = useForm<I_v16j3xr0cc_Create>({
        // initialValues: {
        //    eventcode: "SK001",
        //    eventname: "Halloween",
        //    eventdate: new Date("2024-10-31"),
        //    fullname:"1",
        // },
        validate: {
            eventcode: (value) => ((value ?? '').length < 1 ? 'Mã module không được để trống' : null),
            eventname: (value) => ((value ?? '').length < 1 ? 'Tên module không được để trống' : null),
        }
    })
    const listFullnames = [
        { value: "1", label: "Tô Ngọc Bảo-NS002" },
        { value: "2", label: "adb" },
        { value: "3", label: "xyzt" },
    ];

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} >
            <MyTextInput
                label="Mã sự kiện"
                {...form.getInputProps('eventcode')}
            />
            <MyTextInput
                label="Tên sự kiện"
                {...form.getInputProps('eventname')}
            />
            <DateInput
                label="Ngày tổ chức"
                {...form.getInputProps("eventdate")}
                value={form.values.eventdate}
                onChange={(date) => {
                    if (date !== null) {
                        form.setFieldValue("eventdate", new Date(date));

                    }
                }}
                rightSection={<IconCalendar size={16} />}
                popoverProps={{ withinPortal: true, position: 'bottom-end' }}
            />
            <MySelect
                data={listFullnames} label="Họ Tên"
                {...form.getInputProps('fullname')}
            />
            <MyTextInput
                label="Nhiệm vụ"
                {...form.getInputProps('mission')}
            />
            <DateInput
                label="Ngày cần hoàn thành"
                {...form.getInputProps("completedate")}
                value={form.values.eventdate}
                onChange={(date) => {
                    if (date !== null) {
                        form.setFieldValue("completedate", new Date(date));

                    }
                }}
            />
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps('note')}
            />
        </MyButtonCreate>
    )
}


