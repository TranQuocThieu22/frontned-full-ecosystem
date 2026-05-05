'use client'
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Button, Flex, Grid, Image, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarWeek, IconEdit } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButtonModal, MyFlexColumn, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IContent {
    id: number;
    loaiThu?: string;
    tenDichVu?: string;
    donGia?: number;
}

interface IStudentFormValues {
    maSinhVien: string;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: string;
    noiSinh: string;
    email: string;
    soDienThoai: string;
    diaChi: string;
    cccd: string;
    ngayCapCccd: string;
    noiCapCccd: string;
    ghiChuThu: string;
}

const initialValues: IStudentFormValues = {
    maSinhVien: '',
    hoTen: '',
    ngaySinh: '',
    gioiTinh: '',
    noiSinh: '',
    email: '',
    soDienThoai: '',
    diaChi: '',
    cccd: '',
    ngayCapCccd: '',
    noiCapCccd: '',
    ghiChuThu: ''
};

export default function F_3cntlaxrnz_Update() {
    const disc = useDisclosure();

    const ChiTietDanhSachPhieuThuQuery = useQuery<IContent[]>({
        queryKey: [`F_3cntlaxrnz_Content`],
        queryFn: async () => {
            return mockData;
        }
    })


    const form = useForm<IStudentFormValues>({
        initialValues,
    });

    const columns = useMemo<MRT_ColumnDef<IContent>[]>(
        () => [
            {
                header: "Loại thu",
                accessorKey: "loaiThu"
            },
            {
                header: "Tên dịch vụ",
                accessorFn: (row) => <MySelect defaultValue={row.tenDichVu} data={tenDichVuOption} />
            },
            {
                header: "Đơn giá",
                accessorKey: "donGia",
                accessorFn: (row) => row.donGia?.toLocaleString('vi-VN'),
            }
        ],
        []
    )

    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);

    if (ChiTietDanhSachPhieuThuQuery.isLoading) return "Đang tải dữ liệu..."
    if (ChiTietDanhSachPhieuThuQuery.isError) return "Không có dữ liệu..."


    return (
        <MyButtonModal
            variant="transparent"
            title="Thông tin đăng ký"
            label="Sửa"
            color="yellow"

            modalSize={"80%"}
            leftSection={<IconEdit />}
            disclosure={disc}
        >
            <MyFlexColumn>
                <Flex
                    w='100%'
                    wrap="wrap"
                    gap={'md'}
                    direction={{ base: "column", xs: "row" }}
                >
                    <Grid
                        w={{ base: '100%', md: "62%" }}
                    >
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <TextInput label="Mã sinh viên" defaultValue={"HV032586"} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <TextInput label="Họ tên" defaultValue={"Tô Ngọc Nhi"} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <DateInput label="Ngày sinh" defaultValue={"2000-11-20"} rightSection={<IconCalendarWeek />} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <TextInput label="Nơi sinh" defaultValue={"Lâm Đồng"} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <Select
                                label="Giới tính"
                                placeholder="Chọn giới tính"
                                data={genderOptions}
                                defaultValue={"1"}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <TextInput label="Email" />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }} >
                            <TextInput type="number" label="Số điện thoại" />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 12 }} >
                            <TextInput label="Địa chỉ" />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <TextInput label="CCCD" defaultValue={"025432224568"} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <DateInput label="Ngày cấp CCCD" defaultValue={"2015-05-15"} rightSection={<IconCalendarWeek />} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <TextInput label="Nơi cấp CCCD" defaultValue={"CCS&QLDC"} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} >
                            <MyTextInput label="Ghi chú thu" />
                        </Grid.Col>
                    </Grid>
                    <Grid w={{ base: '100%', md: "30%" }}>
                        <Flex
                            justify="center"
                            align="center"
                        >
                            <Image
                                radius="md"
                                alt="Hình ảnh sinh viên"
                                fallbackSrc="https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg"
                                styles={{
                                    root: {
                                        display: 'block'
                                    }
                                }}
                            />
                        </Flex>
                    </Grid>
                </Flex>
                <MyFieldset title="Danh sách dịch vụ đã đăng ký">
                    <MyDataTable
                        enableRowSelection={false}
                        columns={columns}
                        enableRowNumbers={false}
                        data={ChiTietDanhSachPhieuThuQuery.data!}
                    />
                </MyFieldset>
                <Flex
                    justify="flex-end"
                    align="center"
                    direction="row"
                >
                    <Button color="green">Lưu</Button>
                </Flex>
            </MyFlexColumn>
        </MyButtonModal>
    );
}


















const mockData: IContent[] = [
    {
        id: 1,
        loaiThu: "Học phí",
        tenDichVu: "Lập trình web 2401",
        donGia: 1250000,
    },
    {
        id: 2,
        loaiThu: "Lệ phí thi",
        tenDichVu: "Lập trình web",
        donGia: 300000,
    }
];


const tenDichVuOption = ["Lập trình web 2401", "Lập trình web"]