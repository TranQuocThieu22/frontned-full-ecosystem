import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";
import { const_object_generalMenuData } from "aq-fe-framework/const";

export const adminMenuData: I_BasicAppShell_LinkItem[] = [
  {
    label: "Dashboard",
    links: [
      { label: "Dashboard type 1", link: "dashboard-type1", status: "Prototype" },
      { label: "Dashboard type 2", link: "dashboard-type2", status: "Prototype" },
      { label: "Dashboard type 3", link: "dashboard-type3", status: "Prototype" }
    ],
  },
  const_object_generalMenuData.managementSystem(),
  const_object_generalMenuData.documentManagement(),
  {
    label: "Danh sách Bộ tiêu chuẩn",
    link: "standard-set-list",
    status: "Prototype",
  },
  {
    label: "Danh sách tiêu chuẩn, tiêu chí",
    link: "standard-list",
    status: "Prototype",
  },
  {
    label: "Tổ chức và quản trị",
    links: [
      { label: "Lãnh đạo chủ chốt", link: "core-leadership", status: "Prototype" },
      { label: "Văn bản theo Luật GDĐH", link: "documents-higher-edu-law", status: "Prototype", },
      { label: "Chỉ số hoạt động chính", link: "primary-operational-indicators", status: "Prototype", },
      { label: "Dữ liệu quản lý trên Hemis", link: "menuData-on-hemis", status: "Prototype", },
    ],
  },
  {
    label: "Giảng viên",
    links: [
      { label: "Chỉ số giảng viên", link: "lecturer-indicators", status: "Prototype" },
    ],
  },
  {
    label: "Cơ sở vật chất",
    links: [
      { label: "Khuôn viên", link: "campus-list", status: "Prototype" },
      { label: "Công trình", link: "building-list", status: "Prototype" },
      { label: "Đầu sách", link: "book-count-summary", status: "Prototype" },
      { label: "Hạ tầng công nghệ thông tin", link: "technology-infrastructure-list", status: "Prototype" },
    ],
  },
  {
    label: "Danh mục hệ thống",
    links: [{ label: "Danh mục loại văn bản", link: "12-1", status: "Menu" }],
  },
];
