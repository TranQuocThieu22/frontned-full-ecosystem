import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { SRMEvaluationCommitteeStatusColor, SRMEvaluationCommitteeStatusEnum, SRMEvaluationCommitteeStatusIcon, SRMEvaluationCommitteeStatusLabel } from "@/shared/consts/enum/SRMEvaluationCommitteeStatus";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useMemo } from "react";
import useAcademicYearStore from "../../shared/features/AcademicYear/useAcademicYearStore";
import AdvisoryCreateCreateOrUpdate from "./CreateOrUpdate/AdvisoryCreateCreateOrUpdate";

export default function AdvisoryCreateTable() {
    const academicYearStore = useAcademicYearStore()
    const advisoriesList = useCustomReactQuery({
        queryKey: ['ConclusionSetList', academicYearStore.state.academicYear?.id],
        axiosFn: () => evaluationCommitteeService.GetAllByAcademicYearAndType(
            {
                AcademicYearId: academicYearStore.state.academicYear?.id ?? 0,
                type: EnumCouncilType.AdvisoryCouncil
            }
        ),
        options: {
            enabled: !!academicYearStore.state.academicYear,
        }
    })
    const columns = useMemo<CustomColumnDef<SRMEvaluationCommittee>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã hội đồng",
            importFieldProps: {
                isRequired: true,
                isUnique: true
            }
        },
        {
            accessorKey: "name",
            header: "Tên hội đồng",
            size: columnSizeObject.name,
            importFieldProps: {
                isRequired: true
            }
        },
        {
            accessorKey: "meetingDate",
            header: "Ngày họp",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.meetingDate),
            importFieldProps: {
                parseType: "date",
            }
        },
        {
            accessorKey: "meetingTime",
            header: "Thời gian họp",
            importFieldProps: {}
        },
        {
            accessorKey: "meetingLocation",
            header: "Địa điểm họp",
            importFieldProps: {}
        },
        {
            header: "Danh sách thành viên",
            accessorFn: (row) => row.srmEvaluationMembers?.map(member => `${member.user?.code} - ${member.user?.fullName}`),
            type: "list",
        },
        {
            header: "Các đăng ký tuyển chọn được xét duyệt",
            accessorFn: (row) => row.srmEvaluationTopics?.map(topic => topic.srmTopic?.code),
            type: "list"
        },
        {
            accessorKey: "status",
            header: "Trạng thái Hội đồng",
            importFieldProps: {
                parseType: "number",
            },
            type: "statusBadge",
            statusBadgeProps: {
                enumObject: SRMEvaluationCommitteeStatusEnum,
                enumColor: SRMEvaluationCommitteeStatusColor,
                enumIcon: SRMEvaluationCommitteeStatusIcon,
                enumLabel: SRMEvaluationCommitteeStatusLabel
            }
        },
        {
            accessorKey: "attachFilePath",
            header: "File quyết định thành lập hội đồng tư vấn",
            type: "viewFile"
        },
        {
            accessorKey: "note",
            header: "Ghi chú",
            isExcluded: true,
            importFieldProps: {}
        }
    ], []);

    return (
        <CustomFieldset title="Danh sách hội đồng xét duyệt">
            <CustomDataTableAPI
                query={advisoriesList}
                columns={columns}
                pinningRightColumns={['status']}
                enableRowSelection
                exportProps={{
                    fileName: "Danh sách hội đồng xét duyệt"
                }}
                buttonImportProps={{
                    onSubmit: (finalValues) => evaluationCommitteeService.createList(finalValues.map(item => ({
                        ...item,
                        academicYearId: academicYearStore.state.academicYear?.id,
                        type: EnumCouncilType.AdvisoryCouncil
                    }))),
                    fileName: "Cấu trúc import hội đồng tư vấn tuyển chọn",
                }}
                deleteListFn={evaluationCommitteeService.deleteListIds}
                deleteFn={evaluationCommitteeService.delete}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <AdvisoryCreateCreateOrUpdate />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <>
                            <AdvisoryCreateCreateOrUpdate
                                isUpdate={true}
                                initialData={row.original}
                            />
                        </>
                    )
                }}
            />
        </CustomFieldset>
    );
}