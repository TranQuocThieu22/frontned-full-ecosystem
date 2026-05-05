import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IUpdateUserViewModel {
    id?: number;
    loaiThanhPhan?: string;
    soTiet?: number;
    note?: string;
}

export default function F_uoktzptjxi_2_Update({ lecturerAndExpertValues }: { lecturerAndExpertValues: IUpdateUserViewModel }) {
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
                <MyTextInput label="Loại thành phần" {...form.getInputProps("loaiThanhPhan")} />
                <MyTextInput label="Số tiết" {...form.getInputProps("soTiet")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
