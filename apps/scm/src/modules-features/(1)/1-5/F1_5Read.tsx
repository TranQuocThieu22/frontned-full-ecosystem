'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { C0DocumentTypes } from "@/constants/documentTypes";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F1_5Create from "./F1_5Create";
import F1_5Delete from "./F1_5Delete";
import F1_5Update from "./F1_5Update";



interface I {
    path?: string;
    orderBy?: number;
    documentType?: number;
    promulgateDate?: Date;
    decisionCode?: string;
    departmentName?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    conclusion?: string;
    note?: string;
    documentAttributeId?: number;
    documentAttributeName?: string;
    isCycleCheck?: boolean;
    meetingDate?: Date;
    fileDetail?: {
        fileBase64String?: string,
        fileExtension?: string,
        fileName?: string
    };
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    ngayChinhSua?: Date;
    nguoiChinhSua?: string;
}

export default function F1_5Read() {
    const query = useQuery<I[]>({
        queryKey: ["F1_5Read"],
        queryFn: async () => {
            const result = await baseAxios.get(`/Document/GetByType?documentType=${C0DocumentTypes.Guideline}`);
            return result.data?.data || []
        }
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã tài liệu",
                accessorKey: "code"
            },
            {
                header: "Tên tài liệu",
                accessorKey: "name"
            },
            {
                header: "File",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF id={row.id} />
                        </MyCenterFull>
                    )
                }
            },
        ],
        []
    );

    if (query.isLoading) return "Loading..."
    if (query.isError) return "có lỗi xảy ra!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F1_5Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F1_5Update values={row.original} />
                        <F1_5Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

