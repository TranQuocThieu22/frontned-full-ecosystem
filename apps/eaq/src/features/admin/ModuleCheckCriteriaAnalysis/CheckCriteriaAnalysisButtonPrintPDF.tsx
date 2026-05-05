import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Box, Space, Table, Text, Title } from "@mantine/core";
import { useLayoutEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { CustomPrintContent } from "@aq-fe/core-ui/shared/components/overlays/CustomPrintContent";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function CheckCriteriaAnalysisButtonPrintPDF({
  values,
}: {
  values: ITaskDetail;
}) {
  const [isCheck, setIsCheck] = useState(false);
  const printDivRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printDivRef,
    documentTitle: "In nội dung",
    onAfterPrint: () => setIsCheck(false),
  });

  const query = useCustomReactQuery({
    queryKey: ["CheckCriteriaAnalysisButtonPrintPDF", values.eaqTaskId],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetTaskDetailById({
        taskDetailId: values.id,
      }),
    options: {
      enabled: isCheck,
    },
  });

  useLayoutEffect(() => {
    if (isCheck && query.data && printDivRef.current) {
      handlePrint();
    }
  }, [isCheck, query.data]);

  const contentToPrint = (
    <>
      <Title order={3} ta="center">
        PHIẾU THU THẬP, PHÂN TÍCH
      </Title>
      <Title order={3} ta="center">
        VÀ XỬ LÝ THÔNG TIN, MINH CHỨNG
      </Title>
      <Space h="md" />
      <Box pl="70px">
        <Text>
          <strong>Nhóm công tác hoặc cá nhân:</strong>{" "}
          {values.eaqTask?.eaqCouncilGroup?.code}
          {" - "}
          {values.eaqTask?.eaqCouncilGroup?.name}
        </Text>
        <Text>
          <strong>Tiêu chuẩn:</strong> {values.eaqCriteria?.eaqStandard?.code}
          {" - "}
          {values.eaqCriteria?.eaqStandard?.name}
        </Text>
        <Text>
          <strong>Tiêu chí:</strong> {values.eaqCriteria?.code}
          {" - "}
          {values.eaqCriteria?.name}
        </Text>
      </Box>

      <Space h="lg" />
      <Table className="my-bordered-table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta="center" colSpan={2}>
              Phân tích tiêu chí
            </Table.Th>
            <Table.Th ta="center" colSpan={3}>
              Thông tin, minh chứng
            </Table.Th>
            <Table.Th ta="center" rowSpan={2}>
              Ghi chú
            </Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Các yêu cầu</Table.Th>
            <Table.Th>Các câu hỏi đặt ra</Table.Th>
            <Table.Th>Cần thu thập</Table.Th>
            <Table.Th>Nơi thu thập</Table.Th>
            <Table.Th>Phương pháp thu thập</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {query.data?.eaqTaskDetailRequirements?.map((requirement, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                {index + 1}. {requirement.eaqRequirement?.name}
              </Table.Td>
              <Table.Td>{requirement.collectionQuestion}</Table.Td>
              <Table.Td>{requirement.collectionNeed}</Table.Td>
              <Table.Td>{requirement.collectionWhere}</Table.Td>
              <Table.Td>{requirement.collectionMethod}</Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Space h="lg" />
      <Title order={4} ta="center">
        DỰ KIẾN CÁC MINH CHỨNG THEO TIÊU CHÍ
      </Title>
      <Table className="my-bordered-table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Tiêu chuẩn</Table.Th>
            <Table.Th>Tiêu chí</Table.Th>
            <Table.Th>Mã minh chứng</Table.Th>
            <Table.Th>Tên minh chứng</Table.Th>
            <Table.Th>
              Số, ngày ban hành, hoặc thời điểm khảo sát, điều tra, phỏng vấn,
              quan sát,…
            </Table.Th>
            <Table.Th>Nơi ban hành hoặc nhóm, cá nhân thực hiện</Table.Th>
            <Table.Th>Ghi chú</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {query?.data?.eaqTaskDetailEvidences?.map((evidence, index) => (
            <Table.Tr key={index}>
              <Table.Td ta={"center"}>
                {values.eaqCriteria?.eaqStandard?.code}
              </Table.Td>
              <Table.Td ta={"center"}>{values.eaqCriteria?.code}</Table.Td>
              <Table.Td>{evidence.eaqExpectedEvidenceCode}</Table.Td>
              <Table.Td>{evidence.eaqExpectedEvidenceName}</Table.Td>
              <Table.Td>{evidence.eaqExpectedEvidenceDate}</Table.Td>
              <Table.Td>{evidence.eaqExpectedEvidenceUnitRelease}</Table.Td>
              <Table.Td>{evidence.eaqExpectedEvidenceNote}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Space h="lg" />
      <CustomFlexRow justify="flex-end">
        <CustomFlexColumn justify={"center"} gap="sm">
          <Text ta={"center"}>........, ngày ... tháng ... năm .......</Text>
          <Text ta={"center"} fw={700}>
            TRƯỞNG NHÓM CÔNG TÁC
          </Text>
          <Text ta={"center"}>(Ký, ghi rõ họ tên)</Text>
        </CustomFlexColumn>
      </CustomFlexRow>
    </>
  );

  return (
    <>
      <CustomButton
        actionType="print"
        variant="outline"
        size="xs"
        loading={query.isLoading}
        color="orange"
        onClick={() => setIsCheck(true)}
      >
        In phiếu
      </CustomButton>
      <CustomPrintContent printRef={printDivRef as any}>{contentToPrint}</CustomPrintContent>
    </>
  );
}
