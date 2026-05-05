'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_5Create from "./F12_5Create";
import F12_5Delete from "./F12_5Delete";
import F12_5Update from "./F12_5Update";
interface I {
    id?: number,
    locationCode?: string
    locationName?: string,
    locationType?: KieuDiaBan,
    affiliation: string,
    note?: string
}
export default function F12_5Read() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const locationQuery = useQuery({
        queryKey: ["F12_4Read"],
        queryFn: async () => [
            {
                id: 1,
                locationCode: "001",
                locationName: "Việt Nam",
                locationType: KieuDiaBan.QuocGia,
                affiliation: "Quốc tế",
                note: "Ghi chú 1"
            },
            {
                id: 2,
                locationCode: "002",
                locationName: "Hà Nội",
                locationType: KieuDiaBan.TinhThanhPho,
                affiliation: "Việt Nam",
                note: "Ghi chú 2"
            },
            {
                id: 3,
                locationCode: "003",
                locationName: "Đà Nẵng",
                locationType: KieuDiaBan.TinhThanhPho,
                affiliation: "Việt Nam",
                note: "Ghi chú 3"
            },
            {
                id: 4,
                locationCode: "004",
                locationName: "Quận Hai Bà Trưng",
                locationType: KieuDiaBan.QuanHuyem,
                affiliation: "Hà Nội",
                note: "Ghi chú 4"
            },
            {
                id: 5,
                locationCode: "005",
                locationName: "Quận Hải Châu",
                locationType: KieuDiaBan.QuanHuyem,
                affiliation: "Đà Nẵng",
                note: "Ghi chú 5"
            },
            {
                id: 6,
                locationCode: "006",
                locationName: "Phường Bạch Mai",
                locationType: KieuDiaBan.PhuongXa,
                affiliation: "Quận Hai Bà Trưng",
                note: "Ghi chú 6"
            },
            {
                id: 7,
                locationCode: "007",
                locationName: "Phường Hòa Cường Bắc",
                locationType: KieuDiaBan.PhuongXa,
                affiliation: "Quận Hải Châu",
                note: "Ghi chú 7"
            }
        ]
        // queryFn: async () => {
        //     const result = await baseAxios.get(`/Account/GetAdminAccount`, { params: { page: 5, pageNumber: 1 } });
        //     return result.data?.data || []
        // }
    })

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "ID" },
            { fieldName: "locationCode", header: "Mã địa bàn" },
            { fieldName: "locationName", header: "Tên địa bàn" },
            { fieldName: "locationType", header: "Loại địa bàn" },
            { fieldName: "affiliation", header: "Trực thuộc" },
            { fieldName: "note", header: "Ghi chú" }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã địa bàn",
                accessorKey: "locationCode"
            },
            {
                header: "Tên địa bàn",
                accessorKey: "locationName"
            },
            {
                header: "Loại địa bàn",
                accessorKey: "locationType"
            },
            {
                header: "Trực thuộc",
                accessorKey: "affiliation"
            },

        ],
        []
    );
    if (locationQuery.isLoading) return "Loading..."
    return (
        <MyDataTable
            columns={columns}
            data={locationQuery.data!}
            enableRowSelection={true}
            renderTopToolbarCustomActions={() => {
                return (
                    <>
                        <F12_5Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => console.log("data: ")}
                            form={form}
                        />
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dmTHPB"
                            data={locationQuery.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete">Xóa</MyButton>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_5Update location={row.original} />
                        <F12_5Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

export enum KieuDiaBan {
    QuocGia = "Quốc Gia",
    TinhThanhPho = "Tỉnh / Thành phố",
    QuanHuyem = "Quận / Huyện",
    PhuongXa = "Phường / Xã",
};

export const affiliationOptions = {
    [KieuDiaBan.QuocGia]: ["Quốc tế"],
    [KieuDiaBan.TinhThanhPho]: ["Việt Nam"],
    [KieuDiaBan.QuanHuyem]: ["Hà Nội", "Đà Nẵng", "Hồ Chí Minh", "Hải Phòng", "Cần Thơ"],
    [KieuDiaBan.PhuongXa]: ["Quận Hai Bà Trưng", "Quận Hải Châu", "Quận Hoàn Kiếm", "Quận Ba Đình"]
};
