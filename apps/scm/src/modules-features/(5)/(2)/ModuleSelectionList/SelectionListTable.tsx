import { MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SelectionListUpdate from "./SelectionListUpdate";

export interface ISelectionList {
    councilCode: string;                // Mã Hội đồng
    councilName: string;                // Tên Hội đồng
    meetingDate: string;                // Ngày họp
    proposalCode: string;               // Mã đề xuất
    topicName: string;                  // Tên đề tài
    field: string;                      // Lĩnh vực
    staffCode: string;                  // Mã viên chức đăng ký
    staffName: string;                  // Tên viên chức đăng ký
    status: string;            // Trạng thái xuất trước họp
    proposalStatus: string;      // Trạng thái đề nghị của Hội đồng
    proposal: string; // Kiến nghị thực hiện
    adjustment: string;  // Yêu cầu điều chỉnh 
    file: string; // Phiếu nhận xét
}

const mockData: ISelectionList[] = [
    {
        councilCode: "HDĐM0205001",
        councilName: "Hội đồng TV xác định danh mục NV KH&CN tiềm ẩn 1/2025",
        meetingDate: "15/07/2025",
        proposalCode: "DX0205001",
        topicName: "Nghiên cứu ứng dụng Blockchain trong quản lý chuỗi cung ứng",
        field: "Công nghệ thông tin",
        staffCode: "VC001",
        staffName: "Nguyễn Văn A",
        status: "Chờ Hội đồng tư vấn xét duyệt",
        proposalStatus: "Đề nghị thực hiện",
        proposal: "5/5",
        adjustment: "Đề tài có tính cấp thiết cao, phù hợp với định hướng phát triển của trường. Cần làm rõ hướng phát triển của trường, thu thập dữ liệu, bổ sung khảo sát thực tế nông dân",
        file: "Xem file",
    },
    {
        councilCode: "HDĐM0205001",
        councilName: "Hội đồng TV xác định danh mục NV KH&CN tiềm ẩn 1/2025",
        meetingDate: "15/07/2025",
        proposalCode: "DX0205002",
        topicName: "Phát triển hệ thống cảnh báo sớm lũ lụt dựa trên AI",
        field: "Nông nghiệp",
        staffCode: "VC004",
        staffName: "Hoàng Thị D",
        status: "Chờ Hội đồng tư vấn xét duyệt",
        proposalStatus: "Đề nghị thực hiện với các điều chỉnh",
        proposal: "5/5",
        adjustment: "Đề tài quá lớn so với thời gian thực hiện có thể cần thu hẹp phạm vi đề tài. Yêu cầu kinh phí không phù hợp với quy mô đề tài",
        file: "Xem file",
    },
    {
        councilCode: "HDĐM0205001",
        councilName: "Hội đồng TV xác định danh mục NV KH&CN tiềm ẩn 1/2025",
        meetingDate: "15/07/2025",
        proposalCode: "DX0205003",
        topicName: "Phát triển hệ thống quản lý thông minh cho nông nghiệp",
        field: "Kỹ thuật; Môi trường",
        staffCode: "VC007",
        staffName: "Đặng Thị H",
        status: "Chờ Hội đồng tư vấn xét duyệt",
        proposalStatus: "Đề nghị không thực hiện",
        proposal: "5/5",
        adjustment: "Kết luận không khả thi về nguồn lực",
        file: "Xem file",
    }
];


export default function SelectionListTable() {
    const columns = useMemo<MRT_ColumnDef<ISelectionList>[]>(() => [
        { header: "Mã Hội đồng", accessorKey: "councilCode" },
        { header: "Tên Hội đồng", accessorKey: "councilName" },
        { header: "Ngày họp", accessorKey: "meetingDate" },
        { header: "Mã đề xuất", accessorKey: "proposalCode" },
        { header: "Tên đề tài", accessorKey: "topicName" },
        { header: "Lĩnh vực", accessorKey: "field" },
        { header: "Mã viên chức đăng ký", accessorKey: "staffCode" },
        { header: "Tên viên chức đăng ký", accessorKey: "staffName" },
        { header: "Trạng thái xuất trước họp", accessorKey: "status" },
        { header: "Trạng thái đề nghị của Hội đồng", accessorKey: "proposalStatus" },
        { header: "Kiến nghị thực hiện", accessorKey: "proposal" },
        { header: "Yêu cầu điều chỉnh", accessorKey: "adjustment" },
        { header: "File nhận xét", accessorKey: "file", accessorFn: (row) => <MyButtonViewPDF /> },
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
                        <SelectionListUpdate values={row.original} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}
