import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"

export default function F_RubricsDelete({ id }: { id: number }) {
    return <CustomActionIconDelete onSubmit={() => baseAxios.post("/COERubricsMethod/delete", { id: id })} />
}
