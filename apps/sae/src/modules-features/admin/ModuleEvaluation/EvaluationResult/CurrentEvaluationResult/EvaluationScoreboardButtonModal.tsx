import { service_ranking } from "@/api/services/service_ranking";
import { KEYVALUE_COLORS } from "@/constants/key-value/color";
import { ReportCurrentPlan } from "@/interfaces/ranking";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import {
  Alert,
  Box,
  Flex,
  Group,
  Skeleton,
  Table,
  Text
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBug, IconNotebook, IconX } from "@tabler/icons-react";


export default function EvaluationScoreboardButtonModal({ reportCurrentPlan }: { reportCurrentPlan: ReportCurrentPlan }) {
  const disc = useDisclosure();
  const permissionStore = usePermissionStore();

  const queryStudentRankingInit = useCustomReactQuery({
    queryKey: ["EvaluationScoreboardButtonModal_Detail_StudentRankingInit", reportCurrentPlan.studentId],
    axiosFn: () => service_ranking.getStudentRankingInit(
      {
        studentId: reportCurrentPlan.studentId,
        isPreview: true
      },
    ),
    options: { enabled: disc[0] }
  });

  const renderStudentInfo = () => (
    <Box p="md" w="100%">
      <Text fw={700} size="lg" c="blue" ta="center" mb="md">
        THÔNG TIN SINH VIÊN
      </Text>
      <Flex direction={{ base: "column", sm: "row" }} gap="xl" wrap="wrap">
        <Box>
          <Text fw={500}>Mã sinh viên: <Text fw={700} span>{reportCurrentPlan.studentCode}</Text></Text>
          <Text mt="xs" fw={500}>Họ và tên: <Text fw={700} span>{reportCurrentPlan.studentName}</Text></Text>
        </Box>
        <Box>
          <Text fw={500}>Khoa: <Text fw={700} span>{reportCurrentPlan.facultyName}</Text></Text>
          <Text mt="xs" fw={500}>Điểm tích lũy: <Text fw={700} span>{queryStudentRankingInit.data?.totalPoint}</Text></Text>
        </Box>
        <Box>
          <Text fw={500}>Xếp loại: <Text fw={700} span>{queryStudentRankingInit.data?.rateName}</Text></Text>
        </Box>
      </Flex>
    </Box>
  );

  const renderRankingTable = () => {
    const rows = queryStudentRankingInit.data?.activityStudentInfoViewModels.flatMap((category) => [
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
      </Table.Tr>,
      ...category.evidences.map((e, idx) => (
        <Table.Tr key={`${category.standardId}-${idx}`}>
          <Table.Td pl={20} px="xs" style={{ border: "1px solid lightgray" }}>
            <CustomHtmlWrapper html={e.eventName} />
          </Table.Td>
          <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>{e.maxPoint}</Table.Td>
          <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
            <CustomFlexColumn gap="0">
              <Text>{e.point}</Text>
              {!e.isApply && <Text>(Chờ xác nhận)</Text>}
            </CustomFlexColumn>
          </Table.Td>
        </Table.Tr>
      ))
    ]);

    const totalStandardPoint = queryStudentRankingInit.data?.activityStudentInfoViewModels.reduce(
      (sum, category) => sum + category.standardMaxpoint,
      0
    );

    return (
      <Table withColumnBorders highlightOnHover style={{ border: "1px solid lightgray" }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w="60%" ta="center" px="xs">Nội dung đánh giá</Table.Th>
            <Table.Th w="20%" ta="center" px="xs">Điểm</Table.Th>
            <Table.Th w="20%" ta="center" px="xs">Điểm đánh giá rèn luyện</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows}
          <Table.Tr bg={KEYVALUE_COLORS.mantineBackgroundPrimary}>
            <Table.Td px="xs"><Text fw={700} ta="center">Tổng điểm:</Text></Table.Td>
            <Table.Td ta="center" px="xs"><Text fw={700}>{totalStandardPoint}</Text></Table.Td>
            <Table.Td ta="center" px="xs"><Text fw={700}>{queryStudentRankingInit.data?.totalPoint}</Text></Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    );
  };

  const renderContent = () => (
    <Group p="md">
      {renderStudentInfo()}
      {renderRankingTable()}
    </Group>
  );

  const renderContentModal = () => {
    if (queryStudentRankingInit.isLoading) return <Skeleton><div style={{ height: "50vh" }}></div></Skeleton>;
    if (queryStudentRankingInit.isError) return <Alert variant="light" color="red" title="Đã xảy ra lỗi" icon={<IconBug />}></Alert>;

    return (
      <>
        {renderContent()}
        <Group mt="md" justify="flex-end">
          {permissionStore.state.currentPermissionPage?.isPrint &&
            <CustomButtonPrintPDF buttonProps={{
              w: 100
            }}
            >
              {renderContent()}
            </CustomButtonPrintPDF>
          }
          <CustomButton w={100} leftSection={<IconX />} color="red" onClick={disc[1].close}>Đóng</CustomButton>
        </Group>
      </>
    );
  };

  return (
    <CustomButtonModal
      modalProps={{
        title: "Bảng điểm",
        size: '80%'
      }}
      buttonProps={{
        children: "Xem",
        leftSection: <IconNotebook />,
        variant: "outline",
        // hidden: !permissionStore.state.currentPermissionPage?.isRead

      }}
      disclosure={disc}
    >
      {renderContentModal()}
    </CustomButtonModal>
  );
}
