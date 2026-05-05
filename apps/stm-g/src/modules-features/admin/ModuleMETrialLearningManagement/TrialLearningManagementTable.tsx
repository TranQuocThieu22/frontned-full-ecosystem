import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayTrialStatus, TrialStatus } from "./DisplayTrialStatus";
import TrialLearningManagementCreateOrUpdate from "./TrialLearningManagementCreateOrUpdate";
import TrialLearningManagementDelete from "./TrialLearningManagementDelete";
import TrialLearningManagementDeleteList from "./TrialLearningManagementDeleteList";

export default function TrialLearningManagementTable() {

    const form = useForm<any>({
        initialValues: {},
    });

    const query = useQuery<I_TrialClassTable[]>({
        queryKey: ["I_TrialClassTableQuery"],
        queryFn: async () => {
            return trialClassMockData ?? [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_TrialClassTable>[]>(() => [
        { header: "Mã Học thử", accessorKey: "code" },
        { header: "Mã KH Tiềm năng", accessorKey: "customerCode" },
        { header: "Họ và tên HS", accessorKey: "studentName" },
        { header: "Lớp/Buổi Học thử", accessorKey: "className" },
        {
            header: "Ngày Học thử",
            accessorFn: row => row.trialDate ? utils_date_dateToDDMMYYYString(new Date(row.trialDate)) : "",
            id: "trialDate"
        },
        { header: "Giờ Học thử", accessorKey: "trialTime" },
        { header: "Địa điểm Học thử", accessorKey: "trialLocation" },
        { header: "Giáo viên dạy thử", accessorKey: "trialTeacher" },
        {
            header: "Trạng thái Học thử",
            accessorKey: "trialStatus",
            accessorFn: (row) => <DisplayTrialStatus trialStatus={TrialStatus[row.trialStatus] ?? -1} />,
            size: 200
        },
        {
            header: "Nhận xét của GV",
            accessorKey: "teacherComment",
            size: 600
        },
        {
            header: "Ngày đăng ký",
            accessorFn: row => row.registerDate ? utils_date_dateToDDMMYYYString(new Date(row.registerDate)) : "",
            id: "registerDate"
        },
        { header: "Người đăng ký", accessorKey: "registerBy" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã Học thử" },
            { fieldName: "customerCode", header: "Mã KH Tiềm năng" },
            { fieldName: "studentName", header: "Họ và tên HS" },
            { fieldName: "className", header: "Lớp/Buổi Học thử" },
            { fieldName: "trialDate", header: "Ngày Học thử" },
            { fieldName: "trialTime", header: "Giờ Học thử" },
            { fieldName: "trialLocation", header: "Địa điểm Học thử" },
            { fieldName: "trialTeacher", header: "Giáo viên dạy thử" },
            { fieldName: "trialStatus", header: "Trạng thái Học thử" },
            { fieldName: "teacherComment", header: "Nhận xét của GV" },
            { fieldName: "registerDate", header: "Ngày đăng ký" },
            { fieldName: "registerBy", header: "Người đăng ký" },
        ]
    };


    return (
        <MyFieldset title={"Danh sách học thử"}>
            <MyDataTable
                isError={query.isError}
                isLoading={query.isLoading}
                columns={columns}
                data={query.data || []}
                enableRowSelection
                enableColumnFilters
                enableRowNumbers
                renderTopToolbarCustomActions={({ table }) => (
                    <    >
                        <TrialLearningManagementCreateOrUpdate />
                        <AQButtonCreateByImportFile onSubmit={() => { }} form={form} />
                        <AQButtonExportData
                            objectName={"DanhSachHocThu"}
                            data={query.data || []}
                            exportConfig={exportConfig}
                        />
                        <TrialLearningManagementDeleteList
                            values={table
                                .getSelectedRowModel()
                                .flatRows.flatMap((item) => item.original)}
                        />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <TrialLearningManagementCreateOrUpdate data={row.original} />
                        <TrialLearningManagementDelete
                            id={row.original.id}
                            label={row.original.code!}
                        />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    )
}

export interface I_TrialClassTable {
    id: number;
    code: string; // Mã Học thử
    customerCode: string; // Mã KH Tiềm năng
    studentName: string; // Họ và tên HS
    className: string; // Lớp/Buổi Học thử
    sessionName: string; // Buổi Học thử
    trialDate: string; // Ngày Học thử, dạng "dd/MM/yyyy"
    trialTime: string; // Giờ Học thử
    trialLocation: string; // Địa điểm Học thử
    trialTeacher: string; // Giáo viên dạy thử
    trialStatus: string; // Trạng thái Học thử
    teacherComment: string; // Nhận xét của GV
    registerDate: string; // Ngày đăng ký
    registerBy: string; // Người đăng ký
}

export const trialClassMockData: I_TrialClassTable[] = [
    {
        id: 1,
        code: "HT001",
        customerCode: "KHTN005",
        studentName: "Lê Thị E",
        className: "Starters A - Buổi 1",
        sessionName: "Buổi 1",
        trialDate: "2025-07-15",
        trialTime: "09:00",
        trialLocation: "CS1 - Phòng 103",
        trialTeacher: "Cô Lan Anh",
        trialStatus: "Đã tham gia",
        teacherComment: "Học sinh khá năng động; nhưng cần cải thiện ngữ pháp và từ vựng.",
        registerDate: "2025-07-10",
        registerBy: "Nguyễn Thị C (TVV)"
    },
    {
        id: 2,
        code: "HT002",
        customerCode: "KHTN007",
        studentName: "Trần Văn F",
        className: "Lớp Giao tiếp cơ bản - Tối T3/5",
        sessionName: "Buổi 1",
        trialDate: "2025-07-17",
        trialTime: "18:30",
        trialLocation: "CS2 - Phòng 201",
        trialTeacher: "Thầy Minh",
        trialStatus: "Đã đăng ký",
        teacherComment: "",
        registerDate: "2025-07-14",
        registerBy: "Lê Văn D (TVV)"
    },
    {
        id: 3,
        code: "HT003",
        customerCode: "KHTN008",
        studentName: "Nguyễn Thị H",
        className: "Flyers B - Buổi sáng T7",
        sessionName: "Buổi sáng T7",
        trialDate: "2025-07-19",
        trialTime: "09:30",
        trialLocation: "CS1 - Phòng 102",
        trialTeacher: "Cô Anh Thư",
        trialStatus: "Đã hủy",
        teacherComment: "",
        registerDate: "2025-07-16",
        registerBy: "Nguyễn Thị C (TVV)"
    },
    {
        id: 4,
        code: "HT004",
        customerCode: "KHTN009",
        studentName: "Phạm Gia K",
        className: "IELTS Foundation - Buổi 1",
        sessionName: "Buổi 1",
        trialDate: "2025-07-22",
        trialTime: "19:00",
        trialLocation: "CS2 - Online Room 1",
        trialTeacher: "Cô Thu Hà",
        trialStatus: "Không tham gia",
        teacherComment: "HS không tham gia buổi học thử; không thông báo trước.",
        registerDate: "2025-07-18",
        registerBy: "Lê Văn D (TVV)"
    },
];
