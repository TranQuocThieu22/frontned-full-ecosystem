import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IUpdateUserViewModel {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
//REVIEW: quuoc thieu review 47513

export default function F12_2Update({ data }: { data: IUpdateUserViewModel }) {
    const form = useForm<IUpdateUserViewModel>({
        initialValues: {
            ...data,
        },
        validate:
        {
            name: (value) => value ? null : 'không được để trống'
        }
    })
    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {
                return baseAxios.post("/skillCenter/update", form.values)
            }}
        >
            <MyFlexColumn>
                <MyTextInput disabled label="Mã trung tâm" {...form.getInputProps("code")} />
                <MyTextInput label="Tên trung tâm" {...form.getInputProps("name")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note", { withDefaultValue: true })} value={form.values.note ?? ""} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
