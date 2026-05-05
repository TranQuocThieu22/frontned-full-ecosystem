import { IUserDashboardData } from './interfaces/StudentDashBoard';

export const mockStudentData: IUserDashboardData = {
    lecturerReview: {
        lecturerReviews: [
            {
                cLass: "Lập trình Web",
                courseName: "Lập trình Web",
                review: "Sinh viên có tiến bộ tốt trong việc làm bài tập. Cần cố gắng thêm về phần responsive design và tối ưu performance.Hiểu rõ các khái niệm cơ bản về mạng. Cần thực hành nhiều hơn về cấu hình router và switch.",
                lecturer: "Nguyễn Văn A",
                date: new Date("2024-03-15T08:30:00"),
                timeCluster: "Sáng",
                studyDate: "2024-03-15"
            },
            {
                cLass: "Cơ sở dữ liệu",
                courseName: "Cơ sở dữ liệu",
                review: "Thể hiện tốt trong bài thi cuối kỳ. Cần chú ý hơn về việc tối ưu câu truy vấn SQL.",
                lecturer: "Trần Thị B",
                date: new Date("2024-03-14T14:15:00"),
                timeCluster: "Chiều",
                studyDate: "2024-03-14"
            },
            {
                cLass: "Lập trình Mobile",
                courseName: "Lập trình Mobile",
                review: "Có khả năng tư duy tốt trong việc thiết kế UI/UX. Cần rèn luyện thêm về việc xử lý state management.Hiểu rõ các khái niệm cơ bản về mạng. Cần thực hành nhiều hơn về cấu hình router và switch.",
                lecturer: "Lê Văn C",
                date: new Date("2024-03-13T10:45:00"),
                timeCluster: "Sáng",
                studyDate: "2024-03-13"
            },
            {
                cLass: "Mạng máy tính",
                courseName: "Mạng máy tính",
                review: "Hiểu rõ các khái niệm cơ bản về mạng. Cần thực hành nhiều hơn về cấu hình router và switch.Hiểu rõ các khái niệm cơ bản về mạng. Cần thực hành nhiều hơn về cấu hình router và switch.",
                lecturer: "Phạm Thị D",
                date: new Date("2024-03-12T16:20:00"),
                timeCluster: "Chiều",
                studyDate: "2024-03-12"
            }
        ]
    },
    exam: {
        totalCount: 5,
        exams: [
            {
                examName: "Kỳ thi VSTEP năm 2025 lần 1",
                examDate: "2025-06-08T06:00:00",
                result: "Không đạt",
                branchName: "Phòng 101, Cơ sở AQ Quận 1",

            },
            {
                examName: "AQ Quản trị kinh doanh 2025 (Khóa thi)",
                examDate: "2025-04-28T20:00:00",
                result: "Đạt",
                branchName: "Phòng 305, Cơ sở AQ Bình Thạnh",

            },
            {
                examName: "Lập trình Java OOP cuối kỳ",
                examDate: "2025-05-12T09:00:00",
                result: "Đạt",
                branchName: "Phòng 102, AQ Tân Bình",

            },
            {
                examName: "Thi cuối kỳ môn Mạng máy tính",
                examDate: "2025-05-20T13:00:00",
                result: "Không đạt",
                branchName: "Phòng 204, AQ Gò Vấp",

            },
            {
                examName: "Bài thi cuối khóa DevOps và CI/CD",
                examDate: "2025-06-01T08:30:00",
                result: "Đạt",
                branchName: "Phòng Lab Dev, Cơ sở AQ Quận 7",

            }
        ]
    },
    course: {
        courses: [
            {
                courseName: "Lập trình Web",
                branchName: "Trung tâm AQ ",
                attendance: "15/20",
                status: 4,
                result: "Đang học",
                studyDate: new Date("2024-03-15T08:30:00"),
                timeCluster: "Sáng 2 4 6",
                totalPoint: 85
            },
            {
                courseName: "Lập trình Backend",
                branchName: "Trung tâm AQ ",
                attendance: "12/20",
                status: 4,
                result: "Đang học",
                studyDate: new Date("2024-03-14T14:15:00"),
                timeCluster: "Chiều 3 5 7",
                totalPoint: 78
            },
            {
                courseName: "Lập trình Backend",
                branchName: "Trung tâm AQ ",
                attendance: "12/20",
                status: 4,
                result: "Đang học",
                studyDate: new Date("2024-03-14T14:15:00"),
                timeCluster: "Chiều 3 5 7",
                totalPoint: 78
            },
            {
                courseName: "Lập trình Backend",
                branchName: "Trung tâm AQ ",
                attendance: "12/20",
                status: 4,
                result: "Đang học",
                studyDate: new Date("2024-03-14T14:15:00"),
                timeCluster: "Chiều 3 5 7",
                totalPoint: 78
            },
            {
                courseName: "Lập trình Backend",
                branchName: "Trung tâm AQ ",
                attendance: "12/20",
                status: 4,
                result: "Đang học",
                studyDate: new Date("2024-03-14T14:15:00"),
                timeCluster: "Chiều 3 5 7",
                totalPoint: 78
            },
            {
                courseName: "Cơ sở dữ liệu SQL",
                branchName: "Trung tâm AQ ",
                attendance: "18/20",
                status: 2,
                result: "Đang học",
                studyDate: new Date("2024-03-13T10:45:00"),
                timeCluster: "Sáng 2 4 6",
                totalPoint: 92
            },
            {
                courseName: "Lập trình Mobile",
                branchName: "Trung tâm AQ",
                attendance: "10/20",
                status: 2,
                result: "Đang học",
                studyDate: new Date("2024-03-12T16:20:00"),
                timeCluster: "Tối 3 5 7",
                totalPoint: 75
            },
            {
                courseName: "DevOps và CI/CD",
                branchName: "Trung tâm AQ",
                attendance: "8/20",
                status: 2,
                result: "Đang học",
                studyDate: new Date("2024-03-11T09:00:00"),
                timeCluster: "Sáng 2 4 6",
                totalPoint: 88
            }
        ]
    }
}; 