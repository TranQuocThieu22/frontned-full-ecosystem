import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MySelect from "@/components/Combobox/Select/MySelect"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { ENUM_GENDER } from "@/constants/enum/global"
import { utils_converter_enumToOptions } from "@/utils/converter"
import { useForm } from "@mantine/form"
import { IAccount } from "aq-fe-framework/interfaces"

export default function F_gt0cyzybu0_Form({ values }: { values?: IAccount }) {
    const form = useForm<IAccount>({
        initialValues: values ?? values
    })

    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
    if (values) return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã học viên" {...form.getInputProps("code")} />
            <MyTextInput label="Họ tên học viên" {...form.getInputProps("name")} />
            <MySelect label="Giới tính" data={genderOptions} />
            <MyDateInput label="Ngày sinh" />
            <MyTextInput label="Số điện thoại" />
            <MyTextInput label="Email" {...form.getInputProps("email")} />
            <MyTextInput label="Địa chỉ" />
            <MyTextInput label="CCCD" />
            <MyTextInput label="Ngày cấp CCCD" />
            <MyTextInput label="Nơi cấp CCCD" />
        </MyActionIconUpdate>
    )
    return (
        <MyButtonCreate form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã học viên" {...form.getInputProps("code")} />
            <MyTextInput label="Họ tên học viên" {...form.getInputProps("name")} />
            <MySelect label="Giới tính" data={genderOptions} />
            <MyDateInput label="Ngày sinh" />
            <MyTextInput label="Số điện thoại" />
            <MyTextInput label="Email" {...form.getInputProps("email")} />
            <MyTextInput label="Địa chỉ" />
            <MyTextInput label="CCCD" />
            <MyTextInput label="Ngày cấp CCCD" />
            <MyTextInput label="Nơi cấp CCCD" />
        </MyButtonCreate>
    )
}
