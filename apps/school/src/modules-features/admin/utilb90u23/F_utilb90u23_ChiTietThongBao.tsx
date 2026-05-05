"use client";
import {
    AQButtonExportData,
    MyDataTable,
    MyFieldset,
    MyCheckbox,
    MyButtonModal,
    MyButtonViewPDF,
    MyFileInput,
    MyButton,
    MySelect,
    MyCenterFull
} from "aq-fe-framework/components";
import { Checkbox, Flex, Grid, Group, Radio, SimpleGrid, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import F_utilb90u23_DsHanhKhachDaGuiThongBao from "./F_utilb90u23_DsHanhKhachDaGuiThongBao";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import F_utilb90u23_DanhSachHanhKhach from "./F_utilb90u23_DanhSachHanhKhach";

export default function F_utilb90u23_ChiTietThongBao() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const disclosure = useDisclosure();

    // Query
    const danhSachThongBaoQuery = useQuery<I_utilb90u23_ThongBao[]>({
        queryKey: ["F_utilb90u23_ChiTietThongBao"],
        queryFn: async () => {
            return mockData;
        },
    });

    // export confirm
    const exportConfig = {
        fields: [
            {
                header: "Loại thông báo",
                fieldName: "loaiThongBao",
            },
            {
                header: "Loại đối tượng",
                fieldName: "loaiDoiTuong",
            },
            {
                header: "Nội dung",
                fieldName: "noiDung",
            },
            {
                header: "Zalo",
                fieldName: "zalo",
            },
            {
                header: "Email",
                fieldName: "email",
            },
            {
                header: "SMS",
                fieldName: "sms",
            },
            {
                header: "Ngày gửi",
                fieldName: "ngayGui",
            },
        ],
    };

    // column table
    const columns = useMemo<MRT_ColumnDef<I_utilb90u23_ThongBao>[]>(
        () => [
            {
                header: "Loại thông báo",
                accessorKey: "loaiThongBao",
            },
            {
                header: "Loại đối tượng",
                accessorKey: "loaiDoiTuong",
            },
            {
                header: "Danh sách",
                accessorFn: (row) => <MyCenterFull> <F_utilb90u23_DsHanhKhachDaGuiThongBao label="Xem chi tiết" /></MyCenterFull>
            },
            {
                header: "Nội dung",
                accessorKey: "noiDung",
            },
            {
                header: "File đính kèm",
                accessorFn: (row) => <MyCenterFull><MyButtonViewPDF label="Xem file" src={row.fileDinhKem} /></MyCenterFull> 
            },
            {
                header: "Zalo",
                accessorKey: "zalo",
                accessorFn: (row) => <MyCheckbox checked={row.zalo} readOnly />
            },
            {
                header: "Email",
                accessorKey: "email",
                accessorFn: (row) => <MyCheckbox checked={row.email} readOnly />
            },
            {
                header: "SMS",
                accessorFn: (row) => <MyCheckbox checked={row.sms} readOnly />
            },
            {
                header: "Ngày gửi",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngayGui!)
            },
        ],
        []
    );

    if (danhSachThongBaoQuery.isLoading) return "Đang tải dữ liệu...";
    if (danhSachThongBaoQuery.isError) return "Lỗi tải dữ liệu";

    return (
        <>
            <MyButtonModal
                label="Gửi"
                title="Chi tiết thông báo"
                modalSize={"100%"}
                disclosure={disclosure}
                fullScreen={isFullScreen}
            >

                <Group>
                    <MySelect
                        label="Loại thông báo"
                        required
                        w={300}
                        defaultValue={loaiThongBaoSelectData[0]?.value}
                        data={loaiThongBaoSelectData} />
                    <MyTextArea label="Nội dung thông báo" />
                </Group>
                <SimpleGrid cols={2} spacing={"xl"} >
                    <Stack
                        align="flex-start"
                        justify="flex-start"
                    >
                        <Radio.Group label="Đối tượng" >
                            <Group mt="xs">
                                <Radio mr="xl" value="tatCa" label="Tất cả" />
                                <Radio value="caNhan" label="Cá nhân" />
                            </Group>
                        </Radio.Group>
                        <Stack gap="1">
                            <Text size="sm" fw={500}>Danh sách</Text>
                            <F_utilb90u23_DanhSachHanhKhach />
                        </Stack>
                        <MyFileInput label="File đính kèm" />
                    </Stack>
                    <Flex direction="column" justify="space-between">
                        <Checkbox.Group label="Phương tiện">
                            <Stack mt="xs">
                                <MyCheckbox value="zalo" label="Zalo" />
                                <MyCheckbox value="email" label="Email" />
                                <MyCheckbox value="sms" label="SMS" />
                            </Stack>
                        </Checkbox.Group>
                        <Grid justify="center" align="flex-end">
                            <MyButton crudType="default" color="green">Gửi</MyButton>
                        </Grid>
                    </Flex>
                </SimpleGrid>

                <MyFieldset title="Chi tiết thông báo">
                    <MyDataTable
                        enableRowSelection
                        data={danhSachThongBaoQuery.data!}
                        columns={columns}
                        onIsFullScreenChange={(isFullScreen) => { setIsFullScreen(isFullScreen) }}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <AQButtonExportData
                                    data={danhSachThongBaoQuery.data!}
                                    exportConfig={exportConfig}
                                    objectName="ChiTietThongBao"
                                />
                            </Group>
                        )}
                    />
                </MyFieldset>
            </MyButtonModal>
        </>
    );
}

const loaiThongBaoSelectData = [
    { value: "Học sinh không có mặt", label: "Học sinh không có mặt" },
    { value: "Thay dổi lịch trình", label: "Thay dổi lịch trình" },
    { value: "Xe gặp sự cố", label: "Xe gặp sự cố" },
    { value: "Thay đổi tài xế", label: "Thay đổi tài xế" },
    { value: "Thông tin", label: "Thông tin" },
]


const mockData: I_utilb90u23_ThongBao[] = [
    {
        id: 1,
        loaiThongBao: "Học sinh không có mặt",
        loaiDoiTuong: "Cá nhân",
        noiDung: "Em Tô Ngọc Lâm không có mặt tại điểm đón",
        fileDinhKem: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
        zalo: true,
        email: true,
        sms: true,
        ngayGui: new Date("02/15/2025"),
    },
];

interface I_utilb90u23_ThongBao {
    id?: number;
    loaiThongBao?: string;
    loaiDoiTuong?: string;
    noiDung?: string;
    fileDinhKem?: string;
    zalo?: boolean;
    email?: boolean;
    sms?: boolean;
    ngayGui?: Date;
}

