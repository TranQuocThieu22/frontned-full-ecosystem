'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group, TextInput, Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { useForm } from "@mantine/form";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { IconMessageDown, IconPlus, IconTrash } from "@tabler/icons-react";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { DateInput } from "@mantine/dates";

// Interface định nghĩa dữ liệu
export interface F6_4_Update {
    id?: number; // STT
    barcode?: string; // Mã vạch
    propertyName?: string; // Tên tài sản
    result?: string; // Kết quả khảo sát
    selfHealing?: boolean; // Tự khắc phục
    estimatedReplacementCost?: number; // Ước tính chi phí thay thế
    estimatedLaborCosts?: number; // Ước tính chi phí nhân công
    totalEstimate?: number; // Tổng ước phí
    surveyDate?: Date; // Ngày khảo sát
    nameofTheRequestedAsset?: string; // Tên tài sản yêu cầu
    statusDescription?:string //Mô tả hiện trạng
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F6_4Update({data}:{data:number}) {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const disc = useDisclosure(false)
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<F6_4_Update[]>({
        queryKey: ["F6_4DataUpdate"],
        queryFn: async () => [
            {
                id: 1,
                barcode: "TS2158",
                propertyName: "Màn hình 25 Inc SamSung",
                result: "Hỏng Panel màn hình",
                selfHealing: true,
                estimatedReplacementCost: 500000,
                estimatedLaborCosts: 150000,
                totalEstimate: 650000,
                surveyDate: new Date("2025-01-15"),
                nameofTheRequestedAsset: "Màn hình 25 Inc",
                statusDescription:"Không lên hình",
                nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<F6_4_Update>[]>(() => [
        {
            header: "Mã vạch",
            accessorKey: "barcode",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.barcode}
                />
        },
        {
            header: "Tên tài sản",
            accessorKey: "propertyName",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.propertyName}
                />
           
        },
        {
            header: "Kết quả khảo sát",
            accessorKey: "result",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.result}
                   
                />
        },
        {
            header: "Tự khắc phục",
            accessorKey: "selfHealing",
            accessorFn: (row) => (
                <Checkbox
                variant="unstyled"
                onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                onBlur={(event) => event.currentTarget.style.border = 'none'}
                
                />
            )
        },
        {
            header: "Ước tính chi phí thay thế",
            accessorKey: "estimatedReplacementCost",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.estimatedReplacementCost}
                />
        },
        {
            header: "Ước tính chi phí nhân công",
            accessorKey: "estimatedLaborCosts",
            accessorFn: (row) =>
            <TextInput
                variant="unstyled"
                onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                onBlur={(event) => event.currentTarget.style.border = 'none'}
                defaultValue={row.estimatedLaborCosts}
            />
        },
        {
            header: "Tổng ước tính",
            accessorKey: "totalEstimate",
            accessorFn: (row) =>
            <TextInput
                variant="unstyled"
                onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                onBlur={(event) => event.currentTarget.style.border = 'none'}
                defaultValue={row.totalEstimate}
            />
        },
        {
            header: "Ngày khảo sát",
            accessorKey: "surveyDate",
            accessorFn: (row) =>
            <DateInput
                variant="unstyled"
                onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                onBlur={(event) => event.currentTarget.style.border = 'none'}
                defaultValue={row.surveyDate || undefined} // Pass the Date object directly
            />
        },
        {
            header: "Tên tài sản yêu cầu",
            accessorKey: "nameofTheRequestedAsset",
            
        },
        {
            header: "Mô tả hiện trạng",
            accessorKey: "statusDescription",
            
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
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "barcode", header: "Mã vạch" },
            { fieldName: "propertyName", header: "Tên tài sản" },
            { fieldName: "result", header: "Kết quả khảo sát" },
            { fieldName: "selfHealing", header: "Tự khắc phục" },
            { fieldName: "estimatedReplacementCost", header: "Ước tính chi phí thay thế" },
            { fieldName: "estimatedLaborCosts", header: "Ước tính chi phí nhân công" },
            { fieldName: "totalEstimate", header: "Tổng ước tính" },
            { fieldName: "surveyDate", header: "Ngày khảo sát" },
            { fieldName: "nameofTheRequestedAsset", header: "Tên tài sản yêu cầu" },
            { fieldName: "statusDescription", header: "Mô tả hiện trạng" },
        ]
    };

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal title="Danh sách tài sản" modalSize={'100%'} label="Cập nhập" disclosure={disc}>
        <MyDataTable
            columns={columns}
            data={query.data!}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <Button color="cyan" leftSection={<IconMessageDown />}>Lưu</Button>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsYeuCau"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                </Group>
            )}
            
        />
        </MyButtonModal>
    );
}
