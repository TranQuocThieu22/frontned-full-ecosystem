
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import Update_completeSuggestion from "./Update_completeSuggestion";
import { AQButtonExportData, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { Center } from "@mantine/core";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";

export interface ICompleteSuggestion {
    id: number;                // STT
    code: string;              // Mã nhiệm vụ
    lectureName: string;       // Tên bài giảng
    lectureCode: string;       // Mã bài giảng
    editor: string;            // Ban biên soạn (Trưởng ban)
    request: string;           // Nội dung/Yêu cầu hoàn thiện
    status: string;            // Trạng thái nhiệm vụ
    description: string;       // Mô tả cách thực hiện
    file: string;              // File sản phẩm đã hoàn thiện
    updatedAt?: Date;         // Ngày cập nhật
    updatedBy: string;         // Người cập nhật
}

const mockData: ICompleteSuggestion[] = [
    {
        id: 1,
        code: "NT-2025-001",
        lectureName: "Lập trình Python cơ bản",
        lectureCode: "PYB-2025-001",
        editor: "TS Nguyễn Văn A",
        request: "Bổ sung nội dung, kiểm tra lại hình ảnh và video tương tác.",
        status: "Đang thực hiện",
        description: "Bổ sung và điều chỉnh nội dung các module, kiểm tra lại video trên Safari và các nút tương tác.",
        file: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/5992cv.signed.pdf",
        updatedAt: new Date("2025-12-08"),
        updatedBy: "TS Nguyễn Văn A",
    },
    {
        id: 2,
        code: "NT-2025-002",
        lectureName: "Trí tuệ nhân tạo trong y học",
        lectureCode: "AIH-2025-002",
        editor: "PGS.TS Trần Thị D",
        request: "Cập nhật mô tả chi tiết về AI trong y học.",
        status: "Đã hoàn thành - Chờ kiểm tra",
        description: "Đã tích hợp các nghiên cứu mới nhất năm 2024-2025, bổ sung 3 case study về các bệnh viện lớn.",
        file: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/5992cv.signed.pdf",
        updatedAt: new Date("2025-12-07"),
        updatedBy: "PGS.TS Trần Thị D",
    },
    {
        id: 3,
        code: "NT-2025-003",
        lectureName: "Lịch sử Văn học Việt Nam",
        lectureCode: "VLIT-2025-006",
        editor: "PGS.TS Bùi Minh K",
        request: "(Chưa có nhiệm vụ hoàn thiện)",
        status: "Mới tạo - Chờ thao tác",
        description: "",
        file: "",
        updatedAt: undefined,
        updatedBy: "",
    },
];

export default function Read_completeSuggestion() {
    const columns = useMemo<MRT_ColumnDef<ICompleteSuggestion>[]>(() => [
        { header: "Mã nhiệm vụ", accessorKey: "code" },
        { header: "Tên bài giảng điện tử", accessorKey: "lectureName" },
        { header: "Mã bài giảng", accessorKey: "lectureCode" },
        { header: "Ban biên soạn (Tên Trưởng Ban)", accessorKey: "editor" },
        { header: "Nội dung Yêu cầu hoàn thiện (tóm tắt từ tổng hợp)", accessorKey: "request" },
        { header: "Trạng thái nhiệm vụ", accessorKey: "status" },
        { header: "Mô tả cách thức xử lý (tổng quan)", accessorKey: "description" },
        {
            header: "File sản phẩm đã hoàn thiện",
            id: "file",
            accessorFn: (row) => row.file ? <Center><MyButtonViewPDF /></Center> : <></>
        },
        { 
            header: "Ngày cập nhật cuối", 
            id: "updatedAt",
            accessorFn: (row) => row.updatedAt ? utils_date_dateToDDMMYYYString(row.updatedAt) : "",
        },
        { header: "Người cập nhật cuối", accessorKey: "updatedBy" },
    ], []);

    return (
        <MyFieldset title={"Danh sách nhiệm vụ hoàn thiện"}>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={mockData}
                exportAble={true}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <Update_completeSuggestion values={row.original} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}
