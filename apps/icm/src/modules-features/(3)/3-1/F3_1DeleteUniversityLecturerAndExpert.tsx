'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F3_1DeleteUniversityLecturerAndExpert({ lecturerAndExpertId }: { lecturerAndExpertId: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)}></MyActionIconDelete>
}

