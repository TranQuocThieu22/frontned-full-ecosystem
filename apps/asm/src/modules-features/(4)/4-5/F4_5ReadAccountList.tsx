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
import F4_5Create from "./F4_5Create";
import F4_5Delete from "./F4_5Delete";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import F4_5Update from "./F4_5Update";
// REVIEW: 48246 F4_5ReadAssetList

export interface IAsset {
    id?: number;
    code?: string
    barCode?: string
    name?: string
    usageUnit?: string  // Đơn vị sử dụng
    initialCost?: number
    currentCost?: number
    depreciationValue?: number // giá trị khấu hao
    residualValue?: number // giá trị còn lại

    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}


export default function F4_5ReadAssetList() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<IAsset[]>([]);
    const AllRequestNotification = useQuery<IAsset[]>({
        queryKey: [`F4_5ReadAssetList`],
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
                header: "Mã tài sản"
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
                header: "Giá trị mua mới"
            },
            {
                fieldName: "currentCost",
                header: "Giá trị đầu kỳ"
            },
            {
                fieldName: "depreciationValue",
                header: "Giá trị khấu hao"
            },
            {
                fieldName: "residualValue",
                header: "Giá trị còn lại"
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
                accessorKey: "name",
                header: "Tên tài sản"
            },
            {
                accessorKey: "barCode",
                header: "Mã vạch"
            },
            {
                accessorKey: "usageUnit",
                header: "Đơn vị sử dụng"
            },
            {
                accessorKey: "initialCost",
                header: "Giá trị mua mới"
            },
            {
                accessorKey: "currentCost",
                header: "Giá trị đầu kỳ"
            },
            {
                accessorKey: "depreciationValue",
                header: "Giá trị khấu hao"
            },
            {
                accessorKey: "residualValue",
                header: "Giá trị còn lại"
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
        // renderRowActions={({ row }) => {
        //     return (
        //         <MyCenterFull>
        //             <F4_5Update data={row.original} />

        //             <F4_5Delete DeleteCourseId={row.original.id!} />
        //         </MyCenterFull>
        //     )
        // }}
        />
    )
}


const assets: IAsset[] = [
    {
        id: 1,
        code: "TV55SS",
        barCode: "TS02356",
        name: "Tivi 55 inch",
        usageUnit: "Phòng hành chính",
        initialCost: 45000000,
        currentCost: 44950000,
        depreciationValue: 50000, // giá trị khấu hao = initialCost - currentCost
        residualValue: 44900000,   // giá trị còn lại = currentCost
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-10"),
    }
];
