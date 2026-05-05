'use client'
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PartnerCreate from "./PartnerCreate";
import PartnerDeleteList from "./PartnerDeleteList";
import PartnerDeleteRow from "./PartnerDeleteRow";
import PartnerUpdate from "./PartnerUpdate";

export default function PartnerTable() {
    const form_multiple = useForm<any>({
        initialValues: {}
    });

    const query = useQuery<I_InteractionTable[]>({
        queryKey: ["interactionQuery"],
        queryFn: async () => interactionMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_InteractionTable>[]>(
        () => [
            { header: "Mã Tương tác", accessorKey: "code" },
            { header: "Mã Đối tác (FK)", accessorKey: "partnerCode" },
            {
                header: "Ngày Tương tác",
                accessorFn: row => {
                    if (row.interactionDate) {
                        return utils_date_dateToDDMMYYYString(row.interactionDate)
                    }
                },
                id: "interactionDate"
            },
            { header: "Loại Tương tác (Họp; Email, Gọi điện...)", accessorKey: "type" },
            { header: "Nội dung Tương tác", accessorKey: "content" },
            { header: "Người Thực hiện (Nội bộ)", accessorKey: "performer" },
            { header: "Ghi chú / Kết quả", accessorKey: "note" }
        ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã Tương tác" },
            { fieldName: "partnerCode", header: "Mã Đối tác (FK)" },
            { fieldName: "interactionDate", header: "Ngày Tương tác" },
            { fieldName: "type", header: "Loại Tương tác (Họp; Email, Gọi điện...)" },
            { fieldName: "content", header: "Nội dung Tương tác" },
            { fieldName: "performer", header: "Người Thực hiện (Nội bộ)" },
            { fieldName: "note", header: "Ghi chú / Kết quả" }
        ]
    };

    return (
        <MyFieldset title={"Danh sách tương tác với đối tác"}>
            <MyDataTable
            isLoading={query.isLoading}
            isError={query.isError}
            enableRowSelection={true}
            enableRowNumbers={false}
            exportAble={false}
            columns={columns}
            data={query.data ?? []}
            renderTopToolbarCustomActions={({ table }) =>
                <>
                    <PartnerCreate />
                    <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                    <AQButtonExportData
                        
                        objectName="DanhSachTuongTacDoiTac"
                        data={query.data ?? []}
                        exportConfig={exportConfig} />
                    <PartnerDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <>  <MyCenterFull>
                        <PartnerUpdate values={row.original} />
                        <PartnerDeleteRow codeInteraction={row.original.code} />
                    </MyCenterFull>
                    </>
                )
            }}
        />
        </MyFieldset>
    );
}

export interface I_InteractionTable {
    code: string;            // Mã Tương tác
    partnerCode: string;     // Mã Đối tác (FK)
    interactionDate?: Date;   // Ngày Tương tác
    type: string;            // Loại Tương tác
    content: string;         // Nội dung Tương tác
    performer: string;       // Người Thực hiện (Nội bộ)
    note: string;            // Ghi chú / Kết quả
}

const interactionMockData: I_InteractionTable[] = [
    {
        code: "IT-2025-001",
        partnerCode: "DTQT-002",
        interactionDate: new Date("2025-01-10"),
        type: "Họp trực tuyến",
        content: "Thảo luận ý tưởng nghiên cứu AI ứng dụng y tế.",
        performer: "GV005 - TS. Trần Bình",
        note: "Đối tác bày tỏ sự quan tâm; đề nghị gửi bản tóm tắt ý tưởng."
    },
    {
        code: "IT-2025-002",
        partnerCode: "DTQT-003",
        interactionDate: new Date("2025-02-01"),
        type: "Email",
        content: "Gửi thư ngỏ về khả năng hợp tác trao đổi sinh viên.",
        performer: "CB010 - ThS. Lê Hoa",
        note: "Đối tác phản hồi tích cực; yêu cầu đề xuất chi tiết."
    },
    {
        code: "IT-2025-003",
        partnerCode: "DTQT-002",
        interactionDate: new Date("2025-05-15"),
        type: "Họp trực tuyến",
        content: "Trao đổi về nội dung đề xuất dự án 'AI-Enhanced Cancer Diagnostics'.",
        performer: "GV005 - TS. Trần Bình",
        note: "Đối tác cần thêm thông tin về ngân sách chi tiết."
    }
];
