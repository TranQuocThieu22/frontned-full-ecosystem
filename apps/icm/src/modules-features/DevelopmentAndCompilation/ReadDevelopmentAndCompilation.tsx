'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DevelopmentAndCompilationUpdate from "./UpdateDevelopmentAndCompilation";
import DevelopmentAndCompilationCreate from "./CreateDevelopmentAndCompilation";
import DevelopmentAndCompilationDelete from "./DeleteDevelopmentAndCompilation";

export interface DevelopmentAndCompilation {
    id: number,
    manuscriptCode: string,
    suggestedCode: string,
    nameCurriculum: string,
    compilationCode: string,
    editorInChief: string,
    manuscriptVerson: string,
    comments: string,
    deliveryDate: string,
    proposalSatus: string,
    file: string,
}

export default function DevelopmentAndCompilationLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<DevelopmentAndCompilation>[]>(() => [
        {
            header: "Mã bản thảo nộp",
            accessorKey: "manuscriptCode",
        },
        {
            header: "Mã đề xuất",
            accessorKey: "suggestedCode",
        },
        {
            header: "Tên giáo trình đề xuất",
            accessorKey: "nameCurriculum",
        },
        {
            header: "Mã ban biên soạn",
            accessorKey: "compilationCode",
        },
        {
            header: "Chủ ban biên soạn",
            accessorKey: "editorInChief",
        },
        {
            header: "Phiên bản bản thảo",
            accessorKey: "manuscriptVerson",
        },
        {
            header: "Tên File Bản Thảo",
            accessorKey: "file",
            Cell: ({ cell }) => (
                <MyButtonViewPDF />
            ),
        },
        {
            header: "Mô tả bản thảo",
            accessorKey: "comments",
        },
        {
            header: "Ngày giao nộp",
            accessorKey: "deliveryDate",
        },
        {
            header: "Trạng thái kiểm tra sơ bộ",
            accessorKey: "proposalSatus",
        },
    ], []);

    return (
        <MyFieldset title="Danh sách đề xuất hợp tác" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <DevelopmentAndCompilationCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <DevelopmentAndCompilationUpdate values={row.original} />
                            <DevelopmentAndCompilationDelete id={row.original.id || 0} code={row.original.manuscriptCode} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

export const mockData: DevelopmentAndCompilation[] = [
    {
        id: 1,
        manuscriptCode: 'BT001',
        suggestedCode: 'GT2025001',
        nameCurriculum: 'Giáo tình nguyên lý kế toán',
        compilationCode: 'BBGT2025001',
        editorInChief: 'ThS.Nguyễn văn A (GV.12345)',
        manuscriptVerson: 'V1.0',
        file: 'Xem file',
        comments: 'Bản thảo hoàn chỉnh chương 1-5, kèm mục lục và tài liệu tham khảo',
        deliveryDate: '2025-09-15',
        proposalSatus: 'Đang chờ sơ duyệt',

    },
    {
        id: 2,
        manuscriptCode: 'BT002',
        suggestedCode: 'GT2025002',
        nameCurriculum: 'Giáo trình Phân tích dữ liệu lớn',
        compilationCode: 'BBGT2025002',
        editorInChief: 'TS.Hoàng D (GV.99887)',
        manuscriptVerson: 'V1.0',
        file: 'Xem file',
        comments: 'Bản thảo đàu đủ 10 chương; đã qua rà soát sơ bộ 1 lần',
        deliveryDate: '2025-09-20',
        proposalSatus: 'Yêu cầu chỉnh sửa',
    },
    {
        id: 3,
        manuscriptCode: 'BT003',
        suggestedCode: 'GT2025004',
        nameCurriculum: 'Giáo trình Kinh tế vĩ mô',
        compilationCode: 'BBGT2025003',
        editorInChief: 'PGS. Kim G (GV.44556)',
        manuscriptVerson: 'V0.8',
        file: 'Xem file',
        comments: 'Bản nháp  Chương 1-4; cần bổ sung phần bài tập',
        deliveryDate: '2025-09-22',
        proposalSatus: 'Đã duyệt',
    },
    {
        id: 4,
        manuscriptCode: 'BT004',
        suggestedCode: 'GT2025005',
        nameCurriculum: 'Giáo trình Dược lý học',
        compilationCode: 'BBGT2025004',
        editorInChief: 'TS.Trần T (GV.00112)',
        manuscriptVerson: 'V2.0',
        file: 'Xem file',
        comments: 'Bản thảo đã chỉnh sửa theo góp ý sơ bộ. Sẵn sàng thẩm định',
        deliveryDate: '2025-10-01',
        proposalSatus: 'Đã duyệt',
    },
    {
        id: 5,
        manuscriptCode: 'BT005',
        suggestedCode: 'GT2025006',
        nameCurriculum: 'Giáo trình Quản trị rủi ro tín dụng',
        compilationCode: 'BBGT2025001',
        editorInChief: 'ThS. Lê M (GV.22334)',
        manuscriptVerson: 'V1.0',
        file: 'Xem file',
        comments: 'Bản thảo sơ bộ đang chờ phản hồi',
        deliveryDate: '2025-10-05',
        proposalSatus: 'Đã từ chối',
    },
];
