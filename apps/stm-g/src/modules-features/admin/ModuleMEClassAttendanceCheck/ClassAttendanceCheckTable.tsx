import { Center, Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyCenterFull, MyDataTable, MyDateInput, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ClassStatusBadge, ClassStatusMap } from "./ClassStatusBadge";
import ClassAttendanceCheckUpdate from "./ClassAttendanceCheckUpdate";

//ClassAttendanceCheck
export default function ClassAttendanceCheckTable() {

    const query = useQuery<I_ClassAttendanceTable[]>({
        queryKey: ["I_ClassAttendanceTableQuery"],
        queryFn: async () => {
            return classTableMockData ?? [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_ClassAttendanceTable>[]>(() => [
        { header: "Mã lớp", accessorKey: "classId", size: 100 },
        { header: "Tên lớp", accessorKey: "name" },
        { header: "Giáo viên chủ nhiệm", accessorKey: "teacher" },
        { header: "Lịch học", accessorKey: "schedule" },
        { header: "Phòng học", accessorKey: "room", size: 100 },
        { header: "Sĩ số hiện tại/Sĩ số tối đa", accessorKey: "currentMax", size: 100 },
        {
            header: "Trạng thái lớp",
            accessorKey: "status",
            size: 270,
            accessorFn: row => <Center><ClassStatusBadge result={ClassStatusMap[row.status || -1] ?? -1} /></Center>
        },
        {
            header: "Đã điểm danh",
            accessorFn: row => <Center><Checkbox checked={row.checkedIn || false} onChange={() => { }} /></Center>,
            id: "checkedIn",
        },
    ], []);


    const exportConfig = {
        fields: [
            { fieldName: "classId", header: "Mã lớp" },
            { fieldName: "name", header: "Tên lớp" },
            { fieldName: "teacher", header: "Giáo viên chủ nhiệm" },
            { fieldName: "schedule", header: "Lịch học" },
            { fieldName: "room", header: "Phòng học" },
            { fieldName: "currentMax", header: "Sĩ số hiện tại/Sĩ số tối đa" },
            { fieldName: "status", header: "Trạng thái lớp" },
            { fieldName: "checkedIn", header: "Đã điểm danh" },
        ]
    };

    return (
        <>
            <MyDateInput defaultValue={new Date("03/05/2025")} label={"Chọn ngày điểm danh"} w={"250px"} p={20} />
            <MyFieldset title={"Danh sách lớp"}>
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
                                objectName={"DanhSachLop"}
                                data={query.data || []}
                                exportConfig={exportConfig}
                            />
                        </>
                    )}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <ClassAttendanceCheckUpdate />
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </>
    )
}

export interface I_ClassAttendanceTable {
    id: number;
    classId: string;                   // Mã lớp
    name: string;                 // Tên lớp
    teacher: string;              // Giáo viên chủ nhiệm
    schedule: string;             // Lịch học
    room: string;                 // Phòng học
    currentMax: string;           // Sĩ số hiện tại/Sĩ số tối đa (dạng: "10/15")
    status: string;               // Trạng thái lớp
    checkedIn: boolean;           // Đã điểm danh
}

export const classTableMockData: I_ClassAttendanceTable[] = [
    {
        id: 1,
        classId: "LD1",
        name: "Lập trình Web Cơ bản 1",
        teacher: "Trần Nhật Minh",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        room: "P.TD01",
        currentMax: "10/15",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 2,
        classId: "LD2A1",
        name: "Tiếng Anh Giao tiếp A1",
        teacher: "Nguyễn Thị Hai",
        schedule: "Thứ 2 & 4 (19:20-21:00)",
        room: "P.TD02",
        currentMax: "12/15",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 3,
        classId: "LD2A2",
        name: "Tiếng Anh Giao tiếp A2",
        teacher: "Lê Thị Quế",
        schedule: "Thứ 7 & CN (09:00-11:00)",
        room: "P.TD03",
        currentMax: "8/12",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 4,
        classId: "LD2B",
        name: "Giải tích Nâng cao",
        teacher: "Trần Thị Phương Thảo",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        room: "P.TD01",
        currentMax: "11/15",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 5,
        classId: "LD2C1",
        name: "Hóa học Đại cương",
        teacher: "Hoàng Thị Hương",
        schedule: "Thứ 6 (18:00-21:00)",
        room: "P.TD04",
        currentMax: "9/10",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 6,
        classId: "LD2C2",
        name: "Vật lý Nâng cao",
        teacher: "Trần Thị Quy",
        schedule: "Thứ 7 (14:00-17:00)",
        room: "P.TD05",
        currentMax: "7/10",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 7,
        classId: "LD3A",
        name: "Lịch sử Việt Nam",
        teacher: "Lê Thu Trọng",
        schedule: "Thứ 2 & 4 (18:00-20:00)",
        room: "P.TD06",
        currentMax: "14/15",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 8,
        classId: "LD3B",
        name: "Kinh tế Vi mô",
        teacher: "Trần Trọng Thương",
        schedule: "Thứ 3 & 5 (19:00-21:00)",
        room: "P.TD07",
        currentMax: "13/15",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 9,
        classId: "LD3C",
        name: "Địa lý Tự nhiên",
        teacher: "Lê Thị Trường An",
        schedule: "Thứ 6 (17:00-19:00)",
        room: "P.TD08",
        currentMax: "9/12",
        status: "Đang hoạt động",
        checkedIn: true,
    },
    {
        id: 10,
        classId: "LD3D",
        name: "Ngữ văn Hiện đại",
        teacher: "Trần Trọng Thương",
        schedule: "Chủ Nhật (09:00-12:00)",
        room: "P.TD09",
        currentMax: "10/12",
        status: "Đang hoạt động",
        checkedIn: true,
    },
];
