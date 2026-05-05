'use client'
import { CustomButtonDeleteList as MyButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";


export default function F12_9DeleteList({ values }: { values: any[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => utils_date_dateToDDMMYYYString(new Date(item.date))).join(", ")}
        onSubmit={() =>
            baseAxios.post("/Holiday/deleteList", values.map(item => ({
                id: item.id,
                isEnabled: false
            })))
        }
    />
}
