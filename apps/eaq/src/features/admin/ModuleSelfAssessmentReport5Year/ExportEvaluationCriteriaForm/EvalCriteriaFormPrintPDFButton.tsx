import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Box, Center, Flex, Table, Text, Title, Tooltip } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomPrintContent } from "@aq-fe/core-ui/shared/components/overlays/CustomPrintContent";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function EvalCriteriaFormPrintButton({
  values,
}: {
  values: ITaskDetail;
}) {
  const permissionStore = usePermissionStore();

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);

  const query = useCustomReactQuery({
    queryKey: ["EvalCriteriaFormPrint", values.eaqTaskId, values.id],
    axiosFn: async () => await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId(
      {
        eaqPhaseId: values.eaqTask?.eaqEvaluationPlan?.eaqPhaseId,
        eaqTaskDetailId: values.id
      }
    ),
    options: {
      enabled: isCheck,
    },
  });

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "In nội dung",
    onAfterPrint: () => setIsCheck(false), // Reset state sau khi print
  });

  useEffect(() => {
    if (isCheck && query.data && printRef.current) {
      handlePrint();
    }
  }, [isCheck, query.data]);

  const contentToPrint = (
    <>
      <Title order={3}>
        <Center>PHIẾU ĐÁNH GIÁ TIÊU CHÍ</Center>
      </Title>
      <Text fw={700} pt={"xs"}>
        Nhóm công tác: {values.eaqTask?.eaqCouncilGroup?.name}
      </Text>
      <Text fw={500}>
        <span style={{ fontWeight: 700 }}>
          Tiêu chuẩn {values.eaqCriteria?.eaqStandard?.code}
        </span>
        : {values.eaqCriteria?.eaqStandard?.name}
      </Text>
      <Text fw={500}>
        <span style={{ fontWeight: 700 }}>
          Tiêu chí {values.eaqCriteria?.code}
        </span>
        : {values.eaqCriteria?.name}
      </Text>

      <Text fw={700} pt={"xs"}>
        1. Mô tả hiện trạng
      </Text>
      <CustomHtmlWrapper
        html={
          query.data?.find((item) => item.selfAssessmentType === 1)
            ?.description ?? ""
        }
      />

      <Text fw={700} pt={"xs"}>
        2. Điểm mạnh:
      </Text>
      <CustomHtmlWrapper
        html={
          query.data?.find((item) => item.selfAssessmentType === 2)
            ?.description ?? ""
        }
      />

      <Text fw={700} pt={"xs"}>
        3. Điểm tồn tại:
      </Text>
      <CustomHtmlWrapper
        html={
          query.data?.find((item) => item.selfAssessmentType === 3)
            ?.description ?? ""
        }
      />

      <Text fw={700} pt={"xs"}>
        4. Kế hoạch hành động:
      </Text>
      <Table striped withTableBorder className="my-bordered-table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th rowSpan={2}><Center>TT</Center></Table.Th>
            <Table.Th rowSpan={2}><Center>Mục tiêu</Center></Table.Th>
            <Table.Th rowSpan={2} style={{ width: "27.5%" }}><Center>Nội dung</Center></Table.Th>
            <Table.Th rowSpan={2}><Center>Đơn vị, người thực hiện</Center></Table.Th>
            <Table.Th rowSpan={2}><Center>Thời gian thực hiện hoặc hoàn thành</Center></Table.Th>
            <Table.Th rowSpan={2}><Center>Ghi chú</Center></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {query.data
            ?.find((item) => item.selfAssessmentType === 4)
            ?.eaqActions?.map((item, index) => (
              <Table.Tr key={item.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{item.target}</Table.Td>
                <Table.Td style={{ width: "27.5%" }}>{item.detail}</Table.Td>
                <Table.Td>{item.unit}</Table.Td>
                <Table.Td>{item.actionTime}</Table.Td>
                <Table.Td>{item.note}</Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>

      <Text fw={700} fs={"italic"} pt={"xs"}>
        5. Tự đánh giá:{" "}
        <span style={{ fontWeight: 500 }}>Mức đạt được của tiêu chí</span>
        <br />
        Đánh dấu (x) vào ô tương ứng dưới đây:
      </Text>
      <Table striped withTableBorder className="my-bordered-table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "50%" }}><Center>Không đạt (K)</Center></Table.Th>
            <Table.Th style={{ width: "50%" }}><Center>Đạt (Đ)</Center></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            {(() => {
              const status = query.data?.find((item) => item.selfAssessmentType === 5)?.status;
              if (status === 2) {
                return (
                  <>
                    <Table.Td style={{ width: "50%" }}>
                      <Center>x</Center>
                    </Table.Td>
                    <Table.Td style={{ width: "50%" }} />
                  </>
                );
              } else if (status === 1) {
                return (
                  <>
                    <Table.Td style={{ width: "50%" }} />
                    <Table.Td style={{ width: "50%" }}>
                      <Center>x</Center>
                    </Table.Td>
                  </>
                );
              } else {
                return (
                  <>
                    <Table.Td style={{ width: "50%" }} />
                    <Table.Td style={{ width: "50%" }} />
                  </>
                );
              }
            })()}
          </Table.Tr>
        </Table.Tbody>
      </Table>

      <Flex mt={"xl"} justify="space-between">
        <Box style={{ textAlign: "center" }}>
          <Text pt={"sm"} fw={700}>
            Xác nhận
            <br />
            của trưởng nhóm công tác
          </Text>
        </Box>

        <Box style={{ textAlign: "center" }}>
          <Text fs="italic">
            …………, Ngày {new Date().getDate()} tháng {new Date().getMonth() + 1}{" "}
            năm {new Date().getFullYear()}
          </Text>
          <Text fw={700}>Người viết</Text>
          <Text fs="italic">Ký, ghi rõ họ tên</Text>
        </Box>
      </Flex>
    </>
  );

  return (
    <>
      <Tooltip label="Không đủ quyền" disabled={permissionStore.state.currentPermissionPage?.isPrint}>
        <CustomButton
          loading={query.isLoading}
          variant="outline"
          size="xs"
          color="orange"
          disabled={!permissionStore.state.currentPermissionPage?.isPrint}

          onClick={() => setIsCheck(true)}
        >
          In phiếu
        </CustomButton>
      </Tooltip >
      <CustomPrintContent printRef={printRef as any}>{contentToPrint}</CustomPrintContent>
    </>
  );
}
