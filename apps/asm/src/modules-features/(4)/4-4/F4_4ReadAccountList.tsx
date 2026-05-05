'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import F4_4Update from "./F4_4Update";
import F4_4Create from "./F4_4Create";
import F4_4Delete from "./F4_4Delete";
import { MyButton } from "@/components/Buttons/Button/MyButton";
// REVIEW: 48245 F4_4ReadAccountList
export interface IAsset {
    id?: number;
    code?: string
    barCode?: string
    name?: string
    usageUnit?: string  // Đơn vị sử dụng
    initialCost?: number
    currentCost?: number
    status?: number
    quality?: number
    proposal?: number //kiến nghị 
    note?: string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}


export default function F4_4ReadAccountList() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<IAsset[]>([]);
    const AllRequestNotification = useQuery<IAsset[]>({
        queryKey: [`F4_4ReadAccountList`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return assets
        },
    })

    useEffect(() => {
        if (AllRequestNotification.data) {
            setTempData(AllRequestNotification.data); // Sao chép dữ liệu từ query
        }
    }, [AllRequestNotification.data]);



    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã code"
            },
            {
                fieldName: "name",
                header: "Tên tài sản"
            },
            {
                fieldName: "barCode",
                header: "Mã vạch"
            },
            {
                fieldName: "usageUnit",
                header: "Đơn vị sử dụng"
            },
            {
                fieldName: "initialCost",
                header: "Nguyên giá"
            },
            {
                fieldName: "currentCost",
                header: "Giá trị còn lại"
            },
            {
                fieldName: "status",
                header: "Trạng thái"
            },
            {
                fieldName: "quality",
                header: "Chất lượng (%)"
            },
            {
                fieldName: "proposal",
                header: "Kiến nghị"
            },
            {
                fieldName: "note",
                header: "Ghi chú"
            },

        ]
    };


    const columns = useMemo<MRT_ColumnDef<IAsset>[]>(
        () => [

            {
                accessorKey: "code",
                header: "Mã tài sản"
            },
            {
                accessorKey: "barCode",
                header: "Mã vạch"
            },
            {
                accessorKey: "name",
                header: "Tên tài sản"
            },
            {
                accessorKey: "usageUnit",
                header: "Đơn vị sử dụng"
            },
            {
                accessorKey: "initialCost",
                header: "Nguyên giá"
            },
            {
                accessorKey: "currentCost",
                header: "Giá trị còn lại"
            },
            {
                accessorKey: "status",
                header: "Trạng thái"
            },
            {
                accessorKey: "quality",
                header: "Chất lượng"
            },
            {
                accessorKey: "proposal",
                header: "Kiến nghị"
            },
            {
                accessorKey: "note",
                header: "Ghi chú"
            },
            {
                accessorFn: (row) =>
                    row.ngayCapNhat ? U0DateToDDMMYYYString(new Date(row.ngayCapNhat)) : "",
                header: "Ngày cập nhật"
            },
            {
                accessorKey: "nguoiCapNhat",
                header: "Người cập nhật"
            },
        ],
        []
    );


    if (AllRequestNotification.isLoading) return "Đang tải dữ liệu..."
    if (AllRequestNotification.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={tempData}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            {/* <MyButton crudType="create" /> */}
                            <Button leftSection={<IconPlus />} color="indigo">Thêm</Button>
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
                                data={AllRequestNotification.data!}
                                exportConfig={exportConfig}
                            />
                            <MyButton crudType="delete" />
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F4_4Update data={row.original} />

                        <F4_4Delete DeleteCourseId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}


const assets: IAsset[] = [
    {
        id: 1,
        code: "TS001",
        barCode: "1234567890123",
        name: "Ghế văn phòng",
        usageUnit: "Phòng giám đốc",
        initialCost: 1500000,
        currentCost: 1200000,
        status: 1,
        quality: 90,
        proposal: 0,
        note: "Tình trạng tốt",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-10"),
    },
    {
        id: 2,
        code: "TS002",
        barCode: "9876543210987",
        name: "Laptop",
        usageUnit: "Phòng giám nhân sự",
        initialCost: 20000000,
        currentCost: 15000000,
        status: 1,
        quality: 85,
        proposal: 1,
        note: "Cần thay pin",
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-01-12"),
    },
    {
        id: 3,
        code: "TS003",
        barCode: "5678901234567",
        name: "Máy chiếu",
        usageUnit: "Phòng giám nhân sự",
        initialCost: 8000000,
        currentCost: 5000000,
        status: 0,
        quality: 60,
        proposal: 2,
        note: "Đề xuất thay thế do ánh sáng yếu",
        nguoiCapNhat: "user2",
        ngayCapNhat: new Date("2025-01-14"),
    },
    {
        id: 4,
        code: "TS004",
        barCode: "5432109876543",
        name: "Máy lạnh",
        usageUnit: "Phòng giám nhân sự",
        initialCost: 12000000,
        currentCost: 10000000,
        status: 1,
        quality: 80,
        proposal: 0,
        note: "Hoạt động tốt, vừa được bảo dưỡng",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-15"),
    },
    {
        id: 5,
        code: "TS005",
        barCode: "3210987654321",
        name: "Máy in",
        usageUnit: "Phòng giám nhân sự",
        initialCost: 5000000,
        currentCost: 2000000,
        status: 0,
        quality: 50,
        proposal: 2,
        note: "Đề xuất thay thế do thường xuyên gặp sự cố",
        nguoiCapNhat: "user3",
        ngayCapNhat: new Date("2025-01-13"),
    },
];
