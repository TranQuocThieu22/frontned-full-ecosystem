"use client";

import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService";
import { ReviewCommitteeStatusColor, ReviewCommitteeStatusEnum, ReviewCommitteeStatusIcon, ReviewCommitteeStatusLabel } from "@/shared/consts/enum/EnumReviewCommitteeStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMReviewCommittee } from "@/shared/interfaces/SRMReviewCommittee";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import ReviewCommitteeSetupCreateUpdate from "./ReviewCommitteeSetupCreateUpdate";
import ReviewCommitteeUpdateButton from "./ReviewCommitteeUpdateButton";

export default function ReviewCommitteeTable() {
    const academicStore = useAcademicYearStore();
    const dics = useDisclosure();
    const [dataUpdate, setDataUpdate] = useState<SRMReviewCommittee>();
    const reviewCommitteeQuery = useCustomReactQuery({
        queryKey: ['review_committee_list', academicStore.state.academicYear?.id],
        axiosFn: () => reviewCommitteeService.getReviewCommitteeByAcademyYear({ AcademicYearId: academicStore.state.academicYear?.id }),
        options: {
            enabled: academicStore.state.academicYear != undefined
        }
    })
    const columns = useMemo<CustomColumnDef<SRMReviewCommittee>[]>(
        () => [
            {
                accessorKey: 'code',
                header: 'Mã hội đồng',
                importFieldProps: {
                    isRequired: true,
                    isUnique: true
                }
            },
            {
                accessorKey: 'name',
                header: 'Tên hội đồng',
                size: columnSizeObject.name,
                importFieldProps: {
                    isRequired: true,
                }
            },
            {
                accessorKey: 'meetingDate',
                header: 'Ngày họp',
                accessorFn: (row) => dateUtils.toDDMMYYYY(row.meetingDate),
                importFieldProps: {
                    parseType: "date",
                }
            },
            {
                accessorKey: 'meetingTime',
                header: 'Thời gian họp',
                importFieldProps: {}
            },
            {
                accessorKey: 'meetingLocation',
                header: 'Địa điểm họp',
                importFieldProps: {}
            },
            {
                accessorKey: 'listMember',
                header: 'Danh sách thành viên',
                size: 320,
                accessorFn: (row) => row.srmReviewMembers?.map(item => `${item.user?.code} - ${item.user?.fullName || ""} `),
                type: "list"
            },
            {
                accessorKey: 'listProposal',
                header: 'Các mã đề xuất được xét duyệt',
                accessorFn: (row) => row.srmReviewProposals?.map(item => `${item.srmTaskProposal?.code}`),
                type: "list"
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái Hội đồng',
                statusBadgeProps: {
                    enumObject: ReviewCommitteeStatusEnum,
                    enumColor: ReviewCommitteeStatusColor,
                    enumIcon: ReviewCommitteeStatusIcon,
                    enumLabel: ReviewCommitteeStatusLabel
                },
                type: "statusBadge",
                importFieldProps: {
                    parseType: "number"
                }
            },
            {
                accessorKey: 'attachmentPath',
                header: 'File quyết định thành lập hội đồng tư vấn',
                type: "viewFile"
            },


            // Thêm các field phụ
            {
                header: "Ghi chú",
                accessorKey: "note",
                isExcluded: true,
                importFieldProps: {}
            }
        ],
        []
    );

    return (
        <>
            <CustomFieldset title="Danh sách hội đồng xét duyệt">
                <CustomDataTableAPI
                    enableRowSelection
                    pinningRightColumns={['status']}
                    columns={columns}
                    query={reviewCommitteeQuery}
                    deleteFn={reviewCommitteeService.delete}
                    deleteListFn={reviewCommitteeService.deleteListIds}
                    buttonImportProps={({
                        onSubmit: (finalValues) => reviewCommitteeService.createList(finalValues.map(item => ({
                            ...item,
                            academicYearId: academicStore.state.academicYear?.id,
                        })))
                    })}
                    exportProps={{
                        fileName: "Danh sách hội đồng xét duyệt"
                    }}
                    renderTopToolbarCustomActions={() => {
                        return (
                            <>
                                {/* <ReviewCommitteeCreateButton /> */}
                                <ReviewCommitteeSetupCreateUpdate />
                            </>
                        );
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <>
                                <ReviewCommitteeSetupCreateUpdate values={row.original} />
                                {/* <CustomActionIcon
                                    actionType="update"
                                    loading={reviewCommitteeQuery.isFetching}
                                    onClick={() => {
                                        setDataUpdate(row.original);
                                        dics[1].open();
                                    }}
                                /> */}
                            </>
                        );
                    }}
                />
            </CustomFieldset>
            <ReviewCommitteeUpdateButton disclosure={dics} reviewCommittee={dataUpdate} />
        </>
    );
}
