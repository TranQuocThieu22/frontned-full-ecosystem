import { MyButtonViewPDF, MyCenterFull, MyCheckbox, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CheckResearchUpdate from "./CheckResearchUpdate";

export interface ICheckResearch {
    proposalCode: string;           // Mã đề xuất
    topicName: string;              // Tên đề tài
    attachedFile: string;           // File Phụ đính kèm (URL hoặc tên file)
    field: string;                  // Lĩnh vực
    objective: string;                // Mục tiêu
    budget: string;         // Tổng kinh phí đề xuất
    requirement: string;      // Yêu cầu đối với kết quả
    plan: string;        // Dự kiến phương án ứng dụng
    time: number;         // Thời gian thực hiện (tháng)
    staffCode: string;              // Mã viên chức đăng ký
    staffName: string;              // Tên viên chức đăng ký
    department: string;             // Đơn vị đăng ký
    review: string;      // Nhận xét kiểm tra sơ bộ
    notificationSent: boolean;      // Đã gửi thông báo
    status: string;         // Trạng thái đề xuất
}

const mockData: ICheckResearch[] = [
    {
        proposalCode: "DX2025001",
        topicName: "Nghiên cứu ứng dụng IoT trong quản lý tài sản nhà trường",
        attachedFile: "Xem file",
        field: "Công nghệ thông tin",
        objective: "Thiết lập hệ thống giám sát tài sản bằng IoT. Đảm bảo tính bảo mật, tiết kiệm chi phí.",
        budget: "150.000.000",
        requirement: "Hệ thống hoạt động ổn định; Báo cáo hiệu quả tiết kiệm chi phí; 01 bài báo hội nghị",
        plan: "Triển khai thí điểm tại Phòng Quản trị thiết bị, Lập trình phần mềm trên nền tảng web",
        time: 12,
        staffCode: "VC001",
        staffName: "Nguyễn Văn A",
        department: "Khoa Công nghệ thông tin",
        review: "",
        notificationSent: false,
        status: "Chờ kiểm tra sơ bộ"
    },
    {
        proposalCode: "DX2025002",
        topicName: "Phát triển mô hình năng lượng mặt trời tích hợp trong trường học",
        attachedFile: "Xem file",
        field: "Kỹ thuật điện; Môi trường",
        objective: "Xây dựng mô hình NLMT, tiết kiệm 20% điện năng tiêu thụ, giảm phát thải CO2, an toàn điện",
        budget: "200.000.000",
        requirement: "Mô hình hoạt động hiệu quả; Báo cáo tính khả thi kinh tế; 01 bài báo tạp chí chuyên ngành",
        plan: "Lắp đặt demo cho khối mới của trường, Xây dựng chính sách khuyến khích sử dụng NLMT",
        time: 18,
        staffCode: "VC002",
        staffName: "Trần Thị B",
        department: "Khoa Kỹ thuật Điện",
        review: "Hồ sơ thiếu 1 số minh chứng về kinh nghiệm của nhóm",
        notificationSent: true,
        status: "Yêu cầu điều chỉnh sơ bộ"
    },
    {
        proposalCode: "DX2025003",
        topicName: "Nghiên cứu và ứng dụng các mạng học sâu xử lý dữ liệu văn bản lớn",
        attachedFile: "Xem file",
        field: "Khoa học xã hội; Tâm lý học",
        objective: "Đánh giá độ chính xác nhận thức của mô hình, Dự đoán sản phẩm học tập, Ứng dụng phân tích dữ liệu lớn",
        budget: "80.000.000",
        requirement: "Báo cáo khảo sát chi tiết; Bộ tài liệu hướng dẫn tâm lý; 01 hội thảo chuyên đề",
        plan: "Xây dựng hệ thống trích xuất văn bản tự động, Cung cấp tài liệu cho sinh viên",
        time: 10,
        staffCode: "VC003",
        staffName: "Lê Văn C",
        department: "Khoa Khoa học Xã hội",
        review: "Đề tài phù hợp định hướng, hồ sơ đầy đủ",
        notificationSent: true,
        status: "Chờ Hội đồng tư vấn xét duyệt"
    },
    {
        proposalCode: "DX2025004",
        topicName: "Nghiên cứu các giải pháp giảm hiệu ứng tiêu thụ nhựa trong trường học",
        attachedFile: "Xem file",
        field: "Môi trường",
        objective: "Đề xuất các giải pháp thiết kế và sử dụng vật liệu sinh học, Nâng cao nhận thức của sinh viên",
        budget: "100.000.000",
        requirement: "Báo cáo khảo sát thực trạng; Bộ quy tắc giảm rác thải; 01 chiến dịch truyền thông",
        plan: "Thí điểm tại một khu vực, Đề xuất áp dụng cho toàn trường",
        time: 14,
        staffCode: "VC004",
        staffName: "Phạm Thị D",
        department: "Khoa Môi trường",
        review: "",
        notificationSent: false,
        status: "Chờ kiểm tra sơ bộ"
    }
];

export default function CheckResearchTable() {
    const columns = useMemo<MRT_ColumnDef<ICheckResearch>[]>(() => [
        { header: "Mã đề xuất", accessorKey: "proposalCode" },
        { header: "Tên đề tài", accessorKey: "topicName" },
        { header: "File Phụ đính kèm", accessorKey: "attachedFile", accessorFn: (row) => <MyButtonViewPDF /> },
        { header: "Lĩnh vực", accessorKey: "field" },
        { header: "Mục tiêu", accessorKey: "objective" },
        { header: "Tổng kinh phí đề xuất", accessorKey: "budget" },
        { header: "Yêu cầu đối với kết quả", accessorKey: "requirement" },
        { header: "Dự kiến phương án ứng dụng", accessorKey: "plan" },
        { header: "Thời gian thực hiện (tháng)", accessorKey: "time" },
        { header: "Mã viên chức đăng ký", accessorKey: "staffCode" },
        { header: "Tên viên chức đăng ký", accessorKey: "staffName" },
        { header: "Đơn vị đăng ký", accessorKey: "department" },
        { header: "Nhận xét kiểm tra sơ bộ", accessorKey: "review" },
        { header: "Đã gửi thông báo", accessorKey: "notificationSent", accessorFn: (row) => <MyCheckbox checked={row.notificationSent} /> },
        { header: "Trạng thái đề xuất", accessorKey: "status" },
    ], []);

    return (
        <MyFieldset title={"Danh sách đề xuất nghiên cứu"}>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={columns}
                data={mockData}
                exportAble={true}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <CheckResearchUpdate values={row.original} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}
