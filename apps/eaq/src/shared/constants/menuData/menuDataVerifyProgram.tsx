import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
import { menuDataObject } from "@aq-fe/core-ui/shared/consts/object/menuDataObject";
import { IconCategory, IconFolders, IconListDetails, IconRepeat, IconShieldCheck } from "@tabler/icons-react";
import { Library, TrendingUp, UserCheck } from "lucide-react";

export const menuDataVerifyProgram: I_BasicAppShell_LinkItem[] = [
    menuDataObject.managementSystem(),
    menuDataObject.documentManagement(),
    {
        icon: <IconFolders />,
        label: "Bộ tiêu chuẩn",
        links: [
            { pageId: 2501, name: "Standard Sets Management", label: "Quản lý Bộ Tiêu chuẩn", link: "standardSets/standardSetsManagement" },
            { pageId: 2502, name: "Standard structure", label: "Cấu hình Tiêu chuẩn, Tiêu chí, Yêu cầu", link: "standardStructure" },
        ],
    },

    {
        icon: <IconListDetails />,
        label: "Chương trình Đào tạo (CTĐT)",
        links: [
            { pageId: 2503, name: "Training Program List", label: "Danh sách Chương trình đào tạo", link: "trainingProgramList" },
            { pageId: 2546, name: "", label: "Chương trình đào tạo kiểm định", link: "standardSetTrainingProgram", status: 'New' },
            { pageId: 2542, name: "Accreditation Phrases", label: "Giai đoạn kiểm định", link: "trainingProgram/phase" },
            { pageId: 2547, name: "", label: "Lộ trình thực hiện báo cáo tự đánh giá", link: "roadmapReport", status: 'New' },
        ],
    },
    {
        icon: <IconShieldCheck />,
        label: "Đảm bảo chất lượng thực hiện CTĐT",
        links: [
            // { pageId: 2548, name: "", label: "Lập kế hoạch đảm bảo chất lượng CTĐT", link: "qualityAssurancePlan", status: "Prototype" },
            { pageId: 2549, name: "", label: "Phân tích công việc và minh chứng thực hiện theo yêu cầu", link: "evidenceAnalysis", status: "New" },
            {
                name: "",
                label: "Lập kế hoạch đảm bảo chất lượng",
                links: [
                    { pageId: 2550, name: "", label: "Lập kế hoạch đảm bảo chất lượng", link: "qualityAssurancePlan", status: 'New' },
                    { pageId: 2551, name: "Assign Justification", label: "Phân công viết giải trình thực hiện đảm bảo chất lượng", link: "assignJustification", status: 'New' },
                ]
            },
            {
                name: "Quality Report",
                label: "Báo cáo thực hiện đảm bảo chất lượng",
                links: [
                    { pageId: 2552, name: "", label: "Chu kỳ Báo cáo thực hiện đảm bảo chất lượng", link: "assuranceReportingCycle", status: 'New' },
                    { pageId: 2553, name: "", label: "Báo cáo thực hiện đảm bảo chất lượng", link: "qualityReport", status: 'New' },
                    { pageId: 2554, name: "Follow up on Quality Assurance Implementation Report", label: "Theo dõi Báo cáo thực hiện đảm bảo chất lượng", link: "qualityAssuranceImplementationReport", status: 'New' },
                    { pageId: 2572, name: "", label: "Phân công tổng hợp giải trình cuối chu kỳ", link: "assignmentSummaryReporting", status: 'New' },
                ]
            },
            { pageId: 2555, name: "", label: "Viết giải trình báo cáo thực hiện ĐBCL cuối chu kỳ", link: "writeJustification", status: 'New' },
            { pageId: 2556, name: "", label: "Theo dõi viết giải trình báo cáo thực hiện ĐBCL cuối chu kỳ", link: "trackingJustification", status: 'New' },
        ],
    },
    {
        icon: <IconRepeat />,
        label: 'Thực hiện Báo cáo Tự đánh giá và đánh giá CTĐT ',
        links: [
            {
                label: "Quản lý Lộ trình Chuẩn bị Kiểm định",
                links: [
                    { pageId: 2512, name: "Establish Committee Form 1", label: "Quản lý Quyết định Thành lập Hội đồng Tự đánh giá CTĐT (Biểu 01)", link: "assessmentsCouncilDecision" },

                    { pageId: 2513, name: "Program self assessment plan proof 02", label: "Quản lý Kế hoạch Tự đánh giá CTĐT (Biểu 02)", link: "programSelfAssessmentPlan02", },
                    { pageId: 2514, name: "Task assignment group by criteria", label: "Nhóm Phân công Nhiệm vụ theo Tiêu chí", link: "taskAssignmentGroupByCriteria", },
                ],
            },
            {
                label: "Tự đánh giá tiêu chí",
                links: [
                    { pageId: 2515, name: "Analysis and processing proof 03", label: "Phân tích và Xử lý Thông tin, Minh chứng (Biểu 03)", link: "selfAssessmentOfCriteria/analysisAndProcessingProof03", },
                    { pageId: 2516, name: "Check criteria analysis", label: "Kiểm tra phân tích tiêu chí", link: "selfAssessmentOfCriteria/checkCriteriaAnalysis" },
                    { pageId: 2517, name: "Evidence List Summary Expected", label: "Tổng hợp danh sách minh chứng dự kiến", link: "evidenceListSummaryExpected" },

                    { pageId: 2544, name: "Existing Evidence Comparison", label: "Đối chiếu minh chứng hiện có", link: "selfAssessmentOfCriteria/existingEvidenceComparison" },
                    { pageId: 2519, name: "Evidence Censorship Collection", label: "Kiểm duyệt Minh chứng thu thập", link: "selfAssessmentOfCriteria/censorshipEvidencesCollection", },
                ],
            },
            {
                label: "Báo cáo Tự đánh giá (Cuối chu kỳ 5 năm)",
                links: [
                    { pageId: 2520, name: "Analysis and processing proof 04", label: "Viết Phiếu Tự đánh giá Tiêu chí (Biểu 04)", link: "selfAssessmentReport/selfAssessmentForm04", },
                    { pageId: 2574, name: "Assign self assessment rev   iewer", label: "Phân công nhận xét phiếu tự đánh giá", link: "selfAssessmentReport/assignSelfAssessmentReviewer", status: "New" },
                    { pageId: 2521, name: "Review Self-Assessment Form", label: "Kiểm tra và nhận xét", link: "selfAssessmentReport/reviewSelfAssessmentForm" },
                    { pageId: 2522, name: "Export Evaluation Criteria Form", label: "Xuất phiếu đánh giá tiêu chí", link: "selfAssessmentReport5Year/exportEvaluationCriteriaForm" },
                ],
            },
            {
                label: "Giám sát Thực hiện Tự đánh giá",
                links: [
                    { pageId: 2524, name: "Tracking Progress Self-Assessment Criteria", label: "Theo dõi Tiến độ Tự đánh giá Tiêu chí", link: "trackingProgressSelfAssessment" },
                ],
            }
        ],
    },
    {
        icon: <UserCheck />,
        label: "Đánh giá ngoài chương trình đào tạo",
        links: [
            { pageId: 2575, name: "External Assessment", label: "Nhận xét của Đoàn đánh giá ngoài", link: "externalAssessment", status: 'New' },
            { pageId: 2525, name: "External Assessment Summary", label: "Tổng hợp nhận xét của Đoàn đánh giá ngoài", link: "externalAssessmentSummary", status: 'New' },
            { pageId: 2557, name: "External Assessment management", label: "Quản lý hồ sơ liên quan đánh giá ngoài", link: "externalAssessmentManagement", status: 'New' },
            { pageId: 2558, name: "", label: "Giấy chứng nhận kiểm định chất lượng", link: "accreditationCertificate", status: 'New' },
        ],
    },
    {
        icon: <TrendingUp />,
        label: "Cải tiến chất lượng sau đánh giá ngoài",
        links: [
            {
                name: "",
                label: "Tổng hợp hạn chế và khuyến nghị",
                links: [
                    { pageId: 2559, name: "", label: "Hạn chế theo tiêu chí từ Báo cáo tự đánh giá", link: "restrictByCriteria", status: 'New' },
                    { pageId: 2560, name: "", label: "Kiến nghị theo tiêu chí của Đoàn đánh giá ngoài", link: "reviewCriteriaRecommendations", status: 'New' },
                    { pageId: 2561, name: "", label: "Khuyến nghị theo tiêu chí của Hội đồng thẩm định chất lượng CTĐT", link: "councilRecommendations", status: 'New' },
                    { pageId: 2562, name: "Summary Improvement", label: "Tổng hợp nội dung cần cải tiến - khắc phục", link: "summaryImprovement", status: 'New' },
                ]
            },
            { pageId: 2563, name: "Job Analysis And Evidence", label: "Phân tích công việc và minh chứng thực hiện theo hạn chế", link: "jobAnalysisAndEvidence", status: 'New' },
            { pageId: 2564, name: "", label: "Kế hoạch cải tiến chất lượng sau đánh giá ngoài", link: "improvementPlanPostExternalReview", status: 'New' },
            { pageId: 2565, name: "", label: "Phân công cải tiến chất lượng sau đánh giá", link: "qualityImprovementActions", status: 'New' },
            {
                // pageId: 2571,
                name: "", label: "Báo cáo cải tiến chất lượng định kỳ", links: [
                    { pageId: 2566, name: "Improvement Reporting Cycle", label: "Chu kỳ báo cáo cải tiến định kỳ", link: "improvementReportingCycle", status: 'New' },
                    { pageId: 2567, name: "Periodic Quality Improvement Report", label: "Báo cáo kết quả cải tiến chất lượng định kỳ", link: "periodicQualityImprovementReport", status: 'New' },
                    { pageId: 2568, name: "", label: "Theo dõi thực hiện báo cáo kết quả cải tiến chất lượng định kỳ", link: "periodicImprovementReport", status: 'New' },
                    { pageId: 2573, name: "Quality Improvement Constraints", label: "Phân công tổng hợp cải tiến chất lượng theo hạn chế", link: "qualityImprovementConstraints", status: 'New' },
                ]
            },
            { pageId: 2569, name: "", label: "Tổng hợp kết quả báo cáo cải tiến chất lượng giữa chu kỳ", link: "summaryMidCycleImprovementResults", status: 'New' },
            { pageId: 2570, name: "", label: "Theo dõi thực hiện Báo cáo kết quả cải tiến chất lượng giữa chu kỳ", link: "trackingMidCycleImprovementReport", status: 'New' },
        ],
    },
    {
        icon: <Library />,
        label: "Kho minh chứng",
        links: [
            { pageId: 2541, name: "Evidence Management", label: "Quản lý minh chứng", link: "evidenceManagement" },
        ],
    },
    {
        icon: <IconCategory />,
        label: "Cấu hình hệ thống",
        links: [

            { pageId: 100001, name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
            { pageId: 100011, name: "Code config", label: "Danh mục bộ đếm", link: "codeFormula" },
            { pageId: 100002, name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig" },
            { pageId: 100010, name: "Mail template", label: "Mẫu mail thông báo", link: "mailTemplate" },
            { pageId: 100003, name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContent" },
            { pageId: 100004, name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },


            { pageId: 100006, name: "Unit list", label: "Danh mục đơn vị", link: "unitList" },
            { pageId: 2545, name: "List of council roles", label: "Danh mục vai trò trong hội đồng", link: "ruleList" },
            // { label: "Danh mục hệ thống", link: "menu/system" },
        ],
    },

];
