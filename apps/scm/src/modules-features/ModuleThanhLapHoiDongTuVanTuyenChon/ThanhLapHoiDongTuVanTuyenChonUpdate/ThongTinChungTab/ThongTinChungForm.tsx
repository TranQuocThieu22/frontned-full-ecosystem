
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Grid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyDateInput, MySelect, MyTextArea } from "aq-fe-framework/components";
import { IThanhLapHoiDongTuVanTuyenChonInfoViewModal } from "../../interfaces/IThanhLapHoiDongTuVanTuyenChonInfoViewModal";

const trangThaiHoiDongOptions = [
    { value: "Chờ họp", label: "Chờ họp" },
    { value: "Đã thành lập", label: "Đã thành lập" },
];
const danhGiaChungOptions = [
    { value: "Đủ điều kiện thẩm định", label: "Đủ điều kiện thẩm định" },
    { value: "Không đủ điều kiện thẩm định", label: "Không đủ điều kiện thẩm định" },
];

interface I extends IThanhLapHoiDongTuVanTuyenChonInfoViewModal {
    file: File;
}

export default function ThongTinChungForm({ data }: { data: IThanhLapHoiDongTuVanTuyenChonInfoViewModal }) {
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
                        {...form.getInputProps("code")}
                    />
                    <MyTextInput
                        label="Tên đề tài"
                        {...form.getInputProps("tenHoiDong")}
                    />
                    <MySelect
                        label="Trạng thái hội đồng"
                        data={trangThaiHoiDongOptions}
                        {...form.getInputProps("trangThaiHoiDong")}
                    />
                    <MyTextArea
                        label="Ghi chú"
                        {...form.getInputProps("ghiChu")}
                    />
                </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md" >
                    <MyDateInput
                        label="Ngày họp dự kiến"
                        {...form.getInputProps("ngayHop")}
                        clearable={false}
                    />
                    <MyTextInput
                        label="Thời gian họp"
                        {...form.getInputProps("thoiGianHop")}
                    />
                    <MyTextInput
                        label="Địa điểm họp"
                        {...form.getInputProps("diaDiemHop")}
                    />
                    <MyFileInput label="File quyết định thành lập hội đồng tư vấn" {...form.getInputProps("file")} />
                </Stack>
            </Grid.Col>
        </Grid>
    )
}
