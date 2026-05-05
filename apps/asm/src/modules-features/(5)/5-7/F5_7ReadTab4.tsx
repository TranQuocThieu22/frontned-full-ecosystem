'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";

import F5_7DeleteTab4 from "./F5_7DeleteTab4";
import { Button, Fieldset } from "@mantine/core";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { IconMessageDown, IconPlus } from "@tabler/icons-react";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { useForm } from "@mantine/form";
import { U0DateToDDMMYYYString } from "@/utils/date";

// Interface định nghĩa dữ liệu
export interface I_F5_7ReadTab4 {
    id?: number; // STT
    departmentName?: string; // Tên bộ phận
    unitOfMesuare?: string; // Đơn vị tính
    quantity?: number; // Số lượng
    warrantyTime?: Date; // Thời gian bảo hành
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function F_F5_7ReadTab4() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F5_7ReadTab4[]>({
        queryKey: ["tab4Data"], // Khóa cache
        queryFn: async () => [
            {
                id: 1,
                departmentName: "Giá treo tường",
                unitOfMesuare: "Cái",
                quantity: 1,
                warrantyTime: new Date("2026-12-31"),
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
           
        ],
    });

    
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F5_7ReadTab4>[]>(
        () => [
            {
                header: "Tên bộ phận",
                accessorKey: "departmentName",
            },
            {
                header: "Đơn vị tính",
                accessorKey: "unitOfMesuare",
            },
            {
                header: "Số lượng",
                accessorKey: "quantity",
            },
            {
                header: "Thời hạn bảo hành",
                accessorKey: "warrantyTime",
                Cell: ({ cell }) => {
                    const date = cell.getValue() as Date;
                    return date ? new Date(date).toLocaleDateString("vi-VN") : "";
                },
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
                header: "Tên bộ phận",
                fieldName: "departmentName",
            },
            {
                header: "Đơn vị tính",
                fieldName: "unitOfMesuare",
            },
            {
                header: "Số lượng",
                fieldName: "quantity",
            },
            {
                header: "Thời hạn bảo hành",
                fieldName: "warrantyTime",
            },
            {
                header: "Người cập nhật",
                fieldName: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                fieldName: "ngayCapNhat",
            }
        ]
    };
    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Fieldset>
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => (
                <>
                   
                           {/* <MyButton  crudType="create"/> */}
                               
                           <Button
                        color='indigo'
                        // eslint-disable-next-line react/jsx-no-undef
                        leftSection={<IconPlus />}
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
                                objectName="dsYeuCau"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <MyButton crudType="delete"/>
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Nút chỉnh sửa và xóa */}
                    
                    <F5_7DeleteTab4 id={row.original.id!} />
                </MyCenterFull>
            )}
        />
        </Fieldset>
    );
}
