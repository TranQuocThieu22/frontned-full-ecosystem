'use client'
import MyButtonDeleteList from "@/components/Buttons/ButtonCRUD/MyButtonDeleteList";
import { IBaseEntity } from "aq-fe-framework/interfaces";


export default function ScheduleTestDeleteListButton({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>{}}
    />
}

