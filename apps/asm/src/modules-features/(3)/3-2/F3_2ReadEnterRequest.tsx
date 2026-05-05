'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import F3_2DeleteEnterRequest from "./F3_2DeleteEnterRequest"
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { IconMessageDown, IconPlus, IconTrash } from "@tabler/icons-react";
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
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_Read() {
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
                status: "Yêu cầu mới",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
        ],
    });


    // const handleDeleteAllRows = () => {
    //     setTempData([]); // Xóa toàn bộ dữ liệu
    //     setEditingRow(new Set()); // Xóa các hàng đang được chỉnh sửa
    // };
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Đơn vị yêu cầu",
            accessorKey: "requiredUnit",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.requiredUnit}
                />
        },
        {
            header: "Tên vật tư",
            accessorKey: "materialName",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.materialName}
                />
        },
        {
            header: "Mục đích sử dụng",
            accessorKey: "purpose",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.purpose}
                />
        },
        {
            header: "Đơn vị tính",
            accessorKey: "unitOfMeasure",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.unitOfMeasure}
                />
        },
        {
            header: "Số lượng",
            accessorKey: "quantity",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.quantity}
                />
        },
        {
            header: "Đơn giá",
            accessorKey: "unitPrice",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.unitPrice}
                />
        },
        {
            header: "Thành tiền",
            accessorKey: "totalPrice",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.totalPrice}
                />
        },
        {
            header: "Trạng thái",
            accessorKey: "status",

        },
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
                fieldName: "nguoiCapNhat",
                header: "Người cập nhật"
            },
            {
                fieldName: "ngayCapNhat",
                header: "Ngày cập nhật"
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
                            <Button leftSection={<IconPlus />}>
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
                            <Button color="cyan" leftSection={<IconMessageDown />}>
                                Lưu
                            </Button>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsYeuCau"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <Button style={{ color: 'white', backgroundColor: 'red' }}
                                leftSection={<IconTrash />}>
                                Xóa
                            </Button>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F3_2DeleteEnterRequest id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}