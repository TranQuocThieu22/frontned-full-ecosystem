'use client'
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Anchor, Fieldset, Group } from "@mantine/core";
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

export default function F5_3_3_1Create() {
    const form = useForm<I>();

    return (
        <MyButtonCreate objectName="Quyết định thành lập hội đồng xét duyệt đề cương/ thuyết minh" form={form} onSubmit={() => { }} modalSize={"80%"}>
            <Group grow>
                <MyDateInput label="Từ Ngày" {...form.getInputProps("tuNgay")} />
                <MyDateInput label="Đến Ngày" {...form.getInputProps("denNgay")} />
            </Group>
            <MyTextInput label="Tên quyết định"></MyTextInput>
            <Fieldset legend="Danh sách thành viên">
                <DanhSachThanhVien />
            </Fieldset>
            <Fieldset legend="Danh sách đề tài">
                <DanhSachDeTai />
            </Fieldset>
        </MyButtonCreate>
    );
}

interface IDanhSachThanhVien {
    id?: number;
    maGiangVien?: string;
    hoTen?: string;
    hocHamHocVi?: string;
    donViCongTac?: string;
    vaiTro?: string;
    lyLich?: string;
}

function DanhSachThanhVien() {
    const query = useQuery<IDanhSachThanhVien[]>({
        queryKey: [`IDanhSachThanhVien`],
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

    const columns = useMemo<MRT_ColumnDef<IDanhSachThanhVien>[]>(() => [
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
            renderTopToolbarCustomActions={() => <MyButton crudType="create">Thêm</MyButton>}
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


interface IDSDeTai {
    id?: number;
    tenDeTai?: string;
    chuNhiemDeTai?: string;
}

function DanhSachDeTai() {
    const query = useQuery<IDSDeTai[]>({
        queryKey: [`IDSDeTai`],
        queryFn: async () => [
            { id: 1, tenDeTai: "Nghiên cứu trí tuệ nhân tạo", chuNhiemDeTai: "Nguyễn Văn A" },
            { id: 2, tenDeTai: "Phát triển hệ thống quản lý", chuNhiemDeTai: "Trần Thị B" },
            { id: 3, tenDeTai: "Ứng dụng Blockchain", chuNhiemDeTai: "Lê Văn C" },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<IDSDeTai>[]>(() => [
        {
            header: "Tên đề tài",
            accessorKey: "tenDeTai",
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "chuNhiemDeTai",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <MyButton crudType="create">Thêm</MyButton>}
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