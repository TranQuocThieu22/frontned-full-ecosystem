'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F12_5Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => { }} />
}

