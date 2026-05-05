'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { MyButton } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import Update_EvaluationSuggestion from "./Update_EvaluationSuggestion";

export interface I_EvaluationSuggestion {
    stt: number;
    code: string;
    name: string;
    status: string;
    councilReview: string;
    councilSuggestion: string;
    technicalReview: string;
    technicalSuggestion: string;
    summary: string;
    conclusion: string;
    date: string;
    summarizer: string;
    completed: boolean;
}

const mockData: I_EvaluationSuggestion[] = [
    {
        stt: 1,
        code: "PYB-2025-001",
        name: "Lập trình Python cơ bản",
        status: "Đã thẩm định - chờ xử lý kết quả; Đã kiểm tra - Chờ xử lý kết quả",
        councilReview: "Nên thêm bài tập thực hành nhỏ cuối mỗi module",
        councilSuggestion: "Đạt yêu cầu",
        technicalReview: "Video Module 1 bị lỗi âm thanh khi xem trên di động, nút bài tập Module 2 không phản hồi trên di động",
        technicalSuggestion: "Cần chỉnh sửa kỹ thuật nhỏ",
        summary: "Tổng hợp: Cần bổ sung ví dụ thực hành ở Module 1 và 2. Khắc phục lỗi hiển thị video và nút tương tác trên các thiết bị",
        conclusion: "Yêu cầu chỉnh sửa nhỏ",
        date: "2025-12-05",
        summarizer: "Cán bộ Nguyễn Y",
        completed: true,
    },
    {
        stt: 2,
        code: "AIH-2025-002",
        name: "Trí tuệ nhân tạo trong Y học",
        status: "Đã thẩm định - chờ xử lý kết quả; Đã kiểm tra - Chờ xử lý kết quả",
        councilReview: "Nội dung chưa cập nhập các thành tựu mới nhất về AI trong chẩn đoán hình ảnh; Cần bổ sung các case study thực tế từ các bệnh viện lớn",
        councilSuggestion: "Cần chỉnh sửa lớn",
        technicalReview: "Không có lỗi kỹ thuật nghiêm trọng",
        technicalSuggestion: "Đạt yêu cầu kỹ thuật",
        summary: "Tổng hợp: Cần cập nhập kiến thức mới nhất và bổ sung case study thực tế về AI trong y học",
        conclusion: "Yêu cầu chỉnh sửa nhỏ",
        date: "2025-12-05",
        summarizer: "Cán bộ Nguyễn Y",
        completed: true,
    },
    {
        stt: 3,
        code: "VLIT-2025-006",
        name: "Lịch sử văn học Việt Nam",
        status: "Đã thẩm định - chờ xử lý kết quả; Đã kiểm tra - Chờ xử lý kết quả",
        councilReview: "",
        councilSuggestion: "",
        technicalReview: "",
        technicalSuggestion: "",
        summary: "",
        conclusion: "",
        date: "Chưa có dữ liệu thẩm định và kiểm tra kỹ thuật đầy đủ để tổng hợp",
        summarizer: "",
        completed: false,
    },
];

export default function Read_EvaluationSuggestion() {
    const [data, setData] = useState<I_EvaluationSuggestion[]>(mockData);

    const columns = useMemo<MRT_ColumnDef<I_EvaluationSuggestion>[]>(
        () => [
            { header: "STT", accessorKey: "stt", size: 50 },
            { header: "Mã Bài giảng", accessorKey: "code" },
            { header: "Tên Bài giảng", accessorKey: "name" },
            { header: "Trạng thái Bài giảng ( hiện tại )", accessorKey: "status" },
            { header: "Nhận xét từ Hội đồng Thẩm định nội dung", accessorKey: "councilReview" },
            { header: "Đề xuất KT từ Hội đồng Thẩm định nội dung", accessorKey: "councilSuggestion" },
            { header: "Nhận xét từ Kiểm tra chất lượng kỹ thuật", accessorKey: "technicalReview" },
            { header: "Đề xuất KT từ Kiểm tra chất lượng kỹ thuật", accessorKey: "technicalSuggestion" },
            { header: "Nhận xét tổng hợp & yêu cầu chỉnh sửa", accessorKey: "summary" },
            { header: "Kết luận chất lượng tổng thể", accessorKey: "conclusion" },
            { header: "Ngày tổng hợp", accessorKey: "date" },
            { header: "Người tổng hợp", accessorKey: "summarizer" },
            {
                header: "Có nhiệm vụ hoàn thiện", accessorKey: "completed", Cell: ({ row, cell }) => (
                    <Checkbox
                        checked={Boolean(cell.getValue())}
                        onChange={() => {
                            setData(prev => prev.map(item =>
                                item.stt === row.original.stt ? { ...item, completed: !item.completed } : item
                            ));
                        }}
                    />
                )
            },
        ],
        []
    );

    return (
        <>
            <MyDataTable
                enableRowNumbers={false}
                columns={columns}
                data={data}
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <MyButton color="orange.6">Tạo yêu cầu hoàn thiện</MyButton>
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <Update_EvaluationSuggestion row={row.original} />
                    </MyCenterFull>
                )}
            />
        </>
    );
}