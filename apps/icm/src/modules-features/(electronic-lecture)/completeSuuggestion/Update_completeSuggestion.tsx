'use client'
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Box, Group, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal } from "aq-fe-framework/components";
import { ICompleteSuggestion } from "./Read_completeSuggestion";


export default function Update_completeSuggestion(
    { values }: { values: ICompleteSuggestion }
) {
    const disc = useDisclosure()
    const form = useForm<ICompleteSuggestion>({
        initialValues: values
    })

    return (
        <MyButtonModal label="Cập nhật" color="orange.4" disclosure={disc} modalSize="50%" title="Chi tiết nhiệm vụ hoàn thiện" onSubmit={() => { }}>
            <Group align="flex-start" grow>
                {/* Cột trái */}
                <Box w="100%">
                    <Select
                        label="Trạng thái nhiệm vụ"
                        data={["Đang thực hiện", "Đã hoàn thành - Chờ kiểm tra", "Mới tạo - Chờ thao tác"]}
                        placeholder="Chọn trạng thái"
                        {...form.getInputProps("status")}
                        required
                        mb="md"
                    />
                    <Textarea
                        label="Mô tả cách thức xử lý"
                        minRows={4}
                        {...form.getInputProps("description")}
                        required
                    />
                </Box>
                {/* Cột phải */}
                <Box w="100%">
                    <MyFileInput
                        label="Tài liệu/File sản phẩm đã chỉnh sửa"
                        placeholder="Chọn file"
                        {...form.getInputProps("file")}
                        required
                        mb="md"
                    />
                    <Textarea
                        label="Ghi chú chung về Nhiệm vụ Hoàn thiện"
                        minRows={4}
                        {...form.getInputProps("note")}
                    />
                </Box>
            </Group>
            <MyButton type="submit" color="green">Lưu</MyButton>
        </MyButtonModal>
    )
}
