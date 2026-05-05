import { Group, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyButton, MyCenterFull, MyCheckbox, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayApproveStatus } from "./DisplayApproveStatus";
import { DisplayClassStatus } from "./DisplayClassStatus";
import StudentTableModalButton from "./StudentTableModalButton";

interface IMonthlyReviewInfo {
    id?: number;
    classCode: string;           // Mã lớp
    className: string;           // Tên lớp
    teacherInCharge: string;     // Giáo viên chủ nhiệm
    schedule: string;            // Lịch học
    classroom: string;           // Phòng học
    studentRatio: string;        // Sĩ số hiện tại/Sĩ số tối đa
    status: number;              // Trạng thái lớp
    hasEnteredScores: boolean;   // Đã nhập điểm tháng
    hasTeacherReviewed: boolean; // GV đã góp ý
    approvalStatus: number;      // QLCL duyệt
    actions: string;             // Thao tác
}

export default function MonthlyReviewsApprovalTable() {
    const columns = useMemo<MRT_ColumnDef<IMonthlyReviewInfo>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "classCode",
        },
        {
            header: "Tên lớp",
            accessorKey: "className",
            size: 200,
        },
        {
            header: "Giáo viên chủ nhiệm",
            accessorKey: "teacherInCharge",
            size: 250,
        },
        {
            header: "Lịch học",
            accessorKey: "schedule",
            size: 200,
        },
        {
            header: "Phòng học",
            accessorKey: "classroom",
        },
        {
            header: "Sĩ số hiện tại/Sĩ số tối đa",
            accessorKey: "studentRatio",
            size: 250,
        },
        {
            header: "Trạng thái lớp",
            accessorKey: "status",
            size: 210,
            accessorFn: (row) => {
                return <DisplayClassStatus status={row.status || -1} />
            }
        },
        {
            header: "Đã nhập điểm tháng",
            accessorKey: "hasEnteredScores",
            size: 220,
            accessorFn: (row) => {
                return <MyCenterFull>
                    <MyCheckbox onChange={() => { }} checked={row.hasEnteredScores} />
                </MyCenterFull>
            }
        },
        {
            header: "GV đã góp ý",
            accessorKey: "hasTeacherReviewed",
            accessorFn: (row) => {
                return <MyCenterFull>
                    <MyCheckbox onChange={() => { }} checked={row.hasTeacherReviewed} />
                </MyCenterFull>
            }
        },
        {
            header: "QLCL duyệt",
            accessorKey: "approvalStatus",
            size: 210,
            accessorFn: (row) => {
                return <DisplayApproveStatus status={row.approvalStatus || -1} />
            }
        },
    ], []);

    return (
        <Stack>
            <Group>
                <MonthPickerInput
                    label="Chọn tháng"
                    locale={"vi"}
                    monthsListFormat="[Tháng] M"
                    valueFormat="[Tháng] MM YYYY"
                    defaultValue={new Date().toISOString()}
                    rightSection={<IconCalendarWeek />}
                />
            </Group>
            <MyFieldset title="Danh sách lớp">
                <MyDataTable
                    columns={columns}
                    data={mockData}
                    enableRowSelection
                    renderTopToolbarCustomActions={() => (
                        <MyButton crudType="export">Export</MyButton>
                    )}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <StudentTableModalButton />
                            </MyCenterFull>
                        );
                    }}
                />
            </MyFieldset>
        </Stack>
    );
}

const mockData: IMonthlyReviewInfo[] = [
    {
        classCode: "LĐ1",
        className: "Lập trình Web Cơ bản 1",
        teacherInCharge: "Trần Nhật Minh",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        classroom: "P.TD01",
        studentRatio: "10/15",
        status: 1, // Đang hoạt động
        hasEnteredScores: true,
        hasTeacherReviewed: false,
        approvalStatus: 1,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ2A1",
        className: "Tiếng Anh Giao tiếp A1",
        teacherInCharge: "Nguyễn Thị Hải",
        schedule: "Thứ 2 & 4 (19:00-21:00)",
        classroom: "P.TD02",
        studentRatio: "12/15",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: true,
        approvalStatus: 1,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ2A2",
        className: "Tiếng Anh Giao tiếp A2",
        teacherInCharge: "Lê Thị Quế",
        schedule: "Thứ 7 & CN (09:00-11:00)",
        classroom: "P.TD03",
        studentRatio: "8/12",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: false,
        approvalStatus: 3,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ2B",
        className: "Giải tích Nâng cao",
        teacherInCharge: "Trần Thị Phương Thảo",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        classroom: "P.TD01",
        studentRatio: "11/15",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: true,
        approvalStatus: 1,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ2C1",
        className: "Hóa học Đại cương",
        teacherInCharge: "Hoàng Thị Hương",
        schedule: "Thứ 6 (18:00-21:00)",
        classroom: "P.TD04",
        studentRatio: "9/10",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: false,
        approvalStatus: 2,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ2C2",
        className: "Vật lý Nâng cao",
        teacherInCharge: "Trần Thị Quý",
        schedule: "Thứ 7 (14:00-17:00)",
        classroom: "P.TD05",
        studentRatio: "7/10",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: true,
        approvalStatus: 1,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ3A",
        className: "Lịch sử Việt Nam",
        teacherInCharge: "Lê Thu Trang",
        schedule: "Thứ 2 & 4 (18:00-20:00)",
        classroom: "P.TD06",
        studentRatio: "14/15",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: false,
        approvalStatus: 1,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ3B",
        className: "Kinh tế Vi mô",
        teacherInCharge: "Trần Trọng Thưởng",
        schedule: "Thứ 3 & 5 (19:00-21:00)",
        classroom: "P.TD07",
        studentRatio: "13/15",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: true,
        approvalStatus: 1,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ3C",
        className: "Địa lý Tự nhiên",
        teacherInCharge: "Lê Thị Trường An",
        schedule: "Thứ 6 (17:00-19:00)",
        classroom: "P.TD08",
        studentRatio: "9/12",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: false,
        approvalStatus: 3,
        actions: "Nhận xét"
    },
    {
        classCode: "LĐ3D",
        className: "Ngữ văn Hiện đại",
        teacherInCharge: "Trần Trọng Thưởng",
        schedule: "Chủ Nhật (09:00-12:00)",
        classroom: "P.TD09",
        studentRatio: "10/12",
        status: 1,
        hasEnteredScores: true,
        hasTeacherReviewed: true,
        approvalStatus: 2,
        actions: "Nhận xét"
    }
];