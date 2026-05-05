import { DisplayEnumBadge } from "@/features/submitMissionReport/DisplayEnumBadge";
import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { EnumColorAcceptanceCouncilStatus, EnumIconAcceptanceCouncilStatus, EnumLabelAcceptanceCouncilStatus } from "@/shared/consts/enum/EnumAcceptanceCouncilStatus";
import { EnumAcceptanceCouncilType } from "@/shared/consts/enum/EnumAcceptanceCouncilType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMAcceptanceCouncil } from "@/shared/interfaces/SRMAcceptanceCouncil";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import SchoolCouncilSetupCreateModal from "./SchoolCouncilSetupCreateModal";
import SchoolCouncilSetupDeleteButton from "./SchoolCouncilSetupDeleteButton";
import SchoolCouncilSetupDeleteListButton from "./SchoolCouncilSetupDeleteListButton";
import SchoolCouncilSetupImportButton from "./SchoolCouncilSetupImportButton";
import SchoolCouncilSetupUpdateModal from "./SchoolCouncilSetupUpdateModal";

export default function SchoolCouncilSetupTable() {
    const academicYearStore = useAcademicYearStore();

    // For update modal
    const updateDisc = useDisclosure();
    const [valueUpdate, setValueUpdate] = useState<SRMAcceptanceCouncil>();

    const schoolCouncilSetupQuery = useCustomReactQuery({
        queryKey: ["SchoolCouncilSetupTable", academicYearStore.state.academicYear?.id],
        axiosFn: () => acceptanceCouncilService.GetAllByAcademicYearAndType({
            academicYearId: academicYearStore.state.academicYear?.id ?? -1,
            type: EnumAcceptanceCouncilType.University // Cấp Trường
        }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id
        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMAcceptanceCouncil>[]>(() => [
        { header: "Mã Hội đồng", accessorKey: "code" },
        { header: "Tên Hội đồng", accessorKey: "name", size: 400 },
        {
            header: "Ngày họp dự kiến",
            accessorKey: "meetingDate",
            accessorFn(originalRow) {
                return dateUtils.toDDMMYYYY(originalRow.meetingDate)
            },
        },
        {
            header: "Thời gian họp",
            accessorKey: "meetingTime",
            accessorFn(row) {
                return row.meetingTime
            }
        },
        {
            header: "Địa điểm họp",
            accessorKey: "meetingLocation",
            accessorFn(row) {
                return row.meetingLocation
            }
        },
        {
            header: "Danh sách thành viên", accessorKey: "srmAcceptanceMembers", size: 500, accessorFn: (row) => {
                if (!row.srmAcceptanceMembers) return "";
                return row.srmAcceptanceMembers?.sort((firstMember, secondMember) => {
                    // Ưu tiên 1: Leader
                    const leaderDiff =
                        Number(secondMember.srmTitle?.isLeader) -
                        Number(firstMember.srmTitle?.isLeader);

                    if (leaderDiff !== 0) return leaderDiff;

                    // Ưu tiên 2: srmTitle.name (alphabet)
                    const nameA = firstMember.srmTitle?.name ?? "";
                    const nameB = secondMember.srmTitle?.name ?? "";
                    return nameA.localeCompare(nameB);
                })
                    .map((member, index) => {
                        const isLast = index === row.srmAcceptanceMembers!.length - 1;
                        const isLeader = member.srmTitle?.isLeader;

                        return (
                            <span key={index}>
                                <span style={{ fontWeight: "bold" }}>{member.user?.fullName}</span>
                                {" - "}
                                {member.srmTitle?.name}
                                {!isLast && !isLeader ? "; " : ""}
                                {isLeader ? (
                                    <br />
                                ) : null}
                            </span>
                        );
                    });
            }
        },

        {
            header: "Các đề tài nghiệm thu", accessorKey: "srmAcceptanceContracts", size: 300, accessorFn: (row) => {
                return row.srmAcceptanceContracts?.map((contract, index) => {
                    if (!contract.srmContract?.code) return "";
                    const isLast = index === (row.srmAcceptanceContracts?.length ?? 0) - 1;

                    return (
                        <span key={index}>
                            <span style={{ fontWeight: "normal" }}>{contract.srmContract?.code}</span>
                            {!isLast ? "; " : ""}
                            <br />
                        </span>
                    );
                })
            }
        },
        {
            header: "Trạng thái Hội đồng", accessorKey: "status",
            accessorFn(row) {
                return (
                    <Center>
                        <DisplayEnumBadge
                            enumStatus={row.status}
                            enumLabel={EnumLabelAcceptanceCouncilStatus}
                            enumColor={EnumColorAcceptanceCouncilStatus}
                            enumIcon={EnumIconAcceptanceCouncilStatus}
                        />
                    </Center>
                );
            }
        },
        {
            header: "File quyết định thành lập hội đồng nghiệm thu cấp Trường", accessorKey: "attachmentDetail", accessorFn: (row) => {
                return (
                    <CustomCenterFull>
                        <CustomButtonViewFileAPI filePath={row.attachmentPath} />
                    </CustomCenterFull>
                )
            }
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã Hội đồng" },
            { fieldName: "name", header: "Tên Hội đồng" },
            {
                fieldName: "meetingDate",
                header: "Ngày họp dự kiến",
                formatFunction: (value: string) => dateUtils.toDDMMYYYY(new Date(value))
            },
            { fieldName: "meetingLocation", header: "Địa điểm họp" },
            { fieldName: "meetingTime", header: "Thời gian họp" },
            {
                fieldName: "srmAcceptanceMembers",
                header: "Danh sách thành phần",
                formatFunction: (row: SRMAcceptanceCouncil, object: SRMAcceptanceCouncil) => {
                    if (!object.srmAcceptanceMembers) return "";

                    return object.srmAcceptanceMembers
                        .sort((firstMember, secondMember) => {
                            // Ưu tiên 1: Leader
                            const leaderDiff =
                                Number(secondMember.srmTitle?.isLeader) -
                                Number(firstMember.srmTitle?.isLeader);

                            if (leaderDiff !== 0) return leaderDiff;

                            // Ưu tiên 2: srmTitle.name (alphabet)
                            const nameA = firstMember.srmTitle?.name ?? "";
                            const nameB = secondMember.srmTitle?.name ?? "";
                            return nameA.localeCompare(nameB);
                        })
                        .map((member, index) => {
                            const isLast = index === object.srmAcceptanceMembers!.length - 1;

                            let text = `${member.user?.fullName} - ${member.srmTitle?.name}`;

                            if (!isLast) {
                                text += "; ";
                            }
                            return text;
                        })
                        .join("");
                }

            },
            {
                fieldName: "srmAcceptanceContracts",
                header: "Danh sách đề tài nghiệm thu",
                formatFunction: (row: SRMAcceptanceCouncil, object: SRMAcceptanceCouncil) => {
                    if (!object.srmAcceptanceContracts) return "";

                    return object.srmAcceptanceContracts
                        .map((contract, index) => {
                            if (!contract.code) return "";
                            const isLast = index === object.srmAcceptanceContracts!.length - 1;
                            let text = contract.code;
                            if (!isLast) {
                                text += "; ";
                            }
                            return text;
                        })
                        .join("");
                }
            },
            {
                fieldName: "status",
                header: "Trạng thái Hội đồng",
                formatFunction: (row: SRMAcceptanceCouncil, object: SRMAcceptanceCouncil) => {
                    return converterUtils.getLabelByValue(EnumLabelAcceptanceCouncilStatus, object.status);
                }
            },
        ]
    }

    return (
        <>
            <CustomFieldset title={"Danh sách hội đồng nghiệm thu cấp Trường"}>
                <CustomDataTable
                    enableRowSelection
                    enableRowNumbers={false}
                    isLoading={schoolCouncilSetupQuery.isLoading || schoolCouncilSetupQuery.isPending}
                    isError={schoolCouncilSetupQuery.isError}
                    columns={columns}
                    data={schoolCouncilSetupQuery.data || []}
                    renderTopToolbarCustomActions={({ table }) => {
                        const selectedRows =
                            table
                                .getSelectedRowModel()
                                .flatRows.map((item) => item.original) || [];

                        return (
                            <>
                                <SchoolCouncilSetupCreateModal />
                                <SchoolCouncilSetupImportButton />
                                <AQButtonExportData
                                    objectName="Danh sách nghiệm thu cấp Trường"
                                    data={selectedRows.length > 0 ? selectedRows : schoolCouncilSetupQuery.data || []}
                                    exportConfig={exportConfig}
                                />
                                <SchoolCouncilSetupDeleteListButton
                                    values={selectedRows} table={table} isFetchingTable={schoolCouncilSetupQuery.isFetching} />
                            </>
                        )
                    }}
                    renderRowActions={({ row, table }) => {
                        return (
                            <CustomCenterFull>
                                <CustomActionIcon
                                    actionType="update"
                                    loading={schoolCouncilSetupQuery.isFetching}
                                    onClick={() => {
                                        setValueUpdate(row.original);
                                        updateDisc[1].open();
                                    }}
                                />
                                <SchoolCouncilSetupDeleteButton data={row.original} table={table} isLoading={schoolCouncilSetupQuery.isFetching} />
                            </CustomCenterFull>
                        );
                    }}
                />
            </CustomFieldset>
            <SchoolCouncilSetupUpdateModal values={valueUpdate} updateDisc={updateDisc} />
        </>
    )
}

