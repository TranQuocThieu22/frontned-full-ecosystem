import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonDeleteList, MyCheckbox, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from "react";
import { DisplayStudentStatus } from "./DisplayStudentStatus";
import MonthlyTeacherFeedbackSuggest from "./MonthlyTeacherFeedbackSuggest";

export interface IStudentMonthlyReportViewModel {
    id: number;
    code: string;
    name: string;
    parentPhone: string;
    status: number;
    generalNote: string;
    homeworkScores: string[]; // BTVN1 - BTVN8
    monthlyTestScore: number;
    overallScore: number;
    attendanceSummary: string;
    averageHomeworkScore: number;
    teacherComment: string;
    teacherFeedback?: string;
    teacherFeedbackStatus: boolean;
    qualityControlComment?: string;
    qualityControlFeedbackStatus: boolean;
}

export default function MonthlyTeacherFeedbackEvaluate() {
    const disc = useDisclosure()

    const columns = useMemo<MRT_ColumnDef<IStudentMonthlyReportViewModel>[]>(
        () => [
            { accessorKey: 'code', header: 'Mã học sinh', size: 120 },
            { accessorKey: 'name', header: 'Họ và Tên HS', size: 200 },
            { accessorKey: 'parentPhone', header: 'SĐT phụ huynh', size: 150 },
            {
                accessorKey: 'status', header: 'Trạng thái HS', Cell: ({ row }) => (
                    <DisplayStudentStatus value={row.original.status} />
                )
            },
            { accessorKey: 'generalNote', header: 'Ghi chú chung', size: 200 },
            { accessorKey: 'homeworkScores.0', header: 'BTVN1', size: 80, accessorFn: (row) => row.homeworkScores[0] },
            { accessorKey: 'homeworkScores.1', header: 'BTVN2', size: 80, accessorFn: (row) => row.homeworkScores[1] },
            { accessorKey: 'homeworkScores.2', header: 'BTVN3', size: 80, accessorFn: (row) => row.homeworkScores[2] },
            { accessorKey: 'homeworkScores.3', header: 'BTVN4', size: 80, accessorFn: (row) => row.homeworkScores[3] },
            { accessorKey: 'homeworkScores.4', header: 'BTVN5', size: 80, accessorFn: (row) => row.homeworkScores[4] },
            { accessorKey: 'homeworkScores.5', header: 'BTVN6', size: 80, accessorFn: (row) => row.homeworkScores[5] },
            { accessorKey: 'homeworkScores.6', header: 'BTVN7', size: 80, accessorFn: (row) => row.homeworkScores[6] },
            { accessorKey: 'homeworkScores.7', header: 'BTVN8', size: 80, accessorFn: (row) => row.homeworkScores[7] },
            { accessorKey: 'monthlyTestScore', header: 'Kiểm tra tháng', size: 150 },
            { accessorKey: 'attendanceSummary', header: 'Tổng hợp', pin: 'right', size: 180 },
            { accessorKey: 'teacherComment', header: 'Nhận xét chung', size: 350 },
            {
                accessorKey: 'teacherFeedbackStatus', header: 'GV đã góp ý',
                Cell: ({ row }) => (
                    <MyCheckbox
                        checked={row.original.teacherFeedbackStatus}
                        readOnly
                    />
                )
            },
            { accessorKey: 'teacherFeedback', header: 'Nội dung GV góp ý', size: 300 },
            {
                accessorKey: 'qualityControlCommentStatus', header: 'QLCL đã góp ý',
                Cell: ({ row }) => (
                    <MyCheckbox
                        checked={row.original.qualityControlFeedbackStatus}
                        readOnly
                    />
                )
            },
            { accessorKey: 'qualityControlComment', header: 'Nội dung QLCL góp ý', size: 300 },
            {
                accessorKey: 'actions', header: 'Thao tác', Cell: ({ row }) => (
                    <MonthlyTeacherFeedbackSuggest values={row.original} />
                )
            },
        ], []
    );


    return (
        <>
            <MyButton variant="transparent" onClick={disc[1].open}>
                Nhận xét
            </MyButton>
            <Modal size={'90%'} opened={disc[0]} onClose={disc[1].close}>
                <MyFieldset title="Danh sách học sinh">
                    <MyDataTable
                        enableRowSelection={true}
                        columns={columns}
                        data={mockData}
                        enableColumnPinning
                        enableStickyHeader
                        initialState={{
                            columnPinning: {
                                right: ['attendanceSummary', 'teacherComment', 'actions'],
                            }
                        }}
                        renderTopToolbarCustomActions={({ table }) => {
                            return (
                                <>
                                    <MyButton crudType="save">
                                        Lưu
                                    </MyButton>
                                    <MyButton crudType="export" />
                                    <MyButtonDeleteList
                                        actionIconProps={{
                                            disabled: table.getSelectedRowModel().rows.length === 0
                                        }}
                                        contextData={table.getSelectedRowModel().rows.map(row => row.original.code).join(",")}
                                        onSubmit={() => { }}
                                    />
                                </>
                            )
                        }}
                    />
                </MyFieldset>
            </Modal>
        </>
    );
}

const mockData: IStudentMonthlyReportViewModel[] = [
    {
        id: 1,
        code: "CG23-01030",
        name: "Nguyễn Ngọc Trang Anh",
        parentPhone: "0974681988",
        status: 1,
        generalNote: "Chưa làm bài tập về nhà thường xuyên",
        homeworkScores: ["8.0", "7.5", "6.5", "6.5", "", "", "", "8.5"],
        monthlyTestScore: 8.5,
        overallScore: 19.0,
        attendanceSummary: "Chuyên cân: 10/10, Không làm & CCG: 0/8, TB điểm BTVN: 7.25,  Điểm kiểm tra: 8.5",
        averageHomeworkScore: 7.25,
        teacherComment: `Thây cô nhận xét về tình hình học tập
của con trong tháng như sau:
- Về ý thức: Con nghiêm túc và cố gắng nhiều trong học tập; ghi chép bài đầy đủ; tập trung nghe giảng, sẵn sàng và chủ động phản hồi giáo viên khi được gọi, có sự chuẩn bị bài tập về nhà tốt - Về nội dung kiến thức: Tháng này
con được học về tam giác đồng dạng biến đổi phân thức đại số và các dạng bài ứng dụng bất đẳng thức Cauchy. Con cần chú ý biến đổi và tính toán cần thận hơn; đặc biệt đối với dạng bài giải bằng phương pháp đặt ẩn phụ; chú ý điều kiện và xác định đúng điểm
rơi của bất đẳng thức. Chúc con học tập và ôn luyện tốt cùng lớp và các bạn!"`,
        qualityControlComment: "Đã duyệt và gửi phụ huynh",
        teacherFeedbackStatus: false,
        qualityControlFeedbackStatus: true
    },
    {
        id: 2,
        code: "CG23-0104C",
        name: "Mẫn Vũ Minh Anh",
        parentPhone: "0912378252",
        status: 1,
        generalNote: "Nghỉ buổi 2",
        homeworkScores: ["7.0", "6.5", "CCG", "P", "8.0", "", "", "7.0"],
        monthlyTestScore: 8.0,
        overallScore: 17.0,
        attendanceSummary: "Chuyên cần: 8/10, Không làm & CCG: 1/8, TB điểm BTVN: 6.9, Điểm kiểm tra: 7.5",
        averageHomeworkScore: 6.9,
        teacherComment: `Thầy cô nhận xét về tình hình học tập
        của con trong tháng như sau: - Về ý thức: Con có sự tiến bộ trong việc tập trung nghe giảng; tuy nhiên đôi lúc còn chưa chủ động đặt câu hỏi. Cần cải thiện việc hoàn thành bài tập về nhà đúng hạn. 
        - Về nội dung kiến thức: Con nắm được kiến thức cơ bản về phép biến đổi biểu thức. Cần luyện tập thêm các dạng bài nâng cao và chú ý hơn đến các lỗi sai nhỏ
        trong tính toán. Hãy tiếp tục nỗ lực nhé con!"`,
        teacherFeedback: "Cần nhắc nhớ về BTVN",
        teacherFeedbackStatus: true,
        qualityControlFeedbackStatus: false
    },
    {
        id: 3,
        code: "CG24-01159",
        name: "Nguyễn Quốc Minh Châu",
        parentPhone: "0964252508",
        status: 1,
        generalNote: "",
        homeworkScores: ["8.5", "8.0", "9.0", "8.5", "9.5", "8.0", "9.5", "9.0"],
        monthlyTestScore: 9.0,
        overallScore: 19.0,
        attendanceSummary: "Chuyên cân: 10/10, Không làm & CCG:0/8, TB điểm BTVN: 8.7, Điểm kiểm tra: 9.0",
        averageHomeworkScore: 8.7,
        teacherComment: `Thầy cô nhận xét về tình hình học tập của con trong tháng như sau:
- Về ý thức: Con rất tích cực và chủ động trong mọi hoạt động trên lớp; có tinh thần học hỏi cao.
- Về nội dung kiến thức: Con nắm vững kiến thức; thể hiện khả năng phân tích và giải quyết vấn đề tốt. Cần tiếp tục duy trì phong
độ và thử sức với các bài toán thách thức hơn.
Chúc mừng con vì kết quả học tập xuất sắc!`,
        qualityControlComment: "Đã duyệt",
        teacherFeedback: "Không có góp ý thêm.",
        teacherFeedbackStatus: true,
        qualityControlFeedbackStatus: true
    }
]