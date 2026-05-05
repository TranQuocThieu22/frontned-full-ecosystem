'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F7_1_2_2DeleteProposal({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => {
    }}></MyActionIconDelete>
}

