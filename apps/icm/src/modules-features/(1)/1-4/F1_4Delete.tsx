import baseAxios from "@/api/baseAxios"
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F1_4Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.post("/Document/delete", { id: id })} />
}
