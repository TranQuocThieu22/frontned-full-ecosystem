'use client'
import baseAxios from "@/api/config/baseAxios";
import MyButtonDeleteList from "@/components/Buttons/ButtonCRUD/MyButtonDeleteList";
import { IBaseEntity } from "aq-fe-framework/interfaces";


export default function ExamDeleteListButton({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>
            baseAxios.post("/Exam/deleteList", values.map(item => ({
                id: item.id,
                isEnabled: false
            })))
        }
    />
}

