'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

//REVIEW: quuoc thieu review 47514

export default function F12_5Delete({ dataId }: { dataId: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.post("/roomType/delete", { id: dataId })}></MyActionIconDelete>
}

