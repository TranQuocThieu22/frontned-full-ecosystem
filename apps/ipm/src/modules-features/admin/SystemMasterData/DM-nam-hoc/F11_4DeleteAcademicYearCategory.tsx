'use client'

import baseAxios from "@/api/baseAxios"
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F11_4DeleteAcademicYearCategory(
    { academicYearId }: { academicYearId: number }
) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("/academicyear/delete/", {
            "id": academicYearId
        })}></MyActionIconDelete>
    )
}
