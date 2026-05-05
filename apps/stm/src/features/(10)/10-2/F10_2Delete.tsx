import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function F10_2Delete({ id }: { id?: number }) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("/courseSection/delete", { id: id })}></MyActionIconDelete>

    )
}
