import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Box, Center, Flex, Table, Text, Title, } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { CustomPrintContent } from "@aq-fe/core-ui/shared/components/overlays/CustomPrintContent";

export default function PrintPDFButton({ values }: { values: ITaskDetail }) {
    const printRef = useRef<HTMLDivElement>(null);
    const [dataToPrint, setDataToPrint] = useState<ISelfAssessment[]>([]);

    const mutation = useCustomReactMutation({
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId(
            {
                eaqPhaseId: values.eaqTask?.eaqEvaluationPlan?.eaqPhaseId,
                eaqTaskDetailId: values.id
            }),
        enableDefaultSuccess: false,
        autoInvalidate: false,
        options: {
            onSuccess: (data) => {
                setDataToPrint(data || []);
            },
        }
    })

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "In nội dung",
    });

    useEffect(() => {
        if (mutation.isSuccess && dataToPrint) {
            handlePrint();
        }
    }, [dataToPrint])

    return (
        <>
            <CustomActionIcon
                toolTipProps={{
                    label: 'in'
                }}
                actionType="print"
                loading={mutation.isPending}
                onClick={() => {
                    mutation.mutate();
                }}
            >
            </CustomActionIcon>
            <CustomPrintContent printRef={printRef as any}>
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
                        dataToPrint?.find((item) => item.selfAssessmentType === 1)
                            ?.description ?? ""
                    }
                />

                <Text fw={700} pt={"xs"}>
                    2. Điểm mạnh:
                </Text>
                <CustomHtmlWrapper
                    html={
                        dataToPrint?.find((item) => item.selfAssessmentType === 2)
                            ?.description ?? ""
                    }
                />

                <Text fw={700} pt={"xs"}>
                    3. Điểm tồn tại:
                </Text>
                <CustomHtmlWrapper
                    html={
                        dataToPrint?.find((item) => item.selfAssessmentType === 3)
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
                        {dataToPrint
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
                                const status = dataToPrint?.find((item) => item.selfAssessmentType === 5)?.status;

                                if (status === 2) {
                                    return (
                                        <>
                                            <Table.Td style={{ width: "50%" }}>
                                                <Center>x</Center>
                                            </Table.Td>
                                            <Table.Td style={{ width: "50%" }} />
                                        </>
                                    );
                                }

                                if (status === 1) {
                                    return (
                                        <>
                                            <Table.Td style={{ width: "50%" }} />
                                            <Table.Td style={{ width: "50%" }}>
                                                <Center>x</Center>
                                            </Table.Td>
                                        </>
                                    );
                                }

                                return <></>;
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
                            ........., Ngày......tháng......năm........
                        </Text>
                        <Text fw={700}>Người viết</Text>
                        <Text fs="italic">Ký, ghi rõ họ tên</Text>
                    </Box>
                </Flex>
            </CustomPrintContent>
        </>
    );
}
