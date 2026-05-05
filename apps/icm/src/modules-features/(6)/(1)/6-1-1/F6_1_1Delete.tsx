'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F6_1_1Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => {
    }}></MyActionIconDelete>
}

