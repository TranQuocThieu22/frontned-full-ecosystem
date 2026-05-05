import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Badge, Box, Stack } from "@mantine/core";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import Form04CurrentSituationDetail from "../../ModuleSelfAssessmentForm04/Form04CurrentSituation/Form04CurrentSituationDetail";
import MyCustomTitleGroup from "../../ModuleSelfAssessmentForm04/Shared/MyCustomTitleGroup";
import HistoryAccordionItem from "../ComponentShared/HistoryAccordionItem";
import LoadingSkeleton from "../ComponentShared/LoadingSkeleton";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

interface Props {
    data?: ISelfAssessment,
    isAccordionItem: boolean,
    isLoading?: boolean,
}

export default function CurrentSituationContent({ data, isAccordionItem, isLoading }: Props) {

    const columns = useMemo<MRT_ColumnDef<IEvidenceUsageHistories>[]>(
        () => [
            {
                header: "Mã minh chứng báo cáo",
                accessorKey: "reportName",
            },
            {
                header: "Mã minh chứng",
                accessorKey: "code",
            },
            {
                header: "Tên minh chứng",
                accessorKey: "name",
                size: columnSizeObject.name,
            },
            {
                header: "Trạng thái",
                accessorKey: "status",
                Cell: ({ row }) => {
                    const effectiveTo = row.original.eaqEvidenceCurrentVersion?.expiredDate;
                    const currentDate = new Date();
                    const toDate = effectiveTo ? new Date(effectiveTo) : null;
                    const isLate = !toDate || currentDate > toDate;

                    return (
                        <Badge
                            w="100%"
                            h={25}
                            leftSection={
                                isLate ? <IconClockX size={16} /> : <IconClockCheck size={16} />
                            }
                            variant="light"
                            color={isLate ? "red" : "green"}
                            radius="md"
                            fw={700}
                        >
                            {isLate ? "Hết hạn" : "Còn hạn"}
                        </Badge>
                    );
                },
            },
        ],
        []
    );

    const renderRowContent = () => {
        return (
            <Stack>
                <Box
                    mih="30vh"
                    mah="40vh"
                    p="sm"
                    style={{ overflow: "auto", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                    <CustomHtmlWrapper html={data?.description ?? ""} />
                </Box>

                <CustomDataTable
                    renderTopToolbarCustomActions={() => (
                        <MyCustomTitleGroup title="Danh sách minh chứng đã sử dụng" />
                    )}
                    columns={columns}
                    data={data?.eaqEvidenceUsageHistories ?? []}
                    enableRowNumbers={false}
                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <Form04CurrentSituationDetail
                                    evidence={row.original}
                                    evidenceId={row.original.eaqEvidenceId ?? 0}
                                />
                            </CustomCenterFull>
                        );
                    }}
                />
            </Stack>
        );
    }

    if (isLoading) return (<LoadingSkeleton />)

    return (
        isAccordionItem
            ? <HistoryAccordionItem data={data}>
                {renderRowContent()}
            </HistoryAccordionItem>
            : renderRowContent()
    );
}
