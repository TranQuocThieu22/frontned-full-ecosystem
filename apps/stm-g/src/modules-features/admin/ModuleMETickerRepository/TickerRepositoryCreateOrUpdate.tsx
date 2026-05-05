import { useForm } from "@mantine/form"
import { MyTextInput } from "aq-fe-framework/components"
import { MyButtonCreateUpdate } from "aq-fe-framework/core"

export default function TickerRepositoryCreateOrUpdate({ data }: { data?: any }) {
    const form = useForm<any>(
        { initialValues: data ?? {} }
        
    )
    return (
        <MyButtonCreateUpdate onSubmit={() => { }} form={form} isUpdate={!!data} scrollAreaAutosizeProps={{h:"auto"}} >
            
            <MyTextInput label="Số lượng ticker nạp vào" {...form.getInputProps("quantity")} />
        </MyButtonCreateUpdate>
    )
}
