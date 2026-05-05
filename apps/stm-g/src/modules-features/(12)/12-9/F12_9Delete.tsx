'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyActionIconDelete } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";


export default function F12_9Delete({ value }: { value: any }) {
    return <MyActionIconDelete contextData={utils_date_dateToDDMMYYYString(new Date(value.date))} onSubmit={() => baseAxios.post("/Holiday/delete", { id: value.id })}></MyActionIconDelete>
}

