'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyButtonDeleteList } from "aq-fe-framework/components";
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function F8_6CourseSectionDeleteListButton({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>
            baseAxios.post("/CourseSection/deleteList", values.map(item => ({
                id: item.id,
                isEnabled: false
            })))
        }
    />
}

