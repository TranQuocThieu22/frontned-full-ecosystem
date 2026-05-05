'use client'
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProjectCooperationCreate from "./ProjectCooperationCreate";
import ProjectCooperationDelete from "./ProjectCooperationDelete";
import ProjectCooperationDeleteList from "./ProjectCooperationDeleteList";
import ProjectCooperationUpdate from "./ProjectCooperationUpdate";

export default function ProjectCooperationTable() {
    const form = useForm<any>({
            initialValues: {}
        });
    const query = useQuery<I_ProjectCollaborationTable[]>({
        queryKey: ['ProjectCooperationTableQuery'],
        queryFn: async () => projectCollaborationTableMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_ProjectCollaborationTable>[]>(() => [
        { header: "Mã Dự án", accessorKey: "code" },
        { header: "Tên Dự án", accessorKey: "name" },
        { header: "Đối tác (Mã Đối tác FK)", accessorKey: "partnerCode" },
        { header: "Thỏa thuận (Mã Thỏa thuận FK)", accessorKey: "agreementCode" },
        {
            header: "Thời gian bắt đầu",
            accessorFn: row => row.startDate ? utils_date_dateToDDMMYYYString(row.startDate) : "",
            id: "startDate"
        },
        {
            header: "Thời gian kết thúc dự kiến",
            accessorFn: row => row.endDate ? utils_date_dateToDDMMYYYString(row.endDate) : "",
            id: "endDate"
        },
        { header: "Lĩnh vực chuyên môn", accessorKey: "field" },
        { header: "Kinh phí dự kiến (VND)", accessorKey: "budget" },
        { header: "Tóm tắt dự án", accessorKey: "summary" },
        { header: "Người Đại Diện Trường", accessorKey: "representative" }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã Dự án" },
            { fieldName: "name", header: "Tên Dự án" },
            { fieldName: "partnerCode", header: "Đối tác (Mã Đối tác FK)" },
            { fieldName: "agreementCode", header: "Thỏa thuận (Mã Thỏa thuận FK)" },
            { fieldName: "startDate", header: "Thời gian bắt đầu" },
            { fieldName: "endDate", header: "Thời gian kết thúc dự kiến" },
            { fieldName: "field", header: "Lĩnh vực chuyên môn" },
            { fieldName: "budget", header: "Kinh phí dự kiến (VND)" },
            { fieldName: "summary", header: "Tóm tắt dự án" },
            { fieldName: "representative", header: "Người Đại Diện Trường" }
        ]
    };


    return (
        <MyFieldset title="Danh sách dự án hợp tác">
            <MyDataTable
                isError={query.isError}
                isLoading={query.isLoading}
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={columns}
                data={query.data || []}
                renderTopToolbarCustomActions={({table}) => (
                    <MyCenterFull>
                        <ProjectCooperationCreate />
                         <AQButtonCreateByImportFile onSubmit={() => { }} form={form} /> 
                        <AQButtonExportData
                            
                            objectName="DanhSachDuAnDoiTac"
                            data={query.data ?? []}
                            exportConfig={exportConfig} />
                        <ProjectCooperationDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)}/>
                    </MyCenterFull>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <ProjectCooperationUpdate values={row.original} />
                        <ProjectCooperationDelete codeProject={row.original.code} />

                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}

export interface I_ProjectCollaborationTable {
    code: string;                // Mã Dự án
    name: string;                // Tên Dự án
    partnerCode: string;         // Đối tác (Mã Đối tác FK)
    agreementCode: string;       // Thỏa thuận (Mã Thỏa thuận FK)
    startDate?: Date;            // Thời gian bắt đầu
    endDate?: Date;              // Thời gian kết thúc dự kiến
    field: string;               // Lĩnh vực chuyên môn
    budget: number;              // Kinh phí dự kiến (VND)
    summary: string;             // Tóm tắt dự án
    representative: string;      // Người Đại Diện Trường
}

const projectCollaborationTableMockData: I_ProjectCollaborationTable[] = [
    {
        code: "DAQT-2024-001",
        name: "Nghiên cứu chung về Trí tuệ Nhân tạo ứng dụng trong Y tế",
        partnerCode: "DTQT-002",
        agreementCode: "THTQT-2024-002",
        startDate: new Date("2024-09-01"),
        endDate: new Date("2027-08-31"),
        field: "Y sinh; Trí tuệ nhân tạo",
        budget: 5000000000,
        summary: "Phát triển mô hình AI học sâu để phát hiện sớm bệnh ung thư phổi.",
        representative: "GV005 - TS. Trần Bình"
    }
];
