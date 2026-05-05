'use client'

import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import { MyButtonCreate, MyCheckbox, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components"

export interface I_hbwyvjoqgu_Schedule {
    id?: number;
    diemDon?: string; // Điểm đón
    gioDon?: Date | undefined |string//Giờ đón
    
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_hbwyvjoqgu_Create() {
    const form = useForm<I_hbwyvjoqgu_Schedule>({
        initialValues: {
            id: 0,
            diemDon: "",
            gioDon: formatTime(new Date()),
            nguoiCapNhat: "Quản trị viên",
            ngayCapNhat: new Date("2024-12-23")
        },
        validate: {
            id: (value) => (value ? null : 'Thứ tự là bắt buộc'),
            diemDon: (value) => (value ? null : 'Điểm đón là bắt buộc'),
            gioDon: (value) => (value ? null : 'Giờ đón là bắt buộc'),
        },
    });
    function formatTime( date: Date) {
        const hours = date.getHours().toString().padStart(2, '0');  
        const minutes = date.getMinutes().toString().padStart(2, '0');  
        return `${hours}:${minutes}`; 
      }
    

    return (
        <MyButtonCreate title='Chi tiết điểm đón' form={form} onSubmit={()=>{}} >
         <MyTextInput label='Thứ tự ' withAsterisk {...form.getInputProps("id")}/>
                    <MyTextInput label='Điểm đón ' withAsterisk {...form.getInputProps("diemDon")} />
                    <TimeInput
                label="Giờ đón"
                withAsterisk
                placeholder="HH:mm"
                {...form.getInputProps("gioDon")}
                //định dạng HH:mm:AM/PM
              />
               <MyTextArea label='Ghi chú'  />
    </MyButtonCreate>
    )
}