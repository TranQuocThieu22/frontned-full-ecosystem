'use client'
import { MyButtonDeleteList } from "aq-fe-framework/components"
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function PotentialCustomerDeleteListButton({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>{}}
    />
}

