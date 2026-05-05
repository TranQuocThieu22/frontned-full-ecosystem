'use client'
import baseAxios from "@/api/config/baseAxios";
import { ISimpleViewModel } from "@/interfacesForViewModels/BaseModel/ISimpleViewModel";
import { MyButtonDeleteList } from "aq-fe-framework/components";


export default function CourseDeleteListButton({ values }: { values: ISimpleViewModel[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>
            baseAxios.post("/Course/deleteList", values.map(item => ({
                id: item.id,
                isEnabled: false
            })))
        }
    />
}

