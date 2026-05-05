import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IUpdateUserViewModel {
    id?: number;
    maTrungTam?: string;
    tenTrungTam?: string;
    note?: string;
}

export default function F12_2Update({ lecturerAndExpertValues }: { lecturerAndExpertValues: IUpdateUserViewModel }) {
    const form = useForm<IUpdateUserViewModel>({
        initialValues: {
            ...lecturerAndExpertValues,
        }
    })
    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {
                // return baseAxios.put("/userNCKHs/" + form.values.id, form.values)
                console.log("chỉnh sửa thành công: ", form.values);
            }}
        >
            <MyFlexColumn>
                <MyTextInput disabled label="Mã trung tâm" {...form.getInputProps("maTrungTam")} />
                <MyTextInput label="Tên trung tâm" {...form.getInputProps("tenTrungTam")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
