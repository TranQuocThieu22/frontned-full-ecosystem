'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import IPRegisterCreate from "./IPRegisterCreate";
import IPRegisterDelete from "./IPRegisterDelete";
import IPRegisterUpdate from "./IPRegisterUpdate";

export interface I_IPRegister {
    id: number;
    productName: string;
    summary: string;
    type: string;
    author: string;
    coAuthors: string;
    detailLink: string;
    technicalDrawingLink: string;
    relatedProject: string;
    createdAt: string;
    initialStatus: string;
}

export default function IPRegisterLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_IPRegister>[]>(() => [
        { header: "Tên sản phẩm trí tuệ đề xuất", accessorKey: "productName" },
        { header: "Mô tả tóm tắt", accessorKey: "summary" },
        { header: "Loại Sở hữu trí tuệ", accessorKey: "type" },
        { header: "Tác giả/Nhà phát minh (Người đại diện)", accessorKey: "author" },
        { header: "Các đồng tác giả/Nhà phát minh khác", accessorKey: "coAuthors" },
        {
            header: "Mô tả chi tiết sáng chế",
            accessorFn: () => <MyButtonViewPDF />
        },
        {
            header: "Các bản vẽ kỹ thuật",
            accessorFn: () => <MyButtonViewPDF />
        },
        { header: "Dự án liên quan", accessorKey: "relatedProject" },
        { header: "Ngày tạo hồ sơ (tự động)", accessorKey: "createdAt" },
        { header: "Trạng thái ban đầu (tự động)", accessorKey: "initialStatus" },
    ], []);

    return (
        <MyFieldset title="Danh sách đăng ký sở hữu trí tuệ" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <IPRegisterCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <IPRegisterUpdate values={row.original} />
                            <IPRegisterDelete id={row.original.id || 0} code={row.original.productName} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockData: I_IPRegister[] = [
    {
        productName: "Robot hỗ trợ phẫu thuật nội soi thông minh",
        summary: "Robot sử dụng AI để nhận diện vị trí khối u và hỗ trợ phẫu thuật viên cắt bỏ chính xác hơn, giảm thiểu xâm lấn.",
        type: "Bằng sáng chế",
        author: "PGS. Lê Văn Đạt",
        coAuthors: "TS. Nguyễn Thị Hoa; ThS. Trần Minh Khoa",
        detailLink: "",
        technicalDrawingLink: "",
        relatedProject: "DAHT-005",
        createdAt: "24/06/2025 09:30 AM",
        initialStatus: "Đang chờ xem xét nội bộ",
        id: 1
    }
];

