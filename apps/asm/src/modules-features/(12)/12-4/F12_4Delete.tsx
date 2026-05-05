'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F12_4Delete({ lecturerAndExpertId }: { lecturerAndExpertId: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)}></MyActionIconDelete>
}

