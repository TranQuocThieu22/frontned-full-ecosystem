'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F5_7DeleteTab2 from "./F5_7DeleteTab2";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Fieldset, Group } from "@mantine/core";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { MyButton } from "@/components/Buttons/Button/MyButton";

// Interface định nghĩa dữ liệu
export interface I_F5_7ReadTab2 {
    id?: number; // STT
    documentDate?: Date; // Ngày chứng từ
    interpretation?: string; // Diễn giải
    amount?: number; // Số tiền
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function F5_7ReadTab2() {
    const [fileData, setFileData] = useState<any[]>([]);
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F5_7ReadTab2[]>({
        queryKey: ["documentData"], // Khóa cache
        queryFn: async () => [
            {
                id: 1,
                documentDate: new Date("2024-01-01"),
                interpretation: "Mua mới màn hình 24 Inc",
                amount: 5000000,
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
        ],
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F5_7ReadTab2>[]>(
        () => [
            {
                header: "Ngày chứng từ",
                accessorKey: "documentDate",
                Cell: ({ cell }) => {
                    const date = cell.getValue() as Date;
                    return new Date(date).toLocaleDateString("vi-VN");
                },
            },
            {
                header: "Diễn giải",
                accessorKey: "interpretation",
            },
            {
                header: "Số tiền",
                accessorKey: "amount",
                Cell: ({ cell }) =>
                    cell.getValue()
                        ? Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                              cell.getValue() as number
                          )
                        : "",
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
                header: "Ngày chứng từ",
                fieldName: "documentDate",
               
            },
            {
                header: "Diễn giải",
                fieldName: "interpretation",
            },
            {
                header: "Số tiền",
                fieldName: "amount",
                
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
            
                
        <MyFlexRow style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <MySelect
        style={{
            flex: "1", 
            maxWidth: "250px", // Hạn chế chiều rộng của MySelect
        }}
        data={['Mua mới']}
        defaultValue="Mua mới"
        label="Nguồn gốc hình thành"
    />
    <Button
        size="xs" // Kích thước nhỏ
        style={{
            padding: "4px 12px", // Giảm padding
            fontSize: "14px", // Chỉnh kích thước chữ nhỏ
            height: "37px", // Đảm bảo chiều cao nút nhỏ
            flexShrink: 0, // Ngăn không cho button co lại
            marginTop:"25px"
        }}
    >
        Chọn chứng từ
    </Button>
</MyFlexRow>


           
            <MyDataTable
            enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => (
                <>
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
                                objectName="dsModuleMonHoc"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                           <Button style={{color:'white',backgroundColor:'red'}}  
                     leftSection={<IconTrash />}>
                                Xóa
                            </Button>
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Nút chỉnh sửa và xóa */}
                    
                    <F5_7DeleteTab2 id={row.original.id!} />
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
