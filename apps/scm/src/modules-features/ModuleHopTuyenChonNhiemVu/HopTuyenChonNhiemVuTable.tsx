'use client'
import { Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonViewPDF, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import HopTuyenChonNhiemVuUpdate from "./HopTuyenChonNhiemVuUpdate";
import { HopTuyenChonNhiemVuViewModel } from "./interfaces/HopTuyenChonNhiemVuViewModel";

export default function HopTuyenChonNhiemVuTable() {
    const Query = useQuery({
        queryKey: ['DanhSachHoSoDangKyTuyenChonTable'],
        queryFn: () => {
            return mockData
        }
    })

    const columns = useMemo<MRT_ColumnDef<HopTuyenChonNhiemVuViewModel>[]>(() => [
        {
            header: "Mã hội đồng",
            accessorKey: "hoiDong.code",
            accessorFn(originalRow) {
                return originalRow.hoiDong?.code
            },
        },
        {
            header: "Tên hội đồng",
            accessorKey: "hoiDong.name",
            accessorFn(originalRow) {
                return originalRow.hoiDong?.name
            },
            size: 300
        },
        {
            header: "Ngày họp",
            accessorKey: "hoiDong.meetingDate",
            accessorFn(originalRow) {
                return originalRow.hoiDong?.meetingDate
            },
        },
        {
            header: "Mã đăng ký",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
            size: 300
        },
        {
            header: "Lĩnh vực",
            accessorKey: "field",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leader",
        },
        {
            header: "Đánh giá phù hợp",
            accessorKey: "score",
            accessorFn(originalRow) {
                return originalRow.score + "/5"
            }
        },
        {
            header: "Đánh giá của hội đồng",
            accessorKey: "suitability",
        },
        {
            header: "Kiến nghị/Nhận xét",
            accessorKey: "comment",
            size: 300
        },
        {
            header: "File hồ sơ hội đồng",
            accessorKey: "file",
            accessorFn(originalRow) {
                return <MyButtonViewPDF />
            },
        },
    ], [])

    return (
        <MyFieldset
            title="Danh sách đăng ký tuyển chọn"
        >
            <MyDataTable
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={false}
                data={Query.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return <>
                        <MyButton crudType="export" />
                    </>
                }}
                renderRowActions={({ row }) => {
                    return <Flex gap={8} justify="center">
                        <HopTuyenChonNhiemVuUpdate data={row.original} />
                    </Flex>
                }}
            />
        </MyFieldset>
    );
}

const mockData: HopTuyenChonNhiemVuViewModel[] = [
    {
        id: 1,
        code: "DKTC2025001",
        name: "Nghiên cứu phát triển vật liệu composite mới chịu nhiệt cao",
        field: "Vật liệu tiên tiến",
        leader: "Nguyễn Văn A",
        suitability: "Phù hợp",
        score: 4,
        comment: "Đề tài có tính khả thi cao; cần bổ sung thêm kế hoạch truyền thông",
        pathFile: "de-tai-1.pdf",
        hoiDong: {
            id: 1,
            code: "HDTC2025001",
            name: "Hội đồng TV tuyển chọn nhiệm vụ KH&CN cấp cơ sở lần 1/2025",
            meetingDate: "25/08/2025"
        }
    },
    {
        id: 2,
        code: "DKTC2025002",
        name: "Ứng dụng AI trong phân tích dữ liệu y tế",
        field: "Công nghệ thông tin; Y sinh",
        leader: "Trần Thị B",
        suitability: "Phù hợp",
        score: 3,
        comment: "Mô hình ứng dụng rõ ràng. cần làm rõ thêm về nguồn lực triển khai",
        pathFile: "de-tai-2.pdf",
        hoiDong: {
            id: 1,
            code: "HDTC2025001",
            name: "Hội đồng TV tuyển chọn nhiệm vụ KH&CN cấp cơ sở lần 1/2025",
            meetingDate: "25/08/2025"
        }
    },
    {
        id: 3,
        code: "DKTC2025003",
        name: "Đánh giá hiệu quả các biện pháp giảm ô nhiễm không khí tại thành phố X",
        field: "Môi trường; Khoa học xã hội",
        leader: "Lê Văn C",
        suitability: "Không phù hợp",
        score: 2,
        comment: "Phần kinh phí chưa được giải trình chi tiết; yêu cầu làm rõ hiệu quả kinh tế xã hội.",
        pathFile: "de-tai-3.pdf",
        hoiDong: {
            id: 1,
            code: "HDTC2025001",
            name: "Hội đồng TV tuyển chọn nhiệm vụ KH&CN cấp cơ sở lần 1/2025",
            meetingDate: "25/08/2025"
        }
    },
    {
        id: 4,
        code: "DKTC2025004",
        name: "Nghiên cứu về tác động của mạng xã hội đến hành vi tiêu dùng của giới trẻ",
        field: "Kinh tế; Tâm lý học",
        leader: "Phạm Thị D",
        suitability: "Phù hợp",
        score: 5,
        comment: "Nghiên cứu có tính đột phá, tiềm năng ứng dụng cao.",
        pathFile: "de-tai-4.pdf",
        hoiDong: {
            id: 2,
            code: "HDTC2025002",
            name: "Hội đồng TV tuyển chọn nhiệm vụ KH&CN cấp cơ sở lần 2/2025",
            meetingDate: "10/09/2025"
        }
    },
    {
        id: 5,
        code: "DKTC2025005",
        name: "Phát triển hệ thống giám sát nông nghiệp thông minh sử dụng IoT",
        field: "Nông nghiệp; Công nghệ thông tin",
        leader: "Hoàng Minh E",
        suitability: "Phù hợp",
        score: 4,
        comment: "Hồ sơ đầy đủ, cần chi tiết hơn về công nghệ IoT cụ thể sẽ sử dụng",
        pathFile: "de-tai-5.pdf",
        hoiDong: {
            id: 2,
            code: "HDTC2025002",
            name: "Hội đồng TV tuyển chọn nhiệm vụ KH&CN cấp cơ sở lần 2/2025",
            meetingDate: "10/09/2025"
        }
    }
]
