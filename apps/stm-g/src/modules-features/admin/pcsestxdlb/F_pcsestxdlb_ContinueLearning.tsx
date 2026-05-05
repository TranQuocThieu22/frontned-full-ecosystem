import baseAxios from "@/api/config/baseAxios";
import { Box, Flex, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconUpload } from "@tabler/icons-react";
import { MyButtonCreate, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from "react";

export interface I_pcsestxdlb_RetestRead {
    maHocVien?: string;
    tenHocVien?: string;
    gioiTinh?: string;
    ngaySinh?: string;
    soDienThoai?: string;
    email?: string;
    maKhoaHoc?: string;
    tenKhoaHoc?: string;
    soKhoaHoc?: string;
    ngayQuyetDinh?: string;
    tenQuyetDinh?: string;
    ghiChu?: string;
    minhChung?: File;
}

export default function F_pcsestxdlb_ContinueLearning() {
    const disc = useDisclosure();
    const form = useForm<I_pcsestxdlb_RetestRead>({
        initialValues: {
            maHocVien: "HV02589",
            tenHocVien: "Tô Ngọc Báo",
            gioiTinh: "Nam",
            ngaySinh: "2000-03-05",
            soDienThoai: "0896585235",
            email: "a@gmail.com",
            maKhoaHoc: "LTW2403",
            tenKhoaHoc: "",
            soKhoaHoc: "",
            ngayQuyetDinh: "",
            tenQuyetDinh: "",
            ghiChu: "",
        }
    })

    useEffect(() => {
        const selected = KHOA_HOC_DATA.find(kt => kt.maKhoaHoc === form.values.maKhoaHoc);
        if (selected) {
            form.setValues({
                tenKhoaHoc: selected.tenKhoaHoc,
                soKhoaHoc: selected.soKhoaHoc,
            });
        }
    }, [form.values.maKhoaHoc]);

    const KHOA_HOC_DATA = [
        { maKhoaHoc: 'LTW2402', tenKhoaHoc: 'Lập trình web 2424', soKhoaHoc: 'khóa 1' },
        { maKhoaHoc: 'LTW2403', tenKhoaHoc: 'Lập trình web 2424', soKhoaHoc: 'khóa 2' },
        { maKhoaHoc: 'LTW2404', tenKhoaHoc: 'Lập trình web 2424', soKhoaHoc: 'khóa 3' },
    ];

    return (
        <MyButtonCreate
            objectName="Chi tiết nhập học lại"
            disclosure={disc}
            modalSize="50%"
            label="Nhập học lại"
            title="Chi tiết nhập học lại"
            bg={"teal"}
            form={form} onSubmit={() => baseAxios.post("")}
            leftSection={undefined}

        >
            <Flex justify={"start"} gap={"30%"}>
                <Box>
                    <Text fw="500">Mã học viên: <Text span>HV0256</Text></Text>
                    <Text fw="500">Ngày sinh: <Text span>05/03/2000</Text></Text>
                </Box>
                <Box>
                    <Text fw="500">Họ tên: <Text span>Tô Ngọc Báo</Text></Text>
                    <Text fw="500">Giới tính: <Text span>Nam</Text></Text>
                </Box>
            </Flex>
            <Text><Text fw="500" span>Khóa học:</Text> LTW2402 - Lập trình web 24254 - khóa 1</Text>
            <MyDateInput label="Ngày quyết định" {...form.getInputProps("ngayQuyetDinh")} />
            <MyTextInput label="Tên quyết định" {...form.getInputProps("tenQuyetDinh")} />
            <MySelect
                label="Chuyển đến khóa"
                data={KHOA_HOC_DATA.map(kt => ({
                    value: kt.maKhoaHoc,
                    label: `${kt.maKhoaHoc} - ${kt.tenKhoaHoc} - ${kt.soKhoaHoc}`
                }))}
                {...form.getInputProps("maKhoaHoc")}
                clearable
            />

            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")}></MyTextArea>
            <MyFileInput
                leftSection={<IconUpload />}
                rightSection={undefined}
                label="Minh chứng"
                {...form.getInputProps('minhChung')}
            />
        </MyButtonCreate>
    )
}