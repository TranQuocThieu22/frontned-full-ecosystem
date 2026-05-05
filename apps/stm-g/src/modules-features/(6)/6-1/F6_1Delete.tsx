'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F6_1Delete({ lecturerAndExpertId }: { lecturerAndExpertId: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)}></MyActionIconDelete>
}

