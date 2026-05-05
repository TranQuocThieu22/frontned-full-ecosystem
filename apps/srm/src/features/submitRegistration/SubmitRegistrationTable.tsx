import { areaService } from "@/shared/APIs/areaService"
import { SRMTypeService } from "@/shared/APIs/SRMTypeService"
import { topicService } from "@/shared/APIs/topicService"
import { EnumPreliminaryStatus } from "@/shared/consts/enum/EnumPreliminaryStatus"
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore"
import { SRMTopic } from "@/shared/interfaces/SRMTopic"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI"
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils"
import { Center, Group } from "@mantine/core"
import { useMemo } from "react"
import ApplicantRegistrationReviewView from "../applicantRegistrationReview/ApplicantRegistrationReviewView"
import { ApplicantRegistrationStatusBadge, ApplicantRegistrationStatusLabel } from "../applicantRegistrationReview/ApplicantRegistrationStatusBadge"
import SubmitRegistrationCreateUpdate from "./SubmitRegistrationCreateUpdate"

export default function SubmitRegistrationTable() {
    const permissionStore = usePermissionStore()
    const authenticateStore = useAuthenticateStore()
    const academicYearStore = useAcademicYearStore()
    const topicQuery = useCustomReactQuery({
        queryKey: ['topics', 'byAcademicYear', academicYearStore.state.academicYear?.id],
        axiosFn: () => topicService.getAllByAcademicYear({
            AcademicYearId: academicYearStore.state.academicYear?.id!
        }),
        options: {
            enabled: academicYearStore.state.academicYear?.id != undefined
        }
    })

    const areasQuery = useCustomReactQuery({
        queryKey: ['SRMAreas'],
        axiosFn: () => areaService.getAll()
    })
    const typesQuery = useCustomReactQuery({
        queryKey: ['SRMTypes'],
        axiosFn: () => SRMTypeService.getAllIsActive()
    })
    const columns = useMemo<CustomColumnDef<SRMTopic>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "registerName",
            size: columnSizeObject.name,
            importFieldProps: {
                isRequired: true
            }
        },
        {
            header: "Thời gian thực hiện (Tháng)",
            accessorKey: "duration",
            importFieldProps: {
                isRequired: true
            }
        },
        {
            header: "Từ tháng/ năm",
            accessorKey: "fromDate",
            type: "MMyyyy",
            importFieldProps: {
                isRequired: true
            }
        },
        {
            header: "Đến tháng/ năm",
            accessorKey: "toDate",
            type: "MMyyyy",
            importFieldProps: {
                isRequired: true
            }
        },
        {
            header: "Tổng kinh phí",
            accessorKey: "totalCost",
            type: "currencyWithSuffix",
            importFieldProps: {
                parseType: "number"
            }
        },
        {
            header: "Lĩnh vực",
            accessorKey: "srmArea.name",
        },

        {
            header: "Loại đề tài",
            accessorKey: "srmType.name",
        },

        {
            header: "Chủ nhiệm đề tài",
            accessorFn: (row) => row.srmTopicMembers?.filter(item => item.srmTitle?.isLeader == true).map(item => item.user?.fullName).join(", ")
        },
        {
            header: "File thuyết minh",
            accessorKey: "attachmentPath",
            type: "viewFile"
        },
        {
            header: "Trạng thái kiểm tra",
            accessorKey: "preliminaryStatus",
            accessorFn: (row) => row.preliminaryStatus && ApplicantRegistrationStatusLabel[row.preliminaryStatus],
            Cell: ({ row }) => <Center><ApplicantRegistrationStatusBadge status={row.original.preliminaryStatus || -1} /></Center>,
            size: 250
        },


        // For import
        {
            header: "Mã lĩnh vực",
            accessorKey: "srmAreaCode",
            isExcluded: true,
            importFieldProps: {}
        },
        {
            header: "Mã loại đề tài",
            accessorKey: "srmTypeCode",
            isExcluded: true,
            importFieldProps: {}
        },
    ], [])

    const isOwner = (row: SRMTopic) => {
        if (permissionStore.state.isSuperAdmin) return true
        const sessionUserId = authenticateStore.state.userId;
        const leaderUser = row.srmTopicMembers?.filter(item => item.srmTitle?.isLeader == true).map(item => item.user)
        if (leaderUser?.some(item => item?.id == sessionUserId)) {
            return true
        }
        return false
    };

    const isEditable = (row: SRMTopic) => {
        return row.preliminaryStatus == EnumPreliminaryStatus.FixRequested
            || row.preliminaryStatus == EnumPreliminaryStatus.Waiting
            || row.preliminaryStatus == undefined
    }

    return (
        <CustomFieldset title="Danh sách đăng ký tuyển chọn">
            <CustomDataTableAPI
                query={topicQuery}
                columns={columns}
                enableRowSelection
                deleteFn={topicService.delete}
                deleteListFn={topicService.deleteListIds}
                exportProps={{
                    fileName: "Danh sách đăng ký tuyển chọn"
                }}
                buttonImportProps={{
                    fileName: "Mẫu import hồ sơ đăng ký tuyển chọn",
                    onSubmit: (finalValues) => {
                        return topicService.createList(finalValues.map(item => {
                            return {
                                ...item,
                                srmAreaId: areasQuery.data?.find(area => area.code == item.srmAreaCode)?.id,
                                srmTypeId: typesQuery.data?.find(type => type.code == item.srmTypeCode)?.id,
                                academicYearId: academicYearStore.state.academicYear?.id,
                                preliminaryStatus: EnumPreliminaryStatus.Waiting,
                                fromDate: dateUtils.convertMMYYYYToDate(item.fromDate),
                                toDate: dateUtils.convertMMYYYYToDate(item.toDate)
                            }
                        }))
                    },
                }}
                disableDelete={(row) => {
                    if (isOwner(row) == true && isEditable(row) == true) {
                        return false
                    }
                    return true
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <SubmitRegistrationCreateUpdate />
                        </Group>
                    )
                }}
                renderRowActions={({ row }) => (
                    // Nếu trạng thái kiểm tra là yêu cầu điều chỉnh hoặc chờ xử lí thì mới cho edit và nếu đăng nhập là user chủ nhiệm
                    <>
                        <ApplicantRegistrationReviewView data={row.original} loading={topicQuery.isFetching} />
                        <SubmitRegistrationCreateUpdate disabled={!(isOwner(row.original) && isEditable(row.original))} values={row.original} />
                    </>
                )}
                pinningRightColumns={['preliminaryStatus']}
            />
        </CustomFieldset>
    )
}


