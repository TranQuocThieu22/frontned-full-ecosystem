import type { PriceConfig } from "@/shared/APIs/priceConfigService";
import { CustomButtonDeleteList as MyButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function F_z5bc0yuwug_DeleteMultiple({ ids: values }: { ids: PriceConfig[] }) {
    return (
        <MyButtonDeleteList
            contextData={values.map(item => item.program?.code).join(",")}
            onSubmit={() =>
                baseAxios.post("/PriceConfig/deleteList", values.map(item => ({
                    id: item.id,
                    isEnabled: false
                })))
            }
        />
    )
}
