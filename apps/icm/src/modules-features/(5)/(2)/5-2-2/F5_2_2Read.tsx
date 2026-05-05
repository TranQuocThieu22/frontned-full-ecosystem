'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyButtonViewPDF, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_2_2Create from "./F5_2_2Create";
import F5_2_2Delete from "./F5_2_2Delete";
import F5_2_2DeleteList from "./F5_2_2DeleteList";
import F5_2_2Update from "./F5_2_2Update";
import { F5_2_2ViewDetailButton } from "./F5_2_2ViewDetailButton";
import { IF5_2_2 } from "./interface/F5_2_2ViewModel";



export default function F5_2_2Read() {
    const form = useForm({
        initialValues: {
        }
    })
    const query = useQuery<IF5_2_2[]>({
        queryKey: [`F5_2_2Read`],
        queryFn: async () => sampleData
    })

    const columns = useMemo<MRT_ColumnDef<IF5_2_2>[]>(
        () => [
            { header: "Mã đề xuất", accessorKey: "proposalCode" },
            { header: "Tên đề tài", accessorKey: "projectName" },
            { header: "File phiếu đề xuất", accessorKey: "proposalFile", accessorFn: (row) => <MyCenterFull><MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} /></MyCenterFull> },
            { header: "Lĩnh vực", accessorKey: "field" },
            { header: "Mục tiêu", accessorKey: "objectives" },
            { header: "Tổng kinh phí dự kiến", accessorKey: "expectedTotalBudget" },
            { header: "Yêu cầu đối với kết quả", accessorKey: "requirementsResults" },
            { header: "Dự kiến phương án ứng dụng", accessorKey: "application" },
            { header: "Thời gian thực hiện (tháng)", accessorKey: "durationMonths" },
            { header: "Mã viên chức đăng ký", accessorKey: "registeredStaffCode" },
            { header: "Tên viên chức đăng ký", accessorKey: "registeredStaffName" },
            { header: "Đơn vị đăng ký", accessorKey: "registeredUnit" },
            { header: "Trạng thái Đề xuất", accessorKey: "projectStatus" },

        ],
        []
    );


    return (
        <MyDataTable
            isError={query.isError}
            isLoading={query.isLoading}
            columns={columns}
            data={query.data || []}
            enableRowSelection
            exportAble
            renderTopToolbarCustomActions={({ table }) => <Group>
                <F5_2_2Create />
                <AQButtonCreateByImportFile form={form} onSubmit={() => { }} />
                <F5_2_2DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
            </Group>
            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F5_2_2ViewDetailButton values={row.original} />
                        <F5_2_2Update values={row.original} />
                        <F5_2_2Delete code={row.original.proposalCode!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

export const sampleData: IF5_2_2[] = [
    {
        id: 1,
        proposalCode: "DX2025001",
        projectName: "Nghiên cứu ứng dụng IoT trong quản lý tài sản nhà trường",
        proposalFile: "Xem file",
        field: "Công nghệ thông tin",
        objectives: "Thiết kế hệ thống giám sát tài sản bằng IoT. Giảm 15% thất thoát tài sản",
        expectedTotalBudget: "150,000,000",
        requirementsResults: "Hệ thống hoạt động ổn định; Báo cáo hiệu quả tiết kiệm chi phí; 01 bài báo hội nghị",
        application: "Triển khai thí điểm tại Phòng Quản trị thiết bị; Đề xuất nhân rộng cho toàn trường",
        durationMonths: 12,
        registeredStaffCode: "VC001", // Dữ liệu giả định
        registeredStaffName: "Nguyễn Văn A",
        registeredUnit: "Khoa Công nghệ thông tin",
        projectStatus: "Chờ Kiểm Tra Sơ Bộ",

    },
    {
        id: 2,
        proposalCode: "DX2025002",
        projectName: "Phát triển mô hình năng lượng mặt trời tích hợp trong tòa nhà",
        proposalFile: "Xem file",
        field: "Kỹ thuật điện, Môi trường",
        objectives: "Thiết kế mô hình NLMT tích hợp; Tiết kiệm 20% điện năng tiêu thụ cho tòa nhà",
        expectedTotalBudget: "200,000,000",
        requirementsResults: "Mô hình hoạt động hiệu quả; Báo cáo tính khả thi kinh tế; 01 bài báo tạp chí chuyên ngành",
        application: "Áp dụng cho các tòa nhà mới của trường. Đề xuất chính sách khuyến khích sử dụng NLMT",
        durationMonths: 18,
        registeredStaffCode: "VC002", // Dữ liệu giả định
        registeredStaffName: "Trần Thị B",
        registeredUnit: "Khoa Kỹ thuật Điện",
        projectStatus: "Nháp",

    },
    {
        id: 3,
        proposalCode: "DX2025003",
        projectName: "Nghiên cứu về ảnh hưởng của mạng xã hội đến tâm lý sinh viên",
        proposalFile: "",
        field: "Khoa học Xã hội, Tâm lý học",
        objectives: "Đánh giá mức độ ảnh hưởng tiêu cực của MXH. Đề xuất giải pháp hỗ trợ tâm lý sinh viên",
        expectedTotalBudget: "80,000,000",
        requirementsResults: "Báo cáo khảo sát chi tiết; Bộ tài liệu hướng dẫn tâm lý; 01 hội thảo chuyên đề",
        application: "Xây dựng chương trình tư vấn tâm lý học đường. Cung cấp tài liệu cho sinh viên",
        durationMonths: 10,
        registeredStaffCode: "VC003", // Dữ liệu giả định
        registeredStaffName: "Lê Văn C",
        registeredUnit: "Khoa Khoa học Xã hội",
        projectStatus: "Chờ Kiểm Tra Sơ Bộ",

    },
]