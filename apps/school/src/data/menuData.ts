import { I0LinkItem } from "@/components/Layouts/BasicAppShell/BasicAppShell";

export const menuData: I0LinkItem[] = [
  {
    label: "Quản lý hệ thống",
    links: [
      { pageId: 1, name: "Account management", label: "Quản lý tài khoản", link: "core71678" },
      // { label: "Danh mục quyền", link: "47643", status: "Prototype" },
      // { pageId: 2, name: "Access control level", label: "Phân quyền cấp đơn vị", link: "core38677" },
      { pageId: 2, name: "Access control", label: "Phân quyền sử dụng", link: "core83092" },
      // { pageId : 3, name: "Document categories", label: "Danh mục loại văn bản", link: "core18256" },
      { pageId: 3, name: "Security regulations", label: "Quy định an toàn/ bảo mật thông tin", link: "core76318", status: "Menu" },
      { pageId: 4, name: "System updates", label: "Thông tin xây dựng, cải tiến, bảo trì hệ thống", link: "core16209", status: "Menu" },
      { pageId: 5, name: "User guide", label: "Tài liệu hướng dẫn sử dụng", link: "core40207", status: "Menu" },
    ],
  },
  {
    label: "Văn bản - Quy định",
    links: [
      { pageId: 6, name: "Organizational regulations", label: "Văn bản - Quy định tổ chức", link: "core26965", status: "Menu" },
      { pageId: 7, name: "Workflow process", label: "Quy trình xử lý công việc", link: "core27311", status: "Menu" },
      { pageId: 8, name: "Form templates", label: "Tài liệu biểu mẫu", link: "core12196", status: "Menu" },
    ],
  },
  {
    label: "Quản lý sự kiện",
    links: [
      { pageId: 20, name: "Organizational event", label: "Tổ chức sự kiện", link: "cgbkl8o4nr", status: "Prototype" },
      { pageId: 21, name: "Event location", label: "Địa điểm tổ chức", link: "e00trugrug", status: "Prototype" },
      { pageId: 22, name: "Human resource management", label: "Phân công nhân sự", link: "tjx179fay4", status: "Prototype" },
      { pageId: 23, name: "Task report", label: "Báo cáo nhiệm vụ", link: "f83t8rtc2m", status: "Prototype" },
      { pageId: 24, name: "Event material", label: "Vật tư sự kiện", link: "xbx2dluzw4", status: "Prototype" },
      { pageId: 25, name: "Event content", label: "Nội dung sự kiện", link: "axju51ysqn", status: "Prototype" },
      { pageId: 26, name: "Event registration", label: "Đăng ký tham gia sự kiện", link: "v9g6ko7dbi", status: "Prototype" },
      { pageId: 27, name: "Event notification", label: "Thông báo sự kiện", link: "2f0q7vzvsg", status: "Prototype" },
    ],
  },
  {
    label: "Y tế học đường",
    links: [
      { pageId: 30, name: "Health graph", label: "Biểu đồ tình trạng sức khỏe", link: "erpf9rrxyu", status: "Prototype" },
      { pageId: 31, name: "Health profile", label: "Hồ sơ sức khỏe", link: "ynqwfnnk5a", status: "Prototype" },
      { pageId: 32, name: "Schedule", label: "Lịch khám sức khỏe", link: "9wxwn63rjf", status: "Prototype" },
      { pageId: 33, name: "Health report", label: "Ghi nhận kết quả khám", link: "o0wt29x8pv", status: "Prototype" },
      { pageId: 34, name: "", label: "Tiền sử bệnh", link: "vuinrzvnj8", status: "Prototype" },
      { pageId: 35, name: "", label: "Kết luận y tế", link: "672qaiu0sa", status: "Prototype" },
      { pageId: 36, name: "", label: "Cảnh báo sức khỏe", link: "wmstx3k39c", status: "Prototype" },
      { pageId: 37, name: "", label: "Chăm sóc sức khỏe hàng ngày", link: "hbwyvjoqgu", status: "Prototype" },
      { pageId: 38, name: "", label: "Thông báo chăm sóc sức khỏe", link: "6qsn7o8ezz", status: "Prototype" },
    ],
  },
  {
    label: "Quản lý xe đưa đón",
    links: [
      { pageId: 40, name: "", label: "Quản lý tuyến xe", link: "lpoa7imbik", status: "Prototype" },
      { pageId: 41, name: "", label: "Lịch trình đưa đón", link: "7krd8nrlbu", status: "Prototype" },
      { pageId: 42, name: "", label: "Theo dõi lên xuống xe", link: "7rjnpw6ik7", status: "Prototype" },
      { pageId: 43, name: "", label: "Thông báo đưa đón", link: "utilb90u23", status: "Prototype" },
      { pageId: 44, name: "", label: "Quản lý xe và tài xế", link: "e7hpvpesjf", status: "Prototype" },
      { pageId: 44, name: "", label: "Lịch trình xe buýt", link: "bjmfi27v97", status: "Prototype" },
      { pageId: 44, name: "", label: "Đăng ký tuyến xe đưa đón", link: "dud5jq8o3g", status: "Prototype" },
    ],
  },
  {
    label: "Quản lý căn tin",
    links: [
      { pageId: 50, name: "", label: "Quản lý thực đơn", link: "lxffbhdefm", status: "Prototype" },
      { pageId: 51, name: "", label: "Theo dõi thực đơn", link: "jk2z08i07i", status: "Prototype" },
      { pageId: 52, name: "", label: "Đăng ký suất ăn", link: "ddpt8jnt35", status: "Prototype" },
      { pageId: 53, name: "", label: "Thanh toán công nợ", link: "mmlu9n2jq1", status: "Prototype" },
      { pageId: 54, name: "", label: "Quản lý đánh giá", link: "82fp2peexf", status: "Prototype" },
    ],
  },
  {
    label: "Danh mục hệ thống",
    links: [
      { pageId: 60, name: "", label: "Cấu hình thông tin chủ quản", link: "tx4191gsrz", status: "Prototype" },
      { pageId: 61, name: "", label: "Danh mục đơn vị", link: "u8zfwd46p2", status: "Prototype" },
      { pageId: 62, name: "", label: "Danh mục cấu hình mail", link: "sz006g0m7l", status: "Prototype" },
      { pageId: 63, name: "", label: "Danh mục bộ đếm", link: "v1yki871z9", status: "Prototype" },
    ],
  },
];
