import { service_ranking } from "@/api/services/service_ranking";
import { KEYVALUE_COLORS } from "@/constants/key-value/color";
import { Account } from "@/interfaces/account";
import { StudentRankingHistoryByStudent } from "@/interfaces/ranking";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Box, Flex, Group, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";


interface DetailContentProps {
  student?: Account;
  historyByStudent: StudentRankingHistoryByStudent | null;
}

export default function EvaluationScoreboardSummaryButtonModal({
  student,
  historyByStudent,
}: DetailContentProps) {
  const disclosure = useDisclosure();
  const permissionStore = usePermissionStore();

  const queryStudentRankingDetail = useCustomReactQuery({
    queryKey: [
      " F_d78ab2hfsq_Detail_StudentRankingDetail",
      student?.id,
      historyByStudent?.activityPlanId,
    ],
    axiosFn: () =>
      service_ranking.getRankingDetail({
        studentId: student?.id ?? 0,
        activityPlanId: historyByStudent?.activityPlanId ?? 0,
      }),
    options: {
      enabled: disclosure[0] && !!student?.id && !!historyByStudent?.activityPlanId,
    },
  });

  const renderStudentInfo = () => (
    <Box w="100%">
      <Group justify="center">
        <Text fw={700} size="lg" c="blue" ta="center" mb="md">
          THÔNG TIN SINH VIÊN
        </Text>
      </Group>
      <Flex direction={{ base: "column", sm: "row" }} gap="md" justify="flex-start" wrap="wrap">
        <Box>
          <Flex align="center" gap="xs">
            <Text fw={500}>Mã sinh viên:</Text>
            <Text fw={700}>{student?.code}</Text>
          </Flex>
          <Flex align="center" gap="xs" mt="xs">
            <Text fw={500}>Họ và tên:</Text>
            <Text fw={700}>{student?.fullName}</Text>
          </Flex>
        </Box>

        <Box>
          <Flex align="center" gap="xs">
            <Text fw={500}>Khoa:</Text>
            <Text fw={700}>{student?.facultyName}</Text>
          </Flex>
          <Flex align="center" gap="xs" mt="xs">
            <Text fw={500}>Điểm tích lũy:</Text>
            <Text fw={700}>{historyByStudent?.studentRankingPoint}</Text>
          </Flex>
        </Box>
        <Box>
          <Flex align="center" gap="xs">
            <Text fw={500}>Xếp loại:</Text>
            <Text fw={700}>{historyByStudent?.rateName}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );

  const renderRankingTable = () => {
    const rows = queryStudentRankingDetail.data?.flatMap((category) => [
      <Table.Tr key={category.standardId} bg="gray.0">
        <Table.Td
          px="xs"
          bg={KEYVALUE_COLORS.mantineBackgroundSecondary}
          style={{ border: "1px solid lightgray" }}
        >
          <CustomHtmlWrapper html={`${category.standardId}. ${category.standardName}`} />
        </Table.Td>
        <Table.Td
          ta="center"
          px="xs"
          bg={KEYVALUE_COLORS.mantineBackgroundSecondary}
          style={{ border: "1px solid lightgray" }}
        >
          <Text fw={600}>{category.standardMaxpoint}</Text>
        </Table.Td>
        <Table.Td
          ta="center"
          px="xs"
          bg={KEYVALUE_COLORS.mantineBackgroundSecondary}
          style={{ border: "1px solid lightgray" }}
        >
          <Text fw={600}>{category.maxPoint}</Text>
        </Table.Td>
      </Table.Tr>,
      ...category.evidences.map((evidence, idx) => (
        <Table.Tr key={`${category.standardId}-${idx}`}>
          <Table.Td pl={20} px="xs" style={{ border: "1px solid lightgray" }}>
            <CustomHtmlWrapper html={evidence.eventName} />
          </Table.Td>
          <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
            {evidence.maxPoint}
          </Table.Td>
          <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
            <CustomFlexColumn gap="0">
              <Text>{evidence.point}</Text>
              {!evidence.isApply && <Text>(Chờ xác nhận)</Text>}
            </CustomFlexColumn>
          </Table.Td>
        </Table.Tr>
      )),
    ]);
    return (
      <Group w="100%">
        <Table withColumnBorders highlightOnHover style={{ border: "1px solid lightgray" }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ border: "1px solid lightgray" }} w="60%" ta="center" px="xs">
                Nội dung đánh giá
              </Table.Th>
              <Table.Th style={{ border: "1px solid lightgray" }} w="20%" ta="center" px="xs">
                Điểm
              </Table.Th>
              <Table.Th style={{ border: "1px solid lightgray" }} w="20%" ta="center" px="xs">
                Điểm đánh giá rèn luyện
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
            <Table.Tr bg={KEYVALUE_COLORS.mantineBackgroundSecondary}>
              <Table.Td px="xs" style={{ border: "1px solid lightgray" }}>
                <Text fw={700} ta="center">
                  Tổng điểm:
                </Text>
              </Table.Td>
              <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                <Text fw={700} bg={KEYVALUE_COLORS.mantineBackgroundSecondary}>
                  {queryStudentRankingDetail.data?.reduce(
                    (total, category) => total + category.standardMaxpoint,
                    0
                  )}
                </Text>
              </Table.Td>
              <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
                <Text fw={700}>{historyByStudent?.studentRankingPoint}</Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Group>
    );
  };
  const renderContent = () => (
    <Group p="md">
      {renderStudentInfo()}
      {renderRankingTable()}
    </Group>
  );

  const renderContentModal = () => {
    if (queryStudentRankingDetail.isLoading) return <Text>Đang tải dữ liệu...</Text>;
    if (queryStudentRankingDetail.isError) return <Text>Không có dữ liệu</Text>;

    return (
      <>
        {renderContent()}
        <CustomFlexRow mt="md" justify={"flex-end"}>
          {permissionStore.state.currentPermissionPage?.isPrint && (
            <CustomButtonPrintPDF >
              {renderContent()}
            </CustomButtonPrintPDF>
          )}
          <CustomButton w={100} leftSection={<IconX />} color="red" onClick={disclosure[1].close}>
            Đóng
          </CustomButton>
        </CustomFlexRow>
      </>
    );
  };
  return (
    <CustomButtonModal
      modalProps={{
        title: "Bảng điểm",
        size: "70%"
      }}
      buttonProps={{
        children: "Xem",
        disabled: !permissionStore.state.currentPermissionPage?.isRead

      }}
      disclosure={disclosure}
    >
      {renderContentModal()}
    </CustomButtonModal>
  );
}
