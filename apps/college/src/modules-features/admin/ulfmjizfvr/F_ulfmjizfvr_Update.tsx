
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface IF_ulfmjizfvr_Update {
    id?: number;
    maDay?: string;
    tenDay?: string;
    chiNhanh?: string
    ghiChu?: string
}

export default function F_ulfmjizfvr_Update({ data }: { data: IF_ulfmjizfvr_Update }) {
    const form = useForm<IF_ulfmjizfvr_Update>({
        initialValues: data
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput label='Mã dãy' {...form.getInputProps("maDay")} disabled />
            <MyTextInput label='Tên dãy' {...form.getInputProps("tenDay")} />
            <MySelect data={['Thủ Đức', 'Quận Tân Bình']} label='Chi nhánh' {...form.getInputProps('chiNhanh')} />
            <MyTextArea label="Ghi chú" {...form.getInputProps('ghiChu')} />

        </MyActionIconUpdate>
    )
}