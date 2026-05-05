import { Group } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyButton, MyCheckbox, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayClassStatus } from "./DisplayClassStatus";
import { DisplayQualityReviewStatus } from "./DisplayQualityReviewStatus";
import MonthlyTeacherFeedbackEvaluate from "./MonthlyTeacherFeedbackEvaluate";

interface IMonthlyTeacherFeedbackViewModel {
    id: number,
    code: string,
    name: string; // Tên lớp
    homeroomTeacher: string; // Giáo viên chủ nhiệm
    schedule: string; // Lịch học
    room: string; // Phòng học
    currentSize: number; // Sĩ số hiện tại
    maxSize: number; // Sĩ số tối đa
    status: number;
    monthScoreEntered: boolean; // Đã nhập điểm tháng
    teacherCommented: boolean; // GV đã góp ý
    qlclStatus: number;
}

export default function MonthlyTeacherFeedbackLayout() {

    const columns = useMemo<MRT_ColumnDef<IMonthlyTeacherFeedbackViewModel>[]>(
        () => [
            { accessorKey: 'code', header: 'Mã lớp', size: 100 },
            { accessorKey: 'name', header: 'Tên lớp', size: 250 },
            { accessorKey: 'homeroomTeacher', header: 'Giáo viên chủ nhiệm', size: 200 },
            { accessorKey: 'schedule', header: 'Lịch học', size: 200 },
            { accessorKey: 'room', header: 'Phòng học' },
            {
                accessorKey: 'currentSize',
                header: 'Sĩ số hiện tại/ Sĩ số tối đa',
                Cell: ({ row }) => `${row.original.currentSize}/${row.original.maxSize}`
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái lớp',
                size: 200,
                Cell: ({ row }) => (
                    <DisplayClassStatus value={row.original.status} />
                )
            },
            {
                accessorKey: 'monthScoreEntered',
                header: 'Đã nhập điểm tháng',
                Cell: ({ cell }) => (
                    <MyCheckbox
                        checked={cell.getValue<boolean>()}
                        readOnly
                    />
                )
            },
            {
                accessorKey: 'teacherCommented',
                header: 'GV đã góp ý',
                Cell: ({ cell }) => (
                    <MyCheckbox
                        checked={cell.getValue<boolean>()}
                        readOnly
                    />
                )
            },
            {
                accessorKey: 'qlclStatus',
                header: 'QLCL duyệt',
                size: 200,
                Cell: ({ row }) => (
                    <DisplayQualityReviewStatus value={row.original.qlclStatus} />
                )
            },
        ], []
    );

    return (
        <>
            <Group mb={10}>
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
                    enableRowSelection={true}
                    columns={columns}
                    data={mockData}
                    renderTopToolbarCustomActions={() => {
                        return (
                            <>
                                <MyButton crudType="export" />
                            </>
                        )
                    }}
                    renderRowActions={(row) => {
                        return (
                            <>
                                <MonthlyTeacherFeedbackEvaluate />
                            </>
                        )
                    }}
                />
            </MyFieldset>
        </>
    );
}

const mockData: IMonthlyTeacherFeedbackViewModel[] = [
    {
        id: 1,
        code: 'LD1',
        name: 'Lập trình Web Cơ bản 1',
        homeroomTeacher: 'Trần Nhật Minh',
        schedule: 'Thứ 3 & 5 (18:00-20:00)',
        room: 'P.TD.01',
        currentSize: 10,
        maxSize: 15,
        status: 2,
        qlclStatus: 1,
        monthScoreEntered: true,
        teacherCommented: false,
    },
    {
        id: 2,
        code: 'LĐ2A1',
        name: 'Tiếng Anh Giao tiếp A1',
        homeroomTeacher: 'Nguyễn Thị Hải',
        schedule: 'Thứ 2 & 4 (19:00-21:00)',
        room: 'P.TD.02',
        currentSize: 12,
        maxSize: 15,
        status: 2,
        qlclStatus: 1,
        monthScoreEntered: true,
        teacherCommented: true,
    },
    {
        id: 3,
        code: 'LĐ2A2',
        name: 'Tiếng Anh Giao tiếp A2',
        homeroomTeacher: 'Lê Thị Quế',
        schedule: 'Thứ 7 & CN (09:00-11:00)',
        room: 'P.TD.03',
        currentSize: 8,
        maxSize: 12,
        status: 2,
        qlclStatus: 3,
        monthScoreEntered: true,
        teacherCommented: false,
    },
    {
        id: 4,
        code: 'LD2B',
        name: 'Giải tích Nâng cao',
        homeroomTeacher: 'Trần Thị Phương Thảo',
        schedule: 'Thứ 3 & 5 (18:00-20:00)',
        room: 'P.TD.01',
        currentSize: 11,
        maxSize: 15,
        status: 2,
        qlclStatus: 1,
        monthScoreEntered: true,
        teacherCommented: true,
    },
    {
        id: 5,
        code: 'LD2C1',
        name: 'Hóa học Đại cương',
        homeroomTeacher: 'Hoàng Thị Hương',
        schedule: 'Thứ 6 (18:00-21:00)',
        room: 'P.TD.04',
        currentSize: 9,
        maxSize: 10,
        status: 2,
        qlclStatus: 2,
        monthScoreEntered: true,
        teacherCommented: false,
    },
    {
        id: 6,
        code: 'LD2C2',
        name: 'Vật lý Nâng cao',
        homeroomTeacher: 'Trần Thị Quy',
        schedule: 'Thứ 7 (14:00-17:00)',
        room: 'P.TD.05',
        currentSize: 7,
        maxSize: 10,
        status: 2,
        qlclStatus: 1,
        monthScoreEntered: true,
        teacherCommented: true,
    },
    {
        id: 7,
        code: 'LD3A',
        name: 'Lịch sử Việt Nam',
        homeroomTeacher: 'Lê Thu Trang',
        schedule: 'Thứ 2 & 4 (18:00-20:00)',
        room: 'P.TD.06',
        currentSize: 14,
        maxSize: 15,
        status: 2,
        qlclStatus: 1,
        monthScoreEntered: true,
        teacherCommented: false,
    },
    {
        id: 8,
        code: 'LD3B',
        name: 'Kinh tế Vi mô',
        homeroomTeacher: 'Trần Trọng Thường',
        schedule: 'Thứ 3 & 5 (19:00-21:00)',
        room: 'P.TD.07',
        currentSize: 13,
        maxSize: 15,
        status: 2,
        qlclStatus: 1,
        monthScoreEntered: true,
        teacherCommented: true,
    },
    {
        id: 9,
        code: 'LD3C',
        name: 'Địa lý Tự nhiên',
        homeroomTeacher: 'Lê Thị Trường An',
        schedule: 'Thứ 6 (17:00-19:00)',
        room: 'P.TD.08',
        currentSize: 9,
        maxSize: 12,
        status: 2,
        qlclStatus: 3,
        monthScoreEntered: true,
        teacherCommented: false,
    },
    {
        id: 10,
        code: 'LD3D',
        name: 'Ngữ văn Hiện đại',
        homeroomTeacher: 'Trần Trọng Thường',
        schedule: 'Chủ Nhật (09:00-12:00)',
        room: 'P.TD.09',
        currentSize: 10,
        maxSize: 12,
        status: 2,
        qlclStatus: 2,
        monthScoreEntered: true,
        teacherCommented: true,
    },
]