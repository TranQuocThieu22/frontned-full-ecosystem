import baseAxios from "@/api/config/baseAxios";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function DeleteTemplate({ values }: { values: any }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => baseAxios.post("delete", { id: values.id })}
        />
    )
}
