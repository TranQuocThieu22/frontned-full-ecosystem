'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { U0DateToDDMMYYYString } from "@/utils/date";
import F5_9DeleteTransferDetailsTab1 from "./F5_9DeleteTransferDetailsTab1";


// Interface định nghĩa dữ liệu
export interface I_Detail_List {
    id?: number; // STT
    assetCode?: string; // Mã tài sản
    assetName?: string; // Tên tài sản
    barcode?: string; // Mã vạch
    fromUnit?: string; // Từ đơn vị
    toUnit?: string; // Đến đơn vị
    residualValue?: number; // Giá trị còn lại
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
let mockData: I_Detail_List[] = [
    {
        id: 1,
        assetCode: "MH55SS",
        assetName: "Màn hình vi tính 25 Inc",
        barcode: "TS02356",
        fromUnit: "Phòng Giám đốc",
        toUnit: "Phòng Hành chính",
        residualValue: 5000000,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
]
// Component hiển thị bảng dữ liệu
export default function F5_9ReadTransferDetailsTab1() {
    const [fileData, setFileData] = useState<any[]>([]);
    const queryClient = useQueryClient()
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_Detail_List[]>({
        queryKey: ["F5_9detailListDataTab1"], // Khóa cache
        queryFn: async () => {
            return mockData
        }
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_Detail_List>[]>(
        () => [
            {
                header: "Mã tài sản",
                accessorKey: "assetCode",
            },
            {
                header: "Tên tài sản",
                accessorKey: "assetName",
            },
            {
                header: "Mã vạch",
                accessorKey: "barcode",
            },
            {
                header: "Từ đơn vị",
                accessorKey: "fromUnit",
            },
            {
                header: "Đến đơn vị",
                accessorKey: "toUnit",
            },
            {
                header: "Giá trị còn lại",
                accessorKey: "residualValue",
                Cell: ({ cell }) => `${cell.getValue<number>().toLocaleString()} `, // Format số tiền
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
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

    const exportConfig = {
        fields: [
            {
                header: "Mã tài sản",
                fieldName: "assetCode",
            },
            {
                header: "Tên tài sản",
                fieldName: "assetName",
            },
            {
                header: "Mã vạch",
                fieldName: "barcode",
            },
            {
                header: "Từ đơn vị",
                fieldName: "fromUnit",
            },
            {
                header: "Đến đơn vị",
                fieldName: "toUnit",
            },
            {
                header: "Giá trị còn lại",
                fieldName: "residualValue",
            }
        ]
    };
    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <>
                    {/* Nút tạo mới */}
                    <Button
                        color='indigo'
                        // eslint-disable-next-line react/jsx-no-undef
                        leftSection={<IconPlus />}
                        onClick={() => {
                            const newRecord: I_Detail_List = {
                                id: mockData.length + 1,
                                assetCode: "",
                                assetName: "",
                                barcode: "",
                                fromUnit: "",
                                toUnit: "",
                                residualValue: 0,

                            };

                            queryClient.setQueryData<I_Detail_List[]>([`F5_9detailListDataTab1`], [...query.data!, newRecord]);
                        }}
                    >
                        Thêm
                    </Button>
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ");
                            }
                        }
                        form={form_multiple}
                    >s</AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsChiTietDieuChuyen"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <MyButton crudType="delete" />
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Nút chỉnh sửa và xóa */}
                    <F5_9DeleteTransferDetailsTab1 id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
