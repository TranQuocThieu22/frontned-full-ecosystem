'use client'

import { service_account } from "@/api/services/service_account";
import { service_eventComplaint } from "@/api/services/service_eventComplaint";
import { service_ranking } from "@/api/services/service_ranking";
import { KEYVALUE_COLORS } from "@/constants/key-value/color";
import { Box, Flex, Group, Paper, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ComplaintButton from "./ComplaintButton";
import { ENUM_EVENT_COMPLAINT_STATUS } from "@/constants/enum/global";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function StudentEventComplaintLayout() {
    const queryStudentInfo = useQuery({
        queryKey: ["Q_StudentInfo"],
        queryFn: async () => {
            const result = await service_account.getCurrentUser()
            return result.data.data
        }
    });

    const queryRanking = useCustomReactQuery({
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
        }
    });

    const queryEventComplaint = useCustomReactQuery({
        queryKey: ["Q_EventComplaint", queryStudentInfo.data?.id],
        axiosFn: () => service_eventComplaint.getStudentEventComplaint(),
        options: {
            enabled: !!queryStudentInfo.data?.id,
        }
    });

    if (queryStudentInfo.isLoading || queryRanking.isLoading || queryEventComplaint.isLoading) return "Đang tải dữ liệu";
    if (queryStudentInfo.isError || queryRanking.isError || queryEventComplaint.isError) return "Không có dữ liệu";

    const findComplaintForEvidence = (eventCode: string) => {
        if (!queryEventComplaint.data || !Array.isArray(queryEventComplaint.data)) {
            return undefined;
        }
        return queryEventComplaint.data.find((complaint: any) => complaint.eventCode === eventCode);
    };

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
                    gap="xl"
                    justify="space-around"
                    align="flex-start"
                    wrap="wrap"
                >
                    <Box w={{ base: '100%', sm: 'auto' }}>
                        <Flex align="center" gap="md">
                            <Text fw={500} w={100}>Mã sinh viên:</Text>
                            <Text fw={700}>{queryStudentInfo.data?.code}</Text>
                        </Flex>
                        <Flex align="center" gap="md" mt="md">
                            <Text fw={500} w={100}>Họ và tên:</Text>
                            <Text fw={700}>{queryStudentInfo.data?.fullName}</Text>
                        </Flex>
                    </Box>
                    <Box w={{ base: '100%', sm: 'auto' }}>
                        <Flex align="center" gap="md">
                            <Text fw={500} w={100}>Khoa:</Text>
                            <Text fw={700}>{queryStudentInfo.data?.facultyName}</Text>
                        </Flex>
                        <Flex align="center" gap="md" mt="md">
                            <Text fw={500} w={100}>Điểm tích lũy:</Text>
                            <Text fw={700}>{queryRanking.data?.totalPoint}</Text>
                        </Flex>
                    </Box>
                    <Box w={{ base: '100%', sm: 'auto' }}>
                        <Flex align="center" gap="md">
                            <Text fw={500} w={100}>Xếp loại:</Text>
                            <Text fw={700}>{queryRanking.data?.rateName}</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Table withColumnBorders highlightOnHover style={{ border: "1px solid lightgray" }}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ border: "1px solid lightgray" }} w="40%" ta="center" px="xs">Nội dung đánh giá</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray" }} w="10%" ta="center" px="xs">Điểm</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray" }} w="20%" ta="center" px="xs">Điểm đánh giá rèn luyện</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray" }} w="10%" ta="center" px="xs">Khiếu nại</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray" }} w="10%" ta="center" px="xs">Trạng thái</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {queryRanking.data?.activityStudentInfoViewModels?.map((category) => (
                        <React.Fragment key={`category-${category.standardId}`}>
                            <Table.Tr bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                                <Table.Td px="xs" style={{ border: "1px solid lightgray" }}>
                                    <CustomHtmlWrapper html={`${category.standardId}. ${category.standardName}`} />
                                </Table.Td>
                                <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                                    <Text fw={600}>{category.standardMaxpoint}</Text>
                                </Table.Td>
                                <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                                    <Text fw={600}>{category.maxPoint}</Text>
                                </Table.Td>
                                <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}></Table.Td>
                                <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}></Table.Td>
                            </Table.Tr>
                            {category.evidences?.map((evidence, idx) => (
                                <Table.Tr key={`${category.standardId}-evidence-${idx}`} style={{ border: "1px solid lightgray" }}>
                                    <Table.Td pl={20} px="xs" style={{ border: "1px solid lightgray" }}>
                                        <CustomHtmlWrapper html={evidence.eventName} />
                                    </Table.Td>
                                    <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                                        {evidence.maxPoint}
                                    </Table.Td>
                                    <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                                        <CustomFlexColumn gap="0">
                                            <Text>{evidence.point}</Text>
                                            {!evidence.isApply && <Text size="xs">(Chờ xác nhận)</Text>}
                                        </CustomFlexColumn>
                                    </Table.Td>
                                    <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                                        <ComplaintButton evidence={evidence} />
                                    </Table.Td>
                                    <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                                        {(() => {
                                            const complaint = findComplaintForEvidence(evidence.eventCode);
                                            return complaint?.status ? (
                                                <Text fw={500} size="sm">
                                                    {ENUM_EVENT_COMPLAINT_STATUS[complaint.status]}
                                                </Text>
                                            ) : null;
                                        })()}
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </React.Fragment>
                    ))}
                    <Table.Tr bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
                        <Table.Td px="xs" style={{ border: "1px solid lightgray" }}>
                            <Text fw={700} ta="center">Tổng điểm:</Text>
                        </Table.Td>
                        <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                            <Text fw={700}>
                                {queryRanking.data?.activityStudentInfoViewModels?.reduce(
                                    (total, category) => total + category.standardMaxpoint,
                                    0
                                )}
                            </Text>
                        </Table.Td>
                        <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                            <Text fw={700}>{queryRanking.data?.totalPoint}</Text>
                        </Table.Td>
                        <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}></Table.Td>
                        <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}></Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Group>
    );

    return (
        <Paper shadow="xs" p="md">
            {renderContent()}
            <Group p="md" mt="md" justify="center">
                <CustomButtonPrintPDF
                    buttonProps={{
                        color: "blue",
                        variant: "outline"

                    }}
                >{renderContent()}</CustomButtonPrintPDF>
            </Group>
        </Paper>
    );
}

