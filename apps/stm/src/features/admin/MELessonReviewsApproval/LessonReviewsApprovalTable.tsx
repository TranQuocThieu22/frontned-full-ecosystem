'use client'
import { Checkbox, Group } from "@mantine/core";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyDateInput, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ApprovalButton from "./ApprovalButton";
import { DisplayClassStatus, DisplayClassStatusMap } from "./DisplayClassStatus";
import { DisplayQualityReviewStatus, DisplayQualityReviewStatusMap } from "./DisplayQualityReviewStatus";
import ViewPointButton from "./ViewPointButton";
import ViewReviewButton from "./ViewReviewButton";

export interface IClassInfo {
    classCode: string;                // Mã lớp
    className: string;               // Tên lớp
    homeroomTeacher: string;         // Giáo viên chủ nhiệm
    schedule: string;                // Lịch học
    classroom: string;               // Phòng học
    studentCount: string;           // Sĩ số hiện tại/Sĩ số tối đa
    classStatus: string;            // Trạng thái lớp
    isScoreEntered: boolean;         // Đã nhập điểm
    isTACommented: boolean;         // Trợ giảng đã nhận xét
    isTeacherChecked: boolean;      // Giảng viên kiểm tra
    qualityApproved: string;        // Quản lý chất lượng duyệt
    isNotified: boolean;            // Đã thông báo
    note?: string;                  // Nhận xét (tùy chọn)
}

export default function LessonReviewsApprovalTable() {

    const columns = useMemo<MRT_ColumnDef<IClassInfo>[]>(
        () => [
            { accessorKey: 'classCode', header: 'Mã lớp' },
            { accessorKey: 'className', header: 'Tên lớp' },
            { accessorKey: 'homeroomTeacher', header: 'Giáo viên chủ nhiệm' },
            { accessorKey: 'schedule', header: 'Lịch học', size: 200 },
            { accessorKey: 'classroom', header: 'Phòng học' },
            { accessorKey: 'studentCount', header: 'Sĩ số hiện tại/ Sĩ số tối đa' },
            {
                accessorKey: 'classStatus',
                header: 'Trạng thái lớp',
                size: 200,
                Cell: ({ row }) => <DisplayClassStatus classStatus={DisplayClassStatusMap[row.original.classStatus] ?? 0} />
            },
            {
                accessorKey: 'isScoreEntered',
                header: 'Đã nhập điểm',
                Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />
            },
            {
                accessorKey: 'isTACommented',
                header: 'Trợ giảng đã nhận xét',
                Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />
            },
            {
                accessorKey: 'isTeacherChecked',
                header: 'Giảng viên kiểm tra',
                Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />
            },
            {
                accessorKey: 'qualityApproved',
                header: 'QL chất lượng duyệt',
                size: 200,
                Cell: ({ row }) => <DisplayQualityReviewStatus statuss={DisplayQualityReviewStatusMap[row.original.qualityApproved] ?? 0} />
            },
            {
                accessorKey: 'isNotified',
                header: 'Đã thông báo',
                Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />
            },
            { accessorKey: 'note', header: 'Nhận xét', size: 500 },
        ], []
    );

    return (
        <>
            <Group mb={10}>
                <MyDateInput label="Chọn ngày nhập điểm" defaultValue={new Date().toISOString()} rightSection={<IconCalendarWeek />} />
            </Group>
            <MyFieldset title="Danh sách lớp" >
                <MyDataTable
                    enableRowSelection
                    enableRowNumbers
                    columns={columns}
                    data={classData}
                    rowActionSize={390}
                    renderTopToolbarCustomActions={() => {
                        return (
                            <>
                                <MyButton crudType="export" />
                            </>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <Group>
                                <ViewPointButton />
                                <ViewReviewButton values={row.original} />
                                <ApprovalButton values={row.original} />
                            </Group>
                        )
                    }}
                />
            </MyFieldset>
        </>
    )
}


export const classData: IClassInfo[] = [
    {
        classCode: 'LD1',
        className: 'Lập trình Web Cơ bản 1',
        homeroomTeacher: 'Trần Nhật Minh',
        schedule: 'Thứ 3 & 5 (18:00-20:00)',
        classroom: 'P.TD01',
        studentCount: '10/15',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD2A1',
        className: 'Tiếng Anh Giao tiếp A1',
        homeroomTeacher: 'Nguyễn Thị Hải',
        schedule: 'Thứ 2 & 4 (19:00-21:00)',
        classroom: 'P.TD02',
        studentCount: '12/15',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD2A2',
        className: 'Tiếng Anh Giao tiếp A2',
        homeroomTeacher: 'Lê Thị Quế',
        schedule: 'Thứ 7 & CN (09:00-11:00)',
        classroom: 'P.TD03',
        studentCount: '8/12',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD2B',
        className: 'Giải tích Nâng cao',
        homeroomTeacher: 'Trần Thị Phượng Thảo',
        schedule: 'Thứ 5 & 6 (18:00-20:00)',
        classroom: 'P.TD01',
        studentCount: '11/15',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD2C1',
        className: 'Hóa học Đại cương',
        homeroomTeacher: 'Hoàng Thị Hương',
        schedule: 'Thứ 6 (18:00-21:00)',
        classroom: 'P.TD04',
        studentCount: '9/10',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD2C2',
        className: 'Vật lý Nâng cao',
        homeroomTeacher: 'Trần Thị Quy',
        schedule: 'Thứ 7 (14:00-17:00)',
        classroom: 'P.TD05',
        studentCount: '7/10',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD3A',
        className: 'Lịch sử Việt Nam',
        homeroomTeacher: 'Lê Thu Trang',
        schedule: 'Thứ 2 & 4 (18:00-21:00)',
        classroom: 'P.TD06',
        studentCount: '14/15',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD3B',
        className: 'Kinh tế Vi mô',
        homeroomTeacher: 'Trần Trọng Thương',
        schedule: 'Thứ 3 & 5 (19:00-21:00)',
        classroom: 'P.TD07',
        studentCount: '13/15',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD3C',
        className: 'Địa lý Tự nhiên',
        homeroomTeacher: 'Lê Thị Trương An',
        schedule: 'Thứ 6 (17:00-19:00)',
        classroom: 'P.TD08',
        studentCount: '9/12',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Duyệt',
        isNotified: true,
    },
    {
        classCode: 'LD3D',
        className: 'Ngữ văn Hiện đại',
        homeroomTeacher: 'Trần Trọng Thương',
        schedule: 'Chủ Nhật (09:00-12:00)',
        classroom: 'P.TD09',
        studentCount: '10/12',
        classStatus: 'Đang hoạt động',
        isScoreEntered: true,
        isTACommented: true,
        isTeacherChecked: true,
        qualityApproved: 'Yêu cầu hiệu chỉnh',
        isNotified: true,
        note: 'Văn phòng chưa đúng quy định',
    },
];
