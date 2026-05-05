"use client";

import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { EnumAcceptanceCouncilType } from "@/shared/consts/enum/EnumAcceptanceCouncilType";
import { EnumColorContractExecutionStatus, EnumIconContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMAcceptanceContract } from "@/shared/interfaces/SRMAcceptanceContract";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import DisplayConclusionStatus from "../councilConclusionList/DisplayConclusionStatus";
import { DisplayEnumBadge } from "../submitMissionReport/DisplayEnumBadge";
import SchoolCouncilMeetingExportExport from "./SchoolCouncilMeetingExport";
import SchoolCouncilMeetingExportUpdateButton from "./SchoolCouncilMeetingUpdateButton";

export default function SchoolCouncilMeetingTable() {
    const academicStore = useAcademicYearStore();

    const dics = useDisclosure();
    const [dataUpdate, setDataUpdate] = useState<SRMAcceptanceContract>();

    const acceptanceContractQuery = useCustomReactQuery({
        queryKey: ['contract_list', academicStore.state.academicYear?.id],
        axiosFn: () => acceptanceCouncilService.getAcceptanceContract({
            AcademicYearId: academicStore.state.academicYear?.id,
            Type: EnumAcceptanceCouncilType.University
        })
    })

    const columns = useMemo<MRT_ColumnDef<SRMAcceptanceContract>[]>(
        () => [
            {
                accessorKey: 'acceptanceCouncilCode',
                header: 'Mã hội đồng',
                accessorFn: (row) => row.srmAcceptanceCouncil?.code
            },
            {
                accessorKey: 'acceptanceCouncilName',
                header: 'Tên hội đồng',
                size: 500,
                accessorFn: (row) => row.srmAcceptanceCouncil?.name
            },
            {
                accessorKey: 'dateMeeting',
                header: 'Ngày họp',
                accessorFn: (row) => dateUtils.toDDMMYYYY(row.dateMeeting)
            },
            {
                accessorKey: 'contractCode',
                header: 'Mã đề tài',
                accessorFn: (row) => row.srmContract?.code
            },
            {
                accessorKey: 'contractName',
                header: 'Tên đề tài',
                size: 500,
                accessorFn: (row) => row.srmContract?.name
            },
            {
                accessorKey: 'areaName',
                header: 'Lĩnh vực',
                accessorFn: (row) => row.srmContract?.srmTopic?.srmArea?.name
            },
            {
                accessorKey: 'topicLeader',
                header: 'Chủ nhiệm',
                accessorFn: (row) => row.srmContract?.srmTopic?.srmTopicMembers?.
                    flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : [])).
                    join(", ") ?? ""
            },
            {
                accessorKey: 'point',
                header: 'Điểm trung bình',
            },
            {
                accessorKey: 'srmConclusionName',
                header: 'Xếp loại',
                accessorFn: (row) => <DisplayConclusionStatus
                    color={row.srmConclusion?.color}
                    title={row.srmConclusion?.name}
                    fz={13}
                    p="sm"
                />
            },
            {
                accessorKey: 'recommendation',
                header: 'Kiến nghị',
                size: 500
            },
            {
                accessorKey: 'comment',
                header: 'Tóm tắt nhận xét',
                size: 500,
            },
            {
                accessorKey: 'executionStatus',
                header: 'Trạng thái thực hiện',
                size: 200,
                accessorFn: (row) =>
                    <Center>
                        <DisplayEnumBadge
                            enumStatus={row.srmContract?.executionStatus}
                            enumColor={EnumColorContractExecutionStatus}
                            enumLabel={EnumLabelContractExecutionStatus}
                            enumIcon={EnumIconContractExecutionStatus}
                        />
                    </Center>
            },
        ],
        []
    );

    return (
        <>
            <CustomFieldset title="Danh sách đề tài nghiệm thu cấp khoa">
                <CustomDataTable
                    isLoading={acceptanceContractQuery.isLoading}
                    isError={acceptanceContractQuery.isError}
                    enableRowSelection
                    columns={columns}
                    data={acceptanceContractQuery.data || []}
                    renderTopToolbarCustomActions={({ table }) => {
                        const dataSelected = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
                        return (
                            <SchoolCouncilMeetingExportExport
                                academicYearName={academicStore.state.academicYear?.name}
                                data={dataSelected?.length > 0 ? dataSelected : acceptanceContractQuery.data}
                                disabled={acceptanceContractQuery.isFetching}
                            />
                        );
                    }}
                    renderRowActions={({ row, table }) => {
                        return (
                            <CustomCenterFull>
                                <CustomActionIcon
                                    actionType="update"
                                    loading={acceptanceContractQuery.isFetching}
                                    onClick={() => {
                                        setDataUpdate(row.original);
                                        dics[1].open();
                                    }}
                                />
                            </CustomCenterFull>
                        );
                    }}
                />
            </CustomFieldset>
            <SchoolCouncilMeetingExportUpdateButton disclosure={dics} acceptanceContract={dataUpdate} />
        </>
    );
}
