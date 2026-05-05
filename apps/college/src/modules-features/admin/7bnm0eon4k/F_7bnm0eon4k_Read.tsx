'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Anchor, Button } from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_7bnm0eon4k_Create from "./F_7bnm0eon4k_Create";
import F_7bnm0eon4k_Delete from "./F_7bnm0eon4k_Delete";
import F_7bnm0eon4k_Update from "./F_7bnm0eon4k_Update";

interface I {
    id?: number;
    maPhuongThuc?: string; //Mã phương thức
    tenPhuongThuc?: string;  // Tên phương thức
    tenPhuongThucEg?: string;  // Tên phương thức Eg
    maBoDem?: string; //Mã Bộ đếm
    mauHoSoDangKy?: string; // Mẫu hồ sơ đăng ký
    ghiChu?: string; // Ghi chú
}

const dataBoDem = [
    { value: "1", label: 'Học bạ lớp 12' },
    { value: "2", label: 'Điểm thi THPT quốc gia' },
    { value: "3", label: 'Học bạ + Điểm thi THPT' },
]

export default function F_7bnm0eon4k_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const query = useQuery<I[]>({
        queryKey: [`ListOfReasons`],
        queryFn: async () => [
            {
                id: 1,
                maPhuongThuc: "PT01",
                tenPhuongThuc: "Xét tuyển học bạ",
                tenPhuongThucEg: "Academic Transcript Admission",
                maBoDem: '1',
                mauHoSoDangKy: "HS01.pdf",
                ghiChu: "Xét tuyển dựa trên điểm trung bình lớp 12"
            },
            {
                id: 2,
                maPhuongThuc: "PT02",
                tenPhuongThuc: "Xét tuyển điểm thi THPT",
                tenPhuongThucEg: "National High School Exam Admission",
                maBoDem: '2',
                mauHoSoDangKy: "HS02.pdf",
                ghiChu: "Xét tuyển dựa trên điểm thi tốt nghiệp THPT"
            },
            {
                id: 3,
                maPhuongThuc: "PT03",
                tenPhuongThuc: "Xét tuyển kết hợp",
                tenPhuongThucEg: "Combined Admission",
                maBoDem: '3',
                mauHoSoDangKy: "HS03.pdf",
                ghiChu: "Xét tuyển kết hợp học bạ và điểm thi"
            },
        ],
    });

    const exportConfig = {
        fields: [
            { fieldName: "maPhuongThuc", header: "Mã phương thức" },
            { fieldName: "tenPhuongThuc", header: "Tên phương thức" },
            { fieldName: "tenPhuongThucEg", header: "Tên phương thức Eg" },
            { fieldName: "maBoDem", header: "Bộ đếm" },
            { fieldName: "mauHoSoDangKy", header: "Mẫu hồ sơ đăng ký" },
            { fieldName: "ghiChu", header: "Ghi chú" },
        ]
    }

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã phương thức",
            accessorKey: "maPhuongThuc",
        },
        {
            header: "Tên phương thức",
            accessorKey: "tenPhuongThuc",
        },
        {
            header: "Tên phương thức Eg",
            accessorKey: "tenPhuongThucEg",
        },
        {
            header: "Bộ đếm",
            accessorKey: "maBoDem",
            accessorFn: (row) => {
                return dataBoDem.find(x => x.value === row.maBoDem)?.label;
            }
        },
        {
            header: "Mẫu hồ sơ đăng ký",
            accessorKey: "mauHoSoDangKy",
            accessorFn: (row) => {
                return <Anchor href={`${row.mauHoSoDangKy}`} target="_blank">
                    {row.mauHoSoDangKy}
                </Anchor>
            },
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_7bnm0eon4k_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsLoaiThuVangLai"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                </>
            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_7bnm0eon4k_Update doituong={row.original} />
                        <F_7bnm0eon4k_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
