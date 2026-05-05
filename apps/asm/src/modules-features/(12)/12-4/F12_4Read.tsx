'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_4Create from "./F12_4Create";
import F12_4Delete from "./F12_4Delete";
import F12_4Update from "./F12_4Update";
import { MyButton } from "@/components/Buttons/Button/MyButton";

interface ICreateUserViewModel {
    id?: number;
    maDanhMucNhomKH?: string;
    tenDanhMucNhomKH?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}



export default function F12_4Read() {
    const AllUniversityLecturerAndExpertQuery = useQuery<ICreateUserViewModel[]>({
        queryKey: [`F12_4ReadExternalUserCategory`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })


    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };

    const exportConfig = {
        fields: [
            {
                fieldName: "maDanhMucNhomKH",
                header: "Mã đơn vị tính"
            },
            {
                fieldName: "tenDanhMucNhomKH",
                header: "Tên đơn vị tính"
            },

        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICreateUserViewModel>[]>(
        () => [
            {
                header: "Mã nhóm KH/NCC",
                accessorKey: "maDanhMucNhomKH"
            },
            {
                header: "Tên nhóm KH/NCC",
                accessorKey: "tenDanhMucNhomKH"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },

            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",

            },

        ],
        []
    );

    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={AllUniversityLecturerAndExpertQuery.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F12_4Create />
                            <MyButton crudType="delete" />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);

                            }} >s</AQButtonCreateByImportFile>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_4Update lecturerAndExpertValues={row.original} />
                        <F12_4Delete lecturerAndExpertId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
let mockData = [
    {
        id: 1,
        maDanhMucNhomKH: "NCC-DV",
        tenDanhMucNhomKH: "Nhà cung cấp dịch vụ",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 2,
        maDanhMucNhomKH: "NCC-PM",
        tenDanhMucNhomKH: "Nhà cung cấp phần mềm",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 3,
        maDanhMucNhomKH: "NCC-HH",
        tenDanhMucNhomKH: "Nhà cung cấp hàng hóa",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },

]