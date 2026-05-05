'use client'
import { service_account } from "@/api/services/service_account";
import { service_ranking } from "@/api/services/service_ranking";
import { KEYVALUE_COLORS } from "@/constants/key-value/color";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Box, Button, Flex, Group, Paper, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

export default function SummaryScoreBoardButtonViewModal({ activityPlanId, rateName, totalPoint }: { activityPlanId: number, rateName: string, totalPoint: number }) {
    const dis = useDisclosure();
    const queryStudentInfo = useCustomReactQuery({
        queryKey: ["studentInfo"],
        axiosFn: () => service_account.getCurrentUser()
    });
    const queryStudentRanking = useCustomReactQuery({
        queryKey: [" F_d78ab2hfsq_Detail_StudentRankingDetail", activityPlanId],
        axiosFn: () => service_ranking.getStudentRankingDetail(
            {
                activityPlanId: activityPlanId ?? 0
            },
        ),
        options: {
            enabled: !!queryStudentInfo.data?.id,
            refetchOnWindowFocus: false,
            refetchInterval: 0,
        }
    });

    if (queryStudentInfo.isLoading || queryStudentRanking.isLoading) return "đang tải dữ liệu";
    if (queryStudentInfo.isError || queryStudentRanking.isError) return "không có dữ liệu";

    const rows = queryStudentRanking.data?.flatMap((category) => [
        <Table.Tr key={category.standardId} bg="gray.0">
            <Table.Td px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                <CustomHtmlWrapper fw={700} html={`${category.standardId}. ${category.standardName}`} />
            </Table.Td>
            <Table.Td ta="center" px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                <Text fw={600}>{category.standardMaxpoint}</Text>
            </Table.Td>
            <Table.Td ta="center" px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                <Text fw={600}>{category.maxPoint}</Text>
            </Table.Td>
        </Table.Tr>,
        ...category.evidences.map((evidence, idx) => (
            <Table.Tr key={`${category.standardId}-${idx}`}>
                <Table.Td pl={20} px="xs" style={{ border: "1px solid lightgray" }}>
                    <CustomHtmlWrapper html={evidence.eventName} />
                </Table.Td>
                <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>{evidence.maxPoint}</Table.Td>
                <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                    <CustomFlexColumn gap="0">
                        <Text>{evidence.point}</Text>
                        {!evidence.isApply && <Text>(Chờ xác nhận)</Text>}
                    </CustomFlexColumn>
                </Table.Td>
            </Table.Tr>
        )),
    ]);

    const renderContent = () => (
        <Group p="md">
            <Box p="md" w="100%">
                <Group justify="center">
                    <Text fw={700} size="lg" c="blue" ta="center" mb="md">
                        THÔNG TIN SINH VIÊN
                    </Text>
                </Group>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap="md"
                    justify="flex-start"
                    wrap="wrap"
                >
                    <Box>
                        <Flex align="center" gap="xs">
                            <Text fw={500}>Mã sinh viên:</Text>
                            <Text fw={700}>{queryStudentInfo.data?.code}</Text>
                        </Flex>
                        <Flex align="center" gap="xs" mt="xs">
                            <Text fw={500}>Họ và tên:</Text>
                            <Text fw={700}>{queryStudentInfo.data?.fullName}</Text>
                        </Flex>
                    </Box>

                    <Box>
                        <Flex align="center" gap="xs">
                            <Text fw={500}>Khoa:</Text>
                            <Text fw={700}>{queryStudentInfo.data?.facultyName}</Text>
                        </Flex>
                        <Flex align="center" gap="xs" mt="xs">
                            <Text fw={500}>Điểm tích lũy:</Text>
                            <Text fw={700}>{totalPoint}</Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex align="center" gap="xs">
                            <Text fw={500}>Xếp loại:</Text>
                            <Text fw={700}>{rateName}</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Table withColumnBorders highlightOnHover style={{ border: "1px solid lightgray" }}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ border: "1px solid lightgray" }} w="60%" ta="center" px="xs">Nội dung đánh giá</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray" }} w="20%" ta="center" px="xs">Điểm</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray" }} w="20%" ta="center" px="xs">Điểm đánh giá rèn luyện</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                    <Table.Tr bg={KEYVALUE_COLORS.mantineBackgroundSecondary}>
                        <Table.Td px="xs" style={{ border: "1px solid lightgray" }}>
                            <Text fw={700} ta="center">Tổng điểm:</Text>
                        </Table.Td>
                        <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                            <Text fw={700} bg={KEYVALUE_COLORS.mantineBackgroundSecondary}>
                                {queryStudentRanking.data?.reduce(
                                    (total, category) => total + category.standardMaxpoint,
                                    0
                                )}
                            </Text>
                        </Table.Td>
                        <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                            <Text fw={700}>{totalPoint}</Text>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Group>
    );

    return (
        <CustomButtonModal
            buttonProps={{
                children: 'Xem'
            }}
            modalProps={{
                title: "Bảng điểm",
                size: "80%"

            }}
            disclosure={dis}
        >
            <Paper shadow="xs" p="md">
                {renderContent()}
                <Group mt="md" justify="flex-end">
                    <CustomButtonPrintPDF
                        buttonProps={{
                            color: "blue",
                            variant: "outline"

                        }}
                    >{renderContent()}</CustomButtonPrintPDF>
                    <Button variant="outline" color="red" leftSection={<IconX />} onClick={() => dis[1].close()}>Đóng</Button>
                </Group>
            </Paper>
        </CustomButtonModal>
    );
}
