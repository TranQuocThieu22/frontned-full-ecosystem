'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

//REVIEW: quuoc thieu review 47511

export default function F12_6Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.post("/address/delete", { id: id })}></MyActionIconDelete>
}

