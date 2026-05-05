import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const menuData: I_BasicAppShell_LinkItem[] = [
  // {
  //   label: "Dashboard",
  //   link: "dashboard"
  // },
  {
    label: "Quản lí hệ thống",
    links: [
      { pageId: 1, name: "Account management", label: "Quản lí tài khoản", link: "accountManagement" },
      { pageId: 2, name: "Access control level", label: "Phân quyền cấp đơn vị", link: "accessControlLevel" },
      { pageId: 3, name: "Access control", label: "Phân quyền sử dụng", link: "accessControl" },
      { pageId: 4, name: "Security regulations", label: "Quy định an toàn/ bảo mật thông tin", link: "securityPolicyDocs" },
      { pageId: 5, name: "System updates", label: "Thông tin xây dựng, cải tiến, bảo trì hệ thống", link: "systemUpdateDocs" },
      { pageId: 6, name: "User guide", label: "Tài liệu hướng dẫn sử dụng", link: "userGuideDocs" },
    ],
  },
  {
    label: "Văn bản - Quy định",
    links: [
      { pageId: 7, name: "Organizational regulations", label: "Văn bản - Quy định tổ chức", link: "core26965" },
      { pageId: 8, name: "Workflow process", label: "Quy trình xử lý công việc", link: "core27311" },
      { pageId: 9, name: "Form templates", label: "Tài liệu biểu mẫu", link: "core12196" },
    ],
  },
  {
    label: "Quản lý Xuất bản & Biên soạn",
    links: [
      {
        label: "Giáo trình",
        links: [
          { label: "Dashboard", link: "quan-ly-bien-soan/giao-trinh/curriculum-dashboard", name: "Curriculum Dashboard", status: 'Prototype' },
          {
            label: "Đăng ký & Đề xuất",
            name: "Register & Propose",
            links: [
              { label: "Đăng ký Giáo trình mới", link: "quan-ly-bien-soan/giao-trinh/dang-ky-&-de-xuat/dang-ky-giao-trinh-moi", name: "Register New Curriculum", status: "Prototype" },
              //todo
              { label: "Tra cứu Đề xuất Giáo trình", link: "", name: "", status: "Menu" },
            ]
          },
          {
            label: "Xét duyệt Đề xuất",
            name: "Project Cooperation",
            links: [
              { label: "Kiểm tra sơ bộ Đề xuất", link: "quan-ly-bien-soan/xet-duyet-de-xuat/proposal-check", name: "Proposal Check", status: "Prototype" },
              { label: "Thành lập Hội đồng Xét duyệt", link: "quan-ly-bien-soan/xet-duyet-de-xuat/review-board", name: "Review Board", status: "Prototype" },
              { label: "Tổng hợp kết quả chấm điểm đề xuất", link: "quan-ly-bien-soan/xet-duyet-de-xuat/summary-of-proposed", name: "Summary of proposed scoring results", status: "Prototype" },
              { label: "Phê duyệt Đề xuất", link: "quan-ly-bien-soan/xet-duyet-de-xuat/curriculum-approval", name: "Approve Proposal", status: "Prototype" },
              // { label: "Phê duyệt Đề xuất", link: "quan-ly-bien-soan/xet-duyet-de-xuat/curriculum-approval-for-use", name: "Approve Proposal", status: "Prototype" },
            ]
          },
          {
            label: "Phát triển & Biên soạn",
            name: "Development and Compilation",
            links: [
              { label: "Thành lập Ban Biên soạn", link: "quan-ly-bien-soan/phat-trien-&-bien-soan/thanh-lap-ban-bien-soan", name: "Establishment of the Editorial Board", status: 'Prototype' },
              { label: "Lập Kế hoạch Thực hiện", link: "quan-ly-bien-soan/phat-trien-&-bien-soan/lap-ke-hoach-thuc-hien", name: "Implementation Planning", status: 'Prototype' },
              { label: "Duyệt kế hoạch thực hiện", link: "quan-ly-bien-soan/phat-trien-&-bien-soan/duyet-ke-hoach-thuc-hien", name: "Review implementation plan", status: 'Prototype' },
              { label: "Cập nhật Tiến độ Biên soạn", link: "quan-ly-bien-soan/phat-trien-&-bien-soan/cap-nhat-tien-do-bien-soan", name: "Update Compilation Progress", status: "Prototype" },
              { label: "Theo dõi tiến độ", link: "quan-ly-bien-soan/phat-trien-&-bien-soan/theo-doi-tien-do", name: "Track Progress", status: "Prototype" },
              { label: "Giao nộp Sản phẩm Thô", link: "quan-ly-bien-soan/phat-trien-&-bien-soan/giao-nop-san-pham-tho", name: "Development and Compilation", status: 'Prototype' },
            ]
          },
          {
            label: "Kiểm định & Phê duyệt Nội dung",
            name: "Project Cooperation",
            links: [
              { label: "Kiểm tra sơ bộ sản phẩm", link: "quan-ly-bien-soan/kiem-dinh-&-phe-duyet-noi-dung/kiem-tra-so-bo-san-pham", name: "Product Testing", status: 'Prototype' },
              { label: "Thành lập Hội đồng Thẩm định", link: "quan-ly-bien-soan/kiem-dinh-&-phe-duyet-noi-dung/curriculum-establishment-appraisal-council", name: "Establishment of the Appraisal Council", status: "Prototype" },
              { label: "Tổng hợp Kết quả Thẩm định Chuyên môn", link: "quan-ly-bien-soan/kiem-dinh-&-phe-duyet-noi-dung/tong-hop-ket-qua-tham-dinh-chuyen-mon", name: "Summary of Professional Assessment Results", status: "Prototype" },
              { label: "Hoàn thiện theo Góp ý", link: "quan-ly-bien-soan/kiem-dinh-&-phe-duyet-noi-dung/hoan-thien-theo-gop-y", name: "Completed according to Feedback", status: "Prototype" },
              { label: "Kiểm tra lại Bản hoàn thiện", link: "quan-ly-bien-soan/kiem-dinh-&-phe-duyet-noi-dung/kiem-tra-lai-ban-hoan-thien", name: "Check the Final Version", status: "Prototype" },
              { label: "Phê duyệt đưa vào Sử dụng", link: "quan-ly-bien-soan/kiem-dinh-&-phe-duyet-noi-dung/phe-duyet-dua-vao-su-dung", name: "Approval for Use", status: "Prototype" },
            ]
          },
          {
            label: "Quản lý Hậu kiểm & Tài chính",
            name: "Project Cooperation",
            links: [
              { label: "Bàn giao Sản phẩm Biên soạn", link: "quan-ly-bien-soan/quan-ly-dau-kiem-&-tai-chinh/product-delivery", name: "Product Delivery", status: "Prototype" },
              { label: "Đề nghị thanh toán", link: "quan-ly-bien-soan/quan-ly-dau-kiem-&-tai-chinh/payment-advance", name: "Payment Advance", status: "Prototype" },
              { label: "Thanh quyết toán Kinh phí", link: "quan-ly-bien-soan/quan-ly-dau-kiem-&-tai-chinh/thanh-quyet-toan-kinh-phi", name: "Expense Settlement", status: "Prototype" },
            ]
          }
        ],
      },
      {
        label: "Quản lý bài giảng điện tử",
        links: [
          {
            label: "Đăng ký & Đề xuất",
            links: [
              { label: "Đăng ký Đề xuất Bài giảng", link: "quan-ly-bai-giang-dien-tu/dang-ky-&-de-xuat/dang-ky-de-xuat-bai-giang", name: "Lecture Proposal Registration", status: 'Prototype' },
              //todo
              { label: "Tra cứu Đề xuất Bài giảng", link: "quan-ly-bai-giang-dien-tu/dang-ky-&-de-xuat/none", name: "", status: "Menu" },
            ]
          },
          {
            label: "Xét duyệt Đề xuất",
            links: [
              { label: "Kiểm tra sơ bộ Đề xuất", link: "quan-ly-bai-giang-dien-tu/xet-duyet-de-xuat/kiem-tra-so-bo-de-xuat", name: "Lecture Proposal Approval", status: 'Prototype' },
              { label: "Thành lập hội đồng Xét duyệt", link: "quan-ly-bai-giang-dien-tu/xet-duyet-de-xuat/thanh-lap-hoi-dong-xet-duyet", name: "Review Committee", status: 'Prototype' },
              { label: "Tổng hợp Kết quả Chấm điểm Đề xuất", link: "quan-ly-bai-giang-dien-tu/xet-duyet-de-xuat/tong-hop-ket-qua-cham-diem-de-xuat", name: "Summary of Proposal Scoring Results", status: 'Prototype' },
              { label: "Kết quả đánh giá Đề xuất", link: "quan-ly-bai-giang-dien-tu/xet-duyet-de-xuat/ket-qua-danh-gia-de-xuat", name: "Proposal Evaluation Result", status: 'Prototype' },
              { label: "Phê duyệt Đề xuất", link: "quan-ly-bai-giang-dien-tu/xet-duyet-de-xuat/phe-duyet-de-xuat", name: "Approve Proposal", status: "Prototype" }
            ]
          },
          {
            label: "Phát triển & Biên soạn",
            links: [
              { label: "Thành lập Ban Biên soạn", link: "quan-ly-bai-giang-dien-tu/phat-trien-&-bien-soan/thanh-lap-ban-bien-soan", name: "Establishment of the Editorial Board", status: 'Prototype' },
              { label: "Lập Kế hoạch Thực hiện", link: "quan-ly-bai-giang-dien-tu/phat-trien-&-bien-soan/lap-ke-hoach-thuc-hien", name: "Implementation Planning", status: 'Prototype' },
              { label: "Cập nhật Tiến độ Biên soạn", link: "quan-ly-bai-giang-dien-tu/phat-trien-&-bien-soan/update-compilation-progress", name: "Update Compilation Progress", status: 'Prototype' },
              { label: "Giao nộp sản phẩm thô", link: "quan-ly-bai-giang-dien-tu/phat-trien-&-bien-soan/deliver-raw-deliverables", name: "Deliver raw deliverables", status: 'Prototype' },
            ]
          },
          {
            label: "Kiểm định và phê duyệt nội dung",
            links: [
              { label: "Kiểm tra sơ bộ Sản phẩm thô", link: "quan-ly-bai-giang-dien-tu/kiem-dinh-&-phe-duyet-noi-dung/preliminary-check-of-raw-deliverables", name: "Preliminary check of raw deliverables", status: "Prototype" },
              { label: "Thành lập Hội đồng Thẩm định Nội dung", link: "quan-ly-bai-giang-dien-tu/kiem-dinh-&-phe-duyet-noi-dung/content-appraisal-council-establishment", name: "Content Appraisal Council Establishment", status: "Prototype" },
              { label: "Kiểm tra Chất lượng Kỹ thuật", link: "quan-ly-bai-giang-dien-tu/kiem-dinh-&-phe-duyet-noi-dung/technical-quality-control", name: "Technical Quality Control", status: "Prototype" },
              { label: "Thẩm định Nội dung Chuyên môn", link: "quan-ly-bai-giang-dien-tu/kiem-dinh-&-phe-duyet-noi-dung/subject-matter-content-review", name: "Subject Matter Content Review", status: "Prototype" },
              { label: "Tổng hợp Đánh giá & Góp ý", link: "quan-ly-bai-giang-dien-tu/kiem-dinh-&-phe-duyet-noi-dung/tong-hop-danh-gia-&-gop-y", name: "Evaluation Suggestion", status: 'Prototype' },
              //todo
              { label: "Tạo Nhiệm vụ Hoàn thiện", link: "none", name: "", status: "Menu" },
              { label: "Hoàn thiện theo Góp ý", link: "quan-ly-bai-giang-dien-tu/kiem-dinh-&-phe-duyet-noi-dung/hoan-thien-theo-gop-y", name: "Complete Suggestion", status: 'Prototype' },
              //todo
              { label: "Kiểm tra lại Bản Hoàn thiện", link: "none", name: "", status: "Menu" },
              { label: "Phê duyệt đưa vào Sử dụng", link: "quan-ly-bai-giang-dien-tu/kiem-dinh-&-phe-duyet-noi-dung/phe-duyet-dua-vao-su-dung", name: "Approve Use", status: 'Prototype' },
            ]
          },
          {
            label: "Quản lý Hậu kiểm & Tài chính",
            links: [
              //todo
              { label: "Bàn giao Sản phẩm Biên soạn", link: "none", name: "", status: "Menu" },
              { label: "Đề nghị Thanh toán", link: "quan-ly-bai-giang-dien-tu/quan-ly-hau-kiem-&-tai-chinh/paymentRequest", name: "Payment Request", status: 'Prototype' },
              { label: "Thanh quyết toán Kinh phí", link: "quan-ly-bai-giang-dien-tu/quan-ly-hau-kiem-&-tai-chinh/expenseSettlement", name: "Expense Settlement", status: 'Prototype' },
            ]
          },
        ]
      },
      {
        label: "Quản lý Chương trình đào tạo & Đề cương chi tiết học phần môn học",
        links: [
          {
            label: "Dashboard", name: "Curriculum Dashboard", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/curriculum-dashboard", status: "Prototype",
          },
          {
            label: "Kế hoạch & Đề xuất CTĐT/ĐCCTHP",
            name: "Curriculum Plan and Proposal",
            links: [
              //todo
              { label: "Thông báo/Kế hoạch xây dựng CTĐT/ĐCCTHP", link: "none", name: "", status: "Menu" },
              { label: "Đăng ký Đề xuất CTĐT/ĐCCTHP", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/ke-hoach-&-de-xuat-ctdt-dccthp/dang-ky-de-xuat-ctdt-dccthp", name: "Curriculum And Syllabus Proposals", status: 'Prototype' },
              { label: "Xét duyệt Đề xuất CTĐT/ĐCCTHP", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/ke-hoach-&-de-xuat-ctdt-dccthp/xet-duyet-de-xuat-ctdt-dccthp", name: "Curriculum Approval", status: "Prototype" },
            ]
          },
          {
            label: "Biên soạn & Giám sát nội dung",
            name: "Content Editing and Supervision",
            links: [
              { label: "Thành lập Ban Biên soạn & Giao nhiệm vụ", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/bien-soan-&-giam-sat-noi-dung/thanh-lap-ban-bien-soan-&-giao-nhiem-vu", name: "Establish Editorial Committee & Assign Tasks", status: "Prototype" },
              { label: "Cập nhật & Quản lý nội dung biên soạn", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/bien-soan-&-giam-sat-noi-dung/cap-nhat-va-quan-ly-noi-dung-bien-soan", name: "Update & Manage Edited Content", status: "Prototype" },
              { label: "Giám sát tiến độ biên soạn", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/bien-soan-&-giam-sat-noi-dung/giam-sat-tien-do-bien-soan", name: "Compilation Progress Monitoring", status: "Prototype" },
            ]
          },
          {
            label: "Thẩm định & Phê duyệt",
            name: "Review and Approval",
            links: [
              { label: "Thành lập Hội đồng Thẩm định", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/tham-dinh-&-phe-duyet/thanh-lap-hoi-dong-tham-dinh", name: "Appraisal Council Setup", status: "Prototype" },
              { label: "Thẩm định và Biểu quyết", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/tham-dinh-&-phe-duyet/tham-dinh-va-bieu-quyet", name: "Evaluation & Voting", status: "Prototype" },
              { label: "Hoàn thiện theo ý kiến Hội đồng", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/tham-dinh-&-phe-duyet/hoan-thien-theo-y-kien-hoi-dong", name: "Committee Finalization", status: "Prototype" },
              { label: "Phê duyệt Chính thức nội dung", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/tham-dinh-&-phe-duyet/phe-duyet-chinh-thuc-noi-dung", name: "Official Content Approval for Program/Syllabus", status: "Prototype" },
            ]
          },
          {
            label: "Quản lý & Ban hành sản phẩm",
            name: "Product Management and Distribution",
            links: [
              { label: "Ban hành CTĐT/ĐCCTHP", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/quan-ly-&-ban-hanh-san-pham/ban-hanh-ctdt-dccthp", name: "Curriculum And Syllabus Release", status: "Prototype" },
              { label: "Quản lý phiên bản & Lịch sử CTĐT/ĐCCTHP", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/quan-ly-&-ban-hanh-san-pham/quan-ly-phien-ban-&-lich-su-ctdt-dccthp", name: "Version Management & History of Training Programs/Course Syllabi", status: "Prototype" },
            ]
          },
          {
            label: "Thanh quyết toán",
            name: "Payment Settlement",
            links: [
              { label: "Lập đề nghị Thanh toán thù lao biên soạn/thẩm định", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/thanh-quyet-toan/lap-de-nghi-thanh-toan-thu-lao-bien-soan-tham-dinh", name: "Proposal for Payment Request", status: "Prototype" },
              { label: "Quyết toán kinh phí thực hiện", link: "quan-ly-ctdt-&-de-cuong-chi-tiet-hpmh/thanh-quyet-toan/quyet-toan-kinh-phi-thuc-hien", name: "Expense Settlement", status: "Prototype" }
            ]
          }
        ],
      },
    ],
  },
  {
    label: "Cấu hình hệ thống",
    links: [
      { label: "Danh mục hệ thống", name: "System navigator", link: "menu/system", },
      { label: "Cấu hình thông tin chủ quản", name: "moduleConfig", link: "moduleConfig" },
      { label: "Danh mục cấu hình mail", name: "mailConfig", link: "mailConfig", status: "Default" },
      { label: "Danh mục Page Content", name: "pageContentConfig", link: "pageContentConfig" },

      //todo
      { label: "Danh mục đơn vị", link: "danh-muc-he-thong/danh-muc-don-vi", name: "Unit", status: "Prototype" },
      { label: "Danh mục viên chức", name: "Officer", link: "danh-muc-he-thong/danh-muc-vien-chuc", status: "Prototype" },
      { label: "Danh mục nhân sự ngoài trường", link: "danh-muc-he-thong/nhan-su-ngoai-truong", name: "External personnel", status: "Prototype" },
      { label: "Danh mục loại văn bản", name: "Document categories", link: "documentCategories" },
      { label: "Danh mục năm học", link: "danh-muc-he-thong/danh-muc-nam-hoc", name: "School year list", status: "Menu" },
      { label: "Danh mục lĩnh vực", link: "danh-muc-he-thong/danh-muc-linh-vuc", name: "Research field list", status: "Prototype" },
      { label: "Danh mục cấp đề tài", link: "danh-muc-he-thong/danh-muc-cap-de-tai", name: "Project levels", status: "Prototype" },
      { label: "Danh mục loại đề tài", link: "danh-muc-he-thong/danh-muc-loai-de-tai", name: "Project types", status: "Prototype" },
      { label: "Danh mục loại đề tài hướng dẫn sinh viên", link: "danh-muc-he-thong/studentGuideDocs", name: "Project types", status: "Prototype" },
      { label: "Danh mục loại biên soạn", link: "danh-muc-he-thong/compilationType", name: "Compilation types", status: "Prototype" },
      { label: "Danh mục loại bài đăng", link: "danh-muc-he-thong/postTypes", name: "Post types", status: "Prototype" },
      { label: "Danh mục xếp hạng giải thưởng đề tài sinh viên", link: "danh-muc-he-thong/student-award-rankings", name: "Project types", status: "Prototype" },
      { label: "Danh mục loại giải thưởng đề tài sinh viên", link: "danh-muc-he-thong/student-topic-awards", name: "List of student topic awards", status: "Prototype" },
      { label: "Danh mục loại nhiệm vụ nghiên cứu khoa học khác", link: "danh-muc-he-thong/other-types-of-scientific-research", name: "Other Types Of Scientific Research", status: "Prototype" },
      { label: "Danh mục vai trò thực hiện đề tài", link: "danh-muc-he-thong/role-implement-topic", name: "List of roles in implementing the theme", status: "Prototype" },
      { label: "Danh mục vai trò thực hiện bài đăng", link: "danh-muc-he-thong/role-make-post", name: "List of roles that make posts", status: "Prototype" },
      { label: "Danh mục vai trò thực hiện biên soạn", link: "danh-muc-he-thong/editorialRole", name: "Editorial Roles", status: "Prototype" },
      { label: "Danh mục vai trò tham gia hội đồng", link: "danh-muc-he-thong/EstablishCouncilRole", name: "Establish Council Role", status: "Prototype" },

    ],
  },
];
