export interface ScheduleEntry {
    id: number;
    moduleCode: string;
    classCode: string;
    className: string;
    schoolYear: string;
    notes: string;
    assigner: string;
    assignmentDate: string;
    teacher: {
        id: number;
        code: string;
        name: string;
    };
}

const mockTeachers = [
    { id: 5, code: "GV005", name: "Nguyễn Thị B" },
    { id: 12, code: "GV012", name: "Trần Văn C" },
    { id: 20, code: "GV020", name: "Phạm Thị D" },
    { id: 23, code: "GV023", name: "Hoàng Văn E" },
    { id: 17, code: "GV017", name: "Ngô Thị H" },
    { id: 30, code: "GV030", name: "Đặng Minh T" },
    { id: 10, code: "GV010", name: "Trịnh Thị I" },
    { id: 27, code: "GV027", name: "Bùi Mạnh K" },
    { id: 8, code: "GV008", name: "Nguyễn Thị L" },
    { id: 999, code: "GV999", name: "Ngẫu nhiên" }, // fallback
];

const rawSchedule = [
    {
        id: 1,
        moduleCode: "PCBVCN001",
        classCode: "7A1",
        className: "Toán 7A1",
        schoolYear: "2024-2025",
        teacherId: "GV005",
        teacherName: "Nguyễn Thị B",
        notes: "Phân công chính thức cho năm học mới",
        assigner: "QLDT001 (Nguyễn Minh Hà)",
        assignmentDate: "20/08/2024",
    },
    {
        id: 2,
        moduleCode: "PCBVCN002",
        classCode: "7B2",
        className: "Tiếng Anh 7B2",
        schoolYear: "2024-2025",
        teacherId: "GV012",
        teacherName: "Trần Văn C",
        notes: "Phân công chính thức cho năm học mới",
        assigner: "QLDT001 (Nguyễn Minh Hà)",
        assignmentDate: "20/08/2024",
    },
    {
        id: 3,
        moduleCode: "PCBVCN003",
        classCode: "7A1",
        className: "Toán 7A1",
        schoolYear: "2025-2026",
        teacherId: "GV005",
        teacherName: "Nguyễn Thị B",
        notes: "Phân công lại GV cũ cho năm học mới",
        assigner: "QLDT001 (Nguyễn Minh Hà)",
        assignmentDate: "15/08/2025",
    },
    {
        id: 4,
        moduleCode: "PCBVCN004",
        classCode: "7C1",
        className: "Rèn chữ 7C1",
        schoolYear: "2024-2025",
        teacherId: "GV020",
        teacherName: "Phạm Thị D",
        notes: "GVCN tạm thời do GV cũ nghỉ phép, GVCN chính thức nhận lại là 16/03/2025",
        assigner: "QLDT002 (Lê Văn Tùng)",
        assignmentDate: "25/08/2024",
    },
];

// 👇 Final mapped list with default teacher injection
export const initialScheduleData: ScheduleEntry[] = rawSchedule.map((entry, idx) => {
    const teacherFromId =
        entry.teacherId &&
        mockTeachers.find(t => t.code === entry.teacherId);

    const fallbackTeacher = mockTeachers[idx] ?? mockTeachers.at(-1)!;

    return {
        ...entry,
        teacher: teacherFromId || fallbackTeacher,
    };
});
