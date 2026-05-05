'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";


export default function F10_3Delete({ lecturerAndExpertId }: { lecturerAndExpertId: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)}></MyActionIconDelete>
}

