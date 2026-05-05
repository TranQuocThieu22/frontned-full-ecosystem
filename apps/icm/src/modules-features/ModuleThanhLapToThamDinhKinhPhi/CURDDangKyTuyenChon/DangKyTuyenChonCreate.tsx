import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DangKyTuyenChonViewModel } from "../interfaces/ThanhLapToThamDinhKinhPhiViewModel";

export default function DangKyTuyenChonCreate({ data }: { data: DangKyTuyenChonViewModel[] }) {
    const disc = useDisclosure();

    const Q_VienChucVu = useQuery({
        queryKey: ["DangKyTuyenChonCreate"],
        queryFn: () => {
            return dangKyTuyenChonData;
        }
    })

    const columns = useMemo<MRT_ColumnDef<DangKyTuyenChonViewModel>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "code" },
        { header: "Tên đề tài", accessorKey: "name", size: 300 },
        { header: "Lĩnh vực", accessorKey: "field" },
        { header: "Chủ nhiệm", accessorKey: "leader" },
        {
            header: "Đánh giá phù hợp", accessorKey: "score", accessorFn: (row) => {
                return row.score + "/5"
            }
        },
        { header: "Đánh giá của hội đồng", accessorKey: "suitability" },
        { header: "Kiến nghị", accessorKey: "comment", size: 300 },
    ], []);


    return (
        <MyButtonModal modalSize="70%" disclosure={disc} label="Thêm" title="Danh sách đăng ký tuyển chọn">
            <MyDataTable
                enableRowSelection={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <MyButton onClick={() => disc[1].close()}>Chọn</MyButton>
                )}
                enableRowNumbers={false}
                columns={columns}
                data={Q_VienChucVu.data || []}
            />
        </MyButtonModal>
    );
}

export const dangKyTuyenChonData: DangKyTuyenChonViewModel[] = [
    {
        id: 1,
        code: "DKTC2025001",
        name: "Nghiên cứu phát triển vật liệu composite mới chịu nhiệt cao",
        field: "Vật liệu tiên tiến",
        leader: "Nguyễn Văn A",
        suitability: "Phù hợp",
        score: 4,
        comment: "Đề tài có tính khả thi cao, cần bổ sung thêm kế hoạch truyền thông",
    },
    {
        id: 2,
        code: "DKTC2025002",
        name: "Ứng dụng AI trong phân tích dữ liệu y tế",
        field: "Công nghệ thông tin; Y sinh",
        leader: "Trần Thị B",
        suitability: "Phù hợp",
        score: 3,
        comment: "Mô hình ứng dụng rõ ràng, cần làm rõ thêm về nguồn lực triển khai",
    },
    {
        id: 3,
        code: "DKTC2025003",
        name: "Nghiên cứu về tác động của mạng xã hội đến hành vi tiêu dùng của giới trẻ",
        field: "Kinh tế; Tâm lý học",
        leader: "Phạm Thị D",
        suitability: "Phù hợp",
        score: 5,
        comment: "Nghiên cứu có tính đột phá, tiềm năng ứng dụng cao",
    },
    {
        id: 4,
        code: "DKTC2025004",
        name: "Phát triển hệ thống giám sát nông nghiệp thông minh sử dụng IoT",
        field: "Nông nghiệp; Công nghệ thông tin",
        leader: "Hoàng Minh E",
        suitability: "Phù hợp",
        score: 4,
        comment: "Hồ sơ đầy đủ; cần chi tiết hơn về công nghệ IoT cụ thể sẽ sử dụng",
    }
];