'use client'
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayScheduleTestStatus, ScheduleTestStatusMap } from "./DisplayScheduleTestStatus";
import ScheduleTestCreateButton from "./ScheduleTestCreateButton";
import ScheduleTestDeleteButton from "./ScheduleTestDeleteButton";
import ScheduleTestUpdateButton from "./ScheduleTestUpdateButton";

export interface TestSchedule {
    id: number;
    status: string;
    potentialStudentCode: string;
    fullName: string;
    testDate: string; // yyyy-mm-dd
    testTime: string; // HH:mm
    testLocation: string;
    testFormat: string;
    assignedStaff: string;
    note: string;
    createdDate: string; // yyyy-mm-dd
    cancelReason: string;
}



export default function ScheduleTestTable() {

    const columns = useMemo<MRT_ColumnDef<TestSchedule>[]>(
        () => [
            {
                accessorKey: 'status',
                header: 'Trạng thái Lịch hẹn',
                accessorFn: (row) => <DisplayScheduleTestStatus statusScheduleTest={ScheduleTestStatusMap[row.status] ?? 0} />,
                size: 200
            },
            { accessorKey: 'potentialStudentCode', header: 'Mã KH Tiềm năng' },
            { accessorKey: 'fullName', header: 'Họ và tên HS' },
            { accessorKey: 'testDate', header: 'Ngày hẹn Test', accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.testDate)) },
            { accessorKey: 'testTime', header: 'Giờ hẹn Test' },
            { accessorKey: 'testLocation', header: 'Địa điểm Test' },
            { accessorKey: 'testFormat', header: 'Hình thức Test' },
            { accessorKey: 'assignedStaff', header: 'Người phụ trách Test' },
            {
                accessorKey: 'note',
                header: 'Ghi chú',
                size: 500
            },
            { accessorKey: 'createdDate', header: 'Ngày tạo lịch hẹn', accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.createdDate)) },
            { accessorKey: 'cancelReason', header: 'Lý do huỷ', size: 300 },
        ], []
    );

    return (
        <MyFieldset title="Danh sách hẹn test" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={testSchedules}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <ScheduleTestCreateButton />
                            <MyButton crudType="import" />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ScheduleTestUpdateButton values={row.original} />
                            <ScheduleTestDeleteButton id={row.original.id} code={row.original.potentialStudentCode} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}
export const testSchedules: TestSchedule[] = [
    {
        status: "Đã hẹn",
        potentialStudentCode: "KHTN001",
        fullName: "Nguyễn Văn A",
        testDate: "2025-07-20",
        testTime: "09:00",
        testLocation: "CS1 - Phòng 101",
        testFormat: "Offline",
        assignedStaff: "Cô Mai Anh",
        note: "",
        createdDate: "2025-07-15",
        cancelReason: "",
        id: 1
    },
    {
        status: "Đã hẹn lại",
        potentialStudentCode: "KHTN002",
        fullName: "Trần Thị B",
        testDate: "2025-07-23",
        testTime: "10:30",
        testLocation: "CS2 - Phòng 203",
        testFormat: "Offline",
        assignedStaff: "Thầy Long",
        note: "PH muốn đổi sang ngày gần nhất có thể.",
        createdDate: "2025-07-15",
        cancelReason: "",
        id: 2
    },
    {
        status: "Đã hủy",
        potentialStudentCode: "KHTN003",
        fullName: "Phạm Thị C",
        testDate: "2025-07-22",
        testTime: "14:00",
        testLocation: "CS1 - Phòng 102",
        testFormat: "Online",
        assignedStaff: "Cô Mai Anh",
        note: "",
        createdDate: "2025-07-16",
        cancelReason: "PH thay đổi kế hoạch\nKhông tiện đến test.",
        id: 3
    },
    {
        status: "Đã test",
        potentialStudentCode: "KHTN004",
        fullName: "Đinh Văn D",
        testDate: "2025-07-25",
        testTime: "10:00",
        testLocation: "CS2 - Online Room 3",
        testFormat: "Online",
        assignedStaff: "Thầy Long",
        note: "",
        createdDate: "2025-07-16",
        cancelReason: "",
        id: 4
    },
    {
        status: "Đã hẹn",
        potentialStudentCode: "KHTN005",
        fullName: "Lê Thị E",
        testDate: "2025-07-28",
        testTime: "11:00",
        testLocation: "CS1 - Phòng 101",
        testFormat: "Offline",
        assignedStaff: "Cô Mai Anh",
        note: "Yêu cầu có GV nữ nếu được.",
        createdDate: "2025-07-17",
        cancelReason: "",
        id: 5
    },
];

