'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProcedureStepCreate from "./ProcedureStepCreate";
import ProcedureStepDelete from "./ProcedureStepDelete";
import ProcedureStepDeleteList from "./ProcedureStepDeleteList";
import ProcedureStepUpdate from "./ProcedureStepUpdate";

export interface I_ProcedureStep {
    id?: number;
    code: string;
    name: string;
    description: string;
    estimatedTime: string;
    role: string;
    completionCondition: string;
    generatedDocument: string;
}


export default function ProcedureStepUpdateButton() {
    const dics = useDisclosure();

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_ProcedureStep>[]>(() => [
        { header: "Mã bước", accessorKey: "code" },
        { header: "Tên bước", accessorKey: "name" },
        { header: "Mô tả công việc", accessorKey: "description" },
        { header: "Thời gian dự kiến (Ngày)", accessorKey: "estimatedTime" },
        { header: "Vai trò phụ trách mặc định", accessorKey: "role" },
        { header: "Điều kiện hoàn thành", accessorKey: "completionCondition" },
        { header: "Tài liệu cần/tạo ra", accessorKey: "generatedDocument" },
    ], []);

    return (
        <MyButtonModal
            disclosure={dics}
            modalSize='100%'
            label="Cập nhật"
        >
            <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ" >
                <MyDataTable
                    enableRowSelection
                    columns={columns}
                    data={mockProcedureSteps || []}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <ProcedureStepCreate />
                                <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                                <MyButton crudType="export" />
                                <ProcedureStepDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                            </>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <ProcedureStepUpdate values={row.original} />
                                <ProcedureStepDelete id={row.original.id || 0} code={row.original.code} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFieldset>
        </MyButtonModal>
    )
}


export const mockProcedureSteps: I_ProcedureStep[] = [
    {
        code: "SC-BV01",
        name: "Tiếp nhận hồ sơ nội bộ",
        description: "Kiểm tra hồ sơ sơ bộ từ tác giả; tư vấn bổ sung.",
        estimatedTime: "3",
        role: "Chuyên viên IP",
        completionCondition: "Hồ sơ đã đầy đủ thông tin sơ bộ.",
        generatedDocument: "Bản đề xuất IP (từ tác giả)."
    },
    {
        code: "SC-ND01",
        name: "Nộp đơn chính thức",
        description: "Hoàn thiện hồ sơ; nộp tại Cục SHTT.",
        estimatedTime: "5",
        role: "Chuyên viên IP",
        completionCondition: "Có xác nhận tiếp nhận từ Cục SHTT.",
        generatedDocument: "Giấy biên nhận hồ sơ."
    },
    {
        code: "SC-TDH01",
        name: "Thẩm định hình thức",
        description: "Cục SHTT kiểm tra tính hợp lệ về hình thức đơn.",
        estimatedTime: "90",
        role: "Chuyên viên IP",
        completionCondition: "Có Quyết định chấp nhận/từ chối hình thức.",
        generatedDocument: "Quyết định chấp nhận/từ chối hình thức."
    },
    {
        code: "SC-CB01",
        name: "Công bố đơn",
        description: "Đơn được Cục SHTT công bố trên Công báo.",
        estimatedTime: "60",
        role: "Chuyên viên IP",
        completionCondition: "Đơn đã được công bố.",
        generatedDocument: "Thông báo công bố."
    },
    {
        code: "SC-TDN01",
        name: "Thẩm định nội dung",
        description: "Cục SHTT đánh giá tính mới; trình độ sáng tạo; khả năng áp dụng công nghệ.",
        estimatedTime: "420 (18 tháng)",
        role: "Chuyên viên IP",
        completionCondition: "Có Quyết định cấp bằng/từ chối cấp bằng.",
        generatedDocument: "Quyết định thẩm định nội dung."
    },
    {
        code: "SC-CB02",
        name: "Cấp văn bằng",
        description: "Cục SHTT cấp văn bằng bảo hộ.",
        estimatedTime: "30",
        role: "Chuyên viên IP",
        completionCondition: "Văn bằng đã được cấp.",
        generatedDocument: "Bản gốc văn bằng bảo hộ."
    },
    {
        code: "SC-DTHL01",
        name: "Duy trì hiệu lực",
        description: "Theo dõi và thực hiện nộp phí duy trì định kỳ.",
        estimatedTime: "Định kỳ (hàng năm)",
        role: "Chuyên viên IP",
        completionCondition: "Đã nộp phí duy trì.",
        generatedDocument: "Biên lai nộp phí duy trì."
    }
];

