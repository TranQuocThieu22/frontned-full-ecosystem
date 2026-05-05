import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyFileInput, MySelect, MyTextArea } from "aq-fe-framework/components";

const statusOptions = [
    "Đang xử lý",
    "Đã giải quyết",
    "Đã đóng"
];

export default function CustomerCareExecutionUpdate({ data }: { data?: any }) {
    const form = useForm<any>(
        { initialValues: data ?? {} }

    )

    return (
        <MyActionIconUpdate onSubmit={() => { }} form={form}>
            <MySelect
                data={statusOptions}              
                label="Trạng thái"
                {...form.getInputProps("status")}
            />
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("handleNote")}
            />
            <MyFileInput
                label="Đính kèm file"
                {...form.getInputProps("attachment")}
            />
        </MyActionIconUpdate>
    )
}
