'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProductTestingUpdate from "./UpdateProductTesting";

export interface ProductTesting {
    id: number,
    manuscriptCode: string;
    nameCurriculum: string;
    editorInChief: String;
    deliveryDate: String;
    proposalSatus: String;
    comments: String;
    checkingDate: string;
    inspector: string;
    file: string;
}

export default function ProductTestingLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<ProductTesting>[]>(() => [
        {
            header: "Mã bản thảo nộp",
            accessorKey: "manuscriptCode",
        },
        {
            header: "Tên giáo trình đề xuất",
            accessorKey: "nameCurriculum",
        },
        {
            header: "Chủ ban biên soạn",
            accessorKey: "editorInChief",
        },
        {
            header: "Ngày giao nộp",
            accessorKey: "deliveryDate",
        },
        {
            header: "Trạng thái kiểm tra sơ bộ",
            accessorKey: "proposalSatus",
        },
        {
            header: "Nhận xét / Góp Ý sơ bộ",
            accessorKey: "comments",
        },
        {
            header: "Ngày kiểm tra",
            accessorKey: "checkingDate",
        },
        {
            header: "Người kiểm tra",
            accessorKey: "inspector",
        },
        {
            header: "File đính kèm bản thảo",
            accessorKey: "file",
            Cell: ({ cell }) => (
                <MyButtonViewPDF />
            ),
        },

    ], []);

    return (
        <MyFieldset title="Danh sách sản phẩm thô" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <MyButton crudType="export" />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ProductTestingUpdate values={row.original} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockData: ProductTesting[] = [
    {
        id: 1,
        manuscriptCode: 'BT001',
        nameCurriculum: 'Giáo trình Nguyên lý kế toán',
        editorInChief: 'th.S Nguyen Văn A (GV.12345)',
        deliveryDate: '2025-09-15',
        proposalSatus: 'Đang chờ sơ duyệt',
        comments: '',
        checkingDate: '',
        inspector: '',
        file: 'xem file',
    },
    {
        id: 2,
        manuscriptCode: 'BT002',
        nameCurriculum: 'TS. Hoàng D(GV.99887)',
        editorInChief: 'th.S Nguyen Văn A (GV.99887)',
        deliveryDate: '2025-09-20',
        proposalSatus: 'Đang chờ sơ duyệt',
        comments: '',
        checkingDate: '',
        inspector: '',
        file: 'xem file',
    },
    {
        id: 3,
        manuscriptCode: 'BT003',
        nameCurriculum: 'Giáo trình Kinh tế vĩ mô',
        editorInChief: 'th.S Nguyen Văn A (GV.44556)',
        deliveryDate: '2025-09-22',
        proposalSatus: 'Đã duyệt',
        comments: "'Bản thảo đạt yêu cầu về hình thức và cấu trúc cơ bản. Chuyển tiếp thẩm định'",
        checkingDate: '2025-09-25',
        inspector: 'Nguyễn Thị K(CB.QLKH01)',
        file: 'xem file',
    },
    {
        id: 4,
        manuscriptCode: 'BT004',
        nameCurriculum: 'Giáo trình Dược lý học',
        editorInChief: 'th.S Nguyen Văn A (GV.00112)',
        deliveryDate: '2025-10-01',
        proposalSatus: 'Đang chờ sơ duyệt',
        comments: "'bản thảo đã được kiểm tra và nhấp thuận sẵn sàng cho xuất bản'",
        checkingDate: '2025-10-02',
        inspector: 'Nguyễn Thị K(CB.QLKH01)',
        file: 'xem file',
    },
    {
        id: 5,
        manuscriptCode: 'BT005',
        nameCurriculum: 'Giáo trình Quản trị rủi ro tín dụng',
        editorInChief: 'th.S Nguyen Văn A (GV.22334)',
        deliveryDate: '2025-10-05',
        proposalSatus: 'Đang chờ sơ duyệt',
        comments: "'Thiếu quá nhiều chương mục so với đề cương. Nội dung chưa để thẩm định'",
        checkingDate: '2025-10-06',
        inspector: 'Nguyễn Thị K(CB.QLKH01)',
        file: 'xem file',
    },
];
