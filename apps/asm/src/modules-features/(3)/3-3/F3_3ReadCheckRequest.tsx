'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import F3_3CreateCheckRequest from "./F3_3CreateCheckRequest";
import { useDisclosure } from "@mantine/hooks";
import { U0DateToDDMMYYYString } from "@/utils/date";
// Interface định nghĩa dữ liệu
export interface I {
    id?: number; // STT
    requiredUnit?: string; // Đơn vị yêu cầu
    materialName?: string; // Tên vật tư
    purpose?: string; // Mục đích sử dụng
    unitOfMeasure?: string; // Đơn vị tính
    quantity?: number; // Số lượng
    unitPrice?: number; // Đơn giá
    totalPrice?: number; // Thành tiền
    status?: string; // Trạng thái
    note?:string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F3_3ReadCheckRequest() {
    const [fileData, setFileData] = useState<any[]>([]);
    

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I[]>({
        queryKey: ["materialData"],
        queryFn: async () => [
            {
                id: 1,
                requiredUnit: "Phòng Đào tạo",
                materialName: "Xe bán tải ISUZU",
                purpose: "Vận chuyển nhanh tài liệu giữa các cơ sở",
                unitOfMeasure: "Chiếc",
                quantity: 1,
                unitPrice: 785000000,
                totalPrice: 785000000,
                status: "Bị từ chối",
                note:"",
                nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
        ],
    });


   


    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Đơn vị yêu cầu",
            accessorKey: "requiredUnit",
            
        },
        {
            header: "Tên vật tư",
            accessorKey: "materialName",
            
        },
        {
            header: "Mục đích sử dụng",
            accessorKey: "purpose",
            
        },
        {
            header: "Đơn vị tính",
            accessorKey: "unitOfMeasure",
           
        },
        {
            header: "Số lượng",
            accessorKey: "quantity",
            
        },
        {
            header: "Đơn giá",
            accessorKey: "unitPrice",
            
        },
        {
            header: "Thành tiền",
            accessorKey: "totalPrice",
            
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            
        },
        {
            header: "Ghi chú kiểm tra",
            accessorKey: "note",
            
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
    ], []);
    const exportConfig = {
        fields: [
            {
                fieldName: "requiredUnit",
                header: "Đơn vị yêu cầu"
            },
            {
                fieldName: "materialName",
                header: "Tên vật tư"
            },
            {
                fieldName: "purpose",
                header: "Mục đích sử dụng"
            },
            {
                fieldName: "unitOfMeasure",
                header: "Đơn vị tính"
            },
            {
                fieldName: "quantity",
                header: "Số lượng"
            },
            {
                fieldName: "unitPrice",
                header: "Đơn giá"
            },
            {
                fieldName: "totalPrice",
                header: "Thành tiền"
            },
            {
                fieldName: "status",
                header: "Trạng thái"
            },
            {
                fieldName: "note",
                header: "Ghi chú kiểm tra"
            }
        ]
    };
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!} // Sử dụng dữ liệu tạm thời
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            {/* <F3_1CreateRequestNotification /> */}
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsYeuCau"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F3_3CreateCheckRequest/>
                </MyCenterFull>
            )}
        />
    );
}
