'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

// TODO: Do when api is ready

export default function F6_2Delete({ lecturerAndExpertId }: { lecturerAndExpertId: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)}></MyActionIconDelete>
}

