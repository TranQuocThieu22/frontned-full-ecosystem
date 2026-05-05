'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

//REVIEW: quuoc thieu review 47514

export default function F12_5Delete({ dataId }: { dataId: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.post("/roomType/delete", { id: dataId })}></MyActionIconDelete>
}

