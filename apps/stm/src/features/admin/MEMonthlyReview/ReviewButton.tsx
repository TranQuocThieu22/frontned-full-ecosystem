'use client'
import { TypographyStylesProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { MyButton, MyDataTable } from "aq-fe-framework/components";
import { MyButtonModal } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayStudentStatus, DisplayStudentStatusMap } from "../MEEnterMonthlyTestScores/DisplayStudentStatus";
import TextInputModal from "./TextInputModal";

export interface StudentHomeworkRecord {
    maHocSinh: string;
    hoTen: string;
    sdtPhuHuynh: string;
    trangThaiHS: string;
    ghiChuChung: string;
    BTVN1?: number | string;
    BTVN2?: number | string;
    BTVN3?: number | string;
    BTVN4?: number | string;
    BTVN5?: number | string;
    BTVN6?: number | string;
    BTVN7?: number | string;
    BTVN8?: number | string;
    kiemTraThang?: number;
    tongHop?: string;
    nhanXetChung?: string;
}


export default function ReviewButton() {
    const dics = useDisclosure();

    const columns = useMemo<MRT_ColumnDef<StudentHomeworkRecord>[]>(
        () => [
            {
                accessorKey: 'maHocSinh',
                header: 'Mã học sinh',
            },
            {
                accessorKey: 'hoTen',
                header: 'Họ và tên HS',
                size: 300
            },
            {
                accessorKey: 'sdtPhuHuynh',
                header: 'SĐT Phụ huynh',
            },
            {
                accessorKey: 'trangThaiHS',
                header: 'Trạng thái HS',
                Cell: ({ row }) => <DisplayStudentStatus statuss={DisplayStudentStatusMap[row.original.trangThaiHS] ?? 0} />

            },
            {
                accessorKey: 'ghiChuChung',
                header: 'Ghi chú chung HS',
                size: 500
            },
            ...Array.from({ length: 8 }, (_, i) => ({
                accessorKey: `BTVN${i + 1}` as keyof StudentHomeworkRecord,
                header: `BTVN${i + 1}`,
            })),
            {
                accessorKey: 'kiemTraThang',
                header: 'Kiểm tra tháng',
            },
            {
                accessorKey: 'tongHop',
                header: 'Tổng hợp',
                Cell: ({ row }) => (
                    <TypographyStylesProvider>
                        <div dangerouslySetInnerHTML={{ __html: row.original.tongHop || "" }} />
                    </TypographyStylesProvider>
                )
            },
            {
                accessorKey: 'nhanXetChung',
                header: 'Nhận xét chung',
                size: 500,
                Cell: ({ row }) => <TextInputModal defautValue={row.original.nhanXetChung || ""} />
            }
        ], []
    );

    return (
        <MyButtonModal
            disclosure={dics}
            modalProps={{
                title: "Danh sách học sinh",
                size: "100%"
            }}
            buttonProps={{
                leftSection: <IconPencil />,
                variant: "outline",
                children: "Nhận xét"
            }}
        >
            <MyDataTable
                enableRowSelection
                enableRowNumbers
                columns={columns}
                data={studentHomeworkMockData}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <MyButton crudType="save" />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
            />
        </MyButtonModal>
    )
}


export const studentHomeworkMockData: StudentHomeworkRecord[] = [
    {
        maHocSinh: "CG23-01030",
        hoTen: "Nguyễn Ngọc Trang Anh",
        sdtPhuHuynh: "0974681988",
        trangThaiHS: "Đang học",
        ghiChuChung: "Chưa làm bài tập thường xuyên",
        BTVN1: 8.0,
        BTVN2: 7.5,
        BTVN3: "Hoàn thành",
        BTVN4: 6.5,
        BTVN5: 7.0,
        BTVN6: "",
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 8.5,
        tongHop: "<span>Chuyên cần: 10/10</span><br/><span>Không làm & CCG: 0/8</span><br/><span>TB điểm BTVN: 7.25</span><br/><p>Điểm kiểm tra: 8.5</p>",
        nhanXetChung: "Thầy cô nhận xét về tình hình học tập của con trong tháng như sau:\n- Về ý thức: Con nghiêm túc và cố gắng nhiều trong học tập; ghi chép bài đầy đủ; tập trung nghe giảng; sẵn sàng và chủ động phản hồi giáo viên khi được gọi; có sự chuẩn bị bài tập về nhà tốt. \n- Về nội dung kiến thức: Tháng này con được học về tam giác đồng dạng biến đổi phân thức đại số và các dạng bài ứng dụng bất đẳng thức Cauchy. Con cần chú ý biến đổi và tính toán cẩn thận hơn; đặc biệt đối với dạng bài giải bằng phương pháp đặt ẩn phụ; chú ý điều kiện và xác định đúng điểm rơi của bất đẳng thức. \nChúc con học tập và ôn luyện tốt cùng lớp và các bạn!"
    },
    {
        maHocSinh: "CG23-01040",
        hoTen: "Mẫn Vũ Minh Anh",
        sdtPhuHuynh: "0912378252",
        trangThaiHS: "Đang học",
        ghiChuChung: "Nghỉ buổi 2",
        BTVN1: 7.0,
        BTVN2: 6.5,
        BTVN3: "Chưa hoàn thành",
        BTVN4: "P",
        BTVN5: 6.0,
        BTVN6: 8.0,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 7.5,
        tongHop: "<span>Chuyên cần: 8/10</span><br/><span>Không làm & CCG: 1/8</span><br/><span>TB điểm BTVN: 6.9</span><br/><p>Điểm kiểm tra: 7.5</p>"
    },
    {
        maHocSinh: "CG24-01159",
        hoTen: "Nguyễn Quốc Minh Châu",
        sdtPhuHuynh: "0964252508",
        trangThaiHS: "Đang học",
        ghiChuChung: "",
        BTVN1: 9.0,
        BTVN2: 8.5,
        BTVN3: 8.0,
        BTVN4: 9.0,
        BTVN5: 8.5,
        BTVN6: 9.0,
        BTVN7: 9.5,
        BTVN8: 8.5,
        kiemTraThang: 9.0,
    },
    {
        maHocSinh: "CG23-00685",
        hoTen: "Phạm Ngô Khánh Diệp",
        sdtPhuHuynh: "0969170484",
        trangThaiHS: "Đang học",
        ghiChuChung: "Cần cải thiện tốc độ",
        BTVN1: 7.5,
        BTVN2: 7.0,
        BTVN3: 7.0,
        BTVN4: 6.5,
        BTVN5: 7.0,
        BTVN6: 7.5,
        BTVN7: "",
        BTVN8: "P",
        kiemTraThang: 6.0,
    },
    {
        maHocSinh: "CG24-01157",
        hoTen: "Phạm Hoàng Hải",
        sdtPhuHuynh: "0348689937",
        trangThaiHS: "Đang học",
        ghiChuChung: "",
        BTVN1: 8.0,
        BTVN2: 7.5,
        BTVN3: 8.0,
        BTVN4: 7.0,
        BTVN5: 7.5,
        BTVN6: 8.0,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 8.0,
    },
    {
        maHocSinh: "CG23-01067",
        hoTen: "Nguyễn Minh Hải",
        sdtPhuHuynh: "0914343189",
        trangThaiHS: "Đang học",
        ghiChuChung: "Thường xuyên thiếu bài tập",
        BTVN1: 6.5,
        BTVN2: "P",
        BTVN3: 6.0,
        BTVN4: "P",
        BTVN5: 6.5,
        BTVN6: 7.0,
        BTVN7: 6.0,
        BTVN8: "",
        kiemTraThang: 7.0,
    },
    {
        maHocSinh: "CG23-01068",
        hoTen: "Trần Bảo Hân",
        sdtPhuHuynh: "0974851010",
        trangThaiHS: "Học sinh mới",
        ghiChuChung: "Mới chuyển lớp",
        BTVN1: 9.0,
        BTVN2: 8.5,
        BTVN3: 9.0,
        BTVN4: 8.5,
        BTVN5: 8.0,
        BTVN6: 9.0,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 8.5,
    },
    {
        maHocSinh: "CG24-01160",
        hoTen: "Đặng Gia Hân",
        sdtPhuHuynh: "0943831133",
        trangThaiHS: "Đang học",
        ghiChuChung: "Xuất sắc",
        BTVN1: 10.0,
        BTVN2: 9.5,
        BTVN3: 10.0,
        BTVN4: 9.5,
        BTVN5: 10.0,
        BTVN6: 9.5,
        BTVN7: 9.0,
        BTVN8: 9.5,
        kiemTraThang: 9.5,
    },
    {
        maHocSinh: "LH8123-00807",
        hoTen: "Nguyễn Văn Huệ",
        sdtPhuHuynh: "0974168931",
        trangThaiHS: "Đang học",
        ghiChuChung: "",
        BTVN1: 8.5,
        BTVN2: 8.0,
        BTVN3: 8.5,
        BTVN4: 7.5,
        BTVN5: 8.0,
        BTVN6: 8.5,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 8.0,
    },
    {
        maHocSinh: "CG23-00931",
        hoTen: "Nguyễn Quang Hùng",
        sdtPhuHuynh: "0974359966",
        trangThaiHS: "Đang học",
        ghiChuChung: "",
        BTVN1: 7.0,
        BTVN2: 7.5,
        BTVN3: 7.0,
        BTVN4: 7.0,
        BTVN5: 6.5,
        BTVN6: 7.0,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 7.0,
    },
];
