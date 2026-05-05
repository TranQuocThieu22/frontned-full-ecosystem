import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

interface IUpdateUserViewModel {
    id?: number;
    code?: string;
    email?: string;
    fullName?: string;
    birthDate?: Date | undefined;
    highestDegree?: string;
    highestScientificTitle?: string;
    woringPlace?: string;
    isExternal?: boolean;
    isEnabled?: boolean;
}

export default function F3_1UpdateUniversityLecturerAndExpert({ lecturerAndExpertValues }: { lecturerAndExpertValues: IUpdateUserViewModel }) {
    const form = useForm<IUpdateUserViewModel>({
        initialValues: {
            ...lecturerAndExpertValues,
            birthDate: new Date(lecturerAndExpertValues.birthDate!),
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
                <MyTextInput label="Mã nhân sự" {...form.getInputProps("code")} />
                <MyTextInput label="Email" {...form.getInputProps("email")} />
                <MyTextInput label="Họ và tên" {...form.getInputProps("fullName")} />
                <DateInput
                    label="Ngày sinh"
                    placeholder="Nhập thông tin"
                    {...form.getInputProps("birthDate")}
                />
                <MyTextInput label="Học hàm" {...form.getInputProps("highestDegree")} />
                <MyTextInput label="Học vị" {...form.getInputProps("highestScientificTitle")} />
                <MyTextInput label="Đơn vị công tác" {...form.getInputProps("woringPlace")} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
