"use client"
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI"
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi"
import { useMemo } from "react"
interface SRMProposalNotification extends BaseEntity {
    issuedDate?: string,
    startDate?: string
    endDate?: string
    applicableResearchers?: string
    description?: string
    academicYearId?: number
    hasSentMail?: boolean
    attachmentPath?: string
    targetAudience?: string
    type?: number,
}
export default function Page() {
    const query = useCustomReactQuery({
        queryKey: ['ProposalNotifications', 'byAcademyYear', 1],
        options: {
            enabled: 1 != undefined
        },
        axiosFn: () => axiosInstance.get<CustomApiResponse<SRMProposalNotification[]>>(`/srm/SRMProposalNotification` + '/GetAllByAcademicYearAndType', {
            params: {
                academicYearId: 1,
                Type: 1,
            }
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
            header: "Ngày bắt đầu nhận đề xuất",
            accessorKey: "startDate",
            type: "ddMMyyyy",
            importFieldProps: {
                parseType: "date"
            }
        },
        {
            header: "Ngày kết thúc nhận đề xuất",
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
            columns={columns}
            query={query}
            buttonImportProps={{
                onSubmit: () => {

                }
            }}
        />
    )
}
