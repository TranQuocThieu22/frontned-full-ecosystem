import { menuDataObject } from "@aq-fe/core-ui/shared/consts/object/menuDataObject";
import { IconBuildingBank, IconChecklist, IconDeviceCctv, IconSpeakerphone } from "@tabler/icons-react";
import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const adminMenuData: I_BasicAppShell_LinkItem[] = [
    { pageId: 200, name: "Dashboard", label: "Dashboard", link: "dashboard" },
    menuDataObject.managementSystem(),
    menuDataObject.documentManagement(),
    {
        icon: <IconBuildingBank />,
        label: "Quản lý Ngân hàng câu hỏi",
        name: "Question bank",
        links: [
            { label: "Danh mục câu hỏi", link: "questionCatalog" },
            { label: "Kiểm duyệt câu hỏi", link: "questionReview", status: "Prototype" },
            { label: "Lịch sử câu hỏi", link: "questionHistory", status: "Prototype" },
        ],
    },
    {
        icon: <IconSpeakerphone />,
        label: "Quản lý kỳ thi",
        name: "Exam Management",
        links: [
            { label: "Danh sách nhóm học", link: "courseSections", status: 'Prototype' },
            { label: "Danh sách kỳ thi", link: "ExamList" },
            { label: "Danh sách thí sinh", link: "candidateList" },
            { label: "Danh sách đề thi", link: "examPaper", status: "Prototype" },
        ],
    },
    {
        icon: <IconDeviceCctv />,
        label: "Tổ chức và giám sát thi",
        name: "Exam Organization And Supervision",
        links: [
            { label: "Cấu hình thi", link: "examConfiguration", status: "Prototype" },
            { label: "Danh sách ca thi", link: "ExamSectionTable" },
            { label: "Phân công phụ trách ca thi", link: "examShiftAssignment", },
            { label: "Gán đề thi", link: "examAssignment", status: "Prototype" },
            { label: "Giám sát phòng thi", link: "examRoomSupervision", status: "Prototype" },
        ],
    },
    {
        icon: <IconChecklist />,
        label: "Chấm điểm",
        name: "Student Mark",
        links: [
            { label: "Phân công giám khảo", link: "examinerAssignment", status: "Prototype" }, // CHƯA LÀM TRONG SPRINT NÀY
            { label: "Chấm bài", link: "examGrading", status: "Prototype" },
        ],
    },
    menuDataObject.systemCatalog([
        { label: "Danh mục môn học", link: "subjectCatalog" },
        { label: "Danh mục Chương/ chủ đề", link: "topicCatalog" },
        { label: "Danh mục thang đo độ khó", link: "difficultyCatalog" },
        { label: "Danh mục thang đo đánh giá", link: "evaluationCatalog", },
        { label: "Danh mục mức độ nhận thức", link: "cognitionCatalog" },
        { label: "Danh mục rubric", link: "rubricCatalog" },
        { label: "Danh mục năm học", link: "academicYearList" },
        { label: "Danh mục năm học học kỳ", status: "Prototype" },
        { label: "Danh mục chuẩn đầu ra môn học", link: "cloCatalog" },
    ]),
    // {
    //     label: "Danh mục hệ thống",
    //     name: "System Catalog",
    //     links: [
    //         { name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
    //         { name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig", status: "Default" },
    //         { name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContentConfig" },
    //         { name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },

    //         { label: "Danh mục bộ đếm", link: "catalog/CodeFormula" },
    //         { label: "Danh mục môn học", link: "catalog/subject" },
    //         { label: "Danh mục Chương/ chủ đề", link: "catalog/topic" },
    //         { label: "Danh mục thang đo độ khó", link: "catalog/difficulty" },
    //         { label: "Danh mục thang đo đánh giá", link: "catalog/Evaluation", },
    //         { label: "Danh mục mức độ nhận thức", link: "catalog/Cognition" },
    //         { label: "Danh mục rubric", link: "catalog/rubric" },
    //         { label: "Danh mục chuẩn đầu ra môn học", link: "catalog/cloCatalog" },
    //         { label: "Danh mục Page Content", link: "catalog/pageContent", status: "Prototype" },
    //         { label: "Danh mục năm học", link: "catalog/academicYears", status: "Prototype" },
    //         { label: "Danh mục năm học học kỳ", link: "catalog/academicYearSemesters", status: "Prototype" },
    //     ]
    // }
];





