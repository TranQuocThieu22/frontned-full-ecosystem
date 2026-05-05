'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F3_3DeleteProgram({ Id }: { Id: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.post("/Program/Delete", { id: Id })}></MyActionIconDelete>
}

