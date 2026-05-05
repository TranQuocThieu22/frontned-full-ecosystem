'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ukagvjhxgy_Create from "./F_ukagvjhxgy_Create";
import F_ukagvjhxgy_Delete from "./F_ukagvjhxgy_Delete";
import F_ukagvjhxgy_Update from "./F_ukagvjhxgy_Update";



export interface I_ukagvjhxgy_Read {
    id?: number;
    courseCode?: string; // Course code
    courseName?: string; // Course name
    chuongTrinh?: number; // Course name
    bacHe?: number; // Course name
    NHHKVao?: string; // Course name
    NHHKRa?: string; // Course name
    nienKhoa?: string; // Course name
    ngonNguDaoTao?: number; // Course name
    chiNhanh?: number; // Course name
    note?: string; // Course name
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_ukagvjhxgy_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const form = useForm<I_ukagvjhxgy_Read>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_ukagvjhxgy_Read[]>({
        queryKey: ["F_ukagvjhxgy_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_ukagvjhxgy_Read>[]>(() => [
        { header: "Mã khóa", accessorKey: "courseCode" },
        { header: "Tên khóa", accessorKey: "courseName" },
        {
            header: "Chương trình", accessorKey: "chuongTrinh",
            accessorFn: (originalRow) => {
                // const trangThaiData = GetTrangThai(originalRow.trangThai!);
                // return <Anchor >{trangThaiData.text}</Anchor>;
                if (originalRow.chuongTrinh == 1) return <Text> Khoa học máy tính</Text>
                if (originalRow.chuongTrinh == 2) return <Text> ngoại ngữ</Text>

            },
        },
        {
            header: "Bậc hệ", accessorKey: "bacHe",
            accessorFn: (originalRow) => {
                // const trangThaiData = GetTrangThai(originalRow.trangThai!);
                // return <Anchor >{trangThaiData.text}</Anchor>;
                if (originalRow.bacHe == 1) return <Text> Đại học chính quy</Text>

            },
        },
        { header: "NHHK Vào", accessorKey: "NHHKVao" },
        { header: "NHHK Ra", accessorKey: "NHHKRa" },
        { header: "Niên khóa", accessorKey: "nienKhoa" },
        {
            header: "Ngôn ngữ đào tạo", accessorKey: "ngonNguDaoTao",
            accessorFn: (originalRow) => {
                // const trangThaiData = GetTrangThai(originalRow.trangThai!);
                // return <Anchor >{trangThaiData.text}</Anchor>;
                if (originalRow.ngonNguDaoTao == 1) return <Text> Tiếng Việt</Text>
                if (originalRow.ngonNguDaoTao == 2) return <Text> Tiếng Anh</Text>

            },
        },
        {
            header: "Chi nhánh",
            accessorKey: "chiNhanh",
            accessorFn: (originalRow) => {
                // const trangThaiData = GetTrangThai(originalRow.trangThai!);
                // return <Anchor >{trangThaiData.text}</Anchor>;
                if (originalRow.chiNhanh == 1) return <Text> Thủ Đức</Text>
                if (originalRow.chiNhanh == 2) return <Text> Gò Vấp</Text>

            },
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <MyDataTable
                exportAble
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <F_ukagvjhxgy_Create />
                                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                    console.log(form_multiple.values);

                                }} >s</AQButtonCreateByImportFile>
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={AllUserQuery.data || []}
                renderRowActions={({ row }) => {
                    return (

                        <MyCenterFull>
                            <F_ukagvjhxgy_Update values={row.original} />
                            <F_ukagvjhxgy_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}

const data: I_ukagvjhxgy_Read[] = [
    {
        id: 1,
        courseCode: "IT2024-1",
        courseName: "Công nghệ thông tin khóa 24",
        chuongTrinh: 1,
        bacHe: 1,
        NHHKVao: "2024-1",
        NHHKRa: "2028-2",
        nienKhoa: "2024-2028",
        ngonNguDaoTao: 1,
        chiNhanh: 1,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    }
];
