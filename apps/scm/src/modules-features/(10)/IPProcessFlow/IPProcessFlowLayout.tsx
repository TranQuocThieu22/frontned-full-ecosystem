'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import IPProcessFlowCreate from "./IPProcessFlowCreate";
import IPProcessFlowDelete from "./IPProcessFlowDelete";
import IPProcessFlowDeleteList from "./IPProcessFlowDeleteList";
import IPProcessFlowUpdate from "./IPProcessFlowUpdate";
import ProcedureStepUpdateButton from "./UpdateButtonModal/ProcedureStepUpdateButton";

export interface I_IPProcessFlow {
    id: number;
    code: string;
    name: string;
    type: string;
    description: string;
    createdAt: string;
    version: string;
}

export default function IPProcessFlowLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_IPProcessFlow>[]>(() => [
        { header: "Mã Quy trình", accessorKey: "code" },
        { header: "Tên Quy trình", accessorKey: "name" },
        { header: "Áp dụng cho Loại hình SHTT", accessorKey: "type" },
        { header: "Mô tả", accessorKey: "description" },
        { header: "Ngày tạo", accessorKey: "createdAt", accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.createdAt)) },
        { header: "Phiên bản hiện tại", accessorKey: "version" },
        { header: "Trình tự", accessorFn: () => <ProcedureStepUpdateButton /> },
    ], []);



    return (
        <MyFieldset title="Danh sách quy trình xử lý hồ sơ sở hữu trí tuệ" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockProcesses || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <IPProcessFlowCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <IPProcessFlowDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <IPProcessFlowUpdate values={row.original} />
                            <IPProcessFlowDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockProcesses: I_IPProcessFlow[] = [
    {
        code: "QTSC-01",
        name: "Quy trình Đăng ký Sáng chế",
        type: "Bằng sáng chế",
        description: "Quy trình chuẩn từ nộp đơn đến cấp bằng.",
        createdAt: "2024-01-15",
        version: "1.1",
        id: 1
    },
    {
        code: "QTBQ-01",
        name: "Quy trình Đăng ký Bản quyền Tác giả",
        type: "Bản quyền tác giả, Quyền liên quan đến quyền tác giả",
        description: "Quy trình đăng ký theo Nghị định 22/2018/NĐ-CP.",
        createdAt: "2024-03-01",
        version: "1.0",
        id: 2
    },
    {
        code: "QTNH-01",
        name: "Quy trình Đăng ký Nhãn hiệu",
        type: "Nhãn hiệu",
        description: "Quy trình đăng ký; thẩm định và công bố nhãn hiệu.",
        createdAt: "2024-02-10",
        version: "1.0",
        id: 3
    },
];

