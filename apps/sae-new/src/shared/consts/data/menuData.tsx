import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
import { menuDataObject } from "@aq-fe/core-ui/shared/consts/object/menuDataObject";
import { IconAd2, IconContract, IconUserScreen } from "@tabler/icons-react";
export const menuData: I_BasicAppShell_LinkItem[] = [
    menuDataObject.managementSystem(),
    menuDataObject.documentManagement(),
    {
        label: "Hồ sơ năng lực khoa học",
        icon: <IconUserScreen />,
        links: [
            { pageId: 8002, name: "lecturer profile", label: "Hồ sơ năng lực Giảng viên – Chuyên viên", link: "lecturerProfile", status: "Prototype" },
        ]
    },
    {
        label: "Quản lý hoạt động nghiên cứu khoa học của giảng viên",
        icon: <IconContract size={20} />,
        links: [
            {
                label: "Đề xuất nhiệm vụ khoa học", links: [
                    { pageId: 8004, name: "taskProposalNotice", label: "Thông báo đề xuất nhiệm vụ khoa học", link: "taskProposalNotice" },
                    { pageId: 8005, name: "submitProposal", label: "Nộp đề xuất nhiệm vụ khoa học", link: "submitProposal" },
                    { pageId: 8006, name: "proposalCheck", label: "Kiểm tra sơ bộ đề xuất nhiệm vụ khoa học", link: "proposalCheck" },
                    { pageId: 8007, name: "scientificTaskProposal", label: "Tổng hợp danh sách đề xuất nhiệm vụ khoa học", link: "scientificTaskProposal" }
                ]
            },
            {
                label: "Xác định danh mục nhiệm vụ khoa học", links: [
                    { pageId: 8008, name: "reviewCommitteeSetup", label: "Thành lập hội đồng tư vấn xác định danh mục", link: "reviewCommitteeSetup" },
                    { pageId: 8009, name: "Council Meeting", label: "Họp hội đồng tư vấn xác định danh mục", link: "reviewCommitteeMeetting" },
                    { pageId: 8010, name: "researchCallNotice", label: "Thông báo tuyển chọn nhiệm vụ khoa học", link: "researchCallNotice" },
                ]
            },
            {
                label: "Đăng ký hồ sơ tuyển chọn nhiệm vụ khoa học", links: [
                    { pageId: 8011, name: "submitRegistration", label: "Nộp hồ sơ đăng ký tuyển chọn", link: "submitRegistration" },
                    { pageId: 8012, name: "applicantRegistrationReview", label: "Kiểm tra hồ sơ đăng ký tuyển chọn", link: "applicantRegistrationReview" },
                ]
            },
            {
                label: "Tuyển chọn nhiệm vụ khoa học", links: [
                    { pageId: 8013, name: "advisoryCreate", label: "Thành lập hội đồng tư vấn tuyển chọn", link: "advisoryCreate" },
                    { pageId: 8014, name: "councilMeeting", label: "Họp hội đồng tư vấn tuyển chọn nhiệm vụ", link: "councilMeeting" },
                    { pageId: 8015, name: "Selection Result", label: "Thông báo kết quả tuyển chọn", link: "selectionResult" },
                ]
            },
            {
                label: "Thẩm định kinh phí", links: [
                    { pageId: 8016, name: "costReviewSetup", label: "Thành lập tổ thẩm định kinh phí", link: "costReviewSetup", },
                    { pageId: 8017, name: "costReviewMeeting", label: "Họp tổ thẩm định kinh phí", link: "costReviewMeeting" },
                ]
            },
            {
                label: "Phê duyệt kết quả và ký hợp đồng", links: [
                    { pageId: 8018, name: "submitMissionReport", label: "Nộp thuyết minh nhiệm vụ", link: "submitMissionReport" },
                    { pageId: 8019, name: "presentationApproval", label: "Phê duyệt thuyết minh", link: "presentationApproval" },
                    // NOTE: 55289 Cắt 2 menu hoàn thiện và kiểm tra hoàn thiện thuyết minh
                    // { pageId: 8020, name: "finalizeReport", label: "Hoàn thiện thuyết minh", link: "finalizeReport" },
                    // { pageId: 8021, name: "reviewCompleteTopic", label: "Kiểm tra hoàn thiện thuyết minh", link: "reviewCompleteTopic" },
                    { pageId: 8022, name: "executeContract", label: "Ký hợp đồng", link: "executeContract" },
                ]
            },
            {
                label: "Giám sát thực hiện đề tài", links: [
                    { pageId: 8023, name: "topicList", label: "Danh sách đề tài nghiên cứu khoa học", link: "topicList" },
                    { pageId: 8024, name: "reminderCreate", label: "Tạo báo cáo nhắc nhở định kỳ", link: "reminderCreate" },
                    { pageId: 8025, name: "progressReport", label: "Báo cáo tiến độ định kỳ", link: "progressReport" },
                    { pageId: 8026, name: "progressCheck", label: "Kiểm tra tiến độ định kỳ", link: "progressCheck" },
                    { pageId: 8027, name: "adjustRequest", label: "Yêu cầu điều chỉnh thông tin đề tài", link: "adjustRequest" },
                    { pageId: 8028, name: "adjustHandle", label: "Xử lý yêu cầu điều chỉnh thông tin đề tài", link: "topicAdjustmentProcess" },
                    { pageId: 8029, name: "stopRequest", label: "Yêu cầu dừng thực hiện đề tài", link: "stopRequest" },
                    { pageId: 8030, name: "stopHandle", label: "Xử lý yêu cầu dừng thực hiện đề tài", link: "stopHandle" },
                    { pageId: 8031, name: "finalReport", label: "Báo cáo tổng kết đề tài", link: "finalReport" },
                ]
            },
            {
                label: "Nghiệm thu và thanh lý", links: [
                    {
                        label: "Nghiệm thu cấp Khoa", links: [
                            { pageId: 8032, name: "facultyCouncilSetup", label: "Thành lập hội đồng cấp Khoa", link: "facultyCouncilSetup" },
                            { pageId: 8033, name: "Faculty Council Meeting", label: "Họp hội đồng cấp Khoa", link: "facultyCouncilMeeting" },
                        ]
                    },
                    {
                        label: "Nghiệm thu cấp Trường", links: [
                            { pageId: 8034, name: "schoolCouncilSetUp", label: "Thành lập hội đồng cấp Trường", link: "schoolCouncilSetup" },
                            { pageId: 8035, name: "schoolCouncilMeeting", label: "Họp hội đồng cấp Trường", link: "schoolCouncilMeeting" },
                        ]
                    },
                    { pageId: 8036, name: "liquidationMinutes", label: "Biên bản thanh lý đề tài", link: "liquidationMinutes" }
                ]
            },
            {
                label: "Báo cáo thống kê",
                links: [
                    { pageId: 8037, name: "Proposal List", label: "Liệt kê đề xuất nhiệm vụ", link: "proposalList" },
                    { pageId: 8038, name: "Cost List", label: "Liệt kê kinh phí thực hiện nhiệm vụ", link: "costList" },
                    { pageId: 8039, name: "Staff List", label: "Liệt kê viên chức thực hiện nhiệm vụ", link: "staffList" },
                ]
            },
        ],
    },
    // {
    //     label: "Quản lý hoạt động nghiên cứu khoa học của sinh viên",
    //     icon: <IconUserHeart />,
    //     links: [
    //         {
    //             label: "Đề xuất nhiệm vụ khoa học",
    //             links: [
    //                 { pageId: 8061, name: "Task Proposal Notice Student", label: "Thông báo đề xuất nhiệm vụ", link: "taskProposalNoticeStudent" },
    //                 { pageId: 8062, name: "Submit Student Proposal", label: "Nộp đề xuất nhiệm vụ sinh viên nghiên cứu khoa học", link: "submitStudentProposal" },
    //                 { pageId: 8063, name: "Check Student Proposal", label: "Kiểm tra sơ bộ đề xuất sinh viên NCKH", link: "checkStudentProposal" },
    //                 { pageId: 8064, name: "Summary of student research proposals", label: "Tổng hợp đề xuất sinh viên nghiên cứu khoa học", link: "summaryOfResearchProposals" },
    //                 { pageId: 8065, name: "Approval of list of proposed topics", label: "Phê duyệt danh mục đề xuất đề tài sinh viên NCKH", link: "reviewStudentProposal" }
    //             ]
    //         },
    //         {
    //             label: "Cấu hình quản lý khoa học sinh viên",
    //             links: [
    //                 { pageId: 8058, name: "studentTopicRoleList", label: "Danh mục vai trò thực hiện đề tài sinh viên", link: "studentTopicRoleList" },
    //                 { pageId: 8059, name: "SRMAwardLevel", label: "Danh mục Cấp Giải thưởng NCKH Sinh viên", link: "SRMAwardLevel" },
    //                 { pageId: 8060, name: "awardTypeList", label: "Danh mục loại giải thưởng sinh viên nghiên cứu khoa học", link: "awardTypeList" }
    //             ]
    //         }
    //     ]
    // },
    {
        label: "Quản lý kê khai Công bố khoa học",
        icon: <IconAd2 />,
        links: [
            {
                label: "Cấu hình quản lý công bố",
                links: [
                    { pageId: 8050, name: "Publication group", label: "Danh mục nhóm Công bố", link: "publicationGroup" },
                    { pageId: 8044, name: "publicationTypeList", label: "Danh mục loại Công bố", link: "publicationTypeList" },
                    { pageId: 8051, name: "", label: "Danh mục Tạp chí/Hội thảo/NXB", link: "journalList" },
                ]
            },
            {
                label: "Kê khai Công bố Khoa học",
                links: [
                    { pageId: 8052, name: "declareNewPublication", label: "Kê khai Công bố mới", link: 'declareNewPublication' },
                ]
            },
            {
                label: "Xác minh & Ghi nhận giờ NCKH",
                links: [
                    { pageId: 8053, name: "", label: "Danh sách công bố", link: "publicationList" },
                    { pageId: 8054, name: "", label: "Kiểm tra và Phê duyệt kê khai công bố", link: "publicationReview" },
                    { pageId: 8055, name: "", label: "Tính và Khóa giờ Công bố Khoa học", link: "publishTimeLockCalculate" },
                ]
            },
            {
                label: "Báo cáo & Thống kê",
                links: [
                    { pageId: 8056, name: "Publication Hours Report", label: "Báo cáo giờ công bố của giảng viên", link: "publicationHoursReport" },
                    // { pageId: 8057, name: "", label: "Thống kê Công bố Khoa học", status: "Menu" }
                ]
            }
        ]
    },
    menuDataObject.systemCatalog([
        { pageId: 100008, name: "lecturerList", label: "Danh mục viên chức", link: "lecturerList" }, // Chung
        { pageId: 100007, name: "academicYearList", label: "Danh mục năm học", link: "academicYearList" }, // Chung
        { pageId: 100006, name: "departmentList", label: "Danh mục đơn vị", link: "departmentList" }, // Chung
        { pageId: 8041, name: "researchAreaList", label: "Danh mục lĩnh vực", link: "researchAreaList" },
        { pageId: 8042, name: "topicLevelList", label: "Danh mục cấp đề tài", link: "topicLevelList" },
        { pageId: 8043, name: "topicTypeList", label: "Danh mục loại đề tài", link: "topicTypeList" },
        { pageId: 8045, name: "topicRoleList", label: "Danh mục vai trò thực hiện đề tài", link: "topicRoleList" },
        { pageId: 8046, name: "publicationRoleList", label: "Danh mục vai trò thực hiện công bố", link: "publicationRoleList" },
        { pageId: 8047, name: "councilRoleList", label: "Danh mục vai trò tham gia hội đồng", link: "councilRoleList" },
        { pageId: 8048, name: "councilConclusionList", label: "Danh mục bộ kết luận hội đồng", link: "councilConclusionList" },
        { pageId: 8049, name: "councilCriteriaList", label: "Danh mục bộ tiêu chí đánh giá hội đồng", link: "councilCriteriaList" },
    ])
];
