'use client'
import MyButtonDeleteList from "@/components/Buttons/ButtonCRUD/MyButtonDeleteList";
import { IBaseEntity } from "aq-fe-framework/interfaces";

export default function AssignTeachingAssistantDeleteList({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        disabled={values.length === 0}
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() => { }


        }
    />
}

