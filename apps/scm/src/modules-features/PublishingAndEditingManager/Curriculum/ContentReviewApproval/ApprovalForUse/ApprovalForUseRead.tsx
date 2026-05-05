'use client'
import { useQuery } from "@tanstack/react-query";
import { MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ApprovalForUseDelete from "./ApprovalForUseDelete";
import ApprovalForUseReadUpdate from "./ApprovalForUseReadUpdate";
import { mockData } from "./mockData";

export interface IApprovalForUseInfoViewModel {
    maQuyetDinh?: string; // Mã quyết định
    soQuyetDinh?: string; // Số quyết định
    ngayQuyetDinh?: string; // Ngày quyết định
    nguoiKyQuyetDinh?: string; // Người ký quyết định
    trangThaiQuyetDinh?: string; // Trạng thái quyết định
    fileQuyetDinh?: string; // File quyết định
}

export default function ApprovalForUseRead() {

    // Query to fetch mock data
    const query = useQuery<IApprovalForUseInfoViewModel[]>({
        queryKey: ["ApprovalForUseRead"],
        queryFn: async () => mockData
    });

    const columns = useMemo<MRT_ColumnDef<IApprovalForUseInfoViewModel>[]>(
        () => [
            {
                header: "Mã quyết định",
                accessorKey: "maQuyetDinh",
            },
            {
                header: "Số quyết định",
                accessorKey: "soQuyetDinh",
            },
            {
                header: "Ngày quyết định",
                accessorKey: "ngayQuyetDinh",
                Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
            },
            {
                header: "Người ký quyết định",
                accessorKey: "nguoiKyQuyetDinh",
            },
            {
                header: "Trạng thái quyết định",
                accessorKey: "trangThaiQuyetDinh",
            },
            {
                header: "File quyết định",
                accessorKey: "fileQuyetDinh",
                Cell: ({ cell }) => <MyButtonViewPDF />
            },
        ],
        []
    );

    return (
        <MyFieldset title={"Danh sách bài giảng"}>
            <MyFlexColumn>
                <MyDataTable
                    isLoading={query.isLoading}
                    isError={query.isError}
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    exportAble
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <ApprovalForUseReadUpdate values={row.original} />
                            <ApprovalForUseDelete id={row.original.maQuyetDinh!} code={row.original.maQuyetDinh!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

