import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayInteractionResult, InteractionResultMap } from "./DisplayInteractionResult";
import InteractionLogbookCreateOrUpdate from "./InteractionLogbookCreateOrUpdate";
import InteractionLogbookDelete from "./InteractionLogbookDelete";
import InteractionLogbookDeleteList from "./InteractionLogbookDeleteList";

export default function InteractionLogbookTable() {

    const form = useForm<any>({
        initialValues: {},
    });

    const query = useQuery<I_InteractionTable[]>({
        queryKey: ["I_InteractionTableQuery"],
        queryFn: async () => {
            return interactionTableMockData ?? [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_InteractionTable>[]>(() => [
        { header: "Mã ID", accessorKey: "idCode" },
        { header: "Mã KH/HS", accessorKey: "customerCode" },
        { header: "Họ và tên HS", accessorKey: "customerName" },
        { header: "Ngày tương tác", id: "interactionDate", accessorFn: (row) => (!!row.interactionDate ? new Date(row.interactionDate).toLocaleDateString() : "Không có") },
        { header: "Thời gian tương tác", accessorKey: "interactionTime" },
        {
            header: "Kênh tương tác",
            accessorKey: "interactionChannel",
            // Nếu cần select filter thì có thể thêm filterVariant: 'select',
        },
        { header: "Loại tương tác", accessorKey: "interactionType" },
        {
            header: "Nội dung tương tác",
            accessorKey: "interactionContent",
            size: 800
        },
        {
            header: "Kết quả tương tác",
            accessorKey: "interactionResult",
            accessorFn: (row) => <DisplayInteractionResult result={InteractionResultMap[row.interactionResult || -1] ?? 0} />,
            size: 200
        },
        { header: "Kế hoạch hành động tiếp theo", id: "nextActionPlan", accessorFn: (row) => (!!row.nextActionPlan ? row.nextActionPlan : "Không có") },
        { header: "Ngày hẹn hành động tiếp theo", id: "nextActionDate", accessorFn: (row) => (!!row.nextActionDate ? new Date(row.nextActionDate).toLocaleDateString() : "Không có") },
        { header: "Người thực hiện", accessorKey: "executor" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "idCode", header: "Mã ID" },
            { fieldName: "customerCode", header: "Mã KH/HS" },
            { fieldName: "customerName", header: "Họ và tên HS" },
            { fieldName: "interactionDate", header: "Ngày tương tác" },
            { fieldName: "interactionTime", header: "Thời gian tương tác" },
            { fieldName: "interactionChannel", header: "Kênh tương tác" },
            { fieldName: "interactionType", header: "Loại tương tác" },
            { fieldName: "interactionContent", header: "Nội dung tương tác" },
            { fieldName: "interactionResult", header: "Kết quả tương tác" },
            { fieldName: "nextActionPlan", header: "Kế hoạch hành động tiếp theo" },
            { fieldName: "nextActionDate", header: "Ngày hẹn hành động tiếp theo" },
            { fieldName: "executor", header: "Người thực hiện" },
        ]
    };


    return (
        <MyFieldset title={"Danh sách tương tác"}>
            <MyDataTable
                isError={query.isError}
                isLoading={query.isLoading}
                columns={columns}
                data={query.data || []}
                enableRowSelection
                enableColumnFilters
                enableRowNumbers
                renderTopToolbarCustomActions={({ table }) => (
                    <    >
                        <InteractionLogbookCreateOrUpdate />
                        <AQButtonCreateByImportFile onSubmit={() => { }} form={form} />
                        <AQButtonExportData
                            objectName={"DanhSachTươngTac"}
                            data={query.data || []}
                            exportConfig={exportConfig}
                        />
                        <InteractionLogbookDeleteList
                            values={table
                                .getSelectedRowModel()
                                .flatRows.flatMap((item) => item.original)}
                        />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <InteractionLogbookCreateOrUpdate data={row.original} />
                        <InteractionLogbookDelete
                            id={row.original.id}
                            label={row.original.idCode!}
                        />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    )
}

export interface I_InteractionTable {
    id: number;
    idCode?: string | null;
    customerCode?: string | null; // Mã KH/HS
    customerName?: string | null; // Họ và tên HS
    interactionDate?: string | null; // Ngày tương tác (dd/MM/yyyy)
    interactionTime?: string | null; // Thời gian tương tác (hh:mm)
    interactionChannel?: string | null; // Kênh tương tác
    interactionType?: string | null; // Loại tương tác
    interactionContent?: string | null; // Nội dung tương tác
    interactionResult?: string | null; // Kết quả tương tác
    nextActionPlan?: string | null; // Kế hoạch hành động tiếp theo
    nextActionDate?: string | null; // Ngày hẹn hành động tiếp theo (dd/MM/yyyy) | ""
    executor?: string | null; // Người thực hiện
}

export const interactionTableMockData: I_InteractionTable[] = [
    {
        id: 1,
        idCode: "INT001",
        customerCode: "KHTN001",
        customerName: "Nguyễn Văn A",
        interactionDate: "2025-07-10",
        interactionTime: "10:15",
        interactionChannel: "Điện thoại",
        interactionType: "Cuộc gọi tư vấn",
        interactionContent: "Tư vấn khóa học Starters A; PH quan tâm lịch học cuối tuần",
        interactionResult: "Cần theo dõi thêm",
        nextActionPlan: "Gửi thông tin lịch học chi tiết",
        nextActionDate: "2025-07-15",
        executor: "Nguyễn Thị C (TVV)"
    },
    {
        id: 2,
        idCode: "INT002",
        customerCode: "KHTN002",
        customerName: "Trần Thị B",
        interactionDate: "2025-07-11",
        interactionTime: "15:30",
        interactionChannel: "Email",
        interactionType: "Gửi thông tin",
        interactionContent: "Gửi mail xác nhận lịch test và tài liệu mẫu cho PH.",
        interactionResult: "Thành công",
        nextActionPlan: null,
        nextActionDate: null,
        executor: "Lê Văn D (CSKH)"
    },
    {
        id: 3,
        idCode: "INT003",
        customerCode: "HS005",
        customerName: "Lê Thị E",
        interactionDate: "2025-07-12",
        interactionTime: "09:45",
        interactionChannel: "Zalo",
        interactionType: "Phản hồi",
        interactionContent: "PH phản hồi về chất lượng giảng dạy; yêu cầu đổi giáo viên. Đã ghi nhận và cam kết xử lý.",
        interactionResult: "Đã giải quyết",
        nextActionPlan: "Chuyển QLCL xử lý phản hồi",
        nextActionDate: "2025-07-14",
        executor: "Lê Văn D (CSKH)"
    },
    {
        id: 4,
        idCode: "INT004",
        customerCode: "KHTN006",
        customerName: "Phạm Văn G",
        interactionDate: "2025-07-12",
        interactionTime: "11:00",
        interactionChannel: "Trực tiếp",
        interactionType: "Lên lịch hẹn",
        interactionContent: "PH đến trung tâm đặt lịch test cho con. Đã xác nhận lịch hẹn.",
        interactionResult: "Thành công",
        nextActionPlan: "Gửi xác nhận lịch hẹn test",
        nextActionDate: null,
        executor: "Nguyễn Thị C (TVV)"
    },
    {
        id: 5,
        idCode: "INT005",
        customerCode: "KHTN001",
        customerName: "Nguyễn Văn A",
        interactionDate: "2025-07-15",
        interactionTime: "14:00",
        interactionChannel: "Zalo",
        interactionType: "Gửi thông tin",
        interactionContent: "Đã gửi lịch học chi tiết các lớp cuối tuần như PH yêu cầu.",
        interactionResult: "Thành công",
        nextActionPlan: null,
        nextActionDate: null,
        executor: "Nguyễn Thị C (TVV)"
    },
];
