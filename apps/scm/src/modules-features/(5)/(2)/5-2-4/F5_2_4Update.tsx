'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"; // Giả sử bạn có component này để nhập ngày
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    soQuyetDinh?: string,
    ngayQuyetDinh?: Date,
    tenQuyetDinh?: string,
    file?: File,
}

export default function F5_2_4Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values
    });

    return (
        <MyActionIconUpdate modalSize={"80%"} form={form} onSubmit={async () => {
        }}>
            <Group>
                <MyTextInput
                    label="Số Quyết Định"
                    {...form.getInputProps("soQuyetDinh")}
                />
                <MyDateInput
                    label="Ngày Quyết Định"
                    {...form.getInputProps("ngayQuyetDinh")}
                />
            </Group>
            <MyTextInput
                label="Tên Quyết Định"
                {...form.getInputProps("tenQuyetDinh")}
            />
            <MyFileInput label="File quyết định" {...form.getInputProps("file")} />
            <SubRead />
        </MyActionIconUpdate>
    );
}

interface I2 {
    id?: number,
    tenDeTai?: string,
    linhVuc?: string,
    giangVien?: string,
    donViCongTac?: string,
    kinhPhiDuKien?: number,
    thoiGianDuKien?: string,
    fileMinhChungSrc?: string,
    ketQuaPhanBien?: string,
    yKienHoiDong?: string,
    dongY?: boolean
}
function SubRead() {
    const form = useForm()
    const query = useQuery<I2[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                tenDeTai: "Nghiên cứu AI trong giáo dục",
                linhVuc: "Công nghệ thông tin",
                giangVien: "Nguyễn Văn A",
                donViCongTac: "Trường Đại học Bách Khoa",
                kinhPhiDuKien: 50000000,
                thoiGianDuKien: "12 tháng",
                fileMinhChungSrc: "/files/minh-chung-1.pdf",
                ketQuaPhanBien: "Đạt yêu cầu",
                yKienHoiDong: "Hỗ trợ thực hiện sớm",
                dongY: true,
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I2>[]>(() => [
        {
            header: "Tên đề tài",
            accessorKey: "tenDeTai",
        },
        {
            header: "Lĩnh vực",
            accessorKey: "linhVuc",
        },
        {
            header: "Giảng viên",
            accessorKey: "giangVien",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "donViCongTac",
        },
        {
            header: "Kinh phí dự kiến",
            accessorKey: "kinhPhiDuKien",
        },
        {
            header: "Thời gian dự kiến",
            accessorKey: "thoiGianDuKien",
        },
        {
            header: "File minh chứng",
            accessorKey: "fileMinhChungSrc",
            Cell: ({ cell }) => <MyButtonViewPDF />,
        },
        {
            header: "Kết quả phản biện",
            accessorKey: "ketQuaPhanBien",
        },
        {
            header: "Ý kiến hội đồng",
            accessorKey: "yKienHoiDong",
        },
        {
            header: "Đồng ý",
            accessorKey: "dongY",
            Cell: ({ cell }) => (
                <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />
            ),
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={() => (
                <MyCenterFull>
                    <MyActionIconUpdate form={form} onSubmit={() => { }} />
                </MyCenterFull>
            )}
        />
    );
}