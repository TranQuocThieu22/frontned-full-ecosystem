'use client'
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F4_3_3ModalProgressByUserId from "../../(3)/4-3-3/F4_3_3ModalProgressByUserId";
import F4_2_3LockButton from "./F4_2_3LockButton";

interface ICreateUserViewModel {
    id?: number;
    code?: string;
    fullName?: string;
    TotalHours?: string;
    ProgressPercentage?: string;
    ReportHours?: string;
    ReportPercentage?: string;
    ConferenceDuration?: string;
    ConferenceProgress?: string;
    isEnabled?: string;
    Rate: string;

}

export default function F4_2_2Read() {
    const pogression = useQuery<ICreateUserViewModel[]>({
        queryKey: [`F4_2_2Read`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            mockData
    })


    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã"
            },
            {
                fieldName: "fullName",
                header: "Họ và tên"
            },
            {
                fieldName: "TotalHours",
                header: "Số giờ đề tài",
            },
            {
                fieldName: "ProgressPercentage",
                header: "% tiến độ đề tài"
            },
            {
                fieldName: "ReportHours",
                header: "Số giờ bài báo"
            },
            {
                fieldName: "ReportPercentage",
                header: "% tiến độ bài báo"
            },
            {
                fieldName: "ConferenceDuration",
                header: "Số giờ hội thảo",
            },
            {
                fieldName: "ConferenceProgress",
                header: "% tiến độ hội thảo"
            }, {
                fieldName: "Rate",
                header: "Đánh giá"
            },
        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICreateUserViewModel>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Mã",
                accessorFn(originalRow) {
                    return (
                        <F4_3_3ModalProgressByUserId
                            userId={originalRow.id!}
                            displayText={originalRow.code!}
                        />
                    )
                },
            },
            {
                accessorKey: "fullName",
                header: "Họ và tên"
            },
            {
                accessorKey: "TotalHours",
                header: "Số giờ đề tài",
            },
            {
                accessorKey: "ProgressPercentage",
                header: "% tiến độ đề tài"
            },
            {
                accessorKey: "ReportHours",
                header: "Số giờ bài báo"
            },
            {
                accessorKey: "ReportPercentage",
                header: "% tiến độ bài báo"
            },
            {
                accessorKey: "ConferenceDuration",
                header: "Số giờ hội thảo",
            },
            {
                accessorKey: "ConferenceProgress",
                header: "% tiến độ hội thảo"
            }, {
                accessorKey: "Rate",
                header: "Đánh giá"
            }
        ],
        []
    );

    if (pogression.isLoading) return "Đang tải dữ liệu..."
    if (pogression.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={pogression.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <AQButtonExportData
                                objectName="dsGiangVienVaChuyenGia"
                                data={pogression.data!}
                                exportConfig={exportConfig} isAllData={false} />
                            <AQButtonExportData
                                isAllData={false}
                                objectName="dsGiangVienVaChuyenGia"
                                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                                exportConfig={exportConfig}
                            />

                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => (
                <Group>

                    <F4_2_3LockButton data={row.original} />
                </Group>
            )
            }


        />
    )
}


const mockData: ICreateUserViewModel[] = [{
    id: 1,
    code: "GV001",
    TotalHours: "120",
    fullName: "Nguyen Van A",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Rate: "Dung tien do"
},
{
    id: 2,
    code: "GV002",
    TotalHours: "120",
    fullName: "Tran Thi B",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Rate: "Dung tien do"
},
{
    id: 3,
    code: "GV003",
    TotalHours: "120",
    fullName: "Le Van C",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Rate: "Dung tien do"
},
{
    id: 4,
    code: "GV004",
    fullName: "Pham Thi D",
    TotalHours: "120",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Rate: "Dung tien do"
},
{
    id: 5,
    code: "GV005",
    TotalHours: "120",
    fullName: "Hoang Van E",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Rate: "Dung tien do"
}
]