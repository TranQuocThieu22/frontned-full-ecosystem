import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IUpdateUserViewModel {
    id?: number;
    maDonViTinh?: string;
    tenDonViTinh?: string;
    note?: string;
}

export default function F12_3Update({ lecturerAndExpertValues }: { lecturerAndExpertValues: IUpdateUserViewModel }) {
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
                <MyTextInput disabled label="Mã đơn vị tính" {...form.getInputProps("maDonViTinh")} />
                <MyTextInput label="Tên đơn vị tính" {...form.getInputProps("tenDonViTinh")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
