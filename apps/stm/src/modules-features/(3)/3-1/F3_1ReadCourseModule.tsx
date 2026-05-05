'use client'
import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F3_1CreateCourseModule from "./F3_1CreateCourseModule";
import F3_1DeleteCourseModule from "./F3_1DeleteCourseModule";
import F3_1UpdateCourseModule from "./F3_1UpdateCourseModule";

interface ICourseModuleViewModel {
    id?: number;
    code?: string;
    name?: string;
    roomTypeId?: number;
    roomType?: IroomType;
    classPeriodNumber?: number;
    hours?: number;
    note?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
interface IroomType {
    id: number;
    note?: string;
    name?: string;
    code?: string;
}
let mockData = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        totalLecture: 30,
        totalHour: 45,
        roomPropertyId: 1,
        roomPropertyName: "Lý thuyết",
        note: "Ghi chú 1",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 2,
        code: "MATH201",
        name: "Calculus I",
        totalLecture: 40,
        totalHour: 60,
        roomPropertyId: 2,
        roomPropertyName: "Thực hành",
        note: "Ghi chú 2",
        nguoiCapNhat: "Nguyễn Văn B",
        ngayCapNhat: new Date("2021-07-12T15:00:00Z")
    },
    {
        id: 3,
        code: "PHY301",
        name: "Physics I",
        totalLecture: 35,
        totalHour: 50,
        roomPropertyId: 1,
        roomPropertyName: "Lý thuyết",
        note: "Ghi chú 3",
        nguoiCapNhat: "Nguyễn Văn C",
        ngayCapNhat: new Date("2021-07-13T15:00:00Z")
    },
    {
        id: 4,
        code: "CHEM101",
        name: "General Chemistry",
        totalLecture: 25,
        totalHour: 40,
        roomPropertyId: 1,
        roomPropertyName: "Lý thuyết",
        note: "Ghi chú 4",
        nguoiCapNhat: "Nguyễn Văn D",
        ngayCapNhat: new Date("2021-07-14T15:00:00Z")
    },
    {
        id: 5,
        code: "BIO101",
        name: "Introduction to Biology",
        totalLecture: 28,
        totalHour: 42,
        roomPropertyId: 2,
        roomPropertyName: "Thực hành",
        note: "Ghi chú 5",
        nguoiCapNhat: "Nguyễn Văn E",
        ngayCapNhat: new Date("2021-07-15T15:00:00Z")
    }
]

export default function F3_3ReadCourseModule() {
    const [fileData, setFileData] = useState<any[]>([]);

    const AllCourseModule = useQuery<ICourseModuleViewModel[]>({
        queryKey: [`F3_3ReadCourseModule`],
        queryFn: async () => {
            const response = await baseAxios.get("/subject/getall?cols=roomType");
            const result = response.data.data;
            return result
        },
    })

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
                fieldName: "code",
                header: "Mã môn học"
            },
            {
                fieldName: "name",
                header: "Tên môn học"
            },
            {
                fieldName: "classPeriodNumber",
                header: "Số tiết"
            },
            {
                fieldName: "hours",
                header: "Số giờ"
            },
            {
                fieldName: "roomType.name",
                header: "Tính chất phòng"
            }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICourseModuleViewModel>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "code"
            },
            {
                header: "Tên môn học",
                accessorKey: "name"
            },
            {
                header: "Số tiết",
                accessorKey: "classPeriodNumber"
            },
            {
                header: "Số giờ",
                accessorKey: "hours"
            },
            {
                header: "Tính chất phòng",
                accessorKey: "roomType.name"
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }
        ]
        ,
        []
    );

    if (AllCourseModule.isLoading) return "Đang tải dữ liệu..."
    if (AllCourseModule.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={AllCourseModule.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F3_1CreateCourseModule />
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
                                data={AllCourseModule.data!}
                                exportConfig={exportConfig}
                            />
                            <AQButtonExportData
                                isAllData={false}
                                objectName="dsModuleMonHoc"
                                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_1UpdateCourseModule courseModuleValues={row.original} />
                        <F3_1DeleteCourseModule DeleteCourseId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
