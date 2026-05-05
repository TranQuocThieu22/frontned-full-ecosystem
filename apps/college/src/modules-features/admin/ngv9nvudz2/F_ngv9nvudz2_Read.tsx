"use client";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button, Group, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ngv9nvudz2_Create from "./F_ngv9nvudz2_Create";
import F_ngv9nvudz2_Delete from "./F_ngv9nvudz2_Delete";
import F_ngv9nvudz2_Update from "./F_ngv9nvudz2_Update";

export interface I_ngv9nvudz2_LoaiThoiGian {
    id: number;
    maThoiGian: string;
    tenThoiGian: string;
    sang: number;
    chieu: number;
    toi: number;
    note: string;
}

export interface I_ngv9nvudz2_ChiTietLoaiTg {
    id: number;
    thoiGianBatDau: string;
    soPhut: number;
}

export default function F_ngv9nvudz2_Read() {
    const [importDataDsLoaiTg, setImportDataDsLoaiTg] = useState(false);
    const [importDataCTLoaiTg, setImportDataCTLoaiTg] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // form Loại thời gian
    const form = useForm<I_ngv9nvudz2_LoaiThoiGian>({
        initialValues: {
            id: 0,
            maThoiGian: "",
            tenThoiGian: "",
            sang: 0,
            chieu: 0,
            toi: 0,
            note: ""
        },
    });

    // Lấy dữ liệu danh sách loại thời gian
    const danhSachLoaiThoiGianQuery = useQuery<I_ngv9nvudz2_LoaiThoiGian[]>({
        queryKey: ["F_ngv9nvudz2_LoaiThoiGian"],
        queryFn: async () => {
            return [
                {
                    id: 1,
                    maThoiGian: "Tiet",
                    tenThoiGian: "Tiết học",
                    sang: 5,
                    chieu: 5,
                    toi: 3,
                    note: "Ghi chú?"
                },
                {
                    id: 2,
                    maThoiGian: "CaThi",
                    tenThoiGian: "Ca thi",
                    sang: 3,
                    chieu: 3,
                    toi: 2,
                    note: ""
                }
            ];
        },
    });

    // Lấy dữ liệu chi tiet loại thời gian
    const chiTietLoaiThoiGianQuery = useQuery<I_ngv9nvudz2_ChiTietLoaiTg[]>({
        queryKey: ["F_ngv9nvudz2_ChiTietLoaiTg"],
        queryFn: async () => {
            return [
                {
                    id: 1,
                    thoiGianBatDau: "07:00",
                    soPhut: 45,
                },
                {
                    id: 2,
                    thoiGianBatDau: "07:45",
                    soPhut: 45,
                },
                {
                    id: 3,
                    thoiGianBatDau: "08:30",
                    soPhut: 45,
                },
                {
                    id: 4,
                    thoiGianBatDau: "09:15",
                    soPhut: 45,
                },
                {
                    id: 5,
                    thoiGianBatDau: "10:00",
                    soPhut: 45,
                },
                {
                    id: 6,
                    thoiGianBatDau: "10:45",
                    soPhut: 45,
                },
                {
                    id: 7,
                    thoiGianBatDau: "11:15",
                    soPhut: 45,
                },
                {
                    id: 8,
                    thoiGianBatDau: "12:00",
                    soPhut: 45,
                },
            ];
        },
    });


    // cloumn danh sách loại thời gian
    const columnsDSLoaiTg = useMemo<MRT_ColumnDef<I_ngv9nvudz2_LoaiThoiGian>[]>(
        () => [
            { header: "Mã thời gian", accessorKey: "maThoiGian" },
            { header: "Tên thời gian", accessorKey: "tenThoiGian" },
            { header: "Sáng", accessorKey: "sang" },
            { header: "Chiều", accessorKey: "chieu" },
            { header: "Tối", accessorKey: "toi" },
        ],
        []
    );

    // column danh sách chi tiết loại thời gian
    const columnsChiTietLoaiTg = useMemo<MRT_ColumnDef<I_ngv9nvudz2_ChiTietLoaiTg>[]>(
        () => [
            { header: "Thời gian bắt đầu", accessorKey: "thoiGianBatDau" },
            { header: "Số phút", accessorKey: "soPhut" },
        ],
        []
    );

    // export config danh sách loại thời gian
    const dsLoaiTgExportCfg = {
        fields: [
            { fieldName: "id", header: "STT" },
            { header: "Mã thời gian", fieldName: "maThoiGian" },
            { header: "Tên thời gian", fieldName: "tenThoiGian" },
            { header: "Sáng", fieldName: "sang" },
            { header: "Chiều", fieldName: "chieu" },
            { header: "Tối", fieldName: "toi" },
            { header: "Ghi chú", fieldName: "note" },
        ],
    };

    // export config danh sách chi tiết loại thời gian
    const ctLoaiTgExportCfg = {
        fields: [
            { fieldName: "id", header: "STT" },
            { header: "Thời gian bắt đầu", fieldName: "thoiGianBatDau" },
            { header: "Số phút", fieldName: "soPhut" },
        ],
    };

    if (danhSachLoaiThoiGianQuery.isLoading || chiTietLoaiThoiGianQuery.isLoading) return "Loading...";
    if (danhSachLoaiThoiGianQuery.isError || chiTietLoaiThoiGianQuery.isError) return "Error..";

    return (
        <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
            <MyFieldset title="Danh sách loại thời gian">
                <MyDataTable
                    enableRowNumbers={true}
                    enablePagination={false}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <F_ngv9nvudz2_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportDataDsLoaiTg}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="DanhSachLoaiThoiGian"
                                data={danhSachLoaiThoiGianQuery.data!}
                                exportConfig={dsLoaiTgExportCfg}
                            />
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button>
                        </Group>
                    )}
                    columns={columnsDSLoaiTg}
                    data={danhSachLoaiThoiGianQuery.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_ngv9nvudz2_Update data={row.original} />
                            <F_ngv9nvudz2_Delete id={row.original.id!} contextData={row.original.maThoiGian} />
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
            <MyFieldset title="Chi tiết loại thời gian">
                <MyDataTable
                    enableRowNumbers={true}
                    enablePagination={false}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <AQButtonCreateByImportFile
                                setImportedData={setImportDataCTLoaiTg}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="ChiTietLoaiThoiGian"
                                data={chiTietLoaiThoiGianQuery.data!}
                                exportConfig={ctLoaiTgExportCfg}
                            />
                            <MyButton crudType="save"></MyButton>
                        </Group>
                    )}
                    columns={columnsChiTietLoaiTg}
                    data={chiTietLoaiThoiGianQuery.data || []}
                />
            </MyFieldset>
        </SimpleGrid>
    );
}