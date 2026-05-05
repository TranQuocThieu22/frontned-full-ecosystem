import Usecase_TeacherTable, { TeacherDomain } from "../usecase/Usecase_TeacherTable";


export default function Teacher_AvailableTeacherTable() {
    // const isProrotype = process.env.NEXT_PUBLIC_APP_PROTOTYPE == "1"
    return (
        <Usecase_TeacherTable
            visibleColumns={[
                "teacherCode",
                "teacherName",
                "educationLevel",
                "gender",
                "branchsCanTeach",
                "programsCanTeach",
                "skills"
            ]}
            data={mockTeacherData}
        />
    )
}



const mockTeacherData: TeacherDomain[] = [
    {
        id: 1,
        teacherCode: "GV0001",
        teacherName: "Nguyễn Văn A",
        educationLevel: "Thạc sỹ",
        gender: 1,
        branchsCanTeach: ["Thủ Đức", "Bình Thạnh"],
        programsCanTeach: ["Lập trình web", "Lập trình cơ sở dữ liệu"],
        skills: ["Tin Học"],
    },
    {
        id: 2,
        teacherCode: "GV0002",
        teacherName: "Trần Thị B",
        educationLevel: "Tiến sỹ",
        gender: 2,
        branchsCanTeach: ["Quận 1", "Quận 3"],
        programsCanTeach: ["Giải tích", "Đại số tuyến tính"],
        skills: ["Toán Học", "Lý Thuyết Số"],
    },
    {
        id: 3,
        teacherCode: "GV0009",
        teacherName: "Bùi Mạnh K",
        educationLevel: "Tiến sỹ",
        gender: 1,
        branchsCanTeach: ["Thủ Đức", "Quận 4"],
        programsCanTeach: ["Lịch sử cận đại", "Lịch sử thế giới"],
        skills: ["Lịch Sử", "Lịch Sử Việt Nam"],
    }
]