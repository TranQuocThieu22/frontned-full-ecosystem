'use client'
import { service_account } from "@/api/services/service_account";
import { service_ranking } from "@/api/services/service_ranking";
import { KEYVALUE_COLORS } from "@/constants/key-value/color";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Box, Center, Flex, Group, Paper, Stack, Table, Text } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";


export default function ActivityExecutionResultLayout() {

    const queryStudentInfo = useQuery({
        queryKey: ["Q_StudentInfo"],
        queryFn: async () => {
            const result = await service_account.getCurrentUser()
            return result.data.data
        }
    });

    const queryStudentRanking = useCustomReactQuery({
        queryKey: ["Q_StudentRankingInit", queryStudentInfo.data?.id],
        axiosFn: () =>
            service_ranking.getStudentRankingInit({
                studentId: queryStudentInfo.data?.id ?? 0,
                isPreview: true,
            }),
        options: {
            enabled: !!queryStudentInfo.data?.id,
            refetchOnWindowFocus: false,
            refetchInterval: 0,
        },
    });

    if (queryStudentInfo.isLoading || queryStudentRanking.isLoading) return "đang tải dữ liệu";
    if (queryStudentInfo.isError || queryStudentRanking.isError) return "không có dữ liệu";

    const rows = queryStudentRanking.data?.activityStudentInfoViewModels.flatMap((category) => [
        <Table.Tr key={category.standardId} bg="gray.0">
            <Table.Td px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                <CustomHtmlWrapper html={`${category.standardId}. ${category.standardName}`} />
            </Table.Td>
            <Table.Td ta="center" px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                <Text fw={600}>{category.standardMaxpoint}</Text>
            </Table.Td>
            <Table.Td ta="center" px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                <Text fw={600}>{category.maxPoint}</Text>
            </Table.Td>
            <Table.Td ta="center" px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                <Text fw={600}>
                    {category.evidences.reduce((sum, ev) => ((ev.isApply === true && ev.isRequired === false) ? sum + ev.point : sum), 0)}
                </Text>
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
                        {(!evidence.isApply) && <Text>(Chờ xác nhận)</Text>}
                    </CustomFlexColumn>
                </Table.Td>
                <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                    {
                        (evidence.isApply === true && evidence.isRequired === false) ?
                            <CustomFlexColumn gap="0">
                                <Text>{evidence.point}</Text>
                                {(!evidence.isApply) && <Text>(Chờ xác nhận)</Text>}
                            </CustomFlexColumn>
                            :
                            ''
                    }
                </Table.Td>
            </Table.Tr>
        )),
    ]);

    const renderContent = () => (
        <Box p="md" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            '@media print': {
                width: '100%',
                margin: '0 auto',
            }
        }}>
            <Box style={{
                padding: '20px',
                '@media print': {
                    pageBreakInside: 'avoid',
                    pageBreakAfter: 'avoid'
                }
            }}>
                <Group justify="center" mb="md">
                    <Text fw={700} size="lg" c="blue" ta="center">
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
                            <Text fw={700}>{queryStudentRanking.data?.totalPoint}</Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex align="center" gap="xs">
                            <Text fw={500}>Xếp loại:</Text>
                            <Text fw={700}>{queryStudentRanking.data?.rateName}</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Box>

            <Box style={{
                '@media print': {
                    pageBreakInside: 'avoid',
                    pageBreakBefore: 'avoid'
                }
            }}>
                <Table withColumnBorders highlightOnHover style={{ border: "1px solid lightgray" }}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ border: "1px solid lightgray" }} w="70%" ta="center" px="xs">Nội dung đánh giá</Table.Th>
                            <Table.Th style={{ border: "1px solid lightgray" }} w="10%" ta="center" px="xs">Điểm</Table.Th>
                            <Table.Th style={{ border: "1px solid lightgray" }} w="10%" ta="center" px="xs">Điểm đánh giá rèn luyện</Table.Th>
                            <Table.Th style={{ border: "1px solid lightgray" }} w="10%" ta="center" px="xs">Điểm hoạt động ngoại khóa</Table.Th>

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
                                    {queryStudentRanking.data?.activityStudentInfoViewModels.reduce(
                                        (total, category) => total + category.standardMaxpoint,
                                        0
                                    )}
                                </Text>
                            </Table.Td>
                            <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                                <Text fw={700}>{queryStudentRanking.data?.totalPoint}</Text>
                            </Table.Td>
                            <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                                <Text fw={700}>
                                    {queryStudentRanking.data?.activityStudentInfoViewModels
                                        .reduce((sumStandard, standard) => (
                                            sumStandard + standard.evidences
                                                .filter(ev => ev.isApply === true && ev.isRequired === false)
                                                .reduce((sumEv, ev) => (sumEv + ev.point), 0)
                                        ), 0)
                                    }
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Box>
        </Box>
    );

    return (
        <Paper shadow="xs" p="md">
            {renderContent()}
            <Center>
                <Stack py={24}>
                    <CustomButtonPrintPDF
                        buttonProps={{
                            leftSection: <IconPrinter style={{ width: "25px", height: "25px" }} />
                        }}
                    >{renderContent()}</CustomButtonPrintPDF>
                </Stack>
            </Center>
        </Paper>
    );
}
