'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Fieldset } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I8_3_1ListOfNotification {
    id?: number //STT
    sendDate?: string //Ngày gửi
    title?: string //Tiêu đề thông báo
}
export default function ReadTemplate() {
    const query = useQuery<I8_3_1ListOfNotification[]>({
        queryKey: [`ListOfNotifications`],
        queryFn: async () => [
            {
                id: 1,
                sendDate: "2024-01-01",
                title: "Thông báo họp hội đồng",
            },
            {
                id: 2,
                sendDate: "2024-01-15",
                title: "Thông báo hoàn thành đề tài",
            },
            {
                id: 3,
                sendDate: "2024-02-01",
                title: "Thông báo nộp báo cáo tiến độ",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I8_3_1ListOfNotification>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",
            size: 50,
        },
        {
            header: "Ngày gửi",
            accessorKey: "sendDate",
        },
        {
            header: "Tiêu đề thông báo",
            accessorKey: "title",
        },
        {
            header: "Danh sách người nhận",
            accessorFn: (row) => {
                return <ReadListOfNotification id={row.id!} />
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
        <Fieldset legend="Danh sách thông báo đăng ký tham dự hội hội thảo">
            <MyDataTable
                columns={columns}
                data={query.data!}
            />
        </Fieldset>

    );
}
interface I8_3_1ListOfLecture {
    id?: number //STT
    code?: string //Mã giảng viên
    name?: string //Họ tên
    hocHamHocVi?: string //Học hàm học vị
    donViCongTac?: string //Đơn vị cộng tác
}
export function ReadListOfNotification({ id }: { id: number }) {
    const disc = useDisclosure()
    const query = useQuery<I8_3_1ListOfNotification[]>({
        queryKey: [ReadListOfNotification, id],
        queryFn: async () => [
            {
                id: 1,
                code: "GV001",
                name: "Nguyễn Văn A",
                hocHamHocVi: "PGS.TS",
                donViCongTac: "Trường Đại học ABC",
            },
            {
                id: 2,
                code: "GV002",
                name: "Trần Thị B",
                hocHamHocVi: "TS",
                donViCongTac: "Viện Nghiên cứu XYZ",
            },
            {
                id: 3,
                code: "GV003",
                name: "Lê Văn C",
                hocHamHocVi: "ThS",
                donViCongTac: "Trường Cao đẳng DEF",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I8_3_1ListOfLecture>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",
            size: 50,
        },
        {
            header: "Mã giảng viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Học hàm học vị",
            accessorKey: "hocHamHocVi",
        },
        {
            header: "Đơn vị cộng tác",
            accessorKey: "donViCongTac",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal modalSize={"xl"} label="Xem danh sách" disclosure={disc}>
            <MyDataTable
                columns={columns}
                data={query.data!}
            />
        </MyButtonModal>

    );
}