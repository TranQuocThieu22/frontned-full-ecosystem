import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import MonthlyParentFeedbackDetailTable from "./MonthlyParentFeedbackDetailTable";
import { MyFieldset, MyDataTable, AQButtonExportData, MyCenterFull, MyDateInput } from "aq-fe-framework/components";
import { Center, Checkbox } from "@mantine/core";
import { QLCLApprovalStatusBadge, QLCLApprovalStatusMap } from "./QLCLApprovalStatus";
import { AcitivityStatusBadge, AcitivityStatusMap } from "./ActivityStatus";
import { MonthPickerInput } from "@mantine/dates";
import { IconCalendarWeek } from "@tabler/icons-react";
import { Group } from "react-konva";

export default function MonthlyParentFeedbackTable() {

    const form = useForm({
        initialValues: {

        }
    });
    const query = useQuery<IClassManagement[]>({
        queryKey: ["IClassManagementQuery"],
        queryFn: async () => {
            return mockData || [];
        },
    })


    const columns = useMemo<MRT_ColumnDef<IClassManagement>[]>(() => [
        { header: "Mã lớp", accessorKey: "classCode" },
        { header: "Tên lớp", accessorKey: "className" },
        { header: "Giáo viên chủ nhiệm", accessorKey: "teacher" },
        { header: "Lịch học", accessorKey: "schedule" },
        { header: "Phòng học", accessorKey: "room" },
        { header: "Sĩ số hiện tại/Sĩ số tối đa", accessorKey: "studentCount" },
        {
            header: "Trạng thái lớp",
            accessorKey: "status",
            size: 250,
            accessorFn: row => <Center><AcitivityStatusBadge result={AcitivityStatusMap[row.status || -1] ?? -1} /></Center>
        },
        {
            header: "Đã nhập điểm tháng",
            id: "isMonthlyGraded",
            accessorFn: row => <Center><Checkbox checked={row.isMonthlyGraded || false} onChange={() => { }} /></Center>
        },
        {
            header: "GV đã góp ý",
            id: "isTeacherReported",
            accessorFn: row => <Center><Checkbox checked={row.isTeacherReported || false} onChange={() => { }} /></Center>

        },
        {
            header: "QLCL duyệt",
            id: "qcApproval",
            size: 250,
            accessorFn: row => <Center><QLCLApprovalStatusBadge result={QLCLApprovalStatusMap[row.qcApproval || -1]?? -1} /></Center>
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "classCode", header: "Mã lớp" },
            { fieldName: "className", header: "Tên lớp" },
            { fieldName: "teacher", header: "Giáo viên chủ nhiệm" },
            { fieldName: "schedule", header: "Lịch học" },
            { fieldName: "room", header: "Phòng học" },
            { fieldName: "studentCount", header: "Sĩ số hiện tại/Sĩ số tối đa" },
            { fieldName: "status", header: "Trạng thái lớp" },
            { fieldName: "isMonthlyGraded", header: "Đã nhập điểm tháng" },
            { fieldName: "isTeacherReported", header: "GV đã góp ý" },
            { fieldName: "qcApproval", header: "QLCL duyệt" }
        ]
    };


    return (
        <>
            <MonthPickerInput
                label="Chọn tháng"
                locale={"vi"}
                monthsListFormat="[Tháng] M"
                valueFormat="[Tháng] MM YYYY"
                defaultValue={new Date().toISOString()}
                rightSection={<IconCalendarWeek

                />}

                w={"250px"}
                p={20}
            />

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
                    renderRowActions={() => (
                        <MyCenterFull>
                            <MonthlyParentFeedbackDetailTable />

                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </>
    )
}
export interface IClassManagement {
    classCode: string;         // Mã lớp
    className: string;         // Tên lớp
    teacher: string;           // Giáo viên chủ nhiệm
    schedule: string;          // Lịch học
    room: string;              // Phòng học
    studentCount: string;      // Sĩ số hiện tại/Sĩ số tối đa (ví dụ "10/15")
    status: string;            // Trạng thái lớp
    isMonthlyGraded: boolean;  // Đã nhập điểm tháng
    isTeacherReported: boolean;// GV đã góp ý
    qcApproval: string;        // QLCL duyệt
}
export const mockData: IClassManagement[] = [
    {
        classCode: "LD1",
        className: "Lập trình Web Cơ bản 1",
        teacher: "Trần Nhật Minh",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        room: "P.TD01",
        studentCount: "10/15",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: false,
        qcApproval: "Duyệt"
    },
    {
        classCode: "LD2A1",
        className: "Tiếng Anh Giao tiếp A1",
        teacher: "Nguyễn Thị Hải",
        schedule: "Thứ 2 & 4 (19:00-21:00)",
        room: "P.TD02",
        studentCount: "12/15",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: false,
        qcApproval: "Duyệt"
    },
    {
        classCode: "LD2A2",
        className: "Tiếng Anh Giao tiếp A2",
        teacher: "Lê Thị Quế",
        schedule: "Thứ 7 & CN (09:00-11:00)",
        room: "P.TD03",
        studentCount: "8/12",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: false,
        qcApproval: "Chưa duyệt"
    },
    {
        classCode: "LD2A8",
        className: "Giải tích Nâng cao",
        teacher: "Trần Thị Phương Thảo",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        room: "P.TD01",
        studentCount: "11/15",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: true,
        qcApproval: "Duyệt"
    },
    {
        classCode: "LD2C1",
        className: "Ngữ âm Đại cương",
        teacher: "Hoàng Thị Hường",
        schedule: "Thứ 5 (18:00-21:00)",
        room: "P.TD04",
        studentCount: "9/10",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: false,
        qcApproval: "Yêu cầu hiệu chỉnh"
    },
    {
        classCode: "LD2C2",
        className: "Vật lý Nâng cao",
        teacher: "Trần Thị Quy",
        schedule: "Thứ 7 (17:00-20:00)",
        room: "P.TD05",
        studentCount: "7/10",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: false,
        qcApproval: "Duyệt"
    },
    {
        classCode: "LD3A",
        className: "Lịch sử Việt Nam",
        teacher: "Lê Thu Trang",
        schedule: "Thứ 2 & 4 (18:00-20:00)",
        room: "P.TD06",
        studentCount: "14/15",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: true,
        qcApproval: "Duyệt"
    },
    {
        classCode: "LD3B",
        className: "Kinh tế Vi mô",
        teacher: "Trần Trọng Thương",
        schedule: "Thứ 3 & 5 (16:00-17:30)",
        room: "P.TD07",
        studentCount: "13/15",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: true,
        qcApproval: "Duyệt"
    },
    {
        classCode: "LD3C",
        className: "Địa lý Tự nhiên",
        teacher: "Lê Thị Trương An",
        schedule: "Thứ 6 (17:00-19:00)",
        room: "P.TD08",
        studentCount: "10/12",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: false,
        qcApproval: "Chưa duyệt"
    },
    {
        classCode: "LD3D",
        className: "Ngữ văn Hiện đại",
        teacher: "Trần Trọng Thương",
        schedule: "Chủ nhật (09:00-11:00)",
        room: "P.TD09",
        studentCount: "10/12",
        status: "Đang hoạt động",
        isMonthlyGraded: true,
        isTeacherReported: false,
        qcApproval: "Yêu cầu hiệu chỉnh"
    },
];
