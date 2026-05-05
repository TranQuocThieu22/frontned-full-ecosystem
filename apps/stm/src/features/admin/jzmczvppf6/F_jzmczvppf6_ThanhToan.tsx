'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Grid, Group, ScrollArea, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCreditCard, IconPrinter } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MyFlexRow } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_jzmczvppf6_HoanHocPhi from "./F_jzmczvppf6_HoanHocPhi";
import F_jzmczvppf6_ThuBoSung from "./F_jzmczvppf6_ThuBoSung";

interface IPhieuThu {
    loaiPhieu: string;
    ngayThanhToan: string;
    kenhDong: string;
    soPhieuThu: string;
    soTienThu: number;
    noiDungThu: string;
}

interface IDichVu {
    loaiThu: string;
    tenDichVu: string;
    donGia: number;
}

export interface IStudentInfo {
    maHocVien: string;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: string;
    phaiThu: number;
    daThu: number;
    mienGiam: number;
    conNo: number;
    choPhanBo: number;
    danhSachPhieuThu: IPhieuThu[];
    danhSachDichVu: IDichVu[];
}


export default function F_hmpecs9rkk_ThanhToan() {
    const disc = useDisclosure()

    const studentInfoQuery = useQuery<IStudentInfo>({
        queryKey: [`F_jzmczvppf6_ThanhToan`],
        queryFn: async () => {
            return studentInfo;
        }
    })

    const columnsPhieuThu = useMemo<MRT_ColumnDef<IPhieuThu>[]>(() => [
        {
            header: "Loại phiếu",
            accessorKey: "loaiPhieu",
        },
        {
            header: "Ngày thanh toán",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayThanhToan))
        },
        {
            header: "Kênh đóng",
            accessorKey: "kenhDong",
        },
        {
            header: "Số phiếu thu",
            accessorKey: "soPhieuThu",
        },
        {
            header: "Số tiền thu",
            accessorFn: (row) => row.soTienThu.toLocaleString("vi-VN"),
            id: "soTienThu",
        },
        {
            header: "Nội dung thu",
            accessorKey: "noiDungThu",
        },
    ], []);


    const columnsDichVu = useMemo<MRT_ColumnDef<IDichVu>[]>(() => [
        {
            header: "Loại thu",
            accessorKey: "loaiThu",
        },
        {
            header: "Tên dịch vụ",
            accessorKey: "tenDichVu",
        },
        {
            header: "Đơn giá",
            accessorFn: (row) => row.donGia.toLocaleString("vi-VN"),
            id: "donGia",
        },
    ], []);

    return (
        <MyButtonModal
            disclosure={disc}
            label="Thanh toán"
            title="Chi tiết thanh toán"
            modalSize="100%"
            leftSection={<IconCreditCard/>}
        >
            {studentInfoQuery.data
                ? <>
                    <MyFlexRow gap={"xl"}>
                        <Text fw={500}>Mã học viên: <Text span>{studentInfoQuery.data.maHocVien}</Text></Text>
                        <Text fw={500}>Họ tên: <Text span>{studentInfoQuery.data.hoTen}</Text></Text>
                    </MyFlexRow>
                    <MyFlexRow gap={"xl"}>
                        <Text fw={500}>Ngày sinh: <Text span>{utils_date_dateToDDMMYYYString(new Date(studentInfoQuery.data.ngaySinh))}</Text></Text>
                        <Text fw={500}>Giới tính: <Text span>{studentInfoQuery.data.gioiTinh}</Text></Text>
                    </MyFlexRow>
                    <MyFlexRow gap={"xl"}>
                        <Text fw={500}>Phải thu: <Text c="green" fw={500} span>{studentInfoQuery.data.phaiThu.toLocaleString("vi-VN")}</Text></Text>
                        <Text fw={500}>Đã thu: <Text c="green" fw={500} span>{studentInfoQuery.data.daThu.toLocaleString("vi-VN")}</Text></Text>
                        <Text fw={500}>Miễn giảm: <Text c="red" fw={500} span>{studentInfoQuery.data.mienGiam.toLocaleString("vi-VN")}</Text></Text>
                        <Text fw={500}>Còn nợ: <Text c="red" fw={500} span>{studentInfoQuery.data.conNo.toLocaleString("vi-VN")}</Text></Text>
                        <Text fw={500}>Chờ phân bổ: <Text fw={500} c="green" span>{studentInfoQuery.data.choPhanBo.toLocaleString("vi-VN")}</Text></Text>
                    </MyFlexRow>
                    <Grid>
                        <Grid.Col span={8}>
                            <MyFieldset title="Danh sách phiếu thu">
                                <ScrollArea h={250} type="auto" scrollbarSize={10} scrollHideDelay={3000}>
                                    <MyDataTable
                                        columns={columnsPhieuThu}
                                        data={studentInfoQuery.data.danhSachPhieuThu}
                                        enableRowSelection
                                        enableTopToolbar={false}
                                        enableBottomToolbar={false}
                                    />
                                </ScrollArea>

                            </MyFieldset>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <MyFieldset title="Danh sách dịch vụ">
                                <ScrollArea h={250} type="auto" scrollbarSize={10} scrollHideDelay={3000}>
                                    <MyDataTable
                                        columns={columnsDichVu}
                                        data={studentInfoQuery.data.danhSachDichVu}
                                        enableRowSelection={false}
                                        enableTopToolbar={false}
                                        enableBottomToolbar={false}
                                        enableRowNumbers={false}
                                    />
                                </ScrollArea>
                            </MyFieldset>
                        </Grid.Col>
                    </Grid>
                    <Group mb={30}>
                        <F_jzmczvppf6_ThuBoSung values={studentInfoQuery.data} />
                        <F_jzmczvppf6_HoanHocPhi values={studentInfoQuery.data} />
                        <MyButton bg="cyan" leftSection={<IconPrinter />}>In phiếu thu</MyButton>
                        <MyButton bg="cyan" leftSection={<IconPrinter />}>In hoàn</MyButton>
                    </Group>
                </>
                : ""
            }
        </MyButtonModal>
    )
}





const studentInfo = {
    maHocVien: "HV02589",
    hoTen: "Tô Ngọc Bảo",
    ngaySinh: "2000-03-05",
    gioiTinh: "Nam",
    phaiThu: 15250000,
    daThu: 14000000,
    mienGiam: 0,
    conNo: 1250000,
    choPhanBo: 0,

    danhSachPhieuThu: [
        {
            loaiPhieu: "Thu",
            ngayThanhToan: "2025-03-15",
            kenhDong: "Chuyển khoản",
            soPhieuThu: "PT00001",
            soTienThu: 1112500,
            noiDungThu: "ToNgocBao-LTW2501"
        },
        {
            loaiPhieu: "Thu",
            ngayThanhToan: "2025-03-15",
            kenhDong: "Chuyển khoản",
            soPhieuThu: "PT00002",
            soTienThu: 1112500,
            noiDungThu: "ToNgocBao-LTW2501"
        },
        {
            loaiPhieu: "Hoàn",
            ngayThanhToan: "2025-03-15",
            kenhDong: "Chuyển khoản",
            soPhieuThu: "PT00003",
            soTienThu: 1112500,
            noiDungThu: "ToNgocBao-LTW2501"
        },
        {
            loaiPhieu: "Thu",
            ngayThanhToan: "2025-03-15",
            kenhDong: "Chuyển khoản",
            soPhieuThu: "PT00004",
            soTienThu: 1112500,
            noiDungThu: "ToNgocBao-LTW2501"
        },
    ],

    danhSachDichVu: [
        {
            loaiThu: "Học phí",
            tenDichVu: "Lập trình web 2401",
            donGia: 1250000
        },
        {
            loaiThu: "Lệ phí thi",
            tenDichVu: "Lập trình web",
            donGia: 300000
        }
    ]
};
