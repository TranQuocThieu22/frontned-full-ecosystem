"use client";

import { useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { INotification } from "@/shared/interfaces/notification/INotification";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { IconClipboardList } from "@tabler/icons-react";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

export default function NotificationDetailButton({ taskDetailId }: { taskDetailId?: number }) {
    const disc = useDisclosure(false);

    const taskDetailNotificationQuery = useCustomReactQuery({
        queryKey: ["Notification_Detail_List", taskDetailId],
        axiosFn: () => service_EAQEvaluationPlan.getEAQTaskDetailNotifications(taskDetailId),
        options: {
            enabled: disc[0],
        },
    });

    const columns = useMemo<MRT_ColumnDef<INotification>[]>(
        () => [
            {
                header: "Ngày gửi",
                accessorKey: "notificationDate",
                Cell: ({ row }) => dateUtils.toDDMMYYYY(row.original.notificationDate)
            },
            {
                header: "Người gửi",
                accessorKey: "sendBy",
            },
            {
                header: "Người nhận",
                Cell: ({ row }) => row.original.eaqTaskDetail?.user?.email ?? "",
            },
            {
                header: "Nội dung thông báo",
                accessorKey: "notificationMessage",
                size: 500,
            },
        ],
        []
    );

    return (
        <CustomButtonModal
            modalProps={{
                title: "Chi tiết thông báo",
                size: "100%"

            }}
            buttonProps={{
                variant: "light",
                children: "Xem chi tiết",
                leftSection: <IconClipboardList />
            }}
            disclosure={disc}
        >
            <CustomDataTable
                enableRowSelection
                enableRowNumbers
                columns={columns}
                isError={taskDetailNotificationQuery.isError}
                isLoading={taskDetailNotificationQuery.isLoading}
                data={taskDetailNotificationQuery.data || []}
            />
        </CustomButtonModal>
    );
}
