import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate"
import { useForm } from "@mantine/form"
import { MyTextInput } from "aq-fe-framework/components"

export default function TickerRepositoryCreateOrUpdate({ data }: { data?: any }) {
    const form = useForm<any>(
        { initialValues: data ?? {} }

    )
    return (
        <CustomButtonCreateUpdate onSubmit={() => { }} form={form} isUpdate={!!data} >

            <MyTextInput label="Số lượng ticker nạp vào" {...form.getInputProps("quantity")} />
        </CustomButtonCreateUpdate>
    )
}
