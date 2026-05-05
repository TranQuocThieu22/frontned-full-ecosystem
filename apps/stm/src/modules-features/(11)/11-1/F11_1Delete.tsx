'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F11_1Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.post("/CertificateReviewBatch/delete", { id: id })}></MyActionIconDelete>
}

