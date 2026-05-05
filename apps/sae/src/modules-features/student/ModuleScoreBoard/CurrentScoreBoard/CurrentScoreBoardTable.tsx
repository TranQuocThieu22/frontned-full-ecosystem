'use client';
import { service_account } from "@/api/services/service_account";
import { service_ranking } from "@/api/services/service_ranking";
import { KEYVALUE_COLORS } from "@/constants/key-value/color";
import { ActivityStandardInfo, Evidence } from "@/interfaces/ranking";
import { Box, Flex, Group, Paper, Table, Text } from "@mantine/core";
import { useEffect, useState } from 'react';
import CurrentScoreBoardButtonConfirmModal from "./CurrentScoreBoardButtonConfirmModal";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function CurrentScoreBoardTable() {
  const [points, setPoints] = useState<Record<string, number | null>>({});
  const queryStudentInfo = useCustomReactQuery({
    queryKey: ["studentInfo"],
    axiosFn: () => service_account.getCurrentUser()
  });
  const queryStudentRanking = useCustomReactQuery({
    queryKey: ["CurrentScoreBoardTable_StudentRankingInit", queryStudentInfo.data?.id],
    axiosFn: () =>
      service_ranking.getStudentRankingInit({
        studentId: queryStudentInfo.data?.id ?? 0,
        isPreview: false,
      }),
    options: {
      enabled: !!queryStudentInfo.data?.id,
      refetchOnWindowFocus: false,
      refetchInterval: 0,
      throwOnError: (error) => {
        console.log(error);
        return false;
      },
    },
  });

  // Khởi tạo dữ liệu ban đầu cho points
  useEffect(() => {
    if (!queryStudentRanking.data) return;

    const initialPoints: Record<string, number | null> = {};
    queryStudentRanking.data.activityStudentInfoViewModels.forEach((category) => {
      category.evidences.forEach((evidence) => {
        const key = `${evidence.eventCode}_${evidence.eventName}`;
        initialPoints[key] = evidence.point ?? null;
      });
    });

    setPoints(initialPoints);
  }, [queryStudentRanking.data]);

  const handleChangePoint = (key: string, newPoint: number | null) => {
    setPoints(prev => {
      if (prev[key] === newPoint) return prev;
      return {
        ...prev,
        [key]: newPoint,
      };
    });
  };

  if (queryStudentInfo.isLoading || queryStudentRanking.isLoading) return "Đang tải dữ liệu...";
  if (queryStudentInfo.isError) return 'Không tìm thấy sinh viên';

  const rows = queryStudentRanking.data?.activityStudentInfoViewModels.flatMap((category: ActivityStandardInfo) => [
    <Table.Tr key={category.standardId} bg="gray.0">
      <Table.Td px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
        <CustomHtmlWrapper html={`${category.standardId}. ${category.standardName}`} />
      </Table.Td>
      <Table.Td ta="center" px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
        <Text fw={600}>{category.standardMaxpoint}</Text>
      </Table.Td>
      <Table.Td ta="center" px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
        <Text fw={600}>
          {category.maxPoint}
        </Text>
      </Table.Td>
      <Table.Td ta="center" px="xs" bg={KEYVALUE_COLORS.mantineBackgroundSecondary} style={{ border: "1px solid lightgray" }}>
        <Text fw={600}>
          {category.evidences.reduce((sum, ev) => ((ev.isApply === true && ev.isRequired === false) ? sum + ev.point : sum), 0)}
        </Text>
      </Table.Td>
    </Table.Tr>,
    ...category.evidences.map((evidence: Evidence, idx: number) => {
      const key = `${evidence.eventCode}_${evidence.eventName}`;
      return (
        <Table.Tr key={`${category.standardId}-${idx}`}>
          <Table.Td pl={20} px="xs" style={{ border: "1px solid lightgray" }}>
            <CustomHtmlWrapper html={evidence.eventName} />
          </Table.Td>
          <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>{evidence.maxPoint}</Table.Td>
          <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
            <CustomFlexColumn gap="0">
              <CustomNumberInput
                onChange={(value) => {
                  if (value === "" || value === null) {
                    handleChangePoint(key, null); // Cho phép input trống
                    return;
                  }

                  const numericValue = Number(value);
                  if (!isNaN(numericValue)) {
                    handleChangePoint(key, numericValue);
                  }
                }}
                onBlur={() => {
                  if (points[key] === null || points[key] === undefined) {
                    handleChangePoint(key, 0); // Đặt thành 0 khi blur nếu trống
                  }
                }}
                value={points[key] === null ? "" : points[key]} // Hiển thị "" khi points[key] là null
                min={0}
                max={evidence.maxPoint}
              />
            </CustomFlexColumn>
          </Table.Td>
          <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>{(evidence.isApply === true && evidence.isRequired === false) ? evidence.point : ''}
          </Table.Td>
        </Table.Tr>
      );
    })
  ]);

  const renderContent = () => (
    <Group p="md">
      <Box p="md" w="100%">
        <Group justify="center">
          <Text fw={700} size="lg" c="blue" ta="center" mb="md">
            THÔNG TIN SINH VIÊN
          </Text>
        </Group>
        <Flex direction={{ base: 'column', sm: 'row' }} gap="md" justify="flex-start" wrap="wrap">
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
              <Text fw={700}>
                {
                  queryStudentRanking.data?.activityStudentInfoViewModels.reduce(
                    (total, category) => total + category.standardMaxpoint,
                    0
                  )
                }
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
    </Group>
  );

  return (
    <Paper shadow="xs" p="md">
      {renderContent()}
      <Group mt="md">
        <Box w="100%" ta="center">
          <CurrentScoreBoardButtonConfirmModal points={points} />
        </Box>
      </Group>
    </Paper>
  );
}
