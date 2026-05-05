'use client'
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyCheckbox, MySelect, MyTextArea, } from "aq-fe-framework/components";
import { ProductTesting } from "./ReadProductTesting";

export default function ProductTestingUpdate({ values }: { values: ProductTesting }) {
    const form = useForm<ProductTesting>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Chi tiết kiểm tra" form={form} onSubmit={() => { }}>
            <MySelect
                label="Trạng thái Kiểm tra sơ bộ"
                defaultValue={"Trao đổi sinh viên"}
                data={[
                    "Đã duyệt",
                    "Đang chờ sơ duyệt",
                    "Đã từ chối",
                ]}
                {...form.getInputProps("proposalSatus")}
            />
            <MyTextArea
                label="Nhạn xét / Góp í sơ bộ"
                {...form.getInputProps("comments")}
            />
            <MyCheckbox label='Gửi thông báo' />
        </MyActionIconUpdate>
    )
}
