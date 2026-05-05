'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { I0LinkItem } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import { Accordion, Checkbox, Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function F1_2ViewMenuDonVi() {
    const query = useQuery({
        queryKey: ['F1_2ViewMenuDonVi'],
        queryFn: async () => groupTwoLevels(data)
    })
    const columns = useMemo<MRT_ColumnDef<I0LinkItem>[]>(
        () => [
            {
                header: "Tên menu",
                accessorKey: "label",
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Xem",
                accessorFn: () => <Checkbox></Checkbox>,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Thêm",
                accessorFn: () => <Checkbox></Checkbox>,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Sửa",
                accessorFn: () => <Checkbox></Checkbox>,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Xóa",
                accessorFn: () => <Checkbox></Checkbox>,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "In",
                accessorFn: () => <Checkbox></Checkbox>,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Xuất",
                accessorFn: () => <Checkbox></Checkbox>,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },

        ],
        []
    );
    if (query.isLoading) return "Loading..."
    return (
        <Container w={'100%'} fluid>
            <Accordion variant="separated">
                {query.data?.map((item, idx) => {
                    if (item.label == "Dashboard") return (
                        <Accordion.Item key={item.label} value={item.label}>
                            <Accordion.Control>{item.label}</Accordion.Control>
                            <Accordion.Panel>
                                <MyDataTable data={[{ label: "Dashboard", link: "dashboard" }]} columns={columns} />
                            </Accordion.Panel>
                        </Accordion.Item>

                    )
                    return (
                        <Accordion.Item key={item.label} value={item.label}>
                            <Accordion.Control>{item.label}</Accordion.Control>
                            <Accordion.Panel>
                                <MyDataTable
                                    enableGrouping
                                    columns={columns}
                                    data={item.links}
                                />
                            </Accordion.Panel>
                        </Accordion.Item>
                    )
                })}
            </Accordion>

        </Container >
    )
}

function groupTwoLevels(data: I0LinkItem[]) {
    return data.map((menu) => {
        const secondLevel: I0LinkItem[] = [];

        // Duyệt qua các menu con
        if (menu.links) {
            menu.links.forEach((subMenu) => {
                if (!subMenu.links) {
                    secondLevel.push(subMenu);
                } else {
                    // Nếu menu con có links, thêm vào cấp thứ 2
                    secondLevel.push(...subMenu.links);
                }
            });
        }

        return {
            label: menu.label,
            links: secondLevel
        };
    });
}

const data: I0LinkItem[] = [
    {
        label: "Dashboard",
        link: "dashboard"
    },
    {
        label: "1. Quản lí hệ thống",
        links: [
            { label: '1.1. Quản lí tài khoản', link: "1-1", status: "Prototype" },
            { label: "1.2. Phân quyền sử dụng", link: "1-2", status: "Prototype" },
            { label: "1.3. Quy định an toàn/ bảo mật thông tin", link: "1-3", status: "Menu" },
            { label: "1.4. Thông tin xây dựng, cải tiến, bảo trì hệ thống", link: "1-4", status: "Menu" },
            { label: "1.5. Tài liệu hướng dẫn sử dụng", link: "1-5", status: "Menu" },
            {
                label: "1.6. Quy định tổ chức", links: [
                    { label: "1.6.1 Tổ chức thi", link: "1-6-1" },
                    { label: "1.6.2 Tổ chức học", link: "1-6-2" }
                ]
            }
        ]
    },
    {
        label: "2. Văn bản - Quy định", links: [
            { label: "2.1. Văn bản - Quy định tổ chức", link: "2-1", status: "Menu" },
            { label: "2.2. Quy trình xử lý công việc", link: "2-2", status: "Menu" },
            { label: "2.3. Tài liệu biểu mẫu", link: "2-3", status: "Menu" }
        ]
    },
    {
        label: "3. Chương trình học",
        links: [
            { label: "3.1. Danh mục môn học", link: "3-1", status: "Prototype" }, //Luân
            { label: "3.2. Danh mục chương trình học", link: "3-2", status: "Prototype" }, // Quốc Thiệu
            { label: "3.3. Cấu hình điểm của chương trình học", link: "3-3", status: "Prototype" }
        ]
    },
    {
        label: "4. Khóa học",
        links: [
            { label: "4.1 Danh sách khóa học", link: "4-1", status: "Menu" }
        ]
    },
    {
        label: "5. Khóa thi",
        links: [
            { label: "5.1 Danh sách khóa thi", link: "5-1", status: "Prototype" }
        ]
    },
    {
        label: "6. Chính sách ưu đãi",
        links: [
            { label: "6.1 Chiết khấu thanh toán", link: "6-1", status: "Prototype" }, // Lâm
            { label: "6.2 Mã giảm giá", link: "6-2", status: "Prototype" }// Lâm
        ]
    },
    {
        label: "7. Ghi danh và thu học phí/ lệ phí",
        links: [
            { label: "7.1 Ghi danh khóa học", link: "7-1", status: "Prototype" },
            { label: "7.2 Ghi danh khóa thi", link: "7-2", status: "Prototype" },
            { label: "7.3 Danh sách đăng ký khóa học Online", link: "7-3", status: "Prototype" }, // Quốc Thiệu
            { label: "7.4 Danh sách đăng ký khóa thi Online", link: "7-4", status: "Prototype" }, // Quốc Thiệu
            { label: "7.5 Quá trình học viên/ thí sinh", link: "7-5", status: "Prototype" } //Luân
        ]
    },
    {
        label: "8. Tổ chức lớp học và xếp lịch học",
        links: [
            { label: "8.1 Xếp lớp cho học viên", link: "8-1", status: "Menu" },
            { label: "8.2 Phân công giảng dạy cho lớp", link: "8-2", status: "Prototype" },  // Quốc Thiệu
            { label: "8.3 Gán phòng học ưu tiên cho lớp", link: "8-3", status: "Prototype" }, // Quốc Thiệu
            { label: "8.4 Xếp lịch học", link: "8-4", status: "Menu" },
            { label: "8.5 Xem lịch học toàn trung tâm", link: "8-5", status: "Prototype" } //Luân
        ]
    },
    {
        label: "9. Giám sát học tập",
        links: [
            { label: "9.1 Điểm danh buổi học", link: "9-1", status: "Prototype" }, //Luân
            { label: "9.2 Nhập điểm thành phần", link: "9-2", status: "Prototype" } //Luân
        ]
    },
    {
        label: "10. Tổ chức kỳ thi",
        links: [
            { label: "10.1 Danh sách thí sinh đăng ký", link: "10-1", status: "Prototype" }, //Luân
            { label: "10.2 Chia nhóm thi", link: "10-2", status: "Prototype" }, // Quốc Thiệu
            { label: "10.3 Xếp lịch thi", link: "10-3", status: "Prototype" }, //Lâm
            { label: "10.4 Nhập điểm thi", link: "10-4", status: "Prototype" }, // Quốc Thiệu
            { label: "10.5 Xem điểm thi", link: "10-5", status: "Prototype" } // Quốc Thiệu
        ]
    },
    {
        label: "11. Xét và Cấp chứng chỉ",
        links: [
            { label: "11.1 Tạo đợt xét", link: "11-1", status: "Prototype" }, //Lam
            { label: "11.2 Kết quả xét chứng chỉ", link: "11-2", status: "Prototype" }, //Luân
            { label: "11.3 Quyết định cấp chứng chỉ", link: "11-3", status: "Prototype" }, //Lam
            { label: "11.4 Hồ sơ cấp chứng chỉ", link: "11-4", status: "Prototype" } // Quốc Thiệu
        ]
    },
    {
        label: "12. Danh mục hệ thống",
        links: [
            { label: "12.1 Danh mục loại văn bản", link: "12-1", status: "Menu" },
            { label: "12.2 Danh mục trung tâm kỹ năng", link: "12-2", status: "Prototype" },
            { label: "12.3 Danh mục chứng chỉ", link: "12-3", status: "Prototype" }, // Quốc Thiệu
            { label: "12.4 Danh mục chi nhánh", link: "12-4", status: "Prototype" }, // Quốc Thiệu
            { label: "12.5 Danh mục tính chất phòng", link: "12-5", status: "Prototype" },
            { label: "12.6 Danh mục phòng học", link: "12-6", status: "Prototype" },
            { label: "12.7 Danh mục loại thời gian", link: "12-7", status: "Prototype" }, //Luân
            { label: "12.8 Danh mục cụm thời gian học", link: "12-8", status: "Prototype" }, // Quốc Thiệu
            { label: "12.9 Danh mục ngày nghỉ lễ", link: "12-9", status: "Menu" },
            { label: "12.10 Danh mục giảng viên", link: "12-10", status: "Prototype" }, //Luân
        ]
    }
];
