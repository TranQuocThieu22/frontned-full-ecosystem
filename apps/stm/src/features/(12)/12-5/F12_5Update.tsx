import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useForm } from "@mantine/form";
//REVIEW: quuoc thieu review 47514

interface IUpdateUserViewModel {
    id?: number;
    code?: string;
    name?: string;
    chiNhanh?: string;
    day?: string;
    sucChuaHoc?: number;
    sucChuaThi?: number;
    tinhChatPhong?: string;
    note?: string;
}

export default function F12_5Update({ data }: { data: IUpdateUserViewModel }) {
    const form = useForm<IUpdateUserViewModel>({
        mode: "uncontrolled",
        initialValues: {
            ...data,
        },
        validate:
        {
            name: (value) => value ? null : "không được để trống"
        }
    })
    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={(value) => {
                return baseAxios.post("/roomType/update", value)
            }}
        >
            <MyFlexColumn>
                <MyTextInput disabled label="Mã Tính chất" {...form.getInputProps("code")} />
                <MyTextInput label="Tên tính chất" {...form.getInputProps("name")} />
                <MyTextArea label="Ghi chú" {...form.getInputProps("note")}></MyTextArea>
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
