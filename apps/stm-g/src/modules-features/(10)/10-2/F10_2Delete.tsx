import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F10_2Delete({ id }: { id?: number }) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("/courseSection/delete", { id: id })}></MyActionIconDelete>

    )
}
