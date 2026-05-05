'use client'

import baseAxios from "@/api/config/baseAxios"
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F_jdtonxkhjl_Delete({ values }: { values: any }) {
    return (
        <MyActionIconDelete 
        // title="Xác nhận xoá dữ liệu" 
        contextData={values.code} onSubmit={() => baseAxios.post("/CourseSection/Delete", { id: values.id })}></MyActionIconDelete>
    )
}
