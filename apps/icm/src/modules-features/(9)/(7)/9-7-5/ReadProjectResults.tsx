'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProjectResultsUpdate from "./UpdateProjectResults";
import ProjectResultsCreate from "./CreateProjectResults";
import ProjectResultsDelete from "./DeleteProjectResults";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";

export interface ProjectResults {
    id: number;
    codeResults: string;
    codeOpportunity: string;
    name: string;
    type: string;
    date: string;
    file: string;
    notes: string;
}

export default function ProjectResultsLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<ProjectResults>[]>(() => [
        {
            header: "Mã kết quả",
            accessorKey: "codeResults",
        },
        {
            header: "Mã dự án (FK)",
            accessorKey: "codeOpportunity",
        },
        {
            header: "Tên kết quả",
            accessorKey: "name",
        },
        {
            header: "Loại kết quả (phân loại)",
            accessorKey: "type",
        },
        {
            header: "Ngày hoàn thành / đạt được",
            accessorKey: "date",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.date)),
        },
        {
            header: "File minh chứng",
            accessorKey: "file",
            Cell: ({ cell }) => (
                <MyButtonViewPDF />
            ),
        },
        {
            header: "Ghi chú",
            accessorKey: "notes",
        },
    ], []);


    return (
        <MyFieldset title="Danh sách dự án hợp tác" >
            <MyDataTable
                columns={columns}
                enableRowNumbers={false}
                data={mockOpportunities || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <ProjectResultsCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    );
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ProjectResultsUpdate values={row.original} />
                            <ProjectResultsDelete id={row.original.id || 0} code={row.original.codeResults} />
                        </MyCenterFull>
                    );
                }} />
        </MyFieldset>
    )
}


export const mockOpportunities: ProjectResults[] = [
    {
        id: 1,
        codeResults: "DR-2024-001A",
        codeOpportunity: "DAQT-2024-001",
        name: "Bài báo 'AI for for Lung Cancer Delection'",
        type: "Bài báo khoa học",
        date: "2026-06-01",
        file: "xem file",
        notes: "Đã gởi tạp chí IEEE TMI, đang chờ phản biện"
    },
    {
        id: 2,
        codeResults: "DR-2024-001B",
        codeOpportunity: "DAQT-2024-001",
        name: "Phần mềm 'LungAI v1.0'",
        type: "Sản phẩm phần mềm",
        date: "2027-01-15",
        file: "xem file",
        notes: "Đã đăng kí bảng quyền số"
    },
    {
        id: 1,
        codeResults: "DR-2024-001C",
        codeOpportunity: "DAQT-2024-001",
        name: "Hồ sơ đăng kí sáng chế'Phương pháp chuẩn đoán ung thu phổi AI",
        type: "Bài báo khoa học",
        date: "2027-03-01",
        file: "xem file",
        notes: "Đang trong quá trình thẩm định"
    },
];
