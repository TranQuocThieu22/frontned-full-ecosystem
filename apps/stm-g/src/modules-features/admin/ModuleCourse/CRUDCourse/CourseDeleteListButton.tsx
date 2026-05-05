'use client'
import baseAxios from "@/api/config/baseAxios";
import MyButtonDeleteList from "@/components/Buttons/ButtonCRUD/MyButtonDeleteList";
import { ISimpleViewModel } from "@/interfacesForViewModels/BaseModel/ISimpleViewModel";


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

