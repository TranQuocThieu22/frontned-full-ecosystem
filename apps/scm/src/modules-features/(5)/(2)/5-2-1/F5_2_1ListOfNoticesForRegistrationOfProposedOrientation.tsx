'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number
    code?: string // Mã
    name?: string // Tên
    fileSrc?: string // File
}
export default function F5_2_1ListOfNoticesForRegistrationOfProposedOrientation() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            { id: 1, code: "gv001", name: "Trần Quốc Thiệu", fileSrc: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf" },
            { id: 2, code: "gv002", name: "Nguyễn Văn Định", fileSrc: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf" },
            { id: 3, code: "gv003", name: "Đặng Tuấn Kiệt", fileSrc: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf" },
        ]
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã giáo viên",
                accessorKey: "code"
            },
            {
                header: "Tên giáo viên",
                accessorKey: "name"
            },
            {
                header: "Xem danh sách người nhận",
                accessorFn: (row) => {
                    return <ViewRecipientList id={row.id!} />
                }
            },
            {
                header: "File đính kèm",
                accessorFn: (row) => {
                    return <MyButtonViewPDF src={row.fileSrc} />
                }
            }
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
        />
    )
}


//#region Sub Feature
interface IViewRecipientList {
    code: string,
    name: string,
    hocHamHocVi: string,
    donViCongTac: string
}
function ViewRecipientList({ id }: { id: number }) {
    const disc = useDisclosure()
    const query = useQuery<IViewRecipientList[]>({
        queryKey: ["ViewRecipientList", id],
        queryFn: () => [
            {
                "code": "NV001",
                "name": "Nguyen Van A",
                "hocHamHocVi": "Phó Giáo sư.TS",
                "donViCongTac": "Phòng hợp tác quốc tế"
            },
            {
                "code": "NV002",
                "name": "Tran Thi B",
                "hocHamHocVi": "Giáo sư.Thạc Sĩ",
                "donViCongTac": "Viện Hàn lâm Khoa học"
            },
        ]
    })
    const columns = useMemo<MRT_ColumnDef<IViewRecipientList>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "code"
            },
            {
                header: "Tên giảng viên",
                accessorKey: "name"
            },
            {
                header: "Học hàm - Học vị",
                accessorKey: "hocHamHocVi"
            },
            {
                header: "Đơn vị công tác",
                accessorKey: "donViCongTac"
            }
        ],
        []
    );

    return (
        <MyButtonModal modalSize={"xl"} disclosure={disc} title="Danh sách người nhận đã thông báo" label="Xem danh sách">
            <MyDataTable columns={columns} data={query.data!} />
        </MyButtonModal>
    )
}

//#endregion