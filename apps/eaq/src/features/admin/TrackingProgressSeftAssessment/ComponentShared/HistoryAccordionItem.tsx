"use client";

import {ISelfAssessment} from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import {Accordion, Flex, Group, Text} from "@mantine/core";
import {ReactNode} from "react";
import {DisplaySelfAssessmentStatusInAccordion} from "./DisplaySelfAssessmentStatusInAccordion";
import {dateUtils} from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
    data?: ISelfAssessment,
    children: ReactNode
}


export default function HistoryAccordionItem({ data, children }: Props) {

    return (
        <Accordion.Item value={`${data?.id?.toString() ?? "1"}`}>
            <Accordion.Control p={5} style={{ border: "1px solid black", borderRadius: "5px", marginTop: "4px" }}>
                <Group gap="md" grow>
                    <Text size="sm" fw={500} c={"green"}>
                        {data?.name}
                    </Text>
                    <Text size="sm" fw={500}>
                        Giai đoạn: <Text span>{data?.eaqPhase?.code}</Text>
                    </Text>
                    <Text size="sm" fw={500}>
                        Ngày cập nhật: <Text span>{dateUtils.toDDMMYYYY(data?.modifiedWhen ?? "")}</Text>
                    </Text>
                    <Text size="sm" fw={500}>
                        Người cập nhật: <Text span>{data?.modifiedFullName}</Text>
                    </Text>
                    <Flex gap="xs" fw={500}>
                        <Text size="sm" fw={500}>
                            Tự đánh giá:
                        </Text>
                        <DisplaySelfAssessmentStatusInAccordion status={data?.status} />
                    </Flex>
                </Group>
            </Accordion.Control>
            <Accordion.Panel style={{ backgroundColor: "" }}>
                {children}
            </Accordion.Panel>
        </Accordion.Item>
    );
}
