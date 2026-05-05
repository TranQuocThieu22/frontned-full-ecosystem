'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F7_2_2_1DeleteConfirmation({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => {
    }}></MyActionIconDelete>
}

