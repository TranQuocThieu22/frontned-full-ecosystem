"use client";
import { accountService } from "@/shared/APIs/accountService";
import { areaService } from "@/shared/APIs/areaService";
import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import {
    EnumIconProposalStatus,
    EnumProposalStatus,
    EnumProposalStatusColors,
    EnumProposalStatusLabels,
} from "@/shared/consts/enum/EnumProposalStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomNumberFormatter } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomNumberFormatter";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useMemo } from "react";
import SubmitProposalCreateOrUpdate from "./SubmitProposalCreateOrUpdate";
import SubmitProposalView from "./SubmitProposalView";

export default function SubmitProposalTable() {
    const academicYearStore = useAcademicYearStore();
    const taskProposalQuery = useCustomReactQuery({
        queryKey: ["taskProposal", academicYearStore.state.academicYear?.id],
        axiosFn: () =>
            taskProposalService.getAllByAcademicYear({
                academicYearId: academicYearStore.state.academicYear?.id ?? 0,
                // params: `cols=SRMArea,SRMUnit,User,SRMType` => Backend đã detail check lỗi ngày 04/09/2025 taskID: 54656
            }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id,
        },
    });

    const columns = useMemo<CustomColumnDef<SRMTaskProposal>[]>(
        () => [
            {
                header: "Mã đề xuất",
                accessorKey: "code",
                importFieldProps: {
                    isRequired: true,
                    isUnique: true,
                },
            },
            {
                header: "Tên đề tài",
                accessorKey: "name",
                size: columnSizeObject.name,
                importFieldProps: {
                    isRequired: true,
                },
            },
            {
                accessorKey: "attachmentPath",
                header: "File Phiếu đề xuất",
                type: "viewFile",
            },
            {
                header: "Lĩnh vực",
                accessorKey: "srmArea.name",
            },
            {
                header: "Mục tiêu",
                accessorKey: "objective",
                size: columnSizeObject.description,
                importFieldProps: {
                    isRequired: true,
                },
            },
            {
                header: "Tổng chi phí dự kiến",
                accessorKey: "estimatedBudget",
                accessorFn: (row) => {
                    return <CustomNumberFormatter value={row.estimatedBudget} />;
                },
                importFieldProps: {
                    parseType: "number",
                    isRequired: true,
                },
            },
            {
                header: "Yêu cầu đối với kết quả",
                accessorKey: "requirement",
                size: columnSizeObject.description,
                importFieldProps: {
                    isRequired: true,
                },
            },
            {
                header: "Loại đề tài",
                accessorKey: "srmType.name",
            },
            {
                header: "Kết quả chính",
                accessorKey: "result",
                size: columnSizeObject.description,
                importFieldProps: {
                    isRequired: true,
                },
            },
            {
                header: "Phương án ứng dụng",
                accessorKey: "expectedOutput",
                size: columnSizeObject.description,
                importFieldProps: {
                    isRequired: true,
                },
            },
            {
                header: "Thời gian thực hiện (tháng)",
                accessorKey: "duration",
                importFieldProps: {
                    isRequired: true,
                },
            },
            {
                header: "Mã viên chức đăng ký",
                accessorKey: "user.code",
            },
            {
                header: "Tên viên chức đăng ký",
                accessorKey: "user.fullName",
            },
            {
                header: "Đơn vị đăng ký",
                accessorKey: "user.workingUnitName",
            },
            {
                header: "Trạng thái đề xuất",
                accessorKey: "proposalStatus",
                size: columnSizeObject.name,
                type: "statusBadge",
                statusBadgeProps: {
                    enumObject: EnumProposalStatus,
                    enumLabel: EnumProposalStatusLabels,
                    enumColor: EnumProposalStatusColors,
                    enumIcon: EnumIconProposalStatus
                }
            },
            // Có ở import nhưng không hiển thị trong table
            {
                header: "Từ tháng/năm",
                accessorKey: "startDate",
                type: "MMyyyy",
                isExcluded: true,
                importFieldProps: {},
            },
            {
                header: "Đến tháng/năm",
                accessorKey: "endDate",
                isExcluded: true,
                type: "MMyyyy",
                importFieldProps: {},
            },
            {
                header: "Loại đề tài",
                accessorKey: "srmTypeCode",
                isExcluded: true,
                importFieldProps: {},
            },
            {
                header: "Lĩnh vực",
                accessorKey: "srmAreaCode",
                isExcluded: true,
                importFieldProps: {},
            },
            {
                header: "Viên chức đăng ký",
                accessorKey: "userCode",
                isExcluded: true,
                importFieldProps: {
                    isRequired: true,
                },
            },
        ],
        []
    );

    const isEditable = (row: SRMTaskProposal) => {
        if (
            row.proposalStatus === EnumProposalStatus.PendingPreliminaryCheck ||
            row.proposalStatus == EnumProposalStatus.UnderRevision
        ) {
            return true;
        }
        return false;
    };

    // Dữ liệu để tạo sheet
    const areasQuery = useCustomReactQuery({
        queryKey: ["areas"],
        axiosFn: () => areaService.getAll(),
    });

    const typeQuery = useCustomReactQuery({
        queryKey: ["typeQuery"],
        axiosFn: () => SRMTypeService.getAll(),
    });

    const lecturerQuery = useCustomReactQuery({
        queryKey: ['lecturer'],
        axiosFn: () => accountService.getEdusoftNetAccount()
    })

    return (
        <CustomFieldset title="Danh sách đề xuất">
            <CustomDataTableAPI
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={false}
                query={taskProposalQuery}
                deleteListFn={taskProposalService.deleteListIds}
                deleteFn={taskProposalService.delete}
                disableDelete={(row) => !isEditable(row)}
                exportProps={{
                    fileName: "Danh sách đề xuất",
                }}
                initialState={{
                    columnPinning: {
                        right: ["proposalStatus"],
                    },
                }}
                buttonImportProps={{
                    buttonProps: {
                        loading: taskProposalQuery.isLoading || areasQuery.isLoading || typeQuery.isLoading || lecturerQuery.isLoading,
                        disabled: academicYearStore.state.academicYear?.id ? false : true,
                    },
                    fileName: "Mẫu import đề xuất nhiệm vụ khoa học",
                    onSubmit: (values) =>
                        taskProposalService.createList(
                            values.map((item) => ({
                                ...item,
                                srmAreaId: areasQuery.data?.find(area => area.code == item.srmAreaCode)?.id,
                                srmTypeId: typeQuery.data?.find(type => type.code == item.srmTypeCode)?.id,
                                userId: lecturerQuery.data?.find(lec => lec.code == item.userCode)?.id,
                                academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
                                proposalStatus: 1,
                                startDate: dateUtils.convertMMYYYYToDate(item.startDate),
                                endDate: dateUtils.convertMMYYYYToDate(item.endDate),
                            }))
                        ),
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <SubmitProposalCreateOrUpdate />
                        </>
                    );
                }}
                renderRowActions={({ row }) => {
                    return (
                        <>
                            <SubmitProposalView values={row.original!} />
                            <SubmitProposalCreateOrUpdate
                                disabled={!isEditable(row.original)}
                                initValues={row.original!}
                            />
                        </>
                    );
                }}
            />
        </CustomFieldset>
    );
}