import { AppPage } from "../enum/app-page.enum";
import { menuData } from "./menuData";

export const allMenuData = [
    ...menuData,
    // { pageId: AppPage.CurriculumpPredefinedDataMenuList, label: "Định nghĩa dữ liệu CTĐT", link: "/" },
    // { pageId: AppPage.LOMSystemDataMenuList, label: "Danh mục hệ thống", link: "/" },
    {
        label: "Định nghĩa dữ liệu CTĐT",
        links: [
            { pageId: AppPage.EducationLevelData, name: '', label: "Danh mục bậc đào tạo", link: "/education-level" },
            { pageId: AppPage.EducationFormatData, name: '', label: "Danh mục hệ đào tạo", link: "/education-format" },
            { pageId: AppPage.ProgramFormatData, name: '', label: "Danh mục bậc hệ đào tạo", link: "/program-format" },
            { pageId: AppPage.ProgramData, name: '', label: "Danh mục chương trình (ngành)", link: "/program" },
            { pageId: AppPage.EducationRegulationData, name: '', label: "Danh mục quy chế/thông tư", link: "/governing/education-regulation" },
            { pageId: AppPage.SubjectGroupData, name: '', label: "Danh mục nhóm môn học", link: "/subject-group" },
            { pageId: AppPage.SubjectData, name: '', label: "Danh mục môn học", link: "/subject" },
            { pageId: AppPage.EnrollmentBatchData, name: '', label: "Danh mục khóa đào tạo", link: "/enrollment-batch" },
        ]
    },
    //other menu items (currently grouped in menu "Danh mục hệ thống")
    {
        label: "Danh mục hệ thống",
        links: [
            { pageId: 100001, name: '', label: "Danh mục loại văn bản", link: "/document-categories" },
            { pageId: 100008, name: '', label: "Danh mục cấu hình mail server", link: "/mail-config" },
            { pageId: 100007, name: '', label: "Danh mục năm học", link: "/academic-year" },
            { pageId: 100012, name: '', label: "Danh mục năm học học kỳ", link: "/semester" },
            { pageId: 100006, name: '', label: "Danh mục đơn vị", link: "/department" },
            { pageId: AppPage.MITRatingSchemeData, name: '', label: "Danh mục thang đo MIT", link: "/mit-rating-scheme" },
            { pageId: AppPage.RubricsData, name: '', label: "Danh mục thang đo Rubrics", link: "/rubrics" },
            { pageId: AppPage.PLORankingSystemData, name: '', label: "Danh mục bảng xếp loại PLO", link: "/f0oia066vb" },
            { pageId: AppPage.StaffData, name: '', label: "Danh mục nhân sự", link: "/staff" }
        ]
    }
]