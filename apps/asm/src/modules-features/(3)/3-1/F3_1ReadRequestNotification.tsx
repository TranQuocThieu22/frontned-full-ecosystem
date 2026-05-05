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
import F3_1CreateCourseModule from "./F3_1CreateRequestNotification";
import F3_1DeleteCourseModule from "./F3_1DeleteRequestNotification";
import F3_1UpdateCourseModule from "./F3_1UpdateRequestNotification";
import F3_1CreateRequestNotification from "./F3_1CreateRequestNotification";
import F3_1UpdateRequestNotification from "./F3_1UpdateRequestNotification";
import F3_1DeleteRequestNotification from "./F3_1DeleteRequestNotification";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";

export interface IRequestNotification {
    id?: number;
    sendDate?:Date | undefined;
    notificationTitle?:string
    file?:File | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

let mockData = [
    {
        id: 1,
        sendDate: new Date("2024-01-01T15:00:00z"),
        notificationTitle:"Thông báo các đơn vị nhập đề xuất mua sắm vật tư hoạt động cho năm 2025",
        file:new File(["dummy content"], "A.pdf", { type: "application/pdf" }),
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
]

export default function F3_1ReadRequestNotification() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<IRequestNotification[]>([]);

    


    const AllRequestNotification = useQuery<IRequestNotification[]>({
        queryKey: [`F3_1ReadRequestNotification`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })
    
    useEffect(() => {
        if (AllRequestNotification.data) {
            setTempData(AllRequestNotification.data); // Sao chép dữ liệu từ query
        }
    }, [AllRequestNotification.data]);

    const handleDeleteAllRows = () => {
        setTempData([]); // Xóa toàn bộ dữ liệu
    };

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };

    const exportConfig = {
        fields: [
            {
                fieldName: "sendDate",
                header: "Ngày gửi"
            },
            {
                fieldName: "notificationTitle",
                header: "Tiêu đề thông báo"
            },
            {
                fieldName: "file",
                header: "File đính kềm Thao tác"
            },
            
        ]
    };

    const columns = useMemo<MRT_ColumnDef<IRequestNotification>[]>(
        () => [
            {
                accessorFn: (row) =>
                    row.sendDate ? U0DateToDDMMYYYString(new Date(row.sendDate)) : "",
                header: "Ngày gửi"
            },
            {
                accessorKey: "notificationTitle",
                header: "Tiêu đề thông báo"
            },
            {
                header: "File đính kèm Thao tác",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF id={row.id} />
                        </MyCenterFull>
                    )
                }
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
        ]
        ,
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
                            <F3_1CreateRequestNotification />
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
                           <Button style={{color:'white',backgroundColor:'red'}}  
                    onClick={handleDeleteAllRows} leftSection={<IconTrash />}>
                                Xóa
                            </Button>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_1UpdateRequestNotification data={row.original} />
                        <F3_1DeleteRequestNotification DeleteCourseId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}


