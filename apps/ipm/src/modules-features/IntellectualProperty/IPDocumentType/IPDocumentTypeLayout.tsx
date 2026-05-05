'use client'
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import IPDocumentTypeCreate from "./IPDocumentTypeCreate";
import IPDocumentTypeDelete from "./IPDocumentTypeDelete";
import IPDocumentTypeUpdate from "./IPDocumentTypeUpdate";

export interface IPDocumentType {
    id: number;
    type: string;
    purpose: string;
    name: string;
    description: string;
    formats: string;
}

export default function IPDocumentTypeLayout() {

    const columns = useMemo<MRT_ColumnDef<IPDocumentType>[]>(() => [
        { header: "Loại hình SHTT", accessorKey: "type" },
        { header: "Giai đoạn / Mục đích", accessorKey: "purpose" },
        { header: "Tên loại tài liệu", accessorKey: "name" },
        { header: "Mô tả và Nội dung chính của tài liệu", accessorKey: "description" },
        { header: "Định dạng file thường dùng", accessorKey: "formats" },
    ], []);


    return (
        <MyFieldset title="Danh sách loại tài liệu quản lý Hồ sơ sở hữu trí tuệ" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <IPDocumentTypeCreate />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <IPDocumentTypeUpdate values={row.original} />
                            <IPDocumentTypeDelete id={row.original.id || 0} code={row.original.type} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


const mockData: IPDocumentType[] = [
  {
      type: "Bằng sáng chế / Giải pháp hữu ích",
      purpose: "Đăng ký / Nộp đơn",
      name: "Bản mô tả sáng chế / Giải pháp hữu ích",
      description: "Mô tả chi tiết về sáng chế (Tên; Lĩnh vực; Bối cảnh; Giải pháp kỹ thuật; Kết quả đạt được; Yêu cầu bảo hộ...). Là phần quan trọng nhất để thẩm định.",
      formats: "DOCX; PDF",
      id: 1
  },
  {
      type: "Bằng sáng chế / Giải pháp hữu ích",
      purpose: "Đăng ký / Nộp đơn",
      name: "Bản vẽ kỹ thuật",
      description: "Các hình vẽ minh họa cho sáng chế / Giải pháp hữu ích.",
      formats: "JPG; PNG; PDF; CAD",
      id: 2
  },
  {
      type: "Bằng sáng chế / Giải pháp hữu ích",
      purpose: "Đăng ký / Nộp đơn",
      name: "Đơn yêu cầu cấp bằng độc quyền",
      description: "Biểu mẫu chính thức theo quy định Cục SHTT.",
      formats: "PDF",
      id: 3
  },
  {
      type: "Bằng sáng chế / Giải pháp hữu ích",
      purpose: "Pháp lý / Xử lý",
      name: "Quyết định chấp nhận đơn hợp lệ hình thức",
      description: "Xác nhận đơn hợp lệ về mặt hình thức.",
      formats: "PDF",
      id: 4
  },
  {
      type: "Bằng sáng chế / Giải pháp hữu ích",
      purpose: "Pháp lý / Xử lý",
      name: "Công văn / Thông báo thẩm định nội dung",
      description: "Yêu cầu làm rõ; sửa đổi từ Cục SHTT.",
      formats: "PDF",
      id: 5
  },
  {
      type: "Bằng sáng chế / Giải pháp hữu ích",
      purpose: "Pháp lý / Xử lý",
      name: "Bằng độc quyền sáng chế / Giải pháp hữu ích",
      description: "Văn bằng pháp lý cao nhất; chứng nhận quyền độc quyền.",
      formats: "PDF (scan bản gốc)",
      id: 6
  },
  {
      type: "Bằng sáng chế / Giải pháp hữu ích",
      purpose: "Duy trì / Khai thác",
      name: "Biên lai nộp phí duy trì hiệu lực",
      description: "Chứng từ chứng minh đã nộp phí duy trì hàng năm/định kỳ.",
      formats: "PDF; JPG",
      id: 7
  },
  {
      type: "Bằng sáng chế / Giải pháp hữu ích",
      purpose: "Duy trì / Khai thác",
      name: "Hợp đồng chuyển giao công nghệ",
      description: "Thỏa thuận chuyển nhượng hoặc cấp li-xăng sáng chế.",
      formats: "DOCX; PDF",
      id: 8
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Đăng ký / Nộp đơn",
      name: "Bản sao tác phẩm",
      description: "Bản mềm của tác phẩm (văn học; nghệ thuật; khoa học); có thể là file Word; PDF; hình ảnh; âm thanh; video.",
      formats: "DOCX, PDF; JPG, MP3, MP4,...",
      id: 9
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Đăng ký / Nộp đơn",
      name: "Tờ khai đăng ký quyền tác giả/quyền liên quan",
      description: "Biểu mẫu chính thức theo quy định Bộ VHTT&DL.",
      formats: "PDF",
      id: 10
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Pháp lý / Xử lý",
      name: "Giấy chứng nhận đăng ký quyền tác giả",
      description: "Văn bằng chứng nhận quyền tác giả.",
      formats: "PDF (scan bản gốc)",
      id: 11
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Duy trì / Khai thác",
      name: "Hợp đồng li-xăng sử dụng tác phẩm",
      description: "Thỏa thuận cho phép sử dụng tác phẩm (xuất bản; biểu diễn; sao chép...).",
      formats: "DOCX; PDF",
      id: 12
  },
  {
      type: "Kiểu dáng công nghiệp",
      purpose: "Đăng ký / Nộp đơn",
      name: "Bản mô tả kiểu dáng công nghiệp",
      description: "Mô tả chi tiết các đặc điểm tạo nên kiểu dáng.",
      formats: "DOCX; PDF",
      id: 13
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Đăng ký / Nộp đơn",
      name: "Bộ ảnh/bản vẽ kiểu dáng",
      description: "Các hình ảnh hoặc bản vẽ thể hiện rõ kiểu dáng từ các góc độ khác nhau.",
      formats: "JPG; PNG; PDF; CAD",
      id: 14
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Pháp lý / Xử lý",
      name: "Bằng độc quyền kiểu dáng công nghiệp",
      description: "Văn bằng pháp lý chứng nhận quyền độc quyền kiểu dáng.",
      formats: "PDF (scan bản gốc)",
      id: 15
  },
  {
      type: "Nhãn hiệu",
      purpose: "Đăng ký / Nộp đơn",
      name: "Mẫu nhãn hiệu",
      description: "Hình ảnh của nhãn hiệu (logo; chữ; kết hợp...).",
      formats: "JPG; PNG; AI; EPS",
      id: 16
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Đăng ký / Nộp đơn",
      name: "Danh mục sản phẩm/dịch vụ",
      description: "Liệt kê chi tiết các sản phẩm, dịch vụ mà nhãn hiệu sẽ sử dụng.",
      formats: "DOCX; PDF",
      id: 17
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Pháp lý / Xử lý",
      name: "Giấy chứng nhận đăng ký nhãn hiệu",
      description: "Văn bằng chứng nhận quyền sở hữu nhãn hiệu.",
      formats: "PDF (scan bản gốc)",
      id: 18
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Duy trì / Khai thác",
      name: "Hợp đồng chuyển nhượng/li-xăng nhãn hiệu",
      description: "Thỏa thuận liên quan đến việc chuyển giao hoặc cho phép sử dụng nhãn hiệu.",
      formats: "DOCX; PDF",
      id: 19
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Duy trì / Khai thác",
      name: "Tài liệu Chung / Nội bộ",
      description: "Hành chính / Chứng minh; Biên bản họp Hội đồng Khoa học; Ghi lại các cuộc họp đánh giá; quyết định liên quan đến IP.",
      formats: "DOCX; PDF",
      id: 20
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Duy trì / Khai thác",
      name: "Nhật ký nghiên cứu/phát triển",
      description: "Ghi chép quá trình hình thành IP; bằng chứng về ngày tạo ra.",
      formats: "DOCX; PDF; XLS",
      id: 21
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Duy trì / Khai thác",
      name: "Quyết định phân công/giao nhiệm vụ",
      description: "Văn bản giao nhiệm vụ nghiên cứu; phát triển.",
      formats: "DOCX; PDF",
      id: 22
  },
  {
      type: "Bản quyền tác giả / Quyền liên quan đến quyền tác giả",
      purpose: "Duy trì / Khai thác",
      name: "Các văn bản pháp lý nội bộ",
      description: "Quy định của trường về sở hữu trí tuệ; phân chia lợi ích.",
      formats: "DOCX; PDF",
      id: 23
  },
];
