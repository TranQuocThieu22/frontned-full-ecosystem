import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";

export const studentMenuData: I_BasicAppShell_LinkItem[] = [
    {
        pageId: 200,
        label: "Dashboard",
        name: "Dashboard",
        // link: "emsiqqmzrm", link dashboard cũ
        link: "vmz23lu0tk",

        status: "Default"
    },
    {
        pageId: 255,
        label: "Lịch học",
        link: "9j8m8m5dz2",
    },
    { pageId: 201, label: 'Tiến độ học tập', name: "Account Management", link: "fvmyvvji8z" },
    { pageId: 250, label: 'Nhận xét của giảng viên', link: "r1572aab77", name: "Unit Levels" },
    { pageId: 251, label: 'Kết quả khóa thi', link: "2rhntoro74", name: "Unit Permissions" },
    { pageId: 202, label: "Chứng chỉ", name: "User Permissions", link: "ixnczwdmas" },
    { pageId: 203, label: "Lịch sử thanh toán", name: "Info Security", link: "fkvafnygpz" },
    { pageId: 204, label: "Cộng đồng học tập", name: "System Info", link: "ivhdagzuoe", status: "Prototype" },
];