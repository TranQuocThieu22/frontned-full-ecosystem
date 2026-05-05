import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useForm } from "@mantine/form";

interface IUpdateUserViewModel {
    id?: number;
    maPhong?: string;
    tenPhong?: string;
    chiNhanh?: string;
    day?: string;
    sucChuaHoc?: number;
    sucChuaThi?: number;
    tinhChatPhong?: string;
}

export default function F10_3Update({ lecturerAndExpertValues }: { lecturerAndExpertValues: IUpdateUserViewModel }) {
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
                return baseAxios.post("")
            }}
        >
            <MyFlexColumn>
                <MyTextInput label="Mã Tính chất" {...form.getInputProps("maPhong")} />
                <MyTextInput label="Tên tính chất" {...form.getInputProps("tenPhong")} />
                <MyTextInput label="Chi nhánh" {...form.getInputProps("chiNhanh")} />
                <MyTextInput label="Dãy" {...form.getInputProps("day")} />
                <MyNumberInput label="Sức chứa học" {...form.getInputProps("sucChuaHoc")} />
                <MyNumberInput label="Sức chứa thi" {...form.getInputProps("sucChuaThi")} />
                <MyTextInput label="Tính chất phòng" {...form.getInputProps("tinhChatPhong")} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
