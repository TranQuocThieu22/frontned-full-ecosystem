'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Group, Paper, Select, SimpleGrid, Space, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id: number | undefined,
    maKhoaThi?: string;
    tenKhoaThi?: string; // Mã chứng chỉ
    tenChuongTrinh?: string; // Tên chứng chỉ
    ngayKhaiGiang?: Date | undefined; // Phân loại
    ngayKetThuc?: Date | undefined; // Trung tâm cấp chứng chỉ
    ngayThi?: Date | undefined,
    trangThai?: number,
    soLuongHocVien?: number,
    hocVienDuBi?: number,
    lePhi?: number,
}

export default function F7_2Create() {
    const query = useQuery<I[]>({
        queryKey: [`F7_2Create`],
        queryFn: async () => DataList
    });
    const listState = useListState<I>()
    const form = useForm<I>({
        initialValues: {
            id: undefined,
            maKhoaThi: "",
            tenKhoaThi: "",
            tenChuongTrinh: "",
            ngayKhaiGiang: undefined,
            ngayKetThuc: undefined,
            ngayThi: undefined,
            trangThai: 0,
            soLuongHocVien: 0,
            hocVienDuBi: 0,
            lePhi: 0
        }
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã khóa thi", // Updated to match the interface
            accessorKey: "maKhoaThi", // Maps to maKhoaThi in the interface
        },
        {
            header: "Tên khóa thi", // Updated to match the interface
            accessorKey: "tenKhoaThi", // Maps to tenKhoaThi in the interface
        },
        {
            header: "Tên chương trình", // Matches tenChuongTrinh in the interface
            accessorKey: "tenChuongTrinh",
        },
        {
            header: "Ngày khai giảng", // Matches ngayKhaiGiang in the interface
            accessorKey: "ngayKhaiGiang",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayKhaiGiang!));
            },
        },
        {
            header: "Ngày kết thúc", // Added for ngayKetThuc
            accessorKey: "ngayKetThuc",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayKetThuc!));
            },
        },
        {
            header: "Ngày thi", // Matches ngayThi in the interface
            accessorKey: "ngayThi",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayThi!));
            },
        },
        {
            header: "Trạng thái", // Matches trangThai in the interface
            accessorKey: "trangThai",
            accessorFn(originalRow) {
                return <Anchor>{GetTrangThai(originalRow.trangThai!)?.text}</Anchor>;
            },
        },
        {
            header: "Số lượng học viên", // Matches soLuongHocVien in the interface
            accessorKey: "soLuongHocVien",
        },
        {
            header: "Học viên dự bị", // Matches hocVienDuBi in the interface
            accessorKey: "hocVienDuBi",
        },
        {
            header: "Lệ phí", // Matches lePhi in the interface
            accessorKey: "lePhi",
            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
        },
    ], []);

    return (
        <Paper mt={"md"} p={'24'} mb={"md"}>
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <Group >
                    <Select
                        flex={1}
                        label="Mã học viên"
                        data={[
                            { value: "1", label: "Nguyễn Văn A" },
                            { value: "2", label: "Trần Thị B" },
                            { value: "3", label: "Lê Văn C" },
                            { value: "4", label: "Phạm Thị D" }

                        ]}
                        searchable
                        clearable
                        defaultValue={1?.toString()}
                        onChange={(value) => form.setFieldValue("maSV", parseInt(value?.toString()!))} // If you add loaITaoChungChi to the interface
                    />
                    {/* <MyTextInput
                        label="Mã SV"
                        {...form.getInputProps("maSV")} // Maps to maSV in IDsSinhVien
                    /> */}
                    <MyButton crudType="create" mt={25}
                        {...form.getInputProps("maSV")} // Maps to maSV in IDsSinhVien
                    />
                </Group>
                <MyTextInput
                    label="Họ và Tên"
                    {...form.getInputProps("hoTen")} // Maps to hoTen in IDsSinhVien
                />

                <MyDateInput
                    label="Ngày Sinh"
                    {...form.getInputProps("ngaySinh")} // Maps to ngaySinh in IDsSinhVien
                />

                <MyTextInput
                    label="Nơi sinh"
                    {...form.getInputProps("noiSinh")} // Maps to hoTen in IDsSinhVien
                />
                <Group grow>
                    <MyTextInput
                        label="CCCD"
                        {...form.getInputProps("CCCD")} // Maps to hoTen in IDsSinhVien
                    />
                    <MyDateInput
                        label="Ngày cấp CCCD"
                        {...form.getInputProps("ngayCap")} // Maps to ngaySinh in IDsSinhVien
                    />
                </Group>
                <MyTextInput
                    label="Nơi cấp CCCD"
                    {...form.getInputProps("noiCap")} // Maps to hoTen in IDsSinhVien
                />

            </SimpleGrid>


            <MyDataTableSelect selectButtonlabel="Chọn khóa thi" listLabel="khóa thi" columns={columns} listState={listState as any} data={query.data} ></MyDataTableSelect>
            <MyFieldset mt="10" title="Lệ phí thi">

                <MyFlexRow>
                    <Text>Lệ phí: 2.500.000</Text>
                    <Text>Phải thu: 2.150.000</Text>
                    <Group>
                        <Text>Đã thu:</Text>
                        <MyNumberInput defaultValue={0}></MyNumberInput>
                    </Group>
                </MyFlexRow>
                <Space mt={5}></Space>
                <Group justify="flex-end" >
                    <Button >Thêm mới</Button>
                    <Button bg={"green"}>Lưu</Button>
                    <Button bg={"green"}>Lưu và in</Button>
                </Group>
            </MyFieldset>

        </Paper>


    );
}
function GetTrangThai(trangThai: number) {
    // Validate input is between 1 and 5
    if (trangThai < 1 || trangThai > 5) {
        throw new Error('Input must be a number between 1 and 5');
    }


    const trangThaiMap: { [key: number]: { text: string } } = {
        1: {
            text: "Đang mở",

        },
        2: {
            text: "Đã đóng",


        },
        3: {
            text: "Hủy bỏ",


        },

    };


    return trangThaiMap[trangThai];
}

const DataList: I[] = [

    {
        id: 1,
        maKhoaThi: "KT2024",
        tenKhoaThi: "Khóa thi tốt nghiệp",
        tenChuongTrinh: "Chương trình đào tạo nghề",
        ngayKhaiGiang: new Date("2024-06-30"), // Date formatted as MM/DD/YYYY
        ngayKetThuc: new Date("2024-06-30"),
        ngayThi: new Date("2024-07-05"),
        trangThai: 1,
        soLuongHocVien: 30,
        hocVienDuBi: 5,
        lePhi: 1500000
    },
    {
        id: 2,
        maKhoaThi: "KT2025",
        tenKhoaThi: "Khóa thi chứng chỉ tiếng Anh",
        tenChuongTrinh: "Chương trình tiếng Anh giao tiếp",
        ngayKhaiGiang: new Date("2024-07-15"), // Date formatted as MM/DD/YYYY
        ngayKetThuc: new Date("2024-07-15"),
        ngayThi: new Date("2024-07-20"),
        trangThai: 1,
        soLuongHocVien: 25,
        hocVienDuBi: 3,
        lePhi: 2000000
    },
    {
        id: 3,
        maKhoaThi: "KT2026",
        tenKhoaThi: "Khóa thi lập trình viên",
        tenChuongTrinh: "Chương trình đào tạo nghề",
        ngayKhaiGiang: undefined, // Use undefined if not applicable
        ngayKetThuc: undefined, // Use undefined if not applicable
        ngayThi: undefined, // Use undefined if not applicable
        trangThai: 2,
        soLuongHocVien: 0,
        hocVienDuBi: 0,
        lePhi: 1000000
    },
    {
        id: 4,
        maKhoaThi: "KT2027",
        tenKhoaThi: "Khóa thi quản trị mạng",
        tenChuongTrinh: "Chương trình đào tạo nghề",
        ngayKhaiGiang: undefined, // Use undefined if not applicable
        ngayKetThuc: undefined, // Use undefined if not applicable
        ngayThi: undefined, // Use undefined if not applicable
        trangThai: 1,
        soLuongHocVien: 40,
        hocVienDuBi: 10,
        lePhi: 1800000
    }

]
