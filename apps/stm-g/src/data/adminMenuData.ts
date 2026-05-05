import { menuData } from "@aq-fe/core-ui/shared/consts/menuData/menuData";
import { menuDataObject } from "@aq-fe/core-ui/shared/consts/object/menuDataObject";
import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const adminMenuData: I_BasicAppShell_LinkItem[] = [
    { pageId: 200, name: "Dashboard", label: "Dashboard", link: "dashboard" },
    // { pageId: 200, label: "Dashboard", link: "tx16lwup53", name: "Dashboard" },
    //kenh-phan-hoi/thuc-hien-cham-soc-khach-hang
    menuDataObject.managementSystem(),
    menuDataObject.documentManagement(),
    {
        label: "[ME] Tuyển sinh & Quản lý Khách hàng tiềm năng",
        links: [
            { pageId: 10, name: "List of potential customers", label: "[ME] Danh sách Khách hàng tiềm năng", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/danh-sach-khach-hang-tiem-nang", status: "Prototype" },
            {
                pageId: 11, name: "", label: "[ME] Quản lý lịch Test đầu vào", links: [
                    { pageId: 12, name: "", label: "[ME] Hẹn lịch test", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/quan-ly-lich-test-dau-vao/hen-lich-test", status: "Prototype" },
                    { pageId: 13, name: "", label: "[ME] Đánh giá kết quả Test đầu vào", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/quan-ly-lich-test-dau-vao/danh-gia-ket-qua-test", status: "Prototype" },
                ]
            },
            {
                pageId: 14, name: "Track and Nurture Potential Leads (Basic CRM)", label: "[ME] Theo dõi & Chăm sóc tiềm năng", links: [
                    { pageId: 15, name: "Interaction Logbook", label: "[ME] Nhật ký tương tác", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/theo-doi-&-cham-soc-tiem-nang/nhat-ky-tuong-tac", status: "Prototype" },
                    { pageId: 16, name: "Manage Trial Learning Sessions", label: "[ME] Quản lý Học thử", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/theo-doi-&-cham-soc-tiem-nang/quan-ly-hoc-thu", status: "Prototype" },
                ]
            },
            {
                label: "Chương trình học",
                name: "Study Programs",
                links: [
                    { pageId: 1000, label: "[ME] Quản lý cấp độ", name: "Level Management", link: "chuong-trinh-hoc/quan-ly-cap-do", status: "Prototype" },
                ]
            },
            {
                label: "Chính sách học phí",
                links: [
                    { pageId: 1000, label: "[ME] Khai báo đơn giá", name: "[ME] Tuition Policy", link: "chinh-sach-hoc-phi/khai-bao-don-gia", status: "Prototype" }
                ]
            },

            {
                label: "Tổ chức lớp học và xếp lịch học",
                name: "Class Scheduling",
                links: [
                    { pageId: 815, label: "[ME] Gán Giáo viên chủ nhiệm", name: "View Classes", link: "assignHomeroomTeacher", status: 'Prototype' },
                    { pageId: 815, label: "[ME] Gán Trợ giảng phụ trách lớp", name: "View Classes", link: "assignTeachingAssistant", status: 'Prototype' },
                ]
            },
            {
                label: "Giám sát học tập",
                name: "Study Supervision",
                links: [
                    { pageId: 8352, label: "[ME] Bù nghỉ phép", name: "Leave Compensation", link: "giam-sat-hoc-tap/bu-nghi-phep", status: "Prototype" },
                    { pageId: 825, label: "[ME] Tìm Giáo viên rảnh ca/trình độ", link: "findAvailableTeachers", status: "Prototype" },
                    { pageId: 8351, label: "[ME] Theo dõi trạng thái sử dụng phòng tại cơ sở", name: "", link: "giam-sat-hoc-tap/theo-doi-trang-thai-su-dung-phong-tai-co-so", status: "Prototype" },
                    { pageId: 825, label: "[ME] Tìm phòng rảnh theo yêu cầu", name: "Complete Teaching", link: "searchFreeRooms", status: 'Prototype' },
                ]
            },
            {
                label: "Trợ giảng",
                name: "Teaching Assistant",
                links: [
                    { pageId: 0, label: "[ME] Tiếp nhận nghỉ phép", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/tiep-nhan-nghi-phep", status: "Prototype" },
                    { pageId: 8250, label: "[ME] Điểm danh buổi học", name: "[ME] Class attendance check", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/diem-danh-buoi-hoc", status: 'Prototype' },
                    { pageId: 8250, label: "[ME] Nhập điểm buổi học", name: "[ME] Enter Class Scores", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/nhap-diem-buoi-hoc", status: 'Prototype' },
                    { pageId: 835111, label: "[ME] Nhận xét buổi học", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/nhan-xet-buoi-hoc", status: "Prototype" },
                    { pageId: 8111, label: "[ME] Nhập điểm kiểm tra tháng", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/nhap-diem-kiem-tra-thang", status: "Prototype" },
                    { pageId: 81131, label: "[ME] Nhận xét tháng", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/nhan-xet-thang", status: "Prototype" },
                    { pageId: 835112, label: "[ME] Giáo viên góp ý nhận xét tháng", name: "Monthly teacher feedback", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/giao-vien-gop-y-nhan-xet-thang", status: "Prototype" },
                    { pageId: 8250, label: "[ME] Tổng hợp kết quả học tập tháng", name: "[ME] Enter Class Scores", link: "monthlyAcademicReport", status: 'Prototype' },
                    { pageId: 10, label: "[ME] Gửi nhận xét tháng cho phụ huynh", name: "Send Monthly Feedback to Parents", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/gui-nhan-xet-thang-cho-phu-huynh", status: "Prototype" },
                    { pageId: 835112, label: "[ME] Phát Ticker Quý", name: "Distribute Ticker", link: "distributeTicker", status: "Prototype" },
                    { pageId: 10, label: "[ME] Xem chi tiết khen thưởng lớp", name: "View class reward details", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/xem-chi-tiet-khen-thuong-lop", status: "Prototype" },
                    { pageId: 10, label: "[ME] Lịch sử thay đổi điểm", name: "Point change history", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/lich-su-thay-doi-diem", status: "Prototype" },
                    { pageId: 10, label: "[ME] Nhập điểm kiểm tra quý", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/nhap-diem-kiem-tra-quy", status: "Prototype" },
                    { pageId: 10, label: "[ME] Nhập điểm trên trường (giữa kỳ & học kỳ)", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/tro-giang/nhap-diem-tren-truong", status: "Prototype" },
                ]
            },
            {
                label: "Quản lý chất lượng",
                name: "Quality Management",
                links: [
                    { pageId: 835111, label: "[ME] Công thức gán mức độ học sinh", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/quan-ly-chat-luong/cong-thuc-gan-muc-do-hoc-sinh", status: "Prototype" },
                    { pageId: 835112, label: "[ME] Duyệt nhận xét buổi học", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/quan-ly-chat-luong/duyet-nhan-xet-buoi-hoc", status: "Prototype" },
                    { pageId: 835112, label: "[ME] Duyệt nghỉ phép", name: "Approve leave", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/quan-ly-chat-luong/duyet-nghi-phep", status: "Prototype" },
                    { pageId: 835112, label: "[ME] Duyệt nhận xét tháng", name: "", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/quan-ly-chat-luong/duyet-nhan-xet-thang", status: "Prototype" },
                ]
            },
            {
                pageId: 20, name: "", label: "[Cải tiến] Kênh phản hồi", links: [
                    { pageId: 112, name: "Customer Care Assignment", label: "[ME] Phân công chăm sóc khách hàng", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/kenh-phan-hoi/phan-cong-cham-soc-khach-hang", status: "Prototype" },
                    { pageId: 111, name: "Customer Care Execution", label: "[ME] Thực hiện chăm sóc khách hàng", link: "tuyen-sinh-&-quan-ly-khach-hang-tiem-nang/kenh-phan-hoi/thuc-hien-cham-soc-khach-hang", status: "Prototype" },

                ]
            },
        ],
    },
    //todo
    {
        label: "[Mới] Khen thưởng & Quà tặng",
        name: "Rewards & Gifts",
        links: [
            { pageId: 83500, label: "[ME] Kho Ticker", name: "", link: "khen-thuong-&-qua-tang/kho-ticker", status: "Prototype" },
            { pageId: 8351, label: "[ME] Phát Ticker", name: "", link: "khen-thuong-&-qua-tang/phat-ticker", status: "Prototype" },
            { pageId: 83512, label: "[ME] Theo dõi Ticker lưu hành", name: "", link: "khen-thuong-&-qua-tang/theo-doi-ticker-luu-hanh", status: "Prototype" },
            { pageId: 1, label: "[ME] Danh mục quà tặng", name: "Gift Catalog", link: "khen-thuong-&-qua-tang/danh-muc-qua-tang", status: "Prototype" },
            { label: "[ME] Kho quà tặng", name: "Gift Inventory", link: "khen-thuong-&-qua-tang/kho-qua-tang", status: "Prototype" },
            { pageId: 83513, label: "[ME] Đổi quà", name: "", link: "khen-thuong-&-qua-tang/doi-qua", status: "Prototype" },
        ]
    },
    {
        label: "Danh mục hệ thống",
        name: "System Catalog",
        links: [
            { name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
            { name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig", status: "Default" },
            { name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContentConfig" },
            { name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },
            { name: "", label: "Mẫu Mail thông báo tự động", link: "emailTemplates", status: "Prototype" },
            { pageId: 841, label: "Danh mục chi nhánh", name: "Branch List", link: "branchCatalog" },
            { pageId: 842, label: "Danh mục tính chất phòng", name: "Room Types", link: "roomTypeList" },
            { pageId: 843, label: "Danh mục phòng học", name: "Classrooms", link: "classroomList" },
            { pageId: 845, label: "Danh mục loại thời gian", name: "Time Types", link: "timeType" },
            { pageId: 846, label: "Danh mục cụm thời gian học", name: "Time Clusters", link: "timeClusterList" },
            { pageId: 847, label: "Danh mục ngày nghỉ lễ", name: "Holidays", link: "holidayList", },
            { pageId: 848, label: "Cấu hình thông số xếp lịch học", name: "Schedule Config", link: "scheduleConfig" },
            { pageId: 849, label: "Danh mục bộ đếm", name: "Counters", link: "counters", status: "Prototype" },
        ]
    }
];





