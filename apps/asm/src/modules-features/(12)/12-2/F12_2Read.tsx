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
import F12_2Create from "./F12_2Create";
import F12_2Delete from "./F12_2Delete";
import F12_2Update from "./F12_2Update";

interface ICreateUserViewModel {
    id?: number;
    maTrungTam?: string;
    tenTrungTam?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}



export default function F12_2Read() {
    const AllUniversityLecturerAndExpertQuery = useQuery<ICreateUserViewModel[]>({
        queryKey: [`F3_1ReadExternalUserCategory`],
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
                fieldName: "maTrungTam",
                header: "Mã trung tâm11"
            },
            {
                fieldName: "tenTrungTam",
                header: "Tên trung tâm"
            },

        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICreateUserViewModel>[]>(
        () => [
            {
                header: "Mã trung tâm",
                accessorKey: "maTrungTam"
            },
            {
                header: "Tên trung tâm",
                accessorKey: "tenTrungTam"
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
                            <F12_2Create />
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
                        <F12_2Update lecturerAndExpertValues={row.original} />
                        <F12_2Delete lecturerAndExpertId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
let mockData = [
    {
        id: 1,
        maTrungTam: "LT",
        tenTrungTam: "Lý thuyết",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 1,
        maTrungTam: "TH",
        tenTrungTam: "Tin học",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },

]