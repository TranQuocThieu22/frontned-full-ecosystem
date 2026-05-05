'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F1_1Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async () => await baseAxios.post("/Account/delete", { id: id })}></MyActionIconDelete>
}

