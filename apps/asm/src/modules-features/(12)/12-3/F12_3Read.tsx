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
import F12_3Create from "./F12_3Create";
import F12_3Delete from "./F12_3Delete";
import F12_3Update from "./F12_3Update";
import { MyButton } from "@/components/Buttons/Button/MyButton";

interface ICreateUserViewModel {
    id?: number;
    maDonViTinh?: string;
    tenDonViTinh?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}



export default function F12_3Read() {
    const AllUniversityLecturerAndExpertQuery = useQuery<ICreateUserViewModel[]>({
        queryKey: [`F12_3ReadExternalUserCategory`],
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
                fieldName: "maDonViTinh",
                header: "Mã đơn vị tính"
            },
            {
                fieldName: "tenDonViTinh",
                header: "Tên đơn vị tính"
            },

        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICreateUserViewModel>[]>(
        () => [
            {
                header: "Mã đơn vị tính",
                accessorKey: "maDonViTinh"
            },
            {
                header: "Tên đơn vị tính",
                accessorKey: "tenDonViTinh"
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
                            <F12_3Create />
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
                        <F12_3Update lecturerAndExpertValues={row.original} />
                        <F12_3Delete lecturerAndExpertId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
let mockData = [
    {
        id: 1,
        maDonViTinh: "CH",
        tenDonViTinh: "Chiếc",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 2,
        maDonViTinh: "Ca",
        tenDonViTinh: "Cái",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 3,
        maDonViTinh: "BO",
        tenDonViTinh: "Bộ",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },

]