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
import F12_4Create from "./F12_4Create";
import F12_4Delete from "./F12_4Delete";
import F12_4Update from "./F12_4Update";
interface I {
    id?: number,
    unitCode?: string
    unitName?: string,
    unitType?: KieuDonVi,
    affiliation?: string,
    note?: string
}
export enum KieuDonVi {
    Khoa = "Khoa",
    BoMon = "Bộ Môn",
    Phong = "Phòng",
    TrungTam = "Trung Tâm",
};

export default function F12_4Read() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const unitQuery = useQuery({
        queryKey: ["F12_4Read"],
        queryFn: async () => [
            {
                id: 1,
                unitCode: "502",
                unitName: "Phòng 502",
                unitType: KieuDonVi.Phong,
                affiliation: "Khoa Công nghệ Thông tin",
                note: "Ghi chú cho phòng 502"
            },
            {
                id: 2,
                unitCode: "503",
                unitName: "Khoa 503",
                unitType: KieuDonVi.Khoa,
                affiliation: "Trung tâm đào tạo",
                note: "Ghi chú cho khoa 503"
            },
            {
                id: 3,
                unitCode: "504",
                unitName: "Bộ Môn 504",
                unitType: KieuDonVi.BoMon,
                affiliation: "Khoa Điện - Điện tử",
                note: "Ghi chú cho bộ môn 504"
            },
            {
                id: 4,
                unitCode: "505",
                unitName: "Trung Tâm 505",
                unitType: KieuDonVi.TrungTam,
                affiliation: "Khoa Công nghệ Thông tin",
                note: "Ghi chú cho trung tâm 505"
            },
            {
                id: 5,
                unitCode: "506",
                unitName: "Phòng 506",
                unitType: KieuDonVi.Phong,
                affiliation: "Khoa Hệ thống thông tin",
                note: "Ghi chú cho phòng 506"
            },
            {
                id: 6,
                unitCode: "507",
                unitName: "Bộ Môn 507",
                unitType: KieuDonVi.BoMon,
                affiliation: "Khoa Hệ thống thông tin",
                note: "Ghi chú cho bộ môn 507"
            },
            {
                id: 7,
                unitCode: "508",
                unitName: "Khoa 508",
                unitType: KieuDonVi.Khoa,
                affiliation: "Trung tâm kỹ thuật số",
                note: "Ghi chú cho khoa 508"
            }
        ]
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã đơn vị",
                accessorKey: "unitCode"
            },
            {
                header: "Tên đơn vị",
                accessorKey: "unitName"
            },
            {
                header: "Loại đơn vị",
                accessorKey: "unitType"
            },
            {
                header: "Trực thuộc",
                accessorKey: "affiliation"
            },
        ],
        []
    );

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "ID" },
            { fieldName: "unitCode", header: "Mã đơn vị" },
            { fieldName: "unitName", header: "Tên đơn vị" },
            { fieldName: "unitType", header: "Loại đơn vị" },
            { fieldName: "affiliation", header: "Trực thuộc" },
            { fieldName: "note", header: "Ghi chú" }
        ]
    };

    if (unitQuery.isLoading) return "Loading..."
    return (
        <MyDataTable

            columns={columns}
            data={unitQuery.data!}
            enableRowSelection={true}
            renderTopToolbarCustomActions={() => {
                return (
                    <>
                        <F12_4Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => console.log("data: ")}
                            form={form}
                        />
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dmTHPB"
                            data={unitQuery.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete">Xóa</MyButton>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_4Update user={row.original} />
                        <F12_4Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

export const affiliationOptions = {
    [KieuDonVi.BoMon]: ["Bộ môn Lập trình", "Bộ môn Mạng máy tính", "Bộ môn Hệ thống nhúng"],
    [KieuDonVi.Khoa]: ["Khoa Công nghệ thông tin", "Khoa Điện - Điện tử", "Khoa Hệ thống thông tin"],
    [KieuDonVi.Phong]: ["Phòng 502", "Phòng 503", "Phòng 504"],
    [KieuDonVi.TrungTam]: ["Trung tâm đào tạo", "Trung tâm kỹ thuật số", "Trung tâm nghiên cứu"],
};

