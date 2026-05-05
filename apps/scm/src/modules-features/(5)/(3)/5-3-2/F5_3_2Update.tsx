'use client'
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Anchor, Fieldset, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    tenDeTai?: string
    tuNgay?: Date;
    denNgay?: Date;
    donViChuTri?: string;
    mucTieuNghienCuu?: string;
    huongUngDung?: string;
    kinhPhiDuKien?: string;
    dinhKemFileThuyetMinhDeCuong?: string;
}

export default function F5_3_2Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values,
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"80%"}>
            <Text>Tên đề tài {values.tenDeTai}</Text>
            <Group grow>
                <MyDateInput label="Từ Ngày" {...form.getInputProps("tuNgay")} />
                <MyDateInput label="Đến Ngày" {...form.getInputProps("denNgay")} />
            </Group>
            <MyTextInput label="Đơn Vị Chủ Trì" {...form.getInputProps("donViChuTri")} />
            <MyTextArea label="Mục Tiêu Nghiên Cứu" {...form.getInputProps("mucTieuNghienCuu")} />
            <MyTextArea label="Hướng Ứng Dụng" {...form.getInputProps("huongUngDung")} />
            <MyTextInput label="Kinh Phí Dự Kiến" {...form.getInputProps("kinhPhiDuKien")} />
            <MyFileInput label="Đính Kèm File Thuyết Minh Đề Cương" {...form.getInputProps("dinhKemFileThuyetMinhDeCuong")} />
            <Fieldset legend="Danh sách thành viên trong trường">
                <DanhSachThanhVien />
            </Fieldset>
            <Fieldset legend="Danh sách thành viên ngoài trường">
                <DanhSachThanhVien />
            </Fieldset>
        </MyActionIconUpdate>
    );
}

interface I2 {
    id?: number;
    maGiangVien?: string;
    hoTen?: string;
    hocHamHocVi?: string;
    donViCongTac?: string;
    vaiTro?: string;
    lyLich?: string;
}

function DanhSachThanhVien() {
    const query = useQuery<I2[]>({
        queryKey: [`DanhSachThanhVien`],
        queryFn: async () => [
            {
                id: 1,
                maGiangVien: "GV001",
                hoTen: "Nguyễn Văn A",
                hocHamHocVi: "Phó Giáo sư, Tiến sĩ",
                donViCongTac: "Đại học Bách Khoa",
                vaiTro: "Chủ nhiệm đề tài",
                lyLich: "/files/ly-lich-gv001.pdf",
            },
            {
                id: 2,
                maGiangVien: "GV002",
                hoTen: "Trần Thị B",
                hocHamHocVi: "Thạc sĩ",
                donViCongTac: "Đại học Y Hà Nội",
                vaiTro: "Thành viên",
                lyLich: "/files/ly-lich-gv002.pdf",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I2>[]>(() => [
        {
            header: "Mã giảng viên",
            accessorKey: "maGiangVien",
        },
        {
            header: "Họ và tên",
            accessorKey: "hoTen",
        },
        {
            header: "Học hàm, học vị",
            accessorKey: "hocHamHocVi",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "donViCongTac",
        },
        {
            header: "Vai trò",
            accessorKey: "vaiTro",
        },
        {
            header: "Lý lịch",
            accessorKey: "lyLich",
            Cell: ({ cell }) => <Anchor>Xem lý lịch</Anchor>,
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <MyActionIcon crudType="update" />
                        <MyActionIcon crudType="delete" />
                    </MyCenterFull>
                );
            }}
        />
    );
}