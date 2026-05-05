import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CustomerCareExecutionUpdate from "./CustomerCareExecutionUpdate";
import { DisplayFeedbackStatus, DisplayFeedbackStatusMap } from "./DisplayFeedbackStatus";

export default function CustomerCareExecutionTable() {

    const query = useQuery<I_RequestHandleTable[]>({
        queryKey: ["requestHandleMockDataQuery"],
        queryFn: async () => {
            return requestHandleMockData ?? [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_RequestHandleTable>[]>(() => [
        { header: "ID Yêu cầu", accessorKey: "requestedId" },
        { header: "Kênh tiếp nhận", accessorKey: "channel" },
        { header: "Người tiếp nhận", accessorKey: "receiver" },
        { header: "Mã học sinh", accessorKey: "studentCode" },
        { header: "Tên học sinh", accessorKey: "studentName" },
        { header: "Số điện thoại liên hệ", accessorKey: "phone" },
        {
            header: "Tiêu đề/Tóm tắt yêu cầu",
            accessorKey: "summary",
            size: 500
        },
        { header: "Loại yêu cầu", accessorKey: "requestType" },
        { header: "Mức độ ưu tiên", accessorKey: "priority" },
        {
            header: "Nội dung chi tiết",
            accessorKey: "detail",
            size: 500
        },
        {
            header: "Ngày tạo",
            accessorFn: row => row.createdAt ? `${utils_date_dateToDDMMYYYString(new Date(row.createdAt))} ${row.createdAt.split(" ")[1]}` : "",
            id: "createdAt"
        },
        { header: "Bộ phận xử lý", accessorKey: "department" },
        { header: "Người được phân công", accessorKey: "assignee" },
        {
            header: "Ngày đến hạn xử lý",
            accessorFn: row => row.dueDate ? utils_date_dateToDDMMYYYString(new Date(row.dueDate)) : "",
            id: "dueDate"
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            accessorFn: (row) => <DisplayFeedbackStatus feedbackStatus={DisplayFeedbackStatusMap[row.status] ?? 0} />
        },
        { header: "Ghi chú/Biện pháp xử lý", accessorKey: "handleNote", size: 500 },
        {
            header: "Ngày cập nhật cuối cùng",
            accessorFn: row => row.lastUpdate ? `${utils_date_dateToDDMMYYYString(new Date(row.lastUpdate))} ${row.createdAt.split(" ")[1]}` : "",
            id: "lastUpdate"
        },
        {
            header: "Ngày hoàn thành",
            accessorFn: row => row.completedAt ? utils_date_dateToDDMMYYYString(new Date(row.completedAt)) : "",
            id: "completedAt"
        },
        { header: "File đính kèm", accessorKey: "attachment" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "ID Yêu cầu" },
            { fieldName: "channel", header: "Kênh tiếp nhận" },
            { fieldName: "receiver", header: "Người tiếp nhận" },
            { fieldName: "studentCode", header: "Mã học sinh" },
            { fieldName: "studentName", header: "Tên học sinh" },
            { fieldName: "phone", header: "Số điện thoại liên hệ" },
            { fieldName: "summary", header: "Tiêu đề/Tóm tắt yêu cầu" },
            { fieldName: "requestType", header: "Loại yêu cầu" },
            { fieldName: "priority", header: "Mức độ ưu tiên" },
            { fieldName: "detail", header: "Nội dung chi tiết" },
            { fieldName: "createdAt", header: "Ngày tạo" },
            { fieldName: "department", header: "Bộ phận xử lý" },
            { fieldName: "assignee", header: "Người được phân công" },
            { fieldName: "dueDate", header: "Ngày đến hạn xử lý" },
            { fieldName: "status", header: "Trạng thái" },
            { fieldName: "handleNote", header: "Ghi chú/Biện pháp xử lý" },
            { fieldName: "lastUpdate", header: "Ngày cập nhật cuối cùng" },
            { fieldName: "completedAt", header: "Ngày hoàn thành" },
            { fieldName: "attachment", header: "File đính kèm" },
        ]
    };


    return (
        <MyFieldset title={"Danh sách phản hồi"}>
            <MyDataTable
                isError={query.isError}
                isLoading={query.isLoading}
                columns={columns}
                data={query.data || []}
                enableRowSelection
                enableColumnFilters
                enableRowNumbers
                renderTopToolbarCustomActions={() => (
                    <>
                        <AQButtonExportData
                            objectName={"Danhsachphanhoi"}
                            data={query.data || []}
                            exportConfig={exportConfig}
                        />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <CustomerCareExecutionUpdate data={row.original} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    )
}
//CustomerCareExecution

export interface I_RequestHandleTable {
    id: number;
    requestedId: string;                        // ID Yêu cầu
    channel: string;                   // Kênh tiếp nhận
    receiver: string;                  // Người tiếp nhận
    studentCode: string;               // Mã học sinh
    studentName: string;               // Tên học sinh
    phone: string;                     // Số điện thoại liên hệ
    summary: string;                   // Tiêu đề/Tóm tắt yêu cầu
    requestType: string;               // Loại yêu cầu
    priority: string;                  // Mức độ ưu tiên
    detail: string;                    // Nội dung chi tiết
    createdAt: string;                 // Ngày tạo (yyyy-MM-dd HH:mm:ss)
    department: string;                // Bộ phận xử lý
    assignee: string;                  // Người được phân công
    dueDate: string;                   // Ngày đến hạn xử lý (yyyy-MM-dd)
    status: string;                    // Trạng thái
    handleNote: string;                // Ghi chú/Biện pháp xử lý
    lastUpdate: string;                // Ngày cập nhật cuối cùng (yyyy-MM-dd HH:mm:ss)
    completedAt: string;               // Ngày hoàn thành (yyyy-MM-dd)
    attachment: string;                // File đính kèm
}

export const requestHandleMockData: I_RequestHandleTable[] = [
    {
        id: 1,
        requestedId: "CSKH_20250715_001",
        channel: "Điện thoại",
        receiver: "Nguyễn Thị A (P.KH)",
        studentCode: "HS00123",
        studentName: "Nguyễn An Bình (PH)",
        phone: "0912345678",
        summary: "Khiếu nại về chất lượng giáo viên",
        requestType: "Khiếu nại",
        priority: "Cao",
        detail: "Phụ huynh phản ánh GV thường xuyên đi muộn; ảnh hưởng đến thời gian học.",
        createdAt: "2025-07-15 10:00:00",
        department: "QLCL",
        assignee: "Trần Văn B (QLCL)",
        dueDate: "2025-07-17",
        status: "Đang xử lý",
        handleNote: "Đã trao đổi với GV, đang chờ phản hồi từ GV.",
        lastUpdate: "2025-07-15 14:30:00",
        completedAt: "",
        attachment: "",
    },
    {
        id: 2,
        requestedId: "CSKH_20250715_002",
        channel: "Hệ thống",
        receiver: "Hệ thống tự động",
        studentCode: "HS00456",
        studentName: "Lê Mai Anh (PH)",
        phone: "0987654321",
        summary: "Tư vấn lộ trình học cho học sinh mới",
        requestType: "Chăm sóc chủ động (Học sinh mới)",
        priority: "Trung bình",
        detail: "Học sinh mới nhập học; cần gọi điện tư vấn lộ trình học và giải đáp thắc mắc.",
        createdAt: "2025-07-15 09:00:00",
        department: "P.KH",
        assignee: "Phạm Thị C (P.KH)",
        dueDate: "2025-07-18",
        status: "Đang xử lý",
        handleNote: "Đã gọi điện tư vấn ban đầu; phụ huynh yêu cầu gửi thêm thông tin qua email.",
        lastUpdate: "2025-07-15 11:00:00",
        completedAt: "",
        attachment: "",
    },
    {
        id: 3,
        requestedId: "CSKH_20250714_003",
        channel: "Email",
        receiver: "Nguyễn Thị A (P.KH)",
        studentCode: "HS00789",
        studentName: "Phạm Hùng Cường (PH)",
        phone: "0901243567",
        summary: "Yêu cầu đổi lịch học",
        requestType: "Yêu cầu hỗ trợ",
        priority: "Thấp",
        detail: "Phụ huynh muốn đổi lịch học buổi tối sang buổi sáng.",
        createdAt: "2025-07-14 07:45:00",
        department: "P.KH",
        assignee: "Phạm Thị C (P.KH)",
        dueDate: "2025-07-16",
        status: "Đã giải quyết",
        handleNote: "Đã xác nhận đổi lịch thành công, gửi thông báo cho phụ huynh.",
        lastUpdate: "2025-07-14 17:00:00",
        completedAt: "2025-07-14",
        attachment: "",
    },
    {
        id: 4,
        requestedId: "CSKH_20250713_004",
        channel: "Trực tiếp",
        receiver: "Trần Văn B (QLCL)",
        studentCode: "HS01011",
        studentName: "Đinh Thị Hà (HS)",
        phone: "0976543210",
        summary: "Phản ánh tài liệu học tập bị lỗi",
        requestType: "Khiếu nại",
        priority: "Trung bình",
        detail: "Tài liệu môn Vật Lý in sai một số công thức.",
        createdAt: "2025-07-13 11:30:00",
        department: "Chuyển xử lý",
        assignee: "GV Vật Lý X",
        dueDate: "2025-07-15",
        status: "Đang xử lý",
        handleNote: "Đã kiểm tra tài liệu, xác nhận lỗi. Đang yêu cầu in lại.",
        lastUpdate: "2025-07-14 09:00:00",
        completedAt: "",
        attachment: "",
    },
    {
        id: 5,
        requestedId: "CSKH_20250712_005",
        channel: "Điện thoại",
        receiver: "Phạm Thị C (P.KH)",
        studentCode: "HS01213",
        studentName: "Vũ Minh Quân (PH)",
        phone: "0965432109",
        summary: "Báo nghỉ học hẳn",
        requestType: "Báo nghỉ học",
        priority: "Cao",
        detail: "Học sinh không tiếp tục theo học do chuyển nhà sang tỉnh khác.",
        createdAt: "2025-07-12 14:00:00",
        department: "P.KH",
        assignee: "Phạm Thị C (P.KH)",
        dueDate: "2025-07-12",
        status: "Đã đóng",
        handleNote: "Đã ghi nhận yêu cầu; xử lý thủ tục rút hồ sơ. Thông báo hoàn tiền (nếu có).",
        lastUpdate: "2025-07-12 16:00:00",
        completedAt: "2025-07-12",
        attachment: "",
    },
];
