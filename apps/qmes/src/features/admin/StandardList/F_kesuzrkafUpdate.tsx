'use client'
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import { useForm } from "@mantine/form"
import F_joakzugxkqRead from "./CriteriaList/F_joakzugxkqRead"
import { I_kesuzrkafRead } from "./F_kesuzrkafRead"
export default function F_kesuzrkafUpdate(
    { values }: { values: I_kesuzrkafRead }
) {
    const form = useForm<I_kesuzrkafRead>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate modalSize={"100%"}
            form={form}
            // onSubmit={async (values) => await baseAxios.post("/DocumentAttribute/Update", values)} 
            onSubmit={() => { }}
            title="Chi tiết danh sách tiêu chuẩn"
        >
            <F_joakzugxkqRead />
        </MyActionIconUpdate>
    )
}
