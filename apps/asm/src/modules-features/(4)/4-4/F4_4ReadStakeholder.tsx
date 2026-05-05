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
// REVIEW: 48245 F4_4ReadStakeholder
export interface IStakeHolder {
    id?: number;
    name?: string
    role?: string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}


export default function F4_4ReadStakeholder() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<IStakeHolder[]>([]);
    const AllRequestNotification = useQuery<IStakeHolder[]>({
        queryKey: [`F4_4ReadStakeholder`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return stakeholders
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
                fieldName: "name",
                header: "Tên tài sản"
            },
            {
                fieldName: "role",
                header: "Chức vụ"
            },

        ]
    };


    const columns = useMemo<MRT_ColumnDef<IStakeHolder>[]>(
        () => [



            {
                accessorKey: "name",
                header: "Tên tài sản"
            },
            {
                accessorKey: "role",
                header: "Chức vụ"
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

                        <F4_4Delete DeleteCourseId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}


const stakeholders: IStakeHolder[] = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        role: "Giám đốc",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-10"),
    },
    {
        id: 2,
        name: "Trần Thị B",
        role: "Trưởng phòng Nhân sự",
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-01-11"),
    },
    {
        id: 3,
        name: "Phạm Văn C",
        role: "Kỹ sư phần mềm",
        nguoiCapNhat: "user2",
        ngayCapNhat: new Date("2025-01-12"),
    },
    {
        id: 4,
        name: "Lê Thị D",
        role: "Nhân viên Kế toán",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-13"),
    },
    {
        id: 5,
        name: "Hoàng Văn E",
        role: "Quản lý dự án",
        nguoiCapNhat: "user3",
        ngayCapNhat: new Date("2025-01-14"),
    },
];
