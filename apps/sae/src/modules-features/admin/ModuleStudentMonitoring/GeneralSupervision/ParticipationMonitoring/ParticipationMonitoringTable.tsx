'use client';

import { service_account } from "@/api/services/service_account";
import { service_standard } from "@/api/services/service_standard";
import { service_studentsActivityRegistration } from "@/api/services/service_studentsActivityRegistration";
import { StudentList } from "@/interfaces/account";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Card, Group, Tabs, Text, Stack, Box, Paper, Badge, Divider, useMantineColorScheme } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ExportButton from "./ExportButton";
import ParticipationMonitoringButtonImport from "./ParticipationMonitoringButtonImport";
import StudentParticipationCardChart from "./ParticipationMonitoringCardChart";
import StudentParticipationCardInfo from "./ParticipationMonitoringCardInfo";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function ParticipationMonitoringTable() {
    const { colorScheme } = useMantineColorScheme();
    const permissionStore = usePermissionStore();
    const [studentSelect, setStudentSelect] = useState<StudentList | null>(null);
    const standandSelect = useState<number | undefined>();
    const [studentSearchInput, setStudentSearchInput] = useState("");
    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", 800);
    const paginationState = useState({ pageIndex: 0, pageSize: 10 });

    const Q_ActivityRegistration = useCustomReactQuery({
        queryKey: ["ParticipationMonitoring_ActivityRegistration_GetByStudent", studentSelect?.id, standandSelect[0]],
        axiosFn: () => service_studentsActivityRegistration.getByStudent({
            studentId: studentSelect?.id,
            standardId: standandSelect[0]
        }),
    });

    const Q_Standard = useCustomReactQuery({
        queryKey: ["ParticipationMonitoring_Standard_GetAll"],
        axiosFn: () => service_standard.getAll(),
    });

    const Q_Student = useCustomReactQuery({
        queryKey: [
            "Q_StudentList_ParticipationMonitoring",
            debouncedStudentSearch
        ],
        axiosFn: () =>
            service_account.getStudentList({
                paging: {
                    pageNumber: paginationState[0].pageIndex + 1,
                    pageSize: paginationState[0].pageSize
                },
                name: debouncedStudentSearch || undefined
            }),
        options: {
            staleTime: 2 * 60 * 1000,
            refetchOnWindowFocus: false,
            select: (data) => {
                return Array.from(
                    new Map(
                        data.map((item) => [item.code, item])
                    ).values()
                );
            }
        }
    });

    const columns = useMemo<MRT_ColumnDef<StudentEvent>[]>(() => [
        { header: "Mã sự kiện", accessorKey: "event.code" },
        {
            header: "Tên sự kiện",
            accessorKey: "event.name",
            accessorFn: (row) => {
                return <CustomHtmlWrapper html={row.event?.name!} />
            }
        },
        { header: "Đơn vị tổ chức", accessorKey: "event.hostName" },
        { header: "Đơn vị ghi nhận", accessorKey: "event.reviewedName" },
        { header: "Đơn vị công nhận", accessorKey: "event.completedName" },
        { header: "Địa điểm tổ chức", accessorKey: "event.addressName" },
        {
            header: "Từ ngày", accessorKey: "event.startDate",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.event?.startDate!)
        },
        {
            header: "Đến ngày", accessorKey: "event.endDate",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.event?.endDate!)
        },
        { header: "Điểm", accessorKey: "point" },
    ], []);

    // Calculate statistics
    const statistics = useMemo(() => {
        const activities = Q_ActivityRegistration.data || [];
        return {
            totalActivities: activities.length,
            totalPoints: activities.reduce((acc, item) => acc + (item.point || 0), 0)
        };
    }, [Q_ActivityRegistration.data]);

    return (
        <CustomFlexColumn gap="lg">
            {/* Student Selection Card */}
            <Card shadow="md" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                    <Box>
                        <Text size="sm" fw={600} mb="xs">Chọn sinh viên</Text>
                        <CustomSelect
                            searchable
                            searchValue={studentSearchInput}
                            onSearchChange={(value) => {
                                setStudentSearchInput(value);
                                if (value === '') {
                                    setStudentSelect(null);
                                }
                            }}
                            data={Q_Student.data?.map((item) => ({
                                label: `${item.code} - ${item.fullName}`,
                                value: item.code ?? ''
                            })) || []}
                            value={studentSelect?.code ?? null}
                            onChange={(value) => {
                                if (value) {
                                    const foundUser = Q_Student.data?.find((item) => item.code === value);
                                    if (foundUser) {
                                        setStudentSelect(foundUser);
                                        setStudentSearchInput(foundUser.code ?? '');
                                    }
                                } else {
                                    setStudentSelect(null);
                                    setStudentSearchInput('');
                                }
                            }}
                            placeholder="Nhập ít nhất 2 ký tự để tìm kiếm..."
                            nothingFoundMessage={studentSearchInput.length > 0 && studentSearchInput.length < 2 ?
                                "Nhập ít nhất 2 ký tự để tìm kiếm" :
                                Q_Student.isLoading ? "Đang tìm kiếm..." : "Không tìm thấy kết quả"
                            }
                            limit={20}
                            clearable
                        />
                    </Box>

                    {studentSelect && (
                        <>
                            <Divider />

                            {/* Standards Tabs */}
                            <Tabs defaultValue="all">
                                <Tabs.List>
                                    <Tabs.Tab value="all" onClick={() => standandSelect[1](undefined)}>
                                        Tất cả
                                    </Tabs.Tab>
                                    {Q_Standard.data?.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)).map((item, index) => (
                                        <Tabs.Tab
                                            key={item.code}
                                            value={item.id?.toString() || ''}
                                            onClick={() => { item.id !== undefined && standandSelect[1](item.id) }}
                                        >
                                            Điều {index + 1}
                                        </Tabs.Tab>
                                    ))}
                                </Tabs.List>

                                <Tabs.Panel value="all" mt="md">
                                    <Paper
                                        withBorder
                                        p="md"
                                        radius="md"
                                        style={{
                                            backgroundColor: colorScheme === "dark"
                                                ? 'var(--mantine-color-dark-7)'
                                                : 'var(--mantine-color-gray-0)',
                                            borderColor: colorScheme === "dark"
                                                ? 'var(--mantine-color-dark-5)'
                                                : undefined
                                        }}
                                    >
                                        <Text size="sm" c="dimmed">Hiển thị tất cả các điều</Text>
                                    </Paper>
                                </Tabs.Panel>

                                {Q_Standard.data?.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)).map((item) => (
                                    <Tabs.Panel key={item.id} value={item.id?.toString() || ''} mt="md">
                                        <Paper
                                            withBorder
                                            p="md"
                                            radius="md"
                                            style={{
                                                backgroundColor: colorScheme === "dark"
                                                    ? 'var(--mantine-color-dark-7)'
                                                    : 'var(--mantine-color-blue-0)',
                                                borderColor: colorScheme === "dark"
                                                    ? 'var(--mantine-color-dark-5)'
                                                    : 'var(--mantine-color-blue-2)'
                                            }}
                                        >
                                            <Group justify="space-between" wrap="nowrap">
                                                <Box style={{ flex: 1 }}>
                                                    <Text size="xs" c="dimmed" mb={4}>Nội dung</Text>
                                                    <Text size="sm" fw={600}>{item.name}</Text>
                                                </Box>
                                                <Box>
                                                    <Text size="xs" c="dimmed" mb={4}>Điểm tối đa</Text>
                                                    <Badge size="lg" variant="light" color="blue">
                                                        {item.maxPoint} điểm
                                                    </Badge>
                                                </Box>
                                            </Group>
                                        </Paper>
                                    </Tabs.Panel>
                                ))}
                            </Tabs>
                        </>
                    )}
                </Stack>
            </Card>

            {/* Main Content */}
            {!studentSelect ? (
                <Paper
                    withBorder
                    p="xl"
                    radius="md"
                    style={{
                        textAlign: 'center',
                        borderColor: colorScheme === "dark"
                            ? 'var(--mantine-color-dark-4)'
                            : undefined
                    }}
                >
                    <Text size="sm" c="dimmed" fs="italic">
                        Vui lòng chọn sinh viên để xem thông tin chi tiết
                    </Text>
                </Paper>
            ) : (
                <Stack gap="lg">
                    {/* Student Info Cards */}
                    <Group align="stretch" style={{ alignItems: 'stretch' }}>
                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <StudentParticipationCardInfo
                                student={studentSelect}
                                statistics={statistics}
                            />
                        </Box>
                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <StudentParticipationCardChart student={studentSelect} />
                        </Box>
                    </Group>

                    {/* Data Table */}
                    <Card shadow="md" padding="lg" radius="md" withBorder>
                        <CustomDataTable
                            isLoading={Q_ActivityRegistration.isLoading}
                            isError={Q_ActivityRegistration.isError}
                            enableRowSelection={true}
                            enableRowNumbers={true}
                            renderTopToolbarCustomActions={({ table }) => (
                                <Group>
                                    {permissionStore.state.currentPermissionPage?.isCreate &&
                                        <ParticipationMonitoringButtonImport
                                            activityRegistration={Q_ActivityRegistration.data!}
                                            studentId={studentSelect.id!}
                                        />
                                    }
                                    {permissionStore.state.currentPermissionPage?.isExport &&
                                        <ExportButton table={table} data={Q_ActivityRegistration.data || []} />
                                    }
                                </Group>
                            )}
                            columns={columns}
                            data={Q_ActivityRegistration.data || []}
                            enableBottomToolbar={true}
                        />
                    </Card>
                </Stack>
            )}
        </CustomFlexColumn>
    );
}
