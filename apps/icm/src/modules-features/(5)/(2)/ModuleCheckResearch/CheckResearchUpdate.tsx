'use client'
import { Checkbox, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal } from "aq-fe-framework/components";
import { ICheckResearch } from "./CheckResearchTable";

export default function CheckResearchUpdate(
    { values }: { values: ICheckResearch }
) {
    const disc = useDisclosure();
    const form = useForm<ICheckResearch>({
        initialValues: values
    });

    return (
        <MyButtonModal
            label="Kiểm tra"
            color="orange.4"
            disclosure={disc}
            modalSize="30%"
            title="Chi tiết kiểm tra sơ bộ"
        >
            <Select
                label="Trạng thái đề xuất hiện tại"
                data={[
                    "Chờ kiểm tra sơ bộ",
                    "Yêu cầu điều chỉnh sơ bộ",
                    "Không đạt yêu cầu sơ bộ",
                    "Chờ Hội đồng tư vấn xét duyệt",
                    "Đã duyệt",
                    "Bị từ chối"
                ]}
                placeholder="Chọn trạng thái"
                {...form.getInputProps("status")}
                required
                mb="md"
            />
            <Textarea
                label="Nhận xét Kiểm tra Sơ bộ"
                minRows={4}
                {...form.getInputProps("review")}
                mb="md"
            />
            <Checkbox
                label="Gửi thông báo"
                {...form.getInputProps("notificationSent", { type: "checkbox" })}
                mb="md"
            />
            <MyButton type="submit" color="green">Lưu</MyButton>
        </MyButtonModal>
    );
}
