import { proposalNotificationService } from "@/shared/APIs/proposalNotificationService";
import { EnumProposalNotificationType } from "@/shared/consts/enum/EnumProposalNotificationType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMProposalNotification } from "@/shared/interfaces/SRMProposalNotification";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import TaskProposalNoticeCreateUpdateSendMail from "./TaskProposalNoticeCreateUpdateSendMail";

export default function TaskProposalNoticeTable({ type }: { type: EnumProposalNotificationType }) {
    const academicYearId = useAcademicYearStore().state.academicYear?.id
    const query = useCustomReactQuery({
        queryKey: ['ProposalNotifications', 'byAcademyYear', academicYearId],
        options: {
            enabled: academicYearId != undefined
        },
        axiosFn: () => proposalNotificationService.getAllByAcademicYearAndType({
            academicYearId: academicYearId!,
            Type: type,
        })
    })
    const columns = useMemo<CustomColumnDef<SRMProposalNotification>[]>(() => [
        {
            header: "Mã thông báo",
            accessorKey: "code",
            importFieldProps: {}
        },
        {
            header: "Tiêu đề thông báo",
            accessorKey: "name",
            size: columnSizeObject.name,
            importFieldProps: {
                isRequired: true,
                isUnique: true
            }
        },
        {
            header: "Nội dung chính",
            accessorKey: "description",
            type: "html",
            importFieldProps: {
                isRequired: true,
            }
        },
        {
            header: "File đính kèm",
            accessorKey: "attachmentPath",
            type: "viewFile",
        },
        {
            header: "Ngày ban hành",
            accessorKey: "issuedDate",
            type: "ddMMyyyy",
            importFieldProps: {
                parseType: "date"
            }
        },
        {
            header: type === EnumProposalNotificationType.TaskProposal ? "Ngày bắt đầu nhận đề xuất" : "Ngày bắt đầu nhận đăng ký",
            accessorKey: "startDate",
            type: "ddMMyyyy",
            importFieldProps: {
                parseType: "date"
            }
        },
        {
            header: type === EnumProposalNotificationType.TaskProposal ? "Ngày kết thúc nhận đề xuất" : "Ngày kết thúc nhận đăng ký",
            accessorKey: "endDate",
            type: "ddMMyyyy",
            importFieldProps: {
                parseType: "date"
            }
        },
        {
            header: "Đã gửi thông báo",
            accessorKey: "hasSentMail",
            type: "squareCheck",
        },
    ], [])
    return (
        <CustomDataTableAPI
            exportProps={{
                fileName: "Danh sách thông báo đề xuất"
            }}
            columns={columns}
            query={query}
            enableRowSelection
            deleteListFn={proposalNotificationService.deleteListIds}
            deleteFn={proposalNotificationService.delete}
            disableDelete={(row) => row.hasSentMail} // Cho phép disable delete theo điều kiện (Delete list chọn vào row này sẽ bị disable, )
            buttonImportProps={{
                onSubmit: (data) => {
                    return proposalNotificationService.createList(data.map(item => ({
                        ...item,
                        academicYearId: academicYearId,
                        type: type
                    })))
                },
            }}
            hiddenColumns={['description']}
            pinningRightColumns={['hasSentMail']}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <Group>
                        <TaskProposalNoticeCreateUpdateSendMail type={type} actionType="create" />
                    </Group>
                )
            }}
            renderRowActions={({ row }) => (
                <>
                    {row.original.hasSentMail ?
                        <TaskProposalNoticeCreateUpdateSendMail // Xem chi tiết
                            type={type}
                            actionType="view"
                            values={row.original}
                        />
                        :
                        <TaskProposalNoticeCreateUpdateSendMail // Gửi mail
                            disabled={row.original.hasSentMail}
                            type={type}
                            actionType="sendMail"
                            values={row.original}
                        />
                    }

                    <TaskProposalNoticeCreateUpdateSendMail
                        disabled={row.original.hasSentMail}
                        type={type}
                        actionType="update"
                        values={row.original}
                    />
                </>
            )}
            rowActionSize={200}

        />
    )
}

