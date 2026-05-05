'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Fieldset, Paper, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F4_2_1Update from "./F4_2_1Update";
interface IUserViewModel {
    id?: number | undefined;
    code?: string | undefined;
    name?: string | undefined;
    hocHam?: string | undefined;
    hocVi?: string | undefined;
    donViCongTac?: string | undefined;
}

interface IDangKyNhiemVuDeTaiViewModel {
    id?: number | undefined;
    code?: string | undefined;
    name?: string | undefined;
    loaiDeTai?: string | undefined;
    soGioDangKy?: string | undefined;
    phanTramDaThucHien?: string | undefined;
    fileMinhChung?: string | undefined;


}
interface IDangKyNhiemVuBaiBaoViewModel {
    id?: number | undefined;
    code?: string | undefined;
    name?: string | undefined;
    loaiDeTai?: string | undefined;
    soGioDangKy?: string | undefined;
    phanTramDaThucHien?: string | undefined;
    fileMinhChung?: string | undefined;


}
interface IDangKyNhiemVuHoiThaoViewModel {
    id?: number | undefined;
    code?: string | undefined;
    name?: string | undefined;
    loaiDeTai?: string | undefined;
    soGioDangKy?: string | undefined;
    phanTramDaThucHien?: string | undefined;
    fileMinhChung?: string | undefined;


}

export default function F4_2_1Read() {
    const DangKyNhiemVuDeTai = useQuery<IDangKyNhiemVuDeTaiViewModel[]>({
        queryKey: [`IDangKyNhiemVuDeTaiViewModel`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            DangKyNhiemVuDeTaiData
    })
    const DangKyNhiemVuBaiBao = useQuery<IDangKyNhiemVuDeTaiViewModel[]>({
        queryKey: [`IDangKyNhiemVuDeTaiViewModel`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            DangKyNhiemVuBaiBaoData
    })
    const DangKyNhiemVuHoiThao = useQuery<IDangKyNhiemVuDeTaiViewModel[]>({
        queryKey: [`IDangKyNhiemVuDeTaiViewModel`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            DangKyNhiemVuHoiThaoData
    })


    const exportConfig = {
        fields: [
            {
                fieldName: "loaiDeTai",
                header: "Loại đề tài"
            },
            {
                fieldName: "soGioDangKy",
                header: "Số giờ đăng ký"
            },
            {
                fieldName: "phanTramDaThucHien",
                header: "% đã thực hiện",
            },
            {
                fieldName: "fileMinhChung",
                header: "File minh chứng"
            },

        ]
    };

    const columns = useMemo<MRT_ColumnDef<IDangKyNhiemVuDeTaiViewModel>[]>(
        () => [
            {
                accessorKey: "loaiDeTai",
                header: "Loại đề tài"
            },
            {
                accessorKey: "soGioDangKy",
                header: "Số giờ đăng ký"
            },
            {
                accessorKey: "phanTramDaThucHien",
                header: "% đã thực hiện",
            },
            {
                accessorKey: "fileMinhChung",
                header: "File minh chứng"
            },
        ],
        []
    );

    if (DangKyNhiemVuDeTai.isLoading && DangKyNhiemVuBaiBao.isLoading && DangKyNhiemVuHoiThao.isLoading) return "Đang tải dữ liệu..."
    if (DangKyNhiemVuDeTai.isError && DangKyNhiemVuBaiBao.isError && DangKyNhiemVuHoiThao.isError) return "Không có dữ liệu..."
    return (
        <MyFlexColumn>
            <MyFlexRow justify={"space-between"}>
                <Paper w={"100%"} p={5}>
                    <Text>Mã giảng viên: {userData.code}</Text>
                </Paper>
                <Paper w={"100%"} p={5}>
                    <Text>Tên giảng viên: {userData.name}</Text>
                </Paper>
                <Paper w={"100%"} p={5}>
                    <Text>Học hàm/ Học vị:{userData.hocHam}/ {userData.hocVi}</Text>
                </Paper>
                <Paper w={"100%"} p={5}>
                    <Text>Đơn vị công tác: {userData.donViCongTac}</Text>
                </Paper>
            </MyFlexRow>
            <Fieldset legend='Đăng ký nhiệm vụ đề tài'>

                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    data={DangKyNhiemVuDeTai.data!}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>

                            </>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F4_2_1Update data={row.original} />
                            </MyCenterFull>
                        )
                    }}
                />
            </Fieldset>
            <Fieldset legend='Đăng ký nhiệm vụ bài báo'>
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    data={DangKyNhiemVuBaiBao.data!}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>

                            </>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F4_2_1Update data={row.original} />
                            </MyCenterFull>
                        )
                    }}
                />
            </Fieldset>
            <Fieldset legend='Đăng ký nhiệm vụ hội thảo'>
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    data={DangKyNhiemVuHoiThao.data!}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>

                            </>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F4_2_1Update data={row.original} />
                            </MyCenterFull>
                        )
                    }}
                />
            </Fieldset>


        </MyFlexColumn>

    )
}


const DangKyNhiemVuDeTaiData: IDangKyNhiemVuDeTaiViewModel[] = [
    {
        id: 1,
        code: "GV001",
        name: "Nguyen Van A",
        loaiDeTai: "Nghiên cứu AI",
        soGioDangKy: "50",
        phanTramDaThucHien: "40",
        fileMinhChung: "ai-research.pdf",
    },
    {
        id: 2,
        code: "GV002",
        name: "Tran Thi B",
        loaiDeTai: "Phát triển phần mềm",
        soGioDangKy: "60",
        phanTramDaThucHien: "30",
        fileMinhChung: "software-dev.pdf",
    },
    {
        id: 3,
        code: "GV003",
        name: "Le Van C",
        loaiDeTai: "Ứng dụng IoT",
        soGioDangKy: "70",
        phanTramDaThucHien: "50",
        fileMinhChung: "iot-application.pdf",
    },

]

const DangKyNhiemVuBaiBaoData: IDangKyNhiemVuBaiBaoViewModel[] = [
    {
        id: 1,
        code: "GV001",
        name: "Nguyen Van A",
        loaiDeTai: "Nghiên cứu AI",
        soGioDangKy: "50",
        phanTramDaThucHien: "40",
        fileMinhChung: "ai-research.pdf",
    },
    {
        id: 2,
        code: "GV002",
        name: "Tran Thi B",
        loaiDeTai: "Phát triển phần mềm",
        soGioDangKy: "60",
        phanTramDaThucHien: "30",
        fileMinhChung: "software-dev.pdf",
    },
    {
        id: 3,
        code: "GV003",
        name: "Le Van C",
        loaiDeTai: "Ứng dụng IoT",
        soGioDangKy: "70",
        phanTramDaThucHien: "50",
        fileMinhChung: "iot-application.pdf",
    },

]

const DangKyNhiemVuHoiThaoData: IDangKyNhiemVuHoiThaoViewModel[] = [
    {
        id: 1,
        code: "GV001",
        name: "Nguyen Van A",
        loaiDeTai: "Nghiên cứu AI",
        soGioDangKy: "50",
        phanTramDaThucHien: "40",
        fileMinhChung: "ai-research.pdf",
    },
    {
        id: 2,
        code: "GV002",
        name: "Tran Thi B",
        loaiDeTai: "Phát triển phần mềm",
        soGioDangKy: "60",
        phanTramDaThucHien: "30",
        fileMinhChung: "software-dev.pdf",
    },
    {
        id: 3,
        code: "GV003",
        name: "Le Van C",
        loaiDeTai: "Ứng dụng IoT",
        soGioDangKy: "70",
        phanTramDaThucHien: "50",
        fileMinhChung: "iot-application.pdf",
    },

]

const userData: IUserViewModel =
{
    id: 1,
    code: "GV001",
    name: "Nguyen Van A",
    hocHam: "Giáo sư",
    hocVi: "Tiến sĩ",
    donViCongTac: "Trường Đại học Bách Khoa",
}
