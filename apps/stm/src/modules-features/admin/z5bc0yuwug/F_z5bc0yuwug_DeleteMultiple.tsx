import baseAxios from "@/api/config/baseAxios";
import { IPriceConfig } from "@/hooks/query-hooks/PriceConfig/useQ_PriceConfig_GetByType";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function F_z5bc0yuwug_DeleteMultiple({ ids: values }: { ids: IPriceConfig[] }) {
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
