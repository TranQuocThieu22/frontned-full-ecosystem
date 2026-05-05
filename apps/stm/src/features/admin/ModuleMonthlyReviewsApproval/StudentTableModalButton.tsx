import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyCenterFull, MyCheckbox, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayApproveStatus } from "./DisplayApproveStatus";
import { DisplayStudentStatus } from "./DisplayStudentStatus";
import StudentApproveButtonModal from "./StudentApproveButtonModal";
import StudentDeleteListButton from "./StudentDeleteListButton";

export interface IStudentEvaluationInfo {
    id?: number;
    studentCode: string;     // Mã học sinh
    studentName: string;     // Họ và tên HS
    phoneNumber: string;     // SĐT Phụ huynh
    status: number;          // Trạng thái HS
    homeworkNote: string;    // Ghi chú chung HS
    attendanceScore: number; // Chuyên cần
    homeworkScore: number;   // Bài tập về nhà
    ccg: string;            // CCG
    btyn1: string;          // BTYN1
    btyn2: string;          // BTYN2
    btyn3: string;          // BTYN3
    btyn4: string;          // BTYN4
    btyn5: string;          // BTYN5
    btyn6: string;          // BTYN6
    btyn7: string;          // BTYN7
    btyn8: string;          // BTYN8
    testScore: string;      // Điểm kiểm tra
    monthlyReview: string;  // Tổng hợp
    monthlyComment: string; // Nhận xét chung
    hasTeacherReviewed: boolean; // GV đã góp ý
    teacherComment: string;  // Nội dung GV góp ý
    approvalStatus: number;  // QLCL duyệt
    qualityComment: string;  // Nội dung QLCL góp ý
    actions: string;         // Thao tác
}

export default function StudentTableModalButton() {
    const disclosure = useDisclosure();
    const columns = useMemo<MRT_ColumnDef<IStudentEvaluationInfo>[]>(() => [
        {
            header: "Mã học sinh",
            accessorKey: "studentCode",
        },
        {
            header: "Họ và tên HS",
            accessorKey: "studentName",
            size: 200,
        },
        {
            header: "SĐT Phụ huynh",
            accessorKey: "phoneNumber",
        },
        {
            header: "Trạng thái HS",
            accessorKey: "status",
            accessorFn: (row) => {
                return <DisplayStudentStatus status={row.status || -1} />
            }
        },
        {
            header: "Ghi chú chung HS",
            accessorKey: "homeworkNote",
            size: 200,
        },
        {
            header: "BTYN1",
            accessorKey: "btyn1",
            size: 50,
        },
        {
            header: "BTYN2",
            accessorKey: "btyn2",
            size: 50,
        },
        {
            header: "BTYN3",
            accessorKey: "btyn3",
            size: 50,
        },
        {
            header: "BTYN4",
            accessorKey: "btyn4",
            size: 50,
        },
        {
            header: "BTYN5",
            accessorKey: "btyn5",
            size: 50,
        },
        {
            header: "BTYN6",
            accessorKey: "btyn6",
            size: 50,
        },
        {
            header: "BTYN7",
            accessorKey: "btyn7",
            size: 50,
        },
        {
            header: "BTYN8",
            accessorKey: "btyn8",
            size: 50,
        },
        {
            header: "Kiểm tra tháng",
            accessorKey: "testScore",
        },
        {
            header: "Tổng hợp",
            accessorKey: "monthlyReview",
            size: 200,
        },
        {
            header: "Nhận xét chung",
            accessorKey: "monthlyComment",
            size: 400,
        },
        {
            header: "GV đã góp ý",
            accessorKey: "hasTeacherReviewed",
            size: 160,
            Cell: ({ cell }) => (
                <MyCenterFull>
                    <MyCheckbox onChange={() => { }} checked={cell.getValue<boolean>()} />
                </MyCenterFull>
            )
        },
        {
            header: "Nội dung GV góp ý",
            accessorKey: "teacherComment",
            size: 210,
        },
        {
            header: "QLCL duyệt",
            accessorKey: "approvalStatus",
            size: 200,
            accessorFn: (row) => {
                return <DisplayApproveStatus status={row.approvalStatus || -1} />
            }
        },
        {
            header: "Nội dung QLCL góp ý",
            accessorKey: "qualityComment",
            size: 200,
        },

    ], []);

    return (
        <MyButtonModal
            title="Danh sách học sinh"
            label="Nhận xét"
            modalSize="98vw"
            disclosure={disclosure}>
            <MyDataTable
                enableColumnPinning
                initialState={{
                    columnPinning: {
                        right: ['monthlyReview', 'monthlyComment', 'mrt-row-actions'],
                    }
                }}
                columns={columns}
                data={mockData}
                enableRowSelection
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <MyButton crudType="default" color="blue" >Lưu</MyButton>
                        <MyButton crudType="export" />
                        <StudentDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    </>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <StudentApproveButtonModal data={row.original} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyButtonModal>
    );
}

const mockData: IStudentEvaluationInfo[] = [
    {
        id: 1,
        studentCode: "CG23-01030",
        studentName: "Nguyễn Ngọc Trang Anh",
        phoneNumber: "0974589188",
        status: 1,
        homeworkNote: "Chưa làm bài tập về nhà thường xuyên",
        attendanceScore: 8.0,
        homeworkScore: 7.5,
        ccg: "CCG",
        btyn1: "8.0",
        btyn2: "7.5",
        btyn3: "CCG",
        btyn4: "6.5",
        btyn5: "7.0",
        btyn6: "",
        btyn7: "",
        btyn8: "8.5",
        testScore: "8.5",
        monthlyReview: "Chuyên cần: 1010\nKhông làm & CCG: 0/8\nTB điểm BTYN: 7.25\nĐiểm kiểm tra: 8.5",
        monthlyComment: `Thây cô nhận xét về tình hình học tập của con trong tháng như sau:
- Về ý thức: Con nghiêm túc và cố gắng nhiều trong học tập; ghi chép bài đầy đủ; tập trung nghe giảng, sẵn sàng và chủ động phản hồi giáo viên khi được gọi, có sự chuẩn bị bài tập về nhà tốt 
- Về nội dung kiến thức: Tháng này con được học về tam giác đồng dạng biến đổi phân thức đại số và các dạng bài ứng dụng bất đẳng thức Cauchy. Con cần chú ý biến đổi và tính toán cần thận hơn; đặc biệt đối với dạng bài giải bằng phương pháp đặt ẩn phụ; chú ý điều kiện và xác định đúng điểm rơi của bất đẳng thức.
Chúc con học tập và ôn luyện tốt cùng lớp và các bạn!`,
        hasTeacherReviewed: false,
        teacherComment: "",
        approvalStatus: 1,
        qualityComment: "Đã duyệt và gửi phụ huynh",
        actions: "Duyệt"
    },
    {
        id: 2,
        studentCode: "CG23-01040",
        studentName: "Mẫn Vũ Minh Anh",
        phoneNumber: "0912378252",
        status: 1,
        homeworkNote: "Nghỉ buổi 2",
        attendanceScore: 7.0,
        homeworkScore: 6.5,
        ccg: "CCG",
        btyn1: "7.0",
        btyn2: "6.5",
        btyn3: "CCG",
        btyn4: "P",
        btyn5: "6.0",
        btyn6: "8.0",
        btyn7: "",
        btyn8: "7.5",
        testScore: "7.5",
        monthlyReview: "Chuyên cần: 8/10\nKhông làm & CCG: 1/8\nTB điểm BTYN: 6.9\nĐiểm kiểm tra: 7.5",
        monthlyComment: `Thầy cô nhận xét về tình hình học tập của con trong tháng như sau: 
- Về ý thức: Con có sự tiến bộ trong việc tập trung nghe giảng; tuy nhiên đôi lúc còn chưa chủ động đặt câu hỏi. Cần cải thiện việc hoàn thành bài tập về nhà đúng hạn. 
- Về nội dung kiến thức: Con nắm được kiến thức cơ bản về phép biến đổi biểu thức. Cần luyện tập thêm các dạng bài nâng cao và chú ý hơn đến các lỗi sai nhỏ trong tính toán.
Hãy tiếp tục nỗ lực nhé con!`,
        hasTeacherReviewed: true,
        teacherComment: "Cần nhắc nhở về BTYN",
        approvalStatus: 2,
        qualityComment: "Nhận xét cần bổ sung chi tiết hơn và đậm mạnh của học sinh",
        actions: "Duyệt"
    },
    {
        id: 3,
        studentCode: "CG24-01159",
        studentName: "Nguyễn Quốc Minh Châu",
        phoneNumber: "0964252508",
        status: 1,
        homeworkNote: "",
        attendanceScore: 8.0,
        homeworkScore: 8.5,
        ccg: "CCG",
        btyn1: "9.0",
        btyn2: "8.5",
        btyn3: "8.0",
        btyn4: "9.0",
        btyn5: "8.5",
        btyn6: "9.0",
        btyn7: "9.5",
        btyn8: "9.0",
        testScore: "9.0",
        monthlyReview: "Chuyên cần: 10/10\nKhông làm & CCG: 0/8\nTB điểm BTYN: 8.7\nĐiểm kiểm tra: 9.0",
        monthlyComment: `Thầy cô nhận xét về tình hình học tập của con trong tháng như sau:
- Về ý thức: Con rất tích cực và chủ động trong mọi hoạt động trên lớp; có tinh thần học hỏi cao.
- Về nội dung kiến thức: Con nắm vững kiến thức; thể hiện khả năng phân tích và giải quyết vấn đề tốt. Cần tiếp tục duy trì phong độ và thử sức với các bài toán thách thức hơn.
Chúc mừng con vì kết quả học tập xuất sắc!`,
        hasTeacherReviewed: true,
        teacherComment: "Không có góp ý thêm",
        approvalStatus: 1,
        qualityComment: "Đã duyệt",
        actions: "Duyệt"
    }
];