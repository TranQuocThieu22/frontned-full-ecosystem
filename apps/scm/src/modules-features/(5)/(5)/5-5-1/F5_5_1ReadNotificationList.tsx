'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    ngayGui?: Date;
    tieuDe?: string;
}

export default function F5_5_1ReadNotificationList() {
    const query = useQuery<I[]>({
        queryKey: [`F5_5_1ReadNotificationList`],
        queryFn: async () => [
            {
                "id": 1,
                "ngayGui": new Date("2023-12-01"),
                "tieuDe": "Đề tài nghiên cứu",
            },
            {
                id: 2,
                "ngayGui": new Date("2023-11-15"),
                "tieuDe": "Báo cáo kết quả",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Ngày gửi",
            accessorKey: "ngayGui",
            Cell: ({ cell }) => U0DateToDDMMYYYString(new Date(cell.getValue<Date>())),
        },
        {
            header: "Tiêu đề",
            accessorKey: "tieuDe",
        },
        {
            header: "Danh sách người nhận",
            accessorFn: (row) => {
                return <ViewUserSendMail id={row.id!} />
            }
        },
        {
            header: "File đính kèm",
            accessorFn: (row) => {
                return <MyButtonViewPDF />
            }
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
        />
    );
}

interface IViewUserSendMail {
    id?: number,
    maGiangVien?: string,
    hoVaTen?: string,
    hocHam?: string,
    donViCongTac?: string,
    maDeTai?: string,
    tenDeTai?: string
}
function ViewUserSendMail({ id }: { id: number }) {
    const disc = useDisclosure()
    const query = useQuery<IViewUserSendMail[]>({
        queryKey: [ViewUserSendMail, id],
        queryFn: () => [
            { id: 1, maGiangVien: "GV001", hoVaTen: "Trần Quốc Thiệu", hocHam: "Phó Giáo Sư", hocVi: "Tiến Sĩ", donViCongTac: "Khoa CNTT", maDeTai: "DT0001", tenDeTai: "Đổi mới giảng dạy đại học " },
            { id: 2, maGiangVien: "GV002", hoVaTen: "Nguyễn Văn Định", hocHam: "Giảng Viên", hocVi: "Thạc Sĩ", donViCongTac: "Khoa Toán", maDeTai: "DT0002", tenDeTai: "Đổi mới giảng dạy đại học " },
            { id: 3, maGiangVien: "GV003", hoVaTen: "Đặng Tuấn Kiệt", hocHam: "Giảng Viên", hocVi: "Cử Nhân", donViCongTac: "Khoa Hóa", maDeTai: "DT0003", tenDeTai: "Đổi mới giảng dạy đại học " },
        ]
    })
    const columns = useMemo<MRT_ColumnDef<IViewUserSendMail>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "maGiangVien"
            },
            {
                header: "Họ và tên",
                accessorKey: "hoVaTen"
            },
            {
                header: "Học hàm - Học vị",
                accessorKey: "hocHam"
            },
            {
                header: "Đơn vị công tác",
                accessorKey: "donViCongTac"
            },
            {
                header: "Mã đề tài",
                accessorKey: "madDeTai"
            },
            {
                header: "Đề tài",
                accessorKey: "tenDeTai"
            },
        ],
        []
    );
    return (
        <MyButtonModal modalSize={"xl"} label="Xem danh sách" disclosure={disc}>
            <MyDataTable columns={columns} data={query.data!} />
        </MyButtonModal>
    )
}
