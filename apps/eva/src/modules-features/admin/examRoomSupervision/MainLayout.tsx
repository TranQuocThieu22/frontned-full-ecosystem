'use client';

import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { ActionIcon, Button, Group, Modal, Paper, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconEyeOff, IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IExamSessionInfoViewModel } from "./Interfaces/prototypeInterfaces";
import StudentListModalContent from "./StudentListModalContent";

export default function MainLayout() {
    const discRejectMonitoringModal = useDisclosure(false);
    const discViewMonitorDetailModal = useDisclosure(false);

    const allExamSessions = useQuery<IExamSessionInfoViewModel[]>({
        queryKey: ['examSessionMockData'],
        queryFn: () => {
            return examSessionMockData;
        }
    })

    const columns = useMemo<MRT_ColumnDef<IExamSessionInfoViewModel>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "maMonHoc",
        },
        {
            header: "Tên môn học",
            accessorKey: "tenMonHoc",
        },
        {
            header: "Nhóm thi",
            accessorKey: "nhomThi",
        },
        {
            header: "Ngày thi",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(row.ngayThi);
            }
        },
        {
            header: "Giờ bắt đầu",
            accessorKey: "gioBatDau",
        },
        {
            header: "Thời gian thi",
            accessorKey: "thoiGianThi",
        },
        {
            header: "Quy tắc làm tròn điểm",
            accessorKey: "quyTacLamTronDiem",
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },
        {
            header: "Số lượng",
            accessorKey: "soLuong",
        },
        {
            header: "Trạng thái",
            accessorKey: "trangThai",
        },
        {
            header: "Phụ trách",
            accessorKey: "phuTrach",
        }
    ], []);
    return (
        <>
            <Paper p={10}>
                <Group>
                    <Select
                        label="Chọn kỳ thi"
                        placeholder="Chọn kỳ thi"
                        data={examListMockData}
                        defaultValue={"1"}
                        clearable
                        mb="md"
                        w={{ base: "100%", md: "50%" }}
                    />
                    <Group>
                        <Text>Ngày bắt đầu: 20/03/2025</Text>
                        <Text>Ngày kết thúc: 27/03/2025</Text>
                    </Group>
                </Group>
                <MyDataTable
                    columns={columns}
                    data={allExamSessions.data || []}
                    enableRowSelection={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                            <Button color="blue">Thông báo chung</Button>
                            <Button color="blue">Nhật ký ca thi</Button>
                        </Group>
                    )}
                    displayColumnDefOptions={{
                        "mrt-row-actions": {
                            header: "Giám sát thi",
                            size: 120,
                        },
                        "mrt-row-numbers": {
                            Header: "STT",
                            size: 70
                        },
                    }}
                    renderRowActions={({ row }) => (
                        <>
                            <CustomCenterFull>
                                {row.original.trangThai === "Đang diễn ra" ?
                                    <ActionIcon variant="transparent" color="green" size="xl" radius="xs"
                                        onClick={discViewMonitorDetailModal[1].open}
                                    >
                                        <IconEye />
                                    </ActionIcon>
                                    :
                                    <ActionIcon variant="transparent" color="red" size="xl" radius="xs"
                                        onClick={discRejectMonitoringModal[1].open}
                                    >
                                        <IconEyeOff />
                                    </ActionIcon>
                                }
                            </CustomCenterFull>
                        </>
                    )}
                />
            </Paper>

            <Modal
                opened={discRejectMonitoringModal[0]}
                onClose={discRejectMonitoringModal[1].close}
                title="Thông báo">
                <Group>
                    Ca thi chưa diễn ra hoặc đã kết thúc.
                </Group>
                <Group mt={24} grow>
                    <Button

                        color="red"
                        onClick={discRejectMonitoringModal[1].close}
                    >Đồng ý
                    </Button>
                </Group>
            </Modal>

            <Modal
                size={"100%"}
                opened={discViewMonitorDetailModal[0]}
                onClose={discViewMonitorDetailModal[1].close}
                title="Chi tiết danh sách thí sinh">
                <StudentListModalContent />
            </Modal>
        </>
    )
}

const examListMockData = [
    {
        value: "1",
        label: "KT125 - Kỳ thi giữa kỳ 1 - 2025"
    },
    {
        value: "2",
        label: "KT225 - Kỳ thi cuối kỳ 2 - 2025"
    }
]

const examSessionMockData: IExamSessionInfoViewModel[] = [
    {
        id: 1,
        maMonHoc: "IT101",
        tenMonHoc: "Nhập môn Công nghệ Thông tin",
        nhomThi: "room1",
        ngayThi: new Date("2025-03-15"),
        gioBatDau: "08:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.5",
        ghiChu: "",
        soLuong: 30,
        trangThai: "Đang diễn ra",
        phuTrach: "Nguyễn Văn A"
    },
    {
        id: 2,
        maMonHoc: "IT102",
        tenMonHoc: "Lập trình C cơ bản",
        nhomThi: "room2",
        ngayThi: new Date("2025-03-16"),
        gioBatDau: "13:30",
        thoiGianThi: 120,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 28,
        trangThai: "Sắp diễn ra",
        phuTrach: "Trần Thị B"
    },
    {
        id: 3,
        maMonHoc: "IT201",
        tenMonHoc: "Cơ sở dữ liệu",
        nhomThi: "room1",
        ngayThi: new Date("2025-03-17"),
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 32,
        trangThai: "Sắp diễn ra",
        phuTrach: "Lê Văn C"
    },
    {
        id: 4,
        maMonHoc: "IT202",
        tenMonHoc: "Mạng máy tính",
        nhomThi: "room1",
        ngayThi: new Date("2025-03-18"),
        gioBatDau: "15:00",
        thoiGianThi: 60,
        quyTacLamTronDiem: "0.5",
        ghiChu: "",
        soLuong: 25,
        trangThai: "Đang diễn ra",
        phuTrach: "Phạm Thị D"
    },
    {
        id: 5,
        maMonHoc: "IT301",
        tenMonHoc: "Phát triển phần mềm",
        nhomThi: "room2",
        ngayThi: new Date("2025-03-19"),
        gioBatDau: "10:30",
        thoiGianThi: 120,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 27,
        trangThai: "Đã kết thúc",
        phuTrach: "Đỗ Văn E"
    }
]