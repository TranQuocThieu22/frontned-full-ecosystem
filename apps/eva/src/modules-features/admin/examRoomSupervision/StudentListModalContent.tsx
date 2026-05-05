'use client';

import { ActionIcon, Checkbox, Flex, Group, Menu, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertTriangle, IconBan, IconClockEdit, IconDots, IconHistory, IconListCheck, IconMessage, IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IExamSessionStudentInfoViewModel } from "./Interfaces/prototypeInterfaces";
import MonitorAction1 from "./MonitorAction1";
import MonitorAction2 from "./MonitorAction2";
import MonitorAction3 from "./MonitorAction3";
import MonitorAction4 from "./MonitorAction4";
import ViewDetailTestModal from "./ViewDetailTestModal";
import ViewHistoryModal from "./ViewHistoryModal";


export default function StudentListModalContent() {
    const allStudents = useQuery<IExamSessionStudentInfoViewModel[]>({
        queryKey: ['examSessionStudentMockData'],
        queryFn: () => {
            return examSessionStudentListMockData;
        }
    })

    const studentListMRTColumns = useMemo<MRT_ColumnDef<IExamSessionStudentInfoViewModel>[]>(() => [
        {
            header: "Mã thí sinh",
            accessorKey: "maThiSinh",
        },
        {
            header: "Họ tên",
            accessorKey: "hoTen",
        },
        {
            header: "Ngày sinh",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(row.ngaySinh!);
            }
        },
        {
            header: "Giới tính",
            accessorKey: "gioiTinh",
        },
        {
            header: "IP Address",
            accessorKey: "IPAdress",
        },
        {
            header: "Thiết bị",
            accessorKey: "device",
        },
        {
            header: "Vắng thi",
            accessorFn(originalRow) {
                return (
                    <>
                        <Checkbox
                            readOnly
                            checked={originalRow.vangThi!}
                            color="red"
                        />
                    </>
                )
            },
        },
        {
            header: "Điểm trừ",
            accessorKey: "diemTru",
        },
        {
            header: "Đình chỉ",
            accessorKey: "dinhChi",
            accessorFn(originalRow) {
                return (
                    <>
                        <Checkbox
                            readOnly
                            checked={originalRow.dinhChi === true}
                            color="red"
                        />

                    </>
                )
            },
        },
        {
            header: "Nhắc nhở",
            accessorKey: "nhacNho",
        },
        {
            header: "Bù giờ",
            accessorKey: "buGio",
        },
        {
            header: "Tiến độ",
            accessorKey: "tienDo",
        }

    ], []);

    const discMonitorAction1 = useDisclosure(false);
    const discMonitorAction2 = useDisclosure(false);

    const discMonitorAction3 = useDisclosure(false);
    const discMonitorAction4 = useDisclosure(false);

    const discHistory = useDisclosure();
    const discViewDetailTest = useDisclosure()
    return (
        <>
            <Flex
                w="100%" h="80vh"
                direction="column"
                gap="md"
            >
                <Group w={"100%"} gap={32}
                    align="start"
                    justify="space-between">
                    <Group
                    >
                        <Group gap={5}><Text fw={600}>Môn học: </Text>CSDLCB - Cơ sở dữ liệu cơ bản</Group>
                        <Group gap={5}><Text fw={600}>Nhóm: </Text>room1</Group>
                        <Group gap={5}><Text fw={600}>Ngày thi: </Text>25/05/2025</Group>
                        <Group gap={5}><Text fw={600}>Giờ thi: </Text>09:00</Group>
                        <Group gap={5}><Text fw={600}>Thời gian thi: </Text>90 Phút</Group>
                    </Group>
                    <Group gap={20} mr={100}><Text fw={600}>Thời gian còn lại: </Text><Title>56:21</Title></Group>
                </Group>

                <MyDataTable
                    columns={studentListMRTColumns}
                    data={allStudents.data || []}
                    enableRowSelection={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                        </Group>
                    )}
                    displayColumnDefOptions={{
                        "mrt-row-actions": {
                            header: "Thao tác",
                            size: 120,
                        },
                        "mrt-row-numbers": {
                            Header: "STT",
                            size: 70
                        },
                    }}
                    renderRowActions={({ row }) => (
                        <>
                            <MyCenterFull>
                                <Menu shadow="md" position="bottom-start">
                                    <Menu.Target>
                                        <ActionIcon variant="transparent" color="yellow" size="xl" radius="xs"
                                        >
                                            <IconDots />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Label>Thao tác</Menu.Label>
                                        <Menu.Item leftSection={<IconMessage color="teal" />}
                                            onClick={discMonitorAction1[1].open}
                                        >
                                            Nhắc nhở
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconAlertTriangle color="orange" />}
                                            onClick={discMonitorAction2[1].open}
                                        >
                                            Ghi nhận vi phạm
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconBan color="red" />}
                                            onClick={discMonitorAction3[1].open}>
                                            Đình chỉ thi
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconClockEdit color="blue" />}
                                            onClick={discMonitorAction4[1].open}>
                                            Xử lý bù giờ
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={discHistory[1].open}
                                            leftSection={<IconHistory color="purple" />}
                                        >
                                            lịch sử
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={discViewDetailTest[1].open}
                                            leftSection={<IconListCheck color="green" />}
                                        >
                                            Chi tiết đáp án
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </MyCenterFull>
                        </>

                    )}
                />
            </Flex>

            <Modal
                size={"xl"}
                opened={discMonitorAction1[0]}
                onClose={discMonitorAction1[1].close}
                title="Nhắc nhở">
                <MonitorAction1
                    disc={discMonitorAction1}
                />
            </Modal>

            <Modal
                size={"xl"}
                opened={discMonitorAction2[0]}
                onClose={discMonitorAction2[1].close}
                title="Ghi nhận vi phạm">
                <MonitorAction2
                    disc={discMonitorAction2}
                />
            </Modal>

            <Modal
                size={"md"}
                opened={discMonitorAction3[0]}
                onClose={discMonitorAction3[1].close}
                title="Đình chỉ thi">
                <MonitorAction3
                    disc={discMonitorAction3}
                />
            </Modal>
            <Modal
                size={"md"}
                opened={discMonitorAction4[0]}
                onClose={discMonitorAction4[1].close}
                title="Xử lý bù giờ">
                <MonitorAction4
                    disc={discMonitorAction4}
                />
            </Modal>


            <ViewHistoryModal
                opened={discHistory[0]}
                onClose={discHistory[1].close}
            />
            <ViewDetailTestModal
                opened={discViewDetailTest[0]}
                onClose={discViewDetailTest[1].close}
            />
        </>
    )
}

const examSessionStudentListMockData = [
    {
        id: 1,
        maThiSinh: "SV001",
        hoTen: "Nguyễn Văn A",
        ngaySinh: new Date("2002-01-15"),
        gioiTinh: "Nam",
        IPAdress: "192.168.1.10",
        device: "Chrome drive",
        vangThi: false,
        diemTru: 0,
        dinhChi: false,
        nhacNho: 1,
        buGio: 0,
        tienDo: "25/30",
    },
    {
        id: 2,
        maThiSinh: "SV002",
        hoTen: "Trần Thị B",
        ngaySinh: new Date("2002-03-22"),
        gioiTinh: "Nữ",
        IPAdress: "",
        device: "",
        vangThi: true,
        diemTru: null,
        dinhChi: null,
        nhacNho: null,
        buGio: null,
        tienDo: ""
    },
    {
        id: 3,
        maThiSinh: "SV003",
        hoTen: "Lê Văn C",
        ngaySinh: new Date("2001-12-05"),
        gioiTinh: "Nam",
        IPAdress: "192.168.1.12",
        device: "Chrome drive",
        vangThi: false,
        diemTru: 1,
        dinhChi: false,
        nhacNho: 2,
        buGio: 0,
        tienDo: "25/30"
    },
    {
        id: 4,
        maThiSinh: "SV004",
        hoTen: "Phạm Thị D",
        ngaySinh: new Date("2002-07-19"),
        gioiTinh: "Nữ",
        IPAdress: "192.168.1.13",
        device: "Chrome drive",
        vangThi: false,
        diemTru: 0,
        dinhChi: false,
        nhacNho: 0,
        buGio: 15,
        tienDo: "25/30"
    },
    {
        id: 5,
        maThiSinh: "SV005",
        hoTen: "Đỗ Minh E",
        ngaySinh: new Date("2002-09-30"),
        gioiTinh: "Nam",
        IPAdress: "192.168.1.14",
        device: "Chrome drive",
        vangThi: false,
        diemTru: 1,
        dinhChi: true,
        nhacNho: 1,
        buGio: 5,
        tienDo: "25/30"
    }
]