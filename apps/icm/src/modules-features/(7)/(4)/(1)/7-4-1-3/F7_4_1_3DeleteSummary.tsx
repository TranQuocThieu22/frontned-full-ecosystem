'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F7_4_1_3DeleteSummary({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => {
    }}></MyActionIconDelete>
}

