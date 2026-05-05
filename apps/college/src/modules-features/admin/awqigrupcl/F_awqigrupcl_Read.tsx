'use client'

import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_awqigrupcl_Create from "./F_awqigrupcl_Create";
import F_awqigrupcl_Delete from "./F_awqigrupcl_Delete";
import F_awqigrupcl_Update from "./F_awqigrupcl_Update";

interface IChungChi {
    id?: number,
    name?: string,
    code?: string,
    tenChungChiEg?: string,
    phanLoai?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_awqigrupcl_Read() {

    const [fileData, setFileData] = useState<any[]>([]);

    const query = useQuery<IChungChi[]>({
        queryKey: ['F_awqigrupcl_Read'],
        queryFn: async () => chungChiData,
    })

    const columns = useMemo<MRT_ColumnDef<IChungChi>[]>(
        () => [
            {
                header: "Mã chứng chỉ",
                accessorKey: "code"
            },
            {
                header: "Tên chứng chỉ",
                accessorKey: "name"
            },
            {
                header: "Phân loại chứng chỉ",
                accessorKey: "phanLoai"
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
        ],
        []
    );

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã chứng chỉ" },
            { fieldName: "name", header: "Tên chứng chỉ" },
            { fieldName: "phanLoai", header: "Phân loại chứng chỉ" },
        ]
    };

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_awqigrupcl_Create documentType={0} />
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={() => { }}
                        form={form_multiple}
                    >
                    </AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsDotXet"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                </>
            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_awqigrupcl_Update values={row.original} />
                        <F_awqigrupcl_Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

const chungChiData: IChungChi[] = [
    {
        id: 1,
        name: "Chứng chỉ IELTS",
        code: "CCNN001",
        tenChungChiEg: "IELTS Certificate",
        phanLoai: "Ngoại ngữ",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-01-01")
    },
    {
        id: 2,
        name: "Chứng chỉ TOEIC",
        code: "CCNN002",
        tenChungChiEg: "TOEIC Certificate",
        phanLoai: "Ngoại ngữ",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-01-01")
    },
    {
        id: 3,
        name: "Chứng chỉ Bơi lội",
        code: "CCTC001",
        tenChungChiEg: "Swimming Certificate",
        phanLoai: "Thể chất",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-01-01")
    },
    {
        id: 4,
        name: "Chứng chỉ Võ thuật",
        code: "CCTC002",
        tenChungChiEg: "Martial Arts Certificate",
        phanLoai: "Thể chất",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-01-01")
    },
    {
        id: 5,
        name: "Chứng chỉ Giáo dục Quốc phòng",
        code: "CCQP001",
        tenChungChiEg: "National Defense Education Certificate",
        phanLoai: "Quốc phòng",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-01-01")
    },
];
