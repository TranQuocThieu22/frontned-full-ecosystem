'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

//REVIEW: quuoc thieu review 47513

export default function F12_2Delete({ dataId }: { dataId: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.post("/skillCenter/delete", { id: dataId })}></MyActionIconDelete>
}

