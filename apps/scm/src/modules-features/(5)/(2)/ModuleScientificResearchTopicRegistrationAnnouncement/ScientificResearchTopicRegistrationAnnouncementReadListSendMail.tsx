'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Fieldset } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    ngayGui?: Date;
    tieuDe?: string;
}

export default function ScientificResearchTopicRegistrationAnnouncementReadListSendMail() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            { id: 1, ngayGui: new Date("2024-01-15T00:00:00Z"), tieuDe: "Thông báo 1" },
            { id: 2, ngayGui: new Date("2024-02-20T00:00:00Z"), tieuDe: "Thông báo 2" },
            { id: 3, ngayGui: new Date("2024-03-25T00:00:00Z"), tieuDe: "Thông báo 3" },
        ]
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Ngày gửi",
            accessorKey: "ngayGui",
            Cell: ({ cell }) => {
                return U0DateToDDMMYYYString(new Date(cell.getValue<Date>()));
            }
        },
        {
            header: "Tiêu đề",
            accessorKey: "tieuDe"
        },
        {
            header: "Xem danh sách người nhận",
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
        <Fieldset>
            <MyDataTable
                columns={columns}
                data={query.data!}
            />
        </Fieldset>
    );
}

interface IViewUserSendMail {
    id?: number,
    maGiangVien?: string,
    hoVaTen?: string,
    hocHam?: string,
    hocVi?: string,
    donViCongTac?: string
}
function ViewUserSendMail({ id }: { id: number }) {
    const disc = useDisclosure()
    const query = useQuery<IViewUserSendMail[]>({
        queryKey: [ViewUserSendMail, id],
        queryFn: () => [
            { id: 1, maGiangVien: "GV001", hoVaTen: "Trần Quốc Thiệu", hocHam: "Phó Giáo Sư", hocVi: "Tiến Sĩ", donViCongTac: "Khoa CNTT" },
            { id: 2, maGiangVien: "GV002", hoVaTen: "Nguyễn Văn Định", hocHam: "Giảng Viên", hocVi: "Thạc Sĩ", donViCongTac: "Khoa Toán" },
            { id: 3, maGiangVien: "GV003", hoVaTen: "Đặng Tuấn Kiệt", hocHam: "Giảng Viên", hocVi: "Cử Nhân", donViCongTac: "Khoa Hóa" },
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
                header: "Học hàm",
                accessorKey: "hocHam"
            },
            {
                header: "Học vị",
                accessorKey: "hocVi"
            },
            {
                header: "Đơn vị công tác",
                accessorKey: "donViCongTac"
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