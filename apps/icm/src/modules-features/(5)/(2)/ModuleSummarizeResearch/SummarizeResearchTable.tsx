import { MyButtonViewPDF, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface ISummarizeResearch {
    proposalCode: string;      // Mã đề xuất
    topicName: string;         // Tên đề tài
    field: string;             // Lĩnh vực
    objective: string;         // Mục tiêu
    budget: string;            // Tổng kinh phí dự kiến
    requirement: string;       // Yêu cầu đối với kết quả
    plan: string;              // Dự kiến phương án ứng dụng
    time: number;              // Thời gian thực hiện (tháng)
    staffCode: string;         // Mã viên chức đăng ký
    staffName: string;         // Tên viên chức đăng ký
    department: string;        // Đơn vị đăng ký
    status: string;            // Trạng thái đề xuất
    file: string;      // File Phiếu đề xuất
}

const mockData: ISummarizeResearch[] = [
    {
        proposalCode: "DX2025001",
        topicName: "Nghiên cứu ứng dụng IoT trong quản lý tài sản nhà trường",
        file: "Xem file",
        field: "Công nghệ thông tin",
        objective: "Thiết lập hệ thống giám sát tài sản bằng IoT, giảm 15% thất thoát tài sản",
        budget: "150.000.000",
        requirement: "Hệ thống hoạt động ổn định, Báo cáo hiệu quả tiết kiệm chi phí, 01 bài báo hội nghị",
        plan: "Triển khai thí điểm tại Phòng Quản trị thiết bị, Lập trình phần mềm theo dõi trực tuyến",
        time: 12,
        staffCode: "VC001",
        staffName: "Nguyễn Văn A",
        department: "Khoa Công nghệ thông tin",
        status: "Chờ Hội đồng tư vấn xét duyệt"
    },
    {
        proposalCode: "DX2025002",
        topicName: "Phát triển mô hình năng lượng mặt trời tích hợp trong trường học",
        file: "Xem file",
        field: "Kỹ thuật điện, Môi trường",
        objective: "Thiết kế hệ thống NLMT tích hợp, Tiết kiệm 20% điện năng tiêu thụ cho tòa nhà",
        budget: "200.000.000",
        requirement: "Mô hình hoạt động hiệu quả, Báo cáo tính khả thi, 1 bài báo tạp chí chuyên ngành",
        plan: "Áp dụng cho các tòa nhà mới của trường, Đề xuất chính sách khuyến khích sử dụng NLMT",
        time: 18,
        staffCode: "VC002",
        staffName: "Trần Thị B",
        department: "Khoa Kỹ thuật Điện",
        status: "Đã duyệt"
    },
    {
        proposalCode: "DX2025003",
        topicName: "Nghiên cứu về ảnh hưởng của mạng xã hội đến tâm lý sinh viên",
        file: "Xem file",
        field: "Khoa học xã hội, Tâm lý học",
        objective: "Đánh giá mức độ ảnh hưởng tiêu cực của mạng xã hội, Đề xuất giải pháp hỗ trợ cho sinh viên",
        budget: "80.000.000",
        requirement: "Báo cáo khảo sát chi tiết, Bộ tài liệu hướng dẫn tâm lý",
        plan: "Xây dựng chương trình tư vấn tâm lý cho sinh viên, Cung cấp tài liệu cho sinh viên",
        time: 10,
        staffCode: "VC003",
        staffName: "Lê Văn C",
        department: "Khoa Khoa học Xã hội",
        status: "Bị từ chối"
    },
    {
        proposalCode: "DX2025004",
        topicName: "Nghiên cứu các giải pháp giảm thiểu rác thải nhựa trong trường học",
        file: "Xem file",
        field: "Môi trường",
        objective: "Đề xuất giải pháp thiết kế và sử dụng vật liệu thay thế nhựa, Nâng cao nhận thức sinh viên",
        budget: "100.000.000",
        requirement: "Báo cáo khảo sát thực trạng, Bộ quy tắc giảm nhựa, 01 chiến dịch truyền thông",
        plan: "Thí điểm tại một khu vực, Đề xuất áp dụng cho toàn trường",
        time: 14,
        staffCode: "VC004",
        staffName: "Phạm Thị D",
        department: "Khoa Môi trường",
        status: "Yêu cầu điều chỉnh sơ bộ"
    },
    {
        proposalCode: "DX2025005",
        topicName: "Phân tích tác động của biến đổi khí hậu đến nông nghiệp địa phương",
        file: "Xem file",
        field: "Nông nghiệp",
        objective: "Phân tích hiện trạng, Đề xuất giải pháp thích ứng cho cây trồng",
        budget: "120.000.000",
        requirement: "Báo cáo định tính toàn diện, Mô hình thử nghiệm, Đề xuất chính sách địa phương",
        plan: "Hợp tác với Sở Nông nghiệp, Cung cấp tài liệu cho nông dân",
        time: 16,
        staffCode: "VC005",
        staffName: "Hoàng Thị E",
        department: "Khoa Nông nghiệp",
        status: "Chờ kiểm tra sơ bộ"
    }
];


export default function SummarizeResearchTable() {
    const columns = useMemo<MRT_ColumnDef<ISummarizeResearch>[]>(() => [
        { header: "Mã đề xuất", accessorKey: "proposalCode" },
        { header: "Tên đề tài", accessorKey: "topicName" },
        { header: "Lĩnh vực", accessorKey: "field" },
        { header: "Mục tiêu", accessorKey: "objective" },
        { header: "Tổng kinh phí đề xuất", accessorKey: "budget" },
        { header: "Yêu cầu đối với kết quả", accessorKey: "requirement" },
        { header: "Dự kiến phương án ứng dụng", accessorKey: "plan" },
        { header: "Thời gian thực hiện (tháng)", accessorKey: "time" },
        { header: "Mã viên chức đăng ký", accessorKey: "staffCode" },
        { header: "Tên viên chức đăng ký", accessorKey: "staffName" },
        { header: "Đơn vị đăng ký", accessorKey: "department" },
        { header: "Trạng thái đề xuất", accessorKey: "status" },
        { header: "File Phiếu đề xuất", accessorKey: "file", accessorFn: (row) => <MyButtonViewPDF /> },
    ], []);

    return (
        <MyFieldset title={"Danh sách đề xuất nghiên cứu"}>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={columns}
                data={mockData}
                exportAble={true}
                initialState={{
                    columnPinning: { right: ['status'] }
                }}
            />
        </MyFieldset>
    );
}
