'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
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

export default function F5_2_4Create() {
    const form = useForm<I>({
        initialValues: {
            soQuyetDinh: "",
            ngayQuyetDinh: undefined, // Sử dụng `undefined` thay vì `null` như yêu cầu
            tenQuyetDinh: "",
            file: undefined
        },
    });

    return (
        <MyButtonCreate modalSize={"80%"} objectName=" quyết định Danh mục đề tài nghiên cứu khoa học định hướng" form={form} onSubmit={async () => {
        }}>
            <Group>
                <MyTextInput
                    label="Số Quyết Định"
                    {...form.getInputProps("soQuyetDinh")}
                    style={{ width: "40%" }}
                />
                <MyDateInput
                    label="Ngày Quyết Định"
                    {...form.getInputProps("ngayQuyetDinh")}
                    style={{ width: "40%" }}
                />
            </Group>
            <MyTextInput
                label="Tên Quyết Định"
                {...form.getInputProps("tenQuyetDinh")}
            />
            <MyFileInput label="File quyết định" {...form.getInputProps("file")} />
            <SubRead />
        </MyButtonCreate>
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