'use client'
import { proposalNotificationService } from "@/shared/APIs/proposalNotificationService";
import { EnumProposalNotificationType } from "@/shared/consts/enum/EnumProposalNotificationType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMProposalNotification } from "@/shared/interfaces/SRMProposalNotification";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import SelectionResultCreateUpdateSendMail from "./SelectionResultCreateUpdateSendMail";

export default function SelectionResultTable({ type }: { type: EnumProposalNotificationType }) {
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
            importFieldProps: {
                isRequired: true,
                isUnique: true
            }
        },
        {
            header: "Tiêu đề thông báo",
            accessorKey: "name",
            importFieldProps: {
                isRequired: true,
            }
        },
        {
            header: "File đính kèm",
            accessorKey: "attachmentPath",
            type: "viewFile"
        },
        {
            header: "Ngày ban hành",
            accessorKey: "issuedDate",
            type: "ddMMyyyy",
            importFieldProps: {
                parseType: "date",
                isRequired: true
            }
        },
        {
            header: "Đã gửi thông báo",
            accessorKey: "hasSentMail",
            type: "squareCheck",
        },

        // For import
        {
            header: "Nội dung chính",
            accessorKey: "description",
            type: "html",
            importFieldProps: {}
        }
    ], [])

    return (
        <CustomFieldset
            title="Danh sách thông báo">
            <CustomDataTableAPI
                enableRowSelection
                query={query}
                columns={columns}
                deleteListFn={proposalNotificationService.deleteListIds}
                deleteFn={proposalNotificationService.delete}
                disableDelete={(row) => row.hasSentMail}
                pinningRightColumns={['hasSentMail']}
                buttonImportProps={{
                    onSubmit: (values) => {
                        return proposalNotificationService.createList(values.map((value) => ({
                            ...value,
                            academicYearId: academicYearId,
                            type: EnumProposalNotificationType.TaskSelectionNotification,
                            code: value.code,
                            name: value.name,
                            description: value.description,
                        })))
                    },
                    fileName: "Cấu trúc import thông báo kết quả tuyển chọn"
                }}
                exportProps={{
                    fileName: "Danh sách thông báo"
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <SelectionResultCreateUpdateSendMail actionType="create" />
                        </Group>
                    )
                }}

                renderRowActions={({ row }) => {
                    return (
                        <>
                            {row.original.hasSentMail ?
                                <SelectionResultCreateUpdateSendMail actionType="view" values={row.original} /> :
                                <SelectionResultCreateUpdateSendMail actionType="sendMail" values={row.original} />
                            }
                            <SelectionResultCreateUpdateSendMail disabled={row.original.hasSentMail} actionType="update" values={row.original} />
                        </>
                    )
                }}
            />
        </CustomFieldset >
    );
}
