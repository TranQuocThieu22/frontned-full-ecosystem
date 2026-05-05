import { Modal, ModalProps, Text } from "@mantine/core";
import { MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    code?: string,
    content?: string,
    choice?: string
}
interface IProps extends ModalProps { }


export default function ViewDetailTestModal({ ...rest }: IProps) {
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã câu hỏi",
            accessorKey: "code",
            size: 25
        },
        {
            header: "Nội dung câu hỏi",
            accessorKey: "content",
            size: 400
        },
        {
            header: "Lựa chọn",
            accessorKey: "choice"
        }
    ], [])
    return (
        <Modal
            title="Chi tiết đáp án"
            size={"80%"}
            {...rest}
        >
            <MyFlexColumn>
                <Text>Thí sinh: SV000025 - Tô Ngọc Lan</Text>
                <Text>Môn thi: CSDLCB - Cơ sở dữ liệu cơ bản - room1</Text>
                <MyDataTable
                    columns={columns}
                    data={[
                        {
                            code: "CH0001",
                            content: "Trong mô hình CSDL quan hệ; một bảng (table) là một tập hợp các..",
                            choice: "A",
                        },
                        {
                            code: "CH0002",
                            content: "SQL là viết tắt của thuật ngữ nào?",
                            choice: "B",
                        },
                        {
                            code: "CH0003",
                            content: "Trong cơ sở dữ liệu quan hệ để tạo một bảng mới ta sử dụng lệnh",
                            choice: "C",
                        },
                        {
                            code: "CH0004",
                            content: "Khóa chính (Primary Key) phải là ___ và ___",
                            choice: "D",
                        },
                        {
                            code: "CH0005",
                            content:
                                "Mỗi mối thứ nhất ngữ bên trái với định nghĩa thứ nhất hợp bên phải",
                            choice: "A",
                        },
                        {
                            code: "CH0006",
                            content:
                                "Hãy giải thích sự khác biệt cơ bản giữa mô hình CSDL quan hệ (Relational Database) và mô hình CSDL NoSQL (Non-relational Database). Nêu ví dụ và các ứng dụng phù hợp cho mỗi loại.",
                            choice: "A",
                        },
                        {
                            code: "CH0007",
                            content:
                                "Cho lược đồ quan hệ: SinhVien (MaSV, TenSV, NgaySinh, MaKhoa) và Khoa(MaKhoa, TenKhoa). Viết các câu lệnh SQL để: a) Thêm một sinh viên mới b) Cập nhật tên khoa của một sinh viên. c) Liệt kê tất cả sinh viên thuộc khoa “Công nghệ thông tin”.",
                            choice: "C",
                        },
                        {
                            code: "CH0008",
                            content:
                                "Mô tả ngắn gọn vai trò và những yếu tố quan trọng của việc chuẩn hóa dữ liệu (Normalization) trong thiết kế cơ sở dữ liệu, bạn có thể nêu ví dụ minh họa cho các dạng chuẩn (1NF, 2NF, 3NF) nếu muốn.",
                            choice: "B",
                        },
                        {
                            code: "CH0009",
                            content:
                                "Trong mô hình CSDL quan hệ; một bảng (table) là một tập hợp các..",
                            choice: "D",
                        },
                    ] as I[]}
                />
            </MyFlexColumn>
        </Modal>
    )
}
