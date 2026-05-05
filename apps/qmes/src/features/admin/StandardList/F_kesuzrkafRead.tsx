'use client'
import { MyDataTable } from '@/components/ui/DataDisplay/DataTable/MyDataTable';
import { Button, Fieldset, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from '@tanstack/react-query';
import { AQButtonCreateByImportFile } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_kesuzrkafCreate from "./F_kesuzrkafCreate";
import F_kesuzrkafDelete from './F_kesuzrkafDelete';
import F_kesuzrkafUpdate from './F_kesuzrkafUpdate';
export interface I_kesuzrkafRead {
    id?: number;
    maTieuChuan?: string;
    tenTieuChuan?: string;
    tenTieuChuanEg?: string;
    ghiChu?: string;
}


export default function F_kesuzrkafRead(
) {
    const AllUniversityLecturerAndExpertQuery = useQuery<I_kesuzrkafRead[]>({
        queryKey: [`I_kesuzrkafRead`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })
    const columns = useMemo<MRT_ColumnDef<I_kesuzrkafRead>[]>(
        () => [
            {
                header: "Mã Tiêu Chuẩn",
                accessorKey: "maTieuChuan"
            },
            {
                header: "Tên Tiêu Chuẩn",
                accessorKey: "tenTieuChuan"
            },
            {
                header: "Tên tiêu chuẩn Eg",
                accessorKey: "tenTieuChuanEg"
            },
            {
                header: "Ghi Chú",
                accessorKey: "ghiChu",

            },

        ],
        []
    );
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const [selectedRows, setSelectedRows] = useState<number[]>([]);


    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."
    return (
        <Fieldset legend={`Danh sách tiêu chuẩn`}>

            <MyDataTable
                exportAble
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                setSelectedRow={setSelectedRows}
                data={AllUniversityLecturerAndExpertQuery.data!}
                renderTopToolbarCustomActions={() => {
                    return (
                        <Group>
                            <F_kesuzrkafCreate />
                            <AQButtonCreateByImportFile setImportedData={(data) => console.log("Imported Data:", data)} onSubmit={() => { }} form={form_multiple} />
                            <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                        </Group>)
                }}

                renderRowActions={({ row }) => {
                    return (
                        <Group >
                            <F_kesuzrkafUpdate values={row.original} />
                            <F_kesuzrkafDelete id={row.original.id!} maTieuChuan={row.original.maTieuChuan!} />
                        </Group>
                    )
                }}
            />
        </Fieldset>
    )
}

const mockData: I_kesuzrkafRead[] = [
    {
        id: 1,
        maTieuChuan: "TC01",
        tenTieuChuan: "Tổ chức và quản trị",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 2,
        maTieuChuan: "TC02",
        tenTieuChuan: "Giảng viên",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 3,
        maTieuChuan: "TC03",
        tenTieuChuan: "Cơ sở vật chất",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 4,
        maTieuChuan: "TC04",
        tenTieuChuan: "Tài chính",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 5,
        maTieuChuan: "TC05",
        tenTieuChuan: "Tuyển sinh và đào tạo",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 6,
        maTieuChuan: "TC06",
        tenTieuChuan: "Nghiên cứu và đổi mới sáng tạo",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 7,
        maTieuChuan: "TC07",
        tenTieuChuan: "Phục vụ khảo sát người học",
        tenTieuChuanEg: "",
        ghiChu: "",

    }
];
