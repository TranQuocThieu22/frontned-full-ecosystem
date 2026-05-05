import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CustomerCareAssignmentCreateButton from "./CustomerCareAssignmentCreateButton";
import CustomerCareAssignmentDeleteButton from "./CustomerCareAssignmentDeleteButton";
import CustomerCareAssignmentDeleteListButton from "./CustomerCareAssignmentDeleteListButton";
import CustomerCareAssignmentUpdateButton from "./CustomerCareAssignmentUpdateButton";
import { DisplayTrialStatus } from "./DisplayTrialStatus";
import { ICustomerFeedbackRequestInfoViewModal } from "./interfaces/ICustomerFeedbackRequestInfoViewModal";
import LecturerListTableModalButton from "./LecturerListTableModalButton";

const priorityLevelOptions = [
    { label: "Thấp", value: "Thấp" },
    { label: "Trung bình", value: "Trung bình" },
    { label: "Cao", value: "Cao" },
]

const requestTypeOptions = [
    { label: "Khiếu nại", value: "Khiếu nại" },
    { label: "Yêu cầu hỗ trợ", value: "Yêu cầu hỗ trợ" },
    { label: "Chăm sóc chủ động (Học sinh mới)", value: "Chăm sóc chủ động (Học sinh mới)" },
    { label: "Báo nghỉ học", value: "Báo nghỉ học" },
]

export default function CustomerCareAssignmentTable() {
    const form = useForm<ICustomerFeedbackRequestInfoViewModal[]>({
        initialValues: {
            ...mockData
        },
    });

    const columns = useMemo<MRT_ColumnDef<ICustomerFeedbackRequestInfoViewModal>[]>(() => [
        {
            header: "ID Yêu cầu",
            accessorKey: "requestId",
        },
        {
            header: "Kênh tiếp nhận",
            accessorKey: "receiveChannel",
        },
        {
            header: "Người tiếp nhận",
            accessorKey: "receiver",
        },
        {
            header: "Mã học sinh",
            accessorKey: "studentCode",
        },
        {
            header: "Tên học sinh",
            accessorKey: "studentName",
        },
        {
            header: "Số điện thoại liên hệ",
            accessorKey: "phoneNumber",
        },
        {
            header: "Tiêu đề/Tóm tắt yêu cầu",
            accessorKey: "requestContent",
        },
        {
            header: "Loại yêu cầu",
            accessorKey: "requestType",
            size: 300,
            Cell: ({ row }) => {
                return <MySelect
                    data={requestTypeOptions}
                    {...form.getInputProps(`${row.index}.requestType`)}
                    clearable={false}
                />;
            }
        },
        {
            header: "Mức độ ưu tiên",
            accessorKey: "priorityLevel",
            Cell: ({ row }) => {
                return <MySelect
                    data={priorityLevelOptions}
                    {...form.getInputProps(`${row.index}.priorityLevel`)}
                    clearable={false}
                />;
            }
        },
        {
            header: "Nội dung chi tiết",
            accessorKey: "detailContent",
            size: 300,
        },
        {
            header: "Ngày tạo",
            accessorKey: "createdAt",
        },
        {
            header: "Bộ phận xử lý",
            accessorKey: "department",
        },
        {
            header: "Người được phân công",
            accessorKey: "assignedTo",
            size: 250,
            Cell: ({ row }) => {
                return <Group>
                    {row.original.assignedTo}
                    <LecturerListTableModalButton />
                </Group>
            }
        },
        {
            header: "Ngày đến hạn xử lý",
            accessorKey: "processingDeadline",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(row.processingDeadline!),
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            accessorFn: (row) => {
                return <DisplayTrialStatus trialStatus={row.status || -1} />
            }
        },
        {
            header: "Ghi chú/Biện pháp xử lý",
            accessorKey: "processingNote",
            size: 250,
        },
        {
            header: "Ngày cập nhật cuối cùng",
            accessorKey: "lastUpdatedAt",
        },
        {
            header: "Ngày hoàn thành",
            accessorKey: "completedAt",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(row.completedAt!),
        },
        {
            header: "File đính kèm",
            accessorKey: "attachmentFile",
        }
    ], []);

    return (
        <MyFieldset title="Danh sách phản hồi">
            <MyDataTable
                enableRowSelection
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <CustomerCareAssignmentCreateButton />
                        <MyButton crudType="default" color="green" >Lưu</MyButton>
                        <MyButton crudType="export" />
                        <CustomerCareAssignmentDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    </>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <CustomerCareAssignmentUpdateButton data={row.original} />
                            <CustomerCareAssignmentDeleteButton id={row.original.id!} code={row.original.requestId || ""} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFieldset>
    )
}

const mockData: ICustomerFeedbackRequestInfoViewModal[] = [
    {
        id: 1,
        requestId: "CSKH_20250715_001",
        receiveChannel: "Điện thoại",
        receiver: "Nguyễn Thị A (P.KH)",
        studentCode: "HS00123",
        studentName: "Nguyễn An Bình (PH)",
        phoneNumber: "0912345678",
        requestContent: "Khiếu nại về chất lượng giáo viên",
        requestType: "Khiếu nại",
        priorityLevel: "Cao",
        detailContent: "Phụ huynh phản ánh GV thường xuyên đi muộn, ảnh hưởng đến thời gian học.",
        createdAt: "15/07/2025 10:00:00",
        department: "QLCL",
        assignedTo: "Trần Văn B (QLCL)",
        processingDeadline: new Date(2025, 6, 17),
        status: 1,
        processingNote: "Đã trao đổi với GV, đang chờ phản hồi từ GV",
        lastUpdatedAt: "15/07/2025 14:30:00",
        completedAt: undefined,
        attachmentFile: ""
    },
    {
        id: 2,
        requestId: "CSKH_20250715_002",
        receiveChannel: "Hệ thống",
        receiver: "Hệ thống tự động",
        studentCode: "HS00456",
        studentName: "Lê Mai Anh (PH)",
        phoneNumber: "0987654321",
        requestContent: "Tư vấn lộ trình học cho học sinh mới",
        requestType: "Chăm sóc chủ động (Học sinh mới)",
        priorityLevel: "Trung bình",
        detailContent: "Học sinh mới nhập học, cần gọi điện tư vấn lộ trình học và giải đáp thắc mắc.",
        createdAt: "15/07/2025 09:00:00",
        department: "P.KH",
        assignedTo: "Phạm Thị C (P.KH)",
        processingDeadline: new Date(2025, 6, 15),
        status: 1,
        processingNote: "Đã gọi điện tư vấn ban đầu, phụ huynh yêu cầu gửi thêm thông tin qua email",
        lastUpdatedAt: "15/07/2025 11:00:00",
        completedAt: undefined,
        attachmentFile: ""
    },
    {
        id: 3,
        requestId: "CSKH_20250714_003",
        receiveChannel: "Email",
        receiver: "Nguyễn Thị A (P.KH)",
        studentCode: "HS00789",
        studentName: "Phạm Hùng Cường (PH)",
        phoneNumber: "0901234567",
        requestContent: "Yêu cầu đổi lịch học",
        requestType: "Yêu cầu hỗ trợ",
        priorityLevel: "Thấp",
        detailContent: "Phụ huynh muốn đổi lịch học buổi tối sang buổi sáng.",
        createdAt: "14/07/2025 15:00:00",
        department: "P.KH",
        assignedTo: "Phạm Thị C (P.KH)",
        processingDeadline: new Date(2025, 6, 16),
        status: 2,
        processingNote: "Đã xác nhận đổi lịch thành công, gửi thông báo cho phụ huynh",
        lastUpdatedAt: "14/07/2025 17:00:00",
        completedAt: new Date(2025, 6, 14),
        attachmentFile: ""
    },
    {
        id: 4,
        requestId: "CSKH_20250713_004",
        receiveChannel: "Trực tiếp",
        receiver: "Trần Văn B (QL.CL)",
        studentCode: "HS01011",
        studentName: "Đinh Thị Hà (HS)",
        phoneNumber: "0976543210",
        requestContent: "Phản ánh tài liệu học tập bị lỗi",
        requestType: "Khiếu nại",
        priorityLevel: "Trung bình",
        detailContent: "Tài liệu môn Vật Lý có sai một số công thức.",
        createdAt: "13/07/2025 11:30:00",
        department: "Chuyên môn",
        assignedTo: "GV.Vật Lý X",
        processingDeadline: new Date(2025, 6, 15),
        status: 1,
        processingNote: "Đã kiểm tra tài liệu, xác nhận lỗi. Đang yêu cầu in lại",
        lastUpdatedAt: "14/07/2025 09:00:00",
        completedAt: undefined,
        attachmentFile: ""
    },
    {
        id: 5,
        requestId: "CSKH_20250712_005",
        receiveChannel: "Điện thoại",
        receiver: "Phạm Thị C (P.KH)",
        studentCode: "HS01213",
        studentName: "Vũ Minh Quân (PH)",
        phoneNumber: "0965432109",
        requestContent: "Báo nghỉ học hẳn",
        requestType: "Báo nghỉ học",
        priorityLevel: "Cao",
        detailContent: "Học sinh không tiếp tục theo học do chuyển nhà sang tỉnh khác.",
        createdAt: "12/07/2025 14:00:00",
        department: "P.KH",
        assignedTo: "Phạm Thị C (P.KH)",
        processingDeadline: new Date(2025, 6, 12),
        status: 3,
        processingNote: "Đã ghi nhận yêu cầu, xử lý thủ tục rút hồ sơ. Thông báo hoàn tiền (nếu có)",
        lastUpdatedAt: "12/07/2025 16:00:00",
        completedAt: new Date(2025, 6, 12),
        attachmentFile: ""
    }
];