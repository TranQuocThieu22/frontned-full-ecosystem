'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Checkbox, Paper, SimpleGrid, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface I {
    id?: number;
    tenDeTai?: string; // Tên đề tài
    linhVuc?: string; // Lĩnh vực
    giangVienDangKy?: string; // Giảng viên đăng ký
    donViCongTac?: string; // Đơn vị công tác
    kinhPhiDuKien?: number; // Kinh phí dự kiến
    thoiGianDuKien?: number; // Thời gian dự kiến (tháng)
    ketQuaPhanbien?: string; // Kết quả phản biện
    yKienHoidong?: string; // Ý kiến hội đồng
    fileMinhChung?: string
    dongY?: boolean; // Đồng ý
}

export default function F5_2_3Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values
    });

    return (
        <MyActionIconUpdate form={form} modalSize={"80%"} onSubmit={() => { }} title="Ghi nhận kết quả hội đồng" submitButton={<MyButton crudType="save" />}>
            <SimpleGrid>
                <Paper p={'md'}>
                    <Text>Mã giảng viên: gv001</Text>
                </Paper>
                <Paper p={'md'}>
                    <Text>Họ tên giảng viên: Nguyễn Văn A</Text>
                </Paper>
                <Paper p={'md'}>
                    <Text>Học hàm/ học vị: Giáo sư/ Tiến sĩ</Text>
                </Paper>
                <Paper p={'md'}>
                    <Text>Đơn vị công tác: Khoa CNTT</Text>
                </Paper>
            </SimpleGrid>
            <Textarea
                label="Kết quả phản biện"
                autosize
                {...form.getInputProps("ketQuaPhanbien")}
            />
            <Textarea
                label="Ý kiến hội đồng"
                autosize
                {...form.getInputProps("yKienHoidong")}
            />
            <MyFileInput
                {...form.getInputProps("fileMinhChung")}
            />
            <Checkbox label="Đồng ý thực hiện" {...form.getInputProps("dongY", { type: "checkbox" })} />
        </MyActionIconUpdate>
    );
}
