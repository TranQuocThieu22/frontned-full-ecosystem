"use client"
import MySelect from "@/components/Combobox/Select/MySelect";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, FileInput, Flex, Paper, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface I {
    maDeTai?: string,
    tenDeTai?: string
    chuNhiemId?: number,
    thoiGianThucHien?: number,
    huongNghienCuu?: string,
    phamViNghienCuu?: string,
    mucTieuNghienCuu?: string,
    huongUngDung?: string,
    kinhPhiDuKien?: number,
    linhVucId?: number,
    loaiHinhId?: number,
    fileMinhChung?: File
}

export default function F5_3_1FormRegisterTopic() {
    const form = useForm<I>({
        initialValues: {
            maDeTai: "",
            tenDeTai: "",
            chuNhiemId: undefined,
            thoiGianThucHien: undefined,
            huongNghienCuu: "",
            phamViNghienCuu: "",
            mucTieuNghienCuu: "",
            huongUngDung: "",
            kinhPhiDuKien: undefined,
            linhVucId: undefined,
            loaiHinhId: undefined,
            fileMinhChung: undefined
        },
        transformValues: (values) => ({
            ...values,
            chuNhiemId: parseInt(values.chuNhiemId?.toString()!)
        })
    });
    return (
        <form onSubmit={form.onSubmit(async values => {

        })}>
            <MyFlexColumn>
                <MyTextInput
                    label="Mã Đề Tài"
                    {...form.getInputProps("maDeTai")}
                />
                <MyTextInput
                    label="Tên Đề Tài"
                    {...form.getInputProps("tenDeTai")}
                />
                <Flex direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                >
                    <MySelect
                        label="Chủ Nhiệm"
                        {...form.getInputProps("chuNhiemId")}
                        data={[{ value: "1", label: "Chủ Nhiệm 1" }, { value: "2", label: "Chủ Nhiệm 2" }]}
                    />
                    <TextInput label="Học hàm - học vị" />
                </Flex>
                <Flex direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                >
                    <MyTextInput label="Đơn vị cộng tác" />
                    <MyTextInput label="Số điện thoại" />
                    <MyTextInput label="Email" />
                </Flex>
                <UserInfo id={form.getValues().chuNhiemId!} />
                <MyNumberInput
                    label="Thời Gian Thực Hiện"
                    {...form.getInputProps("thoiGianThucHien")}
                />
                <MyTextInput
                    label="Hướng Nghiên Cứu"
                    {...form.getInputProps("huongNghienCuu")}
                />
                <MyTextInput
                    label="Phạm Vi Nghiên Cứu"
                    {...form.getInputProps("phamViNghienCuu")}
                />
                <MyTextInput
                    label="Mục Tiêu Nghiên Cứu"
                    {...form.getInputProps("mucTieuNghienCuu")}
                />
                <MyTextInput
                    label="Hướng Ứng Dụng"
                    {...form.getInputProps("huongUngDung")}
                />
                <MyNumberInput
                    label="Kinh Phí Dự Kiến"
                    {...form.getInputProps("kinhPhiDuKien")}
                />
                <Flex direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                >
                    <MySelect
                        label="Lĩnh Vực nghiên cứu"
                        {...form.getInputProps("linhVucId")}
                        data={[{ value: "1", label: "Lĩnh Vực 1" }, { value: "2", label: "Lĩnh Vực 2" }]}
                    />
                    <MySelect
                        label="Loại hình nghiên cứu"
                        {...form.getInputProps("loaiHinhId")}
                        data={[{ value: "1", label: "Loại hình 1" }, { value: "2", label: "Loại hình 2" }]}
                    />
                </Flex>

                <FileInput label="Đính kèm file minh chứng" placeholder="Chọn file" {...form.getInputProps("fileMinhChung")} />
                <Button type="submit">Đăng ký</Button>
            </MyFlexColumn>
        </form>
    )
}

function UserInfo({ id }: { id: number }) {
    if (!id) return ""
    return (
        <SimpleGrid>
            <Paper p={'md'}>Đơn vị công tác: Hà nội</Paper>
            <Paper p={'md'}>Số điện thoại: 0359848362</Paper>
            <Paper p={'md'}>Email: thieu@gmail.com</Paper>
            <Paper p={'md'}>Học hàm/ học vị: Phó giáo sư/ Tiến sĩ</Paper>
        </SimpleGrid>
    )
}