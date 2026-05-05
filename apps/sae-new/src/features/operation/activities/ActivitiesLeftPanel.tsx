import { activityServiceQT } from "@/shared/APIs/activityServiceQT";
import { ActivityStateColor, ActivityStateEnum, ActivityStateLabel, ActivityTypeEnum, ActivityTypeLabel } from "@/shared/interfaces/Activity";
import { CustomCardPanel } from "@aq-fe/core-ui/shared/components/layout/CustomCardPanel/CustomCardPanel";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { Box, Center, Divider, Flex, Loader, Select, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconBoxOff, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ActivitiesCreateUpdateButton from "./ActivitiesCreateUpdateButton";


export function ActivitiesLeftPanel({
    selectedId,
    onSelectRowAction,
}: {
    selectedId: string;
    onSelectRowAction: (id: string) => void;
}) {
    const authenticateStore = useAuthenticateStore()
    const [filterState, setFilterState] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string | null>(ActivityTypeEnum.OPTIONAL.toString());
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch] = useDebouncedValue(searchQuery, 300);

    const query = useCustomReactQuery({
        queryKey: ["activities", filterState, filterType, debouncedSearch],
        serviceFn: () => activityServiceQT.getAll({
            tenantId: authenticateStore.state.tenantId,
            Type: filterType ? Number(filterType) : undefined,
            State: filterState ? Number(filterState) : undefined,
            CodeOrName: debouncedSearch || undefined,
        }),
        // mockData: [
        //     {
        //         id: "1",
        //         code: "HD2024",
        //         name: "Hoạt động 1",
        //         description: "Mô tả hoạt động 1",
        //         type: 1,
        //         semesterId: "1",
        //         semesterName: "Học kỳ 1",
        //         criterionCode: "1",
        //         criteriaId: "1",
        //         state: 1,
        //         maxScore: 10,
        //         quota: 10,
        //         registeredCount: 10,
        //         organizerUnit: "1",
        //     },
        //     {
        //         id: "2",
        //         code: "HD2025",
        //         name: "Hoạt động 2",
        //         description: "Mô tả hoạt động 2",
        //         type: 2,
        //         semesterId: "2",
        //         semesterName: "Học kỳ 2",
        //         criterionCode: "2",
        //         criteriaId: "2",
        //         state: 2,
        //         maxScore: 20,
        //         quota: 20,
        //         registeredCount: 20,
        //         organizerUnit: "2",
        //     },
        // ]
    })
    useEffect(() => {
        if (!query.data) return
        if (query.data?.length > 0) {
            onSelectRowAction(query.data[0]!.id!)
        }
    }, [query.data])
    return (
        <Box>
            <Flex justify="space-between" align="center" gap="md" mb="md">
                <Text fw="bold" size="xl">
                    Danh sách hoạt động
                </Text>
                <ActivitiesCreateUpdateButton />
            </Flex>
            <TextInput
                placeholder="Tìm kiếm theo mã, tên..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                mb="md"
            />
            <SimpleGrid cols={2} mb="md">
                <Select
                    label="Loại hoạt động"
                    placeholder="Loại hoạt động"
                    data={[
                        ...Object.values(ActivityTypeEnum)
                            .filter(val => typeof val === 'number')
                            .map((val) => ({
                                value: val.toString(),
                                label: ActivityTypeLabel[val as ActivityTypeEnum]
                            }))
                    ]}
                    value={filterType}
                    onChange={setFilterType}
                    allowDeselect={false}
                />
                <Select
                    label="Trạng thái"
                    placeholder="Lọc theo trạng thái"
                    data={[
                        { value: "", label: "Tất cả trạng thái" },
                        ...Object.values(ActivityStateEnum)
                            .filter(val => typeof val === 'number')
                            .map((val) => ({
                                value: val.toString(),
                                label: ActivityStateLabel[val as ActivityStateEnum]
                            }))
                    ]}
                    value={filterState}
                    onChange={setFilterState}
                    clearable
                />
            </SimpleGrid>
            <Divider />
            {query.isLoading ? (
                <Center mt="md">
                    <Loader />
                </Center>
            ) : query.data && query.data.length === 0 ? (
                <Center mt="xl">
                    <Stack align="center" gap="sm">
                        <IconBoxOff size={48} stroke={1.5} color="var(--mantine-color-gray-4)" />
                        <Text c="dimmed">Không tìm thấy hoạt động nào</Text>
                    </Stack>
                </Center>
            ) : (
                query.data?.map((activity) => (
                    <Box key={activity.id}>
                        <CustomCardPanel
                            title={activity.name ?? "—"}
                            code={activity.code}
                            state={
                                activity.state
                                    ? {
                                        label: ActivityStateLabel[activity.state],
                                        color: ActivityStateColor[activity.state],
                                    }
                                    : undefined
                            }
                            footer={
                                <Flex justify="space-between" align="center">
                                    <Text size="xs" c="dimmed">
                                        Tối đa: {activity.maxScore ?? 0} đ
                                    </Text>
                                </Flex>
                            }
                            selected={activity.id === selectedId}
                            onClick={() =>
                                activity.id && onSelectRowAction(activity.id)
                            }
                        />
                        <Divider />
                    </Box>
                ))
            )}
        </Box>
    )
}

