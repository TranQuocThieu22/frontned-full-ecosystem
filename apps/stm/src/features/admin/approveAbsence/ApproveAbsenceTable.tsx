'use client'

import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dayOffRequestService } from "@/shared/APIs/dayOffRequestService";
import { DayOffRequest } from "@/shared/interfaces/DayOffRequest";
import { enum_dayOfRequestStatus } from "@/constants/enum/enum_dayOfRequestStatus";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { ActionIcon, Center, Group, Modal, Paper, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload, IconLivePhoto, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import ApproveAbsenceApproveLeave from "./ApproveAbsenceApproveLeave";
import ApproveAbsenceDaysOffDetail from "./ApproveAbsenceDaysOffDetail";
import ApproveAbsenceExport from "./ApproveAbsenceExport";

function PdfViewButton({ filePath }: { filePath?: string }) {
    const disc = useDisclosure(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [hSize, setHSize] = useState("80vh");
    if (!filePath) return null;
    return (
        <>
            <Tooltip label="Xem file minh chứng">
                <ActionIcon color="cyan" onClick={disc[1].open}>
                    <IconLivePhoto />
                </ActionIcon>
            </Tooltip>
            <Modal
                fullScreen={fullScreen}
                opened={disc[0]}
                onClose={disc[1].close}
                size="80%"
                title={
                    <Group>
                        <Text>Xem file minh chứng</Text>
                        {fullScreen ? (
                            <ActionIcon onClick={() => { setFullScreen(false); setHSize("80vh"); }}>
                                <IconMinimize />
                            </ActionIcon>
                        ) : (
                            <ActionIcon onClick={() => { setFullScreen(true); setHSize("90vh"); }}>
                                <IconMaximize />
                            </ActionIcon>
                        )}
                    </Group>
                }
            >
                <Paper h={hSize} p="lg">
                    <iframe src={filePath} width="100%" height="100%" />
                </Paper>
            </Modal>
            <Tooltip label="Tải xuống">
                <ActionIcon color="red" onClick={() => window.open(filePath, "_blank")}>
                    <IconDownload />
                </ActionIcon>
            </Tooltip>
        </>
    );
}

export default function ApproveAbsenceTable() {
    const query = useCustomReactQuery({
        queryKey: ["dayOffRequests"],
        axiosFn: () =>
            dayOffRequestService.getAll({
                params: "?cols=User",
            }),
    })
    const columns = useMemo<CustomColumnDef<DayOffRequest>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "user.code"
            },
            {
                header: "Họ Tên",
                accessorKey: "user.fullName"
            },
            {
                header: "Từ ngày",
                accessorKey: "fromDate",
                accessorFn: (row) => {
                    return utils_date_dateToDDMMYYYString(new Date(row.fromDate!))
                }
            },
            {
                header: "Đến ngày",
                accessorKey: "toDate",
                accessorFn: (row) => {
                    return utils_date_dateToDDMMYYYString(new Date(row.toDate!))
                }
            },
            {
                header: "Số buổi nghỉ",
                accessorKey: "totalSection",
            },
            {
                header: "Chi tiết buổi nghỉ",
                accessorKey: "detail",
                Cell: ({ row }) => {
                    return <ApproveAbsenceDaysOffDetail fromDate={row.original.fromDate?.toString()} toDate={row.original.toDate?.toString()} lecturerId={row.original.userId} />
                }
            },
            {
                header: "File minh chứng",
                accessorKey: "fileProve",
                Cell: ({ row }) => (
                    <PdfViewButton filePath={row.original.filePath} />
                ),
            },
            {
                header: "Lý do",
                accessorKey: "reason"
            },
            {
                header: "Kế hoạch bù",
                accessorKey: "comment"
            },
            {
                header: "Trạng thái",
                accessorKey: "status",
                accessorFn: (row) => {
                    return enum_dayOfRequestStatus[row.status!]
                }
            },
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <CustomFieldset title="Danh sách đăng ký nghỉ dạy">
            <CustomDataTable
                columns={columns}
                enableRowNumbers={true}
                data={query.data || []}
                renderTopToolbarCustomActions={() => {
                    return (
                        <Group>
                            <ApproveAbsenceExport />
                        </Group>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <Center>
                            <ApproveAbsenceApproveLeave
                                values={row.original}
                            />
                        </Center>
                    )
                }}
            />
        </CustomFieldset>
    )
}
