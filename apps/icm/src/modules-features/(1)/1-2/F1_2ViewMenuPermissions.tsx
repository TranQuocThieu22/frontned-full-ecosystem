'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { I0LinkItem } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import { Accordion, Checkbox, Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function F1_2ViewMenuPermissions() {
    const query = useQuery({
        queryKey: ['1-2_menus'],
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
        label: "1. Quản lý hệ thống",
        links: [
            { status: "Prototype", label: "1.1 Quản lý tài khoản", link: "1-1" },
            { status: "Prototype", label: "1.2 Phân quyền sử dụng", link: "1-2" },
            { status: "Prototype", label: "1.3 Quy định an toàn/ bảo mật thông tin", link: "1-3" },
            { label: "1.4 Thông tin xây dựng, cải tiến, bảo trì hệ thống", link: "1-4", },
            { label: "1.5 Tài liệu hướng dẫn sử dụng", link: "1-5" }
        ],
    },
    {
        label: "2. Văn bản - Quy định",
        links: [
            { status: "Prototype", label: "2.1 Văn bản - Quy định tổ chức hoạt động NCKH", link: "2-1" },
            { status: "Prototype", label: "2.2 Quy trình xử lý công việc", link: "2-2" },
            { status: "Prototype", label: "2.3 Tài liệu biểu mẫu", link: "2-3" }
        ],
    },
    {
        label: "3. Hồ sơ năng lực khoa học",
        links: [
            { status: "Prototype", label: "3.1 Danh sách Giảng viên - Chuyên viên", link: "3-1" },
            { status: "Prototype", label: "3.2 Hồ sơ năng lực Giảng viên - Chuyên viên", link: "3-2" },
            { status: "Prototype", label: "3.3 Hồ sơ năng lực Nhóm nghiên cứu", link: "3-3" },
            { status: "Prototype", label: "3.4 Hồ sơ năng lực Ban chủ nhiệm", link: "3-4" },
            { status: "Prototype", label: "3.5 Danh mục Đề tài - Công trình đã công bố/ xuất bản", link: "3-5" }
        ],
    },
    {
        label: "4. Phân công nhiệm vụ và Đánh giá kết quả thực hiện",
        links: [
            {
                label: "4.1 Phiếu giao nhiệm vụ",
                links: [
                    { status: "Prototype", label: "4.1.1 Nhập phiếu giao nhiệm vụ", link: "4-1-1" },
                    { status: "Prototype", label: "4.1.2 Phê duyệt phiếu giao nhiệm vụ", link: "4-1-2" },
                    { status: "Prototype", label: "4.1.3 Tổng hợp phiếu giao nhiệm vụ", link: "4-1-3" }
                ],
            },
            {
                label: "4.2 Giám sát tiến độ thực hiện giữa năm",
                links: [
                    { status: "Prototype", label: "4.2.1 Cập nhật tiến độ thực hiện nhiệm vụ", link: "4-2-1" },
                    { status: "Prototype", label: "4.2.2 Phê duyệt tiến độ thực hiện nhiệm vụ", link: "4-2-2" },
                    { status: "Prototype", label: "4.2.3 Khóa/ mở khóa cập nhật tiến độ thực hiện nhiệm vụ", link: "4-2-3" },
                    { status: "Prototype", label: "4.2.4 Tổng hợp Báo cáo tiến độ thực hiện nhiệm vụ", link: "4-2-4" }
                ],
            },
            {
                label: "4.3 Báo cáo tiến độ thực hiện cuối năm",
                links: [
                    { status: "Prototype", label: "4.3.1 Cập nhật tiến độ thực hiện nhiệm vụ", link: "4-3-1" },
                    { status: "Prototype", label: "4.3.2 Phê duyệt báo cáo tiến độ nhiệm vụ cuối năm", link: "4-3-2" },
                    { status: "Prototype", label: "4.3.3 Khóa/ mở khóa cập nhật tiến độ thực hiện nhiệm vụ", link: "4-3-3" },
                    { status: "Prototype", label: "4.3.4 Tổng hợp Báo cáo tiến độ thực hiện nhiệm vụ", link: "4-3-4" }
                ],
            },
            {
                label: "4.4 Khen thưởng thành tích NCKH",
                links: [
                    { status: "Prototype", label: "4.4.1 Hồ sơ đề nghị khen thưởng", link: "4-4-1" },
                    { status: "Prototype", label: "4.4.2 Phê duyệt hồ sơ đề nghị khen thưởng.", link: "4-4-2" },
                    { status: "Prototype", label: "4.4.3 Họp hội đồng khen thưởng NCKH", link: "4-4-3" },
                    { status: "Prototype", label: "4.4.4 Quyết định công nhận khen thưởng NCKH và mức chi", link: "4-4-4" }
                ],
            },
        ],
    },
    {
        label: "5. Quản lý hoạt động nghiên cứu khoa học của giảng viên",
        links: [
            { status: "Prototype", label: "5.1 Tra cứu danh mục đề tài NCKH giảng viên", link: "5-1" },
            {
                label: "5.2 Thông báo đăng ký đề tài NCKH",
                links: [
                    { status: "Prototype", label: "5.2.1 Thông báo đăng ký đề xuất định hướng", link: "5-2-1" },
                    { status: "Prototype", label: "5.2.2 Đề xuất định hướng danh mục đề tài NCKH", link: "5-2-2" },
                    { status: "Prototype", label: "5.2.3 Họp phê duyệt danh mục đề tài NCKH", link: "5-2-3" },
                    { status: "Prototype", label: "5.2.4 Quyết định danh mục đề tài NCKH định hướng", link: "5-2-4" },
                    { status: "Prototype", label: "5.2.5 Thông báo đăng ký đề tài NCKH", link: "5-2-5" }
                ],
            },
            {
                label: "5.3 Đăng ký đề tài NCKH",
                links: [
                    { status: "Prototype", label: "5.3.1 Phiếu đăng ký đề tài NCKH", link: "5-3-1" },
                    { status: "Prototype", label: "5.3.2 Đề cương nghiên cứu / Thuyết minh đề tài", link: "5-3-2" },
                    {
                        label: "5.3.3 Thành lập hội đồng xét duyệt đề tài cấp cơ sở",
                        links: [
                            { status: "Prototype", label: "5.3.3.1. Danh sách thành viên hội đồng xét duyệt đề tài", link: "5-3-3-1" },
                            { status: "Prototype", label: "5.3.3.2. Phiếu chấm điểm thành viên", link: "5-3-3-2" },
                            { status: "Prototype", label: "5.3.3.3. Tổng hợp kết quả chấm điểm hội đồng", link: "5-3-3-3" }
                        ]
                    },
                    { status: "Prototype", label: "5.3.4 Hoàn thiện đề cương nghiên cứu theo ý kiến góp ý của hội đồng", link: "5-3-4" },
                    { status: "Prototype", label: "5.3.5 Tổng hợp danh sách đề tài NCKH đăng ký", link: "5-3-5" },
                    { status: "Prototype", label: "5.3.6 Thanh toán thù lao", link: "5-3-6" }
                ],
            },
            {
                label: "5.4 Xét duyệt đề tài nghiên cứu khoa học cấp trường",
                links: [
                    {
                        label: "5.4.1 Thành lập hội đồng xét duyệt",
                        links: [
                            { status: "Prototype", label: "5.4.1.1 Danh sách thành viên hội đồng xét duyệt đề tài", link: "5-4-1-1" },
                            { status: "Prototype", label: "5.4.1.2 Phiếu chấm điểm thành viên", link: "5-4-1-2" },
                            { status: "Prototype", label: "5.4.1.3 Tổng hợp kết quả chấm điểm hội đồng", link: "5-4-1-3" }
                        ]
                    },
                    { status: "Prototype", label: "5.4.2 Hoàn thiện đề cương nghiên cứu theo ý kiến góp ý của hội đồng", link: "5-4-2" },
                    { status: "Prototype", label: "5.4.3 Tổng hợp danh sách đề tài NCKH phê duyệt cấp Trường", link: "5-4-3" },
                    { status: "Prototype", label: "5.4.4 Thanh toán thù lao", link: "5-4-4" }
                ],
            },
            {
                label: "5.5 Giám sát tiến độ thực hiện đề tài NCKH",
                links: [
                    { status: "Prototype", label: "5.5.1 Tra cứu danh mục đề tài NCKH giảng viên", link: "5-5-1" },
                    { status: "Prototype", label: "5.5.2 Báo cáo tiến độ và kết quả thực hiện đề tài", link: "5-5-2" },
                    { status: "Prototype", label: "5.5.3 Điều chỉnh đề tài", link: "5-5-3" },
                    { status: "Prototype", label: "5.5.4 Phê duyệt báo cáo tiến độ giữa kỳ", link: "5-5-4" },
                    { status: "Prototype", label: "5.5.5 Tổng hợp báo cáo kết quả giám sát thực hiện đề tài", link: "5-5-5" }
                ],
            },
            {
                label: "5.6 Nghiệm thu đề tài NCKH",
                links: [
                    {
                        label: "Thành lập hội đồng nghiệm thu đề tài", links: [
                            { status: "Prototype", label: "5.6.1.1 Danh sách thành viên hội đồng xét duyệt đề tài", link: "5-6-1-1" },
                            { status: "Prototype", label: "5.6.1.2 Phiếu chấm điểm thành viên", link: "5-6-1-2" },
                            { status: "Prototype", label: "5.6.1.3 Tổng hợp kết quả chấm điểm hội đồng", link: "5-6-1-3" }]
                    },

                    { status: "Prototype", label: "5.6.5Thanh toán thù lao", link: "5-6-5" },
                    { status: "Prototype", label: "5.6.6 Tổng hợp báo cáo kết quả nghiệm thu đề tài", link: "5-6-6" },
                    { status: "Prototype", label: "Mantain 5.6.7Qui đổi giờ hoạt động NCKH Giảng viên", link: "5-6-7" }
                ],
            },
        ],
    },
    {
        label: "6. Quản lý hoạt động Nhóm nghiên cứu khoa học",
        links: [
            {
                label: "6.1. Đăng ký và xét chọn Nhóm nghiên cứu",
                links: [
                    { status: "Prototype", label: "6.1.1 Đăng ký Nhóm nghiên cứu 46377", link: "6-1-1" },
                    { status: "Prototype", label: "6.1.2 Kiểm tra hồ sơ đăng ký Nhóm nghiên cứu 46392", link: "6-1-2" },
                    { status: "Prototype", label: "6.1.3 Danh sách thanh viên hội đồng chọn Nhóm nghiên cứu 46393", link: "6-1-3" },
                    { status: "Prototype", label: "6.1.4 Biên bản họp xét chọn Nhóm nghiên cứu 46411", link: "6-1-4" },
                    { status: "Prototype", label: "6.1.5 Tổng hợp kết quả duyệt Nhóm nghiên cứu 46412", link: "6-1-5" },
                    { status: "Prototype", label: "6.1.6 Quyết định công nhận nhóm nghiên cứu 46442", link: "6-1-6" },
                    { status: "Prototype", label: "6.1.7 Thanh toán hội đồng xét chọn Nhóm nghiên cứu 46440", link: "6-1-7" },
                ]
            },
            {
                label: "6.2. Đăng ký đề tài Nhóm nghiên cứu",
                links: [
                    { status: "Prototype", label: "6.2.1. Phiếu đăng ký đề tài Nhóm nghiên cứu - 46487", link: "6-2-1" },
                    { status: "Prototype", label: "6.2.2. Đề cương nghiên cứu/ Thuyết minh đề tài - 46484", link: "6-2-2" },
                    {
                        label: "6.2.3 Thành lập hội đồng xét duyệt đề tài cấp cơ sở", links: [
                            { status: "Prototype", label: "6.2.3.1. Danh sách thành viên hội đồng xét duyệt đề cương/ thuyết minh - 46485", link: "6-2-3-1" },
                            { status: "Prototype", label: "6.2.3.2. Phiếu chấm điểm thành viên hội đồng của đề cương/ thuyết minh - 46483", link: "6-2-3-2" },
                            { status: "Prototype", label: "6.2.3.3. Tổng hợp kết quả chấm điểm hội đồng xét duyệt đề cương/ thuyết minh đề tài Nhóm nghiên cứu - 46486", link: "6-2-3-3" }
                        ]
                    },
                    { status: "Prototype", label: "6.2.4. Hoàn thiện đề cương theo ý kiến góp ý của hội đồng - 46488", link: "6-2-4" },
                    { status: "Prototype", label: "6.2.5. Kiểm tra file hoàn thiện thuyết minh đề tài Nhóm nghiên cứu - 46489", link: "6-2-5" },
                    { status: "Prototype", label: "6.2.6. Tổng hợp danh sách đề tài nhóm nghiên cứu đã hoàn thiện đề cương/ thuyết minh - 46490", link: "6-2-6" },
                    { status: "Prototype", label: "6.2.7. Thanh toán thù lao hội đồng xét duyệt đề cương/ thuyết minh – 46491", link: "6-2-7" }
                ]
            },
            {
                label: "6.3. Xét duyệt đề tài Nhóm nghiên cứu cấp trường",
                links: [
                    {
                        label: "6.3.1. Thành lập hội đồng xét duyệt", links: [
                            { status: "Prototype", label: "6.3.1.1. Danh sách thành viên hội đồng xét duyệt", link: "6-3-1-1" },
                            { status: "Prototype", label: "6.3.1.2. Phiếu chấm điểm của thành viên hội đồng xét duyệt", link: "6-3-1-2" },
                            { status: "Prototype", label: "6.3.1.3. Tổng hợp kết quả chấm điểm hội đồng", link: "6-3-1-3" }
                        ],
                    },
                    { status: "Prototype", label: "6.3.2. Hoàn thiện đề cương nhóm nghiên cứu theo ý kiến của hội đồng", link: "6-3-2" },
                    { status: "Prototype", label: "6.3.3. Kiểm tra hoàn thiện đề cương nhóm nghiên cứu theo ý kiến của hội đồng", link: "6-3-3" },
                    { status: "Prototype", label: "6.3.4. Tổng hợp danh sách đề tài Nhóm nghiên cứu cấp trường", link: "6-3-4" },
                    { status: "Prototype", label: "6.3.5. Thành toán thủ lao hội đồng xét duyệt", link: "6-3-5" },
                    { status: "Prototype", label: "6.3.6. Quyết định giao đề tài cho Nhóm nghiên cứu", link: "6-3-6" }
                ]
            },
            {
                label: "6.4. Giám sát thực hiện đề tài Nhóm nghiên cứu", links: [
                    { status: "Prototype", label: "6.4.1. Tra cứu danh mục đề tài Nhóm nghiên cứu", link: "6-4-1" },
                    { status: "Prototype", label: "6.4.2. Báo cáo tiến độ và kết quả thực hiện", link: "6-4-2" },
                    { status: "Prototype", label: "6.4.3. Điều chỉnh đề tài", link: "6-4-3" },
                    { status: "Prototype", label: "6.4.4. Kiểm tra báo cáo tiến độ giữa kỳ", link: "6-4-4" },
                    { status: "Prototype", label: "6.4.5. Tổng hợp báo cáo kết quả giám sát thực hiện đề tài giữa kỳ.", link: "6-4-5" },
                ]
            },
            {
                label: "6.5. Nghiệm thu đề tài Nhóm nghiên cứu", links: [
                    {
                        label: "6.5.1. Thành lập hội đồng nghiệm thu đề tài", links: [
                            { status: "Prototype", label: "6.5.1.1. Danh sách thành viên hội đồng nghiệm thu đề tài.", link: "6-5-1-1" },
                            { status: "Prototype", label: "6.5.1.2. Phiếu chấm điểm thành viên", link: "6-5-1-2" },
                            { status: "Prototype", label: "6.5.1.3. Tổng hợp kết quả chấm điểm hội đồng", link: "6-5-1-3" }
                        ]
                    },
                    { status: "Prototype", label: "6.5.2. Thanh toán thù lao hội đồng nghiệm thu đề tài", link: "6-5-2" },
                    { status: "Prototype", label: "6.5.3. Tổng hợp báo cáo kết quả nghiệm thu đề tài", link: "6-5-3" }
                ]
            }
        ]
    },
    {
        label: "7. Quản lý hoạt động Sinh viên nghiên cứu khoa học",
        links: [
            {
                label: "7.1. Đăng ký đề xuất định hướng sinh viên nghiên cứu",
                links: [
                    { status: "Prototype", label: "7.1.1. Tra cứu danh mục đề tài sinh viên NCKH", link: "7-1-1" },
                    {
                        label: "7.1.2. Thông báo đăng ký đề xuất danh mục sinh viên NCKH",
                        links: [
                            { status: "Prototype", label: "7.1.2.1. Thông báo đăng ký đề xuất danh mục định hướng nghiên cứu", link: "7-1-2-1" },
                            { status: "Prototype", label: "7.1.2.2. Đăng ký đề xuất định hướng nghiên cứu khoa học", link: "7-1-2-2" },
                            { status: "Prototype", label: "7.1.2.3. Khoa/ Bộ môn kiểm tra đề xuất định hướng danh mục đề tài NCKH sinh viên", link: "7-1-2-3" },
                            { status: "Prototype", label: "7.1.2.4. Họp phê duyệt danh mục đinh hướng đề tài NCKH", link: "7-1-2-4" }
                        ]
                    },
                    { status: "Prototype", label: "7.1.3. Quyết định danh mục đề tài NCKH định hướng", link: "7-1-3" }
                ]
            },
            {
                label: "7.2. Đăng ký đề tài Sinh viên nghiên cứu",
                links: [
                    { status: "Prototype", label: "7.2.1. Đề cương nghiên cứu/ Thuyết minh đề tài", link: "7-2-1" },
                    { status: "Prototype", label: "7.2.2. Kiểm tra đề cương nghiên cứu/ Thuyết minh đề tài", link: "7-2-2a" },
                    {
                        label: "7.2.3. Thành lập hội đồng xét duyệt đề tài cấp cơ sở",
                        links: [
                            { status: "Prototype", label: "7.2.3.1. Danh sách thành viên hội đồng xét duyệt đề cương/ thuyết minh", link: "7-2-2-1" },
                            { status: "Prototype", label: "7.2.3.2. Phiếu chấm điểm thành viên hội đồng của đề cương/ thuyết minh", link: "7-2-2-2" },
                            { status: "Prototype", label: "7.2.3.3. Tổng hợp kết quả chấm điểm hội đồng xét duyệt đề cương/ thuyết minh đề tài sinh viên nghiên cứu", link: "7-2-2-3" }
                        ]
                    },
                    { status: "Prototype", label: "7.2.4. Hoàn thiện đề cương theo ý kiến góp ý của hội đồng", link: "7-2-3" },
                    { status: "Prototype", label: "7.2.5. Kiểm tra file hoàn thiện thuyết minh đề tài Sinh viên nghiên cứu", link: "7-2-4" },
                    { status: "Prototype", label: "7.2.6. Tổng hợp danh sách đề tài sinh viên nghiên cứu đã hoàn thiện đề cương/ thuyết minh", link: "7-2-5" },
                    { status: "Prototype", label: "7.2.7. Thanh toán thù lao hội đồng xét duyệt đề cương/ thuyết minh", link: "7-2-6" },
                    { status: "Prototype", label: "7.2.8. Quyết định giao đề tài cho Sinh viên nghiên cứu", link: "7-2-7" },
                ]
            },
            {
                label: "7.3. Giám sát thực hiện đề tài Sinh viên nghiên cứu",
                links: [
                    { status: "Prototype", label: "7.3.1. Báo cáo tiến độ và kết quả thực hiện", link: "7-3-1" },
                    { status: "Prototype", label: "7.3.2. Điều chỉnh đề tài", link: "7-3-2" },
                    { status: "Prototype", label: "7.3.3. Kiểm tra báo cáo tiến độ giữa kỳ", link: "7-3-3" },
                    { status: "Prototype", label: "7.3.4. Tổng hợp báo cáo kết quả giám sát thực hiện đề tài giữa kỳ", link: "7-3-4" }
                ]
            },
            {
                label: "7.4. Nghiệm thu đề tài Sinh viên nghiên cứu",
                links: [
                    {
                        label: "7.4.1. Thành lập hội đồng nghiệm thu đề tài",
                        links: [
                            { status: "Prototype", label: "7.4.1.1. Danh sách thành viên hội đồng nghiệm thu đề tài", link: "7-4-1-1" },
                            { status: "Prototype", label: "7.4.1.2. Phiếu chấm điểm thành viên hội đồng nghiệm thu đề tài", link: "7-4-1-2" },
                            { status: "Prototype", label: "7.4.1.3. Tổng hợp kết quả chấm điểm hội đồng nghiệm thu đề tài", link: "7-4-1-3" }
                        ]
                    },
                    { status: "Prototype", label: "7.4.2. Thanh toán thù lao hội đồng nghiệm thu đề tài", link: "7-4-2" },
                    { status: "Prototype", label: "7.4.3. Tổng hợp báo cáo kết quả nghiệm thu đề tài", link: "7-4-3" }
                ]
            }
        ]
    },
    {
        label: "8.Quản lý hoạt động Tổ chức hội thảo khoa học",
        links: [
            { status: "Prototype", label: "8.1 Tra cứu danh mục hội thảo khoa học", link: "8-1" },
            {
                label: "Đăng ký tổ chức hội thảo khoa học",
                links: [
                    { status: "Prototype", label: "8.2.1. Phiếu đăng ký tổ chức hội thảo", link: "8-2-1" },
                    { status: "Prototype", label: "8.2.2. Kiểm tra hồ sơ đăng ký hội thảo", link: "8-2-2" },
                    { status: "Prototype", label: "8.2.3. Phê duyệt kế hoạch tổ chức và dự toán chi phí", link: "8-2-3" },
                    { status: "Prototype", label: "8.2.4. Tổng hợp danh mục hội nghị hội thảo được phê duyệt", link: "8-2-4" },
                    { status: "Prototype", label: "8.2.5. Quyết định tổ chức hội nghị hội thảo", link: "8-2-5" }
                ]
            },
            {
                label: "Giám sát tiến độ thực hiện hội thảo khoa học",
                links: [
                    { status: "Prototype", label: "8.3.1. Thông báo giảng viên đăng ký tham dự hội thảo", link: "8-3-1" },
                    { status: "Prototype", label: "8.3.2. Danh sách đại biểu tham dự", link: "8-3-2" },
                    { status: "Prototype", label: "8.3.3. Báo cáo tiến độ và kết quả tổ chức hội nghị hội thảo", link: "8-3-3" }
                ]
            }
        ],
    },
    {
        label: "11. Danh mục hệ thống",
        links: [
            { label: "11.1 Danh mục vai trò", link: "11-1" },
            { status: "Prototype", label: "11.2 Danh mục nhân sự ngoài trường", link: "11-2" },
            { status: "Prototype", label: "11.3 Danh mục phân loại văn bản", link: "11-3" },
            { label: "11.4 Danh mục năm học", link: "11-4" },
            { label: "11.5 Danh mục lĩnh vực", link: "11-5" },
            { label: "11.6 Danh mục nhiệm vụ", link: "11-6" },
            { label: "11.7 Danh mục cấp đề tài", link: "11-7" },
            { label: "11.8 Danh mục loại đề tài", link: "11-8" }
        ],
    },

];
