import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumEvaluationCommitteeType } from "@/shared/consts/enum/EnumEvaluationCommitteeType";
import { SRMEvaluationCommitteeStatusColor, SRMEvaluationCommitteeStatusEnum, SRMEvaluationCommitteeStatusIcon, SRMEvaluationCommitteeStatusLabel } from "@/shared/consts/enum/SRMEvaluationCommitteeStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useDisclosure } from "@mantine/hooks";
import { useIsFetching } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import CostReviewSetupCreateModal from "./CostReviewSetupCreateModal";
import CostReviewSetupUpdateModal from "./CostReviewSetupUpdateModal";

export default function CostReviewSetupTable() {
    const academicYearStore = useAcademicYearStore();
    // For update modal
    const updateDisc = useDisclosure();
    const [valueUpdate, setValueUpdate] = useState<SRMEvaluationCommittee>();

    const costReviewSetupQuery = useCustomReactQuery({
        queryKey: ["CostReviewSetupTable", academicYearStore.state.academicYear?.id],
        axiosFn: () => {
            return evaluationCommitteeService.GetAllByAcademicYearAndType({
                AcademicYearId: academicYearStore.state.academicYear?.id,
                type: EnumEvaluationCommitteeType.CostAppraisal
            })
        },
        options: {
            enabled: !!academicYearStore.state.academicYear?.id
        }
    })

    const isFetchingTable = useIsFetching({ queryKey: ['CostReviewSetupTable', academicYearStore.state.academicYear?.id] });

    const columns = useMemo<CustomColumnDef<SRMEvaluationCommittee>[]>(() => [
        {
            header: "Mã tổ thẩm định",
            accessorKey: "code",
            importFieldProps: { isRequired: true }
        },
        {
            header: "Tên tổ thẩm định",
            accessorKey: "name",
            size: columnSizeObject.name,
            importFieldProps: { isRequired: true }
        },
        {
            header: "Ngày họp",
            accessorKey: "meetingDate",
            type: "ddMMyyyy",
            importFieldProps: { parseType: "date" }
        },
        {
            header: "Địa điểm họp",
            accessorKey: "meetingLocation",
            importFieldProps: {}
        },
        {
            header: "Thời gian họp",
            accessorKey: "meetingTime",
            importFieldProps: {}
        },
        {
            header: "Danh sách thành phần",
            accessorKey: "srmEvaluationMembers",
            size: 400,
            accessorFn: (row) => {
                return row.srmEvaluationMembers?.map(item => `${item.user?.code} - ${item.user?.fullName}`)
            },
            type: "list"
        },
        {
            header: "Danh sách đăng ký tuyển chọn",
            accessorKey: "srmEvaluationTopics",
            size: 300,
            accessorFn: (row) => {
                return row.srmEvaluationTopics?.map(item => item.code)
            },
            type: "list"
        },
        {
            header: "File quyết định thành lập tổ",
            accessorKey: "attachmentPath",
            type: "viewFile"

        },
        {
            header: "Trạng thái tổ",
            accessorKey: "status",
            type: "statusBadge",
            importFieldProps: {
                parseType: "number",
            },
            statusBadgeProps: {
                enumObject: SRMEvaluationCommitteeStatusEnum,
                enumLabel: SRMEvaluationCommitteeStatusLabel,
                enumColor: SRMEvaluationCommitteeStatusColor,
                enumIcon: SRMEvaluationCommitteeStatusIcon
            }
        }
    ], []);



    return (<>
        <CustomFieldset title={"Danh sách tổ thẩm định"}>
            <CustomDataTableAPI
                enableRowSelection
                pinningRightColumns={['status']}
                enableRowNumbers={false}
                query={costReviewSetupQuery}
                exportProps={{
                    fileName: "Danh sách tổ thẩm định"
                }}
                columns={columns}
                deleteListFn={evaluationCommitteeService.deleteListIds}
                deleteFn={evaluationCommitteeService.delete}
                buttonImportProps={{
                    fileName: "Danh sách tổ thẩm định kinh phí",
                    onSubmit: (finalValues: SRMEvaluationCommittee[]) => {
                        const mapped = finalValues.map((item) => ({
                            ...item,
                            meetingDate: item.meetingDate,
                            type: EnumEvaluationCommitteeType.CostAppraisal,
                            academicYearId: academicYearStore?.state?.academicYear?.id,
                        }));
                        return evaluationCommitteeService.createOrUpdateList(mapped);
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <CostReviewSetupCreateModal />
                        </>
                    )
                }}
                renderRowActions={({ row, table }) => {
                    return (
                        <>
                            <CustomActionIcon
                                actionType="update"
                                loading={isFetchingTable > 0}
                                onClick={() => {
                                    setValueUpdate(row.original);
                                    updateDisc[1].open();
                                }}
                            />
                        </>
                    );
                }}
            />
        </CustomFieldset>
        <CostReviewSetupUpdateModal values={valueUpdate} updateDisc={updateDisc} />
    </>
    )
}

