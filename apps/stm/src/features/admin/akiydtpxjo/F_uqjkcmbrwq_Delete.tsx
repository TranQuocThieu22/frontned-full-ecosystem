'use client'

import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"

export default function F_jdtonxkhjl_Delete({ values }: { values: any }) {
    return (
        <MyActionIconDelete title="Xác nhận xoá dữ liệu" contextData={values.code} onSubmit={() => baseAxios.post("/CourseSection/Delete", { id: values.id })}></MyActionIconDelete>
    )
}
