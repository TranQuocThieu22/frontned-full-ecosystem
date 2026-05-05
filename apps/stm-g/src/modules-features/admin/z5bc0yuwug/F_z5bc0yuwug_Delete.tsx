import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_z5bc0yuwug_Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={() => baseAxios.post("/priceconfig/delete", { id: id })} />
}
