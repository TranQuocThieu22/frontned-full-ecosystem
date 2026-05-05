import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useForm } from "@mantine/form";
import useH12_4GetSkillCenter from "./hooks/H12_4GetSkillCenter";

interface I {
    id?: number;
    code?: string; // Mã chi nhánh, ví dụ "HCM-TD"
    name?: string; // Tên chi nhánh, ví dụ "Thủ Đức"
    location?: string; // Địa chỉ chi nhánh
    note?: string; // Ghi chú thêm,
    skillCenterId?: number
}

export default function F_gqe7967fsa_Create() {
    const form = useForm<I>({
        mode: "uncontrolled",
        validate:
        {
            code: (value) => value
                ? /^[A-Za-z0-9][A-Za-z0-9-]+$/.test(value)
                    ? null
                    : "Chỉ được nhập ký tự thường, số , và dấu '-' "
                : "Không được để trống",
            name: (value) => value ? null : "không được để trống",
            location: (value) => value ? null : "không được để trống",
            skillCenterId: (value) => value ? null : "không được để trống"
        }
    });
    const skillCenterQuery = useH12_4GetSkillCenter()

    return (
        <MyButtonCreate objectName="Chi Nhánh" form={form} onSubmit={async (values) => await baseAxios.post("/Branch/Create", values)}>
            <MyTextInput
                label="Mã Chi Nhánh"
                required
                {...form.getInputProps("code")}
            />
            <MyTextInput
                label="Tên Chi Nhánh"
                {...form.getInputProps("name")}
            />
            {skillCenterQuery.data &&
                <MySelect
                    label="Trung Tâm"
                    data={skillCenterQuery.data?.map(item => ({
                        value: item.id?.toString()!,
                        label: item.name!
                    }))}
                    {...form.getInputProps("skillCenterId")}
                    value={form.getValues().skillCenterId?.toString()}
                />
            }
            <MyTextInput
                label="Địa Chỉ"
                {...form.getInputProps("location")}
            />
            <MyTextArea
                label="Ghi Chú"
                {...form.getInputProps("note")}
            />
        </MyButtonCreate>
    );
}
