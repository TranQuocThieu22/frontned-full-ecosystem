
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Grid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MySelect } from "aq-fe-framework/components";
import { IHopToThamDinhKinhPhiInfoViewModel } from "../interfaces/IHopToThamDinhKinhPhiInfoViewModel";

const phuongThucKhoanOptions = [
    { value: "Khoán từng phần", label: "Khoán từng phần" },
    { value: "Khoán đến sản phẩm cuối cùng", label: "Khoán đến sản phẩm cuối cùng" },
];
const danhGiaChungOptions = [
    { value: "Đủ điều kiện thẩm định", label: "Đủ điều kiện thẩm định" },
    { value: "Không đủ điều kiện thẩm định", label: "Không đủ điều kiện thẩm định" },
];

interface I extends IHopToThamDinhKinhPhiInfoViewModel {
    file: File;
}

export default function GeneralInformationForm({ data }: { data: IHopToThamDinhKinhPhiInfoViewModel }) {
    const form = useForm<I>({
        initialValues: {
            ...data,
            file: new File([], data.fileDetail?.fileName!),
        },
    });
    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md" >
                    <MyTextInput
                        label="Mã đăng ký"
                        {...form.getInputProps("maDangKy")}
                    />
                    <MyTextInput
                        label="Tên đề tài"
                        {...form.getInputProps("tenDeTai")}
                    />
                    <MySelect
                        label="Phương thức khoán"
                        data={phuongThucKhoanOptions}
                        {...form.getInputProps("phuongThucKhoan")}
                    />
                </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md" >
                    <MySelect
                        label="Đánh giá chung"
                        data={danhGiaChungOptions}
                        {...form.getInputProps("danhGiaChung")}
                    />
                    <MyTextArea
                        label="Kiến nghị chung"
                        minRows={4}
                        {...form.getInputProps("kienNghiChung")}
                    />
                    <MyFileInput label="File Hồ sơ thẩm định" {...form.getInputProps("file")} />
                </Stack>
            </Grid.Col>
        </Grid>
    )
}
