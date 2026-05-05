import { ActivityIcon, CalendarIcon, DocumentIcon, EmailIcon, FolderAccreditedIcon, OrganizationIcon, ParkIcon, SchoolIcon } from "@/components/Icons";
import { ISystemCategory } from "./interfaces";

export const categoriesList: ISystemCategory[] = [
  { id: 1, name: "Danh mục loại văn bản", link: "/admin/document-categories", description: "Danh mục phân loại văn bản sử dụng cho Văn bản - Quy định", icon: DocumentIcon },
  { id: 2, name: "Danh mục cấu hình Mail Server", link: "/admin/mail-config", description: "Danh mục cấu hình Mail Server thực hiện tiến trình gửi mail từ hệ thống ra ngoài", icon: EmailIcon },
  { id: 3, name: "Danh mục năm học – học kỳ", link: "/admin/academic-year", description: "Danh mục năm học - học kỳ làm việc trong hệ thống", icon: CalendarIcon },
  { id: 4, name: "Danh mục đơn vị tổ chức", link: "/admin/organizing-unit", description: "Danh mục đơn vị tổ chức các hoạt động ngoại khoá", icon: OrganizationIcon },
  { id: 5, name: "Danh mục đơn vị công nhận - ghi nhận điểm", link: "/admin/working-unit-department", description: "Danh mục đơn vị công nhận và ghi nhận điểm hoạt động ngoại khoá", icon: FolderAccreditedIcon },
  { id: 6, name: "Danh mục địa điểm tổ chức trong Trường", link: "/admin/address-inside-school", description: "Danh mục địa điểm tổ chức hoạt động bên trong khuôn viên trường", icon: SchoolIcon },
  { id: 7, name: "Danh mục địa điểm tổ chức ngoài Trường", link: "/admin/address-outside-school", description: "Danh mục địa điểm tổ chức hoạt động bên ngoài khuôn viên trường", icon: ParkIcon },
  { id: 8, name: "Danh mục nhóm hoạt động", link: "/admin/event-group", description: "Danh mục nhóm hoạt động ngoại khoá", icon: ActivityIcon },
];
