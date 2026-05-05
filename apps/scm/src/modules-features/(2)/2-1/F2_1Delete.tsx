import baseAxios from "@/api/baseAxios"
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F2_1Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => await baseAxios.post("/Document/delete", { id: id })} />
    )
}
