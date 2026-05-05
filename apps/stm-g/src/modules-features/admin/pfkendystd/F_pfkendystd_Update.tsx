'use client'
import { Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarWeek, IconUpload } from "@tabler/icons-react";
import { MyButton, MyButtonModal, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { Ipfkendystd } from "./F_pfkendystd_Read";


export default function F_pfkendystd_Update({ data }: { data: Ipfkendystd }) {
    const disc = useDisclosure(false);
    const form = useForm<Ipfkendystd>({
        initialValues: {
            ...data,
        },
        validate: {

        }
    })

    return (
        <MyButtonModal
            title={`Chi tiết ${data.loaiQuyetDinh?.toLowerCase()}`}
            disclosure={disc}
            label="Sửa"
            variant="transparent"
            modalSize={"lg"}
        >
            <Grid>
                <Grid.Col span={6}>
                    <Text fw={500}>Mã học viên: <Text span>{data.maHocVien}</Text></Text>
                    <Text fw={500}>Ngày sinh: <Text span>{utils_date_dateToDDMMYYYString(new Date(data.ngaySinh!))}</Text></Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text fw={500}>Họ tên: <Text span>{data.hoTen}</Text></Text>
                    <Text fw={500}>Giới tính: <Text span>{data.gioiTinh}</Text></Text>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text fw={500}>Khóa học:  <Text span>{data.maKhoaHoc} - {data.tenKhoaHoc} - khóa {data.maKhoaHoc?.substring(data.maKhoaHoc.length - 2)}</Text></Text>
                </Grid.Col>
            </Grid>
            <MyDateInput
                rightSection={<IconCalendarWeek />}
                label="Ngày quyết định"
                {...form.getInputProps("ngayQuyetDinh")}
            />
            <MyTextInput
                label="Tên quyết định"
                {...form.getInputProps("tenQuyetDinh")}
            />
            {(data.loaiQuyetDinh == "Chuyển khóa thi" || data.loaiQuyetDinh == "Ghép thi lại") && (
                <MySelect
                    label="Chuyển đến khoá"
                    defaultValue={"DGT2401 - Digital Marketing 2024 - khóa 02"}
                    data={[
                        'DGT2401 - Digital Marketing 2024 - khóa 02'
                    ]}
                    allowDeselect={false}
                />
            )}
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("ghiChu")}
            />
            <MyFileInput
                leftSection={<IconUpload />}
                label="Minh chứng"
            />
            <MyButton >Lưu</MyButton>
        </MyButtonModal >

    )
}
