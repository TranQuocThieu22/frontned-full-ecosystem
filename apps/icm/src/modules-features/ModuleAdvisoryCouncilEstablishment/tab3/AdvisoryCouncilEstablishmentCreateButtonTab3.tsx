

import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function AdvisoryCouncilEstablishmentCreateButtonTab3() {
    const dis = useDisclosure();


    const AdvisoryCouncilEstablishmentCreateButtonTab3 = useQuery<
        IProjectProposalData[]
    >({
        queryKey: ["AdvisoryCouncilEstablishmentCreateButtonTab3Data"],
        queryFn: async () => {
            return extendedStaffSampleData;
        },
        refetchOnWindowFocus: false,
    });

    const staffColumns: MRT_ColumnDef<IProjectProposalData>[] = useMemo(() => [

        { header: "Mã đề xuất", accessorKey: "proposalCode" },
        { header: "Tên đề tài", accessorKey: "projectName" },
        { header: "File phiếu đề xuất", accessorKey: "proposalFile" },
        { header: "Lĩnh vực", accessorKey: "field" },
        { header: "Mục tiêu", accessorKey: "objectives" },
        { header: "Tổng kinh phí dự kiến", accessorKey: "expectedTotalBudget" },
        { header: "Yêu cầu kết quả", accessorKey: "requirementsResults" },
        { header: "Đề xuất phương án ứng dụng", accessorKey: "application" },
        { header: "Thời gian thực hiện (tháng)", accessorKey: "durationMonths" },
        { header: "Mã viên chức đăng ký", accessorKey: "registeredStaffCode" },
        { header: "Tên viên chức đăng ký", accessorKey: "registeredStaffName" },
        { header: "Đơn vị đăng ký", accessorKey: "registeredUnit" },
        { header: "Trạng thái đề xuất", accessorKey: "projectStatus" },
    ], []);

    return (
        <MyButtonModal
            modalSize={"100%"}
            label="Thêm"
            title="Danh sách đề xuất"
            onSubmit={() => { }} disclosure={dis}        >
            <MyDataTable
                isError={AdvisoryCouncilEstablishmentCreateButtonTab3.isError}
                isLoading={AdvisoryCouncilEstablishmentCreateButtonTab3.isLoading}
                exportAble={false}
                enableRowSelection={true}
                columns={staffColumns}
                data={AdvisoryCouncilEstablishmentCreateButtonTab3.data || []}
                renderTopToolbarCustomActions={() => (<MyButton> Chọn</MyButton>)}
            />
        </MyButtonModal >

    );
}

interface IProjectProposalData {
    id: number;
    proposalCode: string;
    projectName: string;
    proposalFile: string; // "File phiếu đề xuất" trong image_e579f9.png, không có trong 2 ảnh này
    field: string; // "Lĩnh vực"
    objectives: string; // "Mục tiêu"
    expectedTotalBudget: string; // "Tổng kinh phí dự kiến"
    requirementsResults: string; // "Yêu cầu kết quả" trong image_e579f9.png, hoặc "Nhận xét kiểm tra sơ bộ" có thể là một phần của nó
    application: string; // "Đề xuất phương án ứng dụng"
    durationMonths: number; // "Thời gian thực hiện (tháng)"
    registeredStaffCode: string; // "Mã viên chức đăng ký"
    registeredStaffName: string; // "Tên viên chức đăng ký"
    registeredUnit: string; // "Đơn vị đăng ký"
    projectStatus: string; // "Trạng thái đề xuất"
}


export const extendedStaffSampleData: IProjectProposalData[] = [
    {
        id: 1,
        proposalCode: "DX2025001",
        projectName: "Nghiên cứu ứng dụng Blockchain trong quản lý văn bằng chứng chỉ",
        proposalFile: "N/A", // Không có trong các ảnh này
        field: "Công nghệ thông tin",
        objectives: "Xây dựng prototype hệ thống xác thực văn bằng dùng Blockchain. Đánh giá tính khả thi ứng dụng",
        expectedTotalBudget: "180,000,000",
        requirementsResults: "Hồ sơ đầy đủ, đúng phương pháp định hướng nghiên cứu rõ ràng", // "Nhận xét kiểm tra sơ bộ"
        application: "Triển khai thử nghiệm tại Phòng Đào tạo, Mở rộng học tại các trường khác",
        durationMonths: 12, // Giả định từ image_e579f9.png
        registeredStaffCode: "VC001",
        registeredStaffName: "Nguyễn Văn A",
        registeredUnit: "Khoa Công nghệ thông tin",
        projectStatus: "Chờ Hội đồng tư vấn kết duyệt", // Từ "Trạng thái đề xuất"
    },
    {
        id: 2,
        proposalCode: "DX2025002",
        projectName: "Phát triển mô hình dự báo sinh viên bỏ học sớm sử dụng Machine Learning",
        proposalFile: "N/A",
        field: "Khoa học xã hội",
        objectives: "Giảm thiểu tỷ lệ sinh viên bỏ học. Cung cấp công cụ hỗ trợ cán bộ tư vấn",
        expectedTotalBudget: "120,000,000",
        requirementsResults: "Thiếu mô hình chung, cần bổ sung mục tiêu cụ thể và phương pháp rõ ràng",
        application: "Tích hợp vào hệ thống quản lý sinh viên; Cung cấp dữ liệu cho Phòng Công tác Sinh viên",
        durationMonths: 18, // Giả định từ image_e579f9.png
        registeredStaffCode: "VC002",
        registeredStaffName: "Trần Thị B",
        registeredUnit: "Phòng Tổ chức Cán bộ", // Giả định, không rõ trong ảnh
        projectStatus: "Chờ Hội đồng tư vấn kết duyệt",
    },
    {
        id: 3,
        proposalCode: "DX2025003",
        projectName: "Nghiên cứu giải pháp tiết kiệm năng lượng cho hệ thống chiếu sáng trong giảng đường",
        proposalFile: "N/A",
        field: "Kỹ thuật",
        objectives: "Giảm tiêu thụ năng lượng điện. Đề xuất công nghệ chiếu sáng thông minh",
        expectedTotalBudget: "90,000,000",
        requirementsResults: "Mục tiêu không rõ ràng, tính chi tiết chưa cao so với các đề xuất khác",
        application: "Triển khai thí điểm tại một số giảng đường. Đề xuất ứng dụng rộng rãi",
        durationMonths: 10, // Giả định từ image_e579f9.png
        registeredStaffCode: "VC003",
        registeredStaffName: "Lê Văn C",
        registeredUnit: "Khoa Kỹ thuật Điện", // Giả định
        projectStatus: "Chờ Hội đồng tư vấn kết duyệt",
    },
    {
        id: 4,
        proposalCode: "DX2025004",
        projectName: "Phân tích tác động của biến đổi khí hậu đến nông nghiệp địa phương",
        proposalFile: "N/A",
        field: "Nông nghiệp",
        objectives: "Đánh giá ảnh hưởng của biến đổi khí hậu. Đề xuất giải pháp thích ứng cho cây trồng",
        expectedTotalBudget: "100,000,000",
        requirementsResults: "Hồ sơ đầy đủ, yêu cầu của trình Hội đồng",
        application: "Đề xuất chính sách cho địa phương, những nông dân đa dạng",
        durationMonths: 12, // Giả định từ image_e579f9.png
        registeredStaffCode: "VC004",
        registeredStaffName: "Hoàng Thị D",
        registeredUnit: "Khoa Nông nghiệp", // Giả định
        projectStatus: "Chờ Hội đồng tư vấn kết duyệt",
    },
    {
        id: 5,
        proposalCode: "DX2025005",
        projectName: "Thiết kế hệ thống quản lý tài liệu điện tử cho Phòng Đào tạo",
        proposalFile: "N/A",
        field: "Công nghệ thông tin",
        objectives: "Số hóa tài liệu, Tối ưu hóa quy trình tìm kiếm và quản lý",
        expectedTotalBudget: "75,000,000",
        requirementsResults: "Đề xuất khả thi về tính ứng dụng cao, đủ thông tin sơ bộ",
        application: "Triển khai toàn bộ tại Phòng Đào tạo, Mở rộng ra các phòng ban khác",
        durationMonths: 10, // Giả định từ image_e579f9.png
        registeredStaffCode: "VC005",
        registeredStaffName: "Phạm Văn E",
        registeredUnit: "Phòng Đào tạo",
        projectStatus: "Chờ Hội đồng tư vấn kết duyệt",
    },
    {
        id: 6,
        proposalCode: "DX2025006",
        projectName: "Nghiên cứu về tâm lý học hành vi của sinh viên trong môi trường số",
        proposalFile: "N/A",
        field: "Tâm lý học",
        objectives: "Hiểu rõ hành vi sinh viên online. Đề xuất chiến lược hỗ trợ tâm lý phù hợp",
        expectedTotalBudget: "60,000,000",
        requirementsResults: "Giải pháp không thật sự liên quan tới bối cảnh trường, kinh phí chưa hợp lý",
        application: "Xây dựng tài liệu cho sinh viên, Tổ chức workshop cho sinh viên",
        durationMonths: 8, // Giả định từ image_e579f9.png
        registeredStaffCode: "VC006",
        registeredStaffName: "Nguyễn Thị G",
        registeredUnit: "Khoa Tâm lý", // Giả định
        projectStatus: "Chờ Hội đồng tư vấn kết duyệt",
    },
];