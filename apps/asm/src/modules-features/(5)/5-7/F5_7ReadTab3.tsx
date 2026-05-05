'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F5_7DeleteTab3 from "./F5_7DeleteTab3";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { IconMessageDown, IconPlus } from "@tabler/icons-react";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";

// Interface định nghĩa dữ liệu
export interface I_F5_7ReadTab3 {
    id?: number; // STT
    departmentName?: string; // Tên bộ phận
    unitOfMeasure?: string; // Đơn vị tính
    quantity?: number; // Số lượng
    warrantyTime?: Date; // Thời gian bảo hành
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function F5_7ReadTab3() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F5_7ReadTab3[]>({
        queryKey: ["F5_7ReadTab3"], // Khóa cache
        queryFn: async () => [
            {
                id: 1,
                departmentName: "Màn hình Tivi",
                unitOfMeasure: "Cái",
                quantity: 1,
                warrantyTime: new Date("2026-12-31"),
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
            {
                id: 2,
                departmentName: "Chân màn hình Tivi",
                unitOfMeasure: "Cái",
                quantity: 1,
                warrantyTime: new Date("2026-12-31"),
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
        ],
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F5_7ReadTab3>[]>(
        () => [
            {
                header: "Tên bộ phận",
                accessorKey: "departmentName",
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
                fieldName: "unitOfMeasure",
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
            <MyFlexColumn>
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => (
                <>
                    {/* Nút thêm mới */}
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
                    <F5_7DeleteTab3 id={row.original.id!} />
                </MyCenterFull>
            )}
        />
        <Group justify="flex-end">
            
            <MyButton  crudType="save"/>
          </Group>
          </MyFlexColumn>
        </Fieldset>
    );
}
