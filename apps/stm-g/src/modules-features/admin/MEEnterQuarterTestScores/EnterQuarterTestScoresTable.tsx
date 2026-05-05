'use client'
import { Checkbox, Group } from "@mantine/core";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MySelect } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayClassStatus, DisplayClassStatusMap } from "../MELessonReviewsApproval/DisplayClassStatus";
import EnterPointButton from "./EnterPointButton";

export interface ClassInfo {
    classCode: string;
    className: string;
    teacher: string;
    schedule: string;
    room: string;
    currentAndMax: string;
    status: string;
    hasMonthlyScore: boolean;
}


export default function EnterQuarterTestScoresTable() {

    const columns = useMemo<MRT_ColumnDef<ClassInfo>[]>(
        () => [
            {
                accessorKey: 'classCode',
                header: 'Mã lớp',
            },
            {
                accessorKey: 'className',
                header: 'Tên lớp',
            },
            {
                accessorKey: 'teacher',
                header: 'Giáo viên chủ nhiệm',
            },
            {
                accessorKey: 'schedule',
                header: 'Lịch học',
                size: 200
            },
            {
                accessorKey: 'room',
                header: 'Phòng học',
            },
            {
                accessorKey: 'currentAndMax',
                header: 'Sĩ số hiện tại/Sĩ số tối đa',
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái lớp',
                size: 200,
                Cell: ({ row }) => <DisplayClassStatus classStatus={DisplayClassStatusMap[row.original.status] ?? -1} />

            },
            {
                accessorKey: 'hasMonthlyScore',
                header: 'Đã nhập điểm',
                Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />
            },
        ], []
    );

    return (
        <>
            <Group mb={10}>
                <MySelect
                    clearable={false}
                    label="Chọn quý"
                    defaultValue={"Quý 1 / 2024-2025"}
                    data={["Quý 1 / 2024-2025", "Quý 2 / 2024-2025", "Quý 3 / 2024-2025", "Quý 4 / 2024-2025"]}
                />
            </Group>
            <MyFieldset title="Danh sách lớp" >
                <MyDataTable
                    enableRowSelection
                    enableRowNumbers
                    columns={columns}
                    data={classData}
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
                                <EnterPointButton />
                            </Group>
                        )
                    }}
                />
            </MyFieldset>
        </>
    )


}

export const classData: ClassInfo[] = [
    {
        classCode: "LD1",
        className: "Lập trình Web Cơ bản 1",
        teacher: "Trần Nhật Minh",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        room: "P.TD01",
        currentAndMax: "10/15",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD2A1",
        className: "Tiếng Anh Giao tiếp A1",
        teacher: "Nguyễn Thị Hải",
        schedule: "Thứ 2 & 4 (19:00-21:00)",
        room: "P.TD02",
        currentAndMax: "12/15",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD2A2",
        className: "Tiếng Anh Giao tiếp A2",
        teacher: "Lê Thị Quế",
        schedule: "Thứ 7 & CN (09:00-11:00)",
        room: "P.TD03",
        currentAndMax: "8/12",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD2B",
        className: "Giải tích Nâng cao",
        teacher: "Trần Thị Phương Thảo",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        room: "P.TD01",
        currentAndMax: "11/15",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD2C1",
        className: "Hóa học Đại cương",
        teacher: "Hoàng Thị Hương",
        schedule: "Thứ 6 (18:00-21:00)",
        room: "P.TD04",
        currentAndMax: "9/10",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD2C2",
        className: "Vật lý Nâng cao",
        teacher: "Trần Thị Quy",
        schedule: "Thứ 7 (14:00-17:00)",
        room: "P.TD05",
        currentAndMax: "7/10",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD3A",
        className: "Lịch sử Việt Nam",
        teacher: "Lê Thu Trang",
        schedule: "Thứ 2 & 4 (18:00-20:00)",
        room: "P.TD06",
        currentAndMax: "14/15",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD3B",
        className: "Kinh tế Vi mô",
        teacher: "Trần Trọng Thưởng",
        schedule: "Thứ 3 & 5 (19:00-21:00)",
        room: "P.TD07",
        currentAndMax: "13/15",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD3C",
        className: "Địa lý Tự nhiên",
        teacher: "Lê Thị Trường An",
        schedule: "Thứ 6 (17:00-19:00)",
        room: "P.TD08",
        currentAndMax: "9/12",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
    {
        classCode: "LD3D",
        className: "Ngữ văn Hiện đại",
        teacher: "Trần Trọng Thưởng",
        schedule: "Chủ Nhật (09:00-12:00)",
        room: "P.TD09",
        currentAndMax: "10/12",
        status: "Đang hoạt động",
        hasMonthlyScore: true,
    },
];
