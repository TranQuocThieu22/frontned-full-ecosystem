'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { C0DocumentTypes } from "@/constants/documentTypes";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F1_4Create from "./F1_4Create";
import F1_4Delete from "./F1_4Delete";
import F1_4Update from "./F1_4Update";


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

export default function F1_4Read() {
    const query = useQuery<I[]>({
        queryKey: ["F1_4Read"],
        queryFn: async () => {
            const result = await baseAxios.get(`/Document/GetByType?documentType=${C0DocumentTypes.Refinement}`);
            return result.data?.data || []
        }
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Đơn vị yêu cầu",
                accessorKey: "departmentName"
            },
            {
                header: "Nội dung cải tiến",
                accessorKey: "description"
            },
            {
                header: "Ngày bắt đầu",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.startDate!))
            },
            {
                header: "Ngày kết thúc",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.endDate!))
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
            renderTopToolbarCustomActions={() => <F1_4Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F1_4Update values={row.original} />
                        <F1_4Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

