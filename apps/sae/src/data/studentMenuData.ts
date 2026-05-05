import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";

export const studentMenuData: I_BasicAppShell_LinkItem[] = [
    {
        label: "Văn bản quy định",
        links: [
            { pageId: 71, label: "Danh mục quy định", link: "regulation-list" },
            { pageId: 72, label: "Danh mục quy trình", link: "procedure-list" },
            { pageId: 73, label: "Danh mục biểu mẫu", link: "form-template-list" }
        ]
    },
    {
        pageId: 74,
        label: "Lập kế hoạch",
        link: "activity-planning",

    },
    {
        pageId: 75,
        label: "Kế hoạch triển khai",
        link: "execution-plan",

    },
    {
        pageId: 76,
        label: "Kết quả thực hiện",
        link: "execution-results",

    },
    {
        label: "Bảng điểm",
        links: [
            { pageId: 77, label: "Bảng điểm hiện tại", link: "current-score-board" },
            { pageId: 78, label: "Bảng điểm tổng hợp", link: "summary-score-board" }
        ]
    },
    {
        pageId: 79,
        label: "Khiếu nại",
        link: "complaint",

    }
];

