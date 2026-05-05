import {
    EvidenceAvailableStatusEnum,
    EvidenceAvailableStatusEnumColor,
    EvidenceAvailableStatusEnumIcon,
    EvidenceAvailableStatusEnumLabel
} from "@/shared/constants/enum/EvidenceAvailableStatusEnum";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { Anchor, Text } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvidenceCreateButton from "./EvidenceCreateButton";
import EvidenceDeleteButton from "./EvidenceDeleteButton";
import EvidenceDeleteListButton from "./EvidenceDeleteListButton";
import EvidenceViewOrUpdateModal from "./EvidenceViewOrUpdateModal";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
    modalDisc: UseDisclosureReturnValue
    onSelectEvidence?: (value: IEvidence) => void
}

export default function EvidenceTable({ modalDisc, onSelectEvidence }: Props) {
    const evidenceQuery = useCustomReactQuery({
        queryKey: ["ExistingEvidence_Evidences_GetAll"],
        axiosFn: () => service_EAQEvidence.GetAllEvidences(),
        options: {
            enabled: modalDisc[0],
        }
    });

    const evidenceColumns = useMemo<MRT_ColumnDef<IEvidence>[]>(
        () => [
            {
                header: "Mã Minh chứng",
                accessorKey: "code",
            },
            {
                header: "Tên Minh chứng",
                accessorKey: "name",
                size: columnSizeObject.name
            },
            {
                header: "Mã MC Trực thuộc",
                accessorKey: "referenceEvidence.code"
            },
            {
                header: "Số - Ngày ban hành",
                accessorKey: "eaqEvidenceCurrentVersion.versionNumberIssueDate",
                size: 200
            },
            {
                header: "Đơn vị ban hành",
                accessorKey: "eaqEvidenceCurrentVersion.department",
                size: 200
            },
            {
                header: "Hiệu lực Từ ngày",
                accessorKey: "eaqEvidenceCurrentVersion.validDate",
                Cell: ({ cell }) => dateUtils.toDDMMYYYY(cell.getValue<string>())
            },
            {
                header: "Hiệu lực Đến ngày",
                accessorKey: "eaqEvidenceCurrentVersion.expiredDate",
                Cell: ({ cell }) => dateUtils.toDDMMYYYY(cell.getValue<string>())
            },
            {
                header: "Trạng thái hiệu lực",
                accessorKey: "validityStatus",
                size: 180,
                Cell: ({ row }) => {
                    const expiredDateString = row.original.eaqEvidenceCurrentVersion?.expiredDate;
                    const currentDate = new Date();
                    const expiredDate = expiredDateString ? new Date(expiredDateString) : null;

                    const isLate = !expiredDate || currentDate > expiredDate;

                    let status: number;

                    if (isLate) {
                        status = EvidenceAvailableStatusEnum.EXPIRED;
                    } else {
                        status = EvidenceAvailableStatusEnum.AVAILABLE;
                    }

                    return (
                        <CustomEnumBadge
                            value={status}
                            enumLabel={EvidenceAvailableStatusEnumLabel}
                            enumColor={EvidenceAvailableStatusEnumColor}
                            enumIcon={EvidenceAvailableStatusEnumIcon}
                        />
                    );
                },
            },
            {
                header: "File đính kèm",
                accessorKey: "eaqEvidenceCurrentVersion.attachFilePath",
                Cell: ({ cell }) => {
                    return (
                        <CustomCenterFull>
                            <CustomButtonViewFileAPI filePath={cell.getValue<string>()} />
                        </CustomCenterFull>
                    );
                },
            },
            {
                header: "Link liên kết",
                accessorKey: "link",
                size: 120,
                accessorFn: (row) => {
                    return (
                        <Anchor href={row.eaqEvidenceCurrentVersion?.link} target="_blank" underline="hover">
                            <Text truncate maw={200}>
                                {row.eaqEvidenceCurrentVersion?.link}
                            </Text>
                        </Anchor>
                    );
                },
            },
            {
                header: "Ghi chú",
                accessorKey: "note",
                size: columnSizeObject.name
            },
        ],
        [evidenceQuery.data],
    );

    return (<CustomDataTable
        isLoading={evidenceQuery.isLoading}
        isError={evidenceQuery.isError}
        enableGlobalFilter
        enableRowSelection
        columns={evidenceColumns}
        data={evidenceQuery.data || []}
        renderTopToolbarCustomActions={({ table }) => {
            return (
                <>
                    <EvidenceCreateButton evidences={evidenceQuery.data} />
                    <CustomButton actionType="export" />
                    <EvidenceDeleteListButton
                        values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
                        resetRowSelection={table.resetRowSelection}
                    />
                </>
            );
        }}
        renderRowActions={({ row, table }) => {
            const filteredEvidences =
                evidenceQuery.data?.filter((e) => e.code != row.original.code) ||
                [];

            return (
                <CustomFlexRow gap={8}>
                    <CustomActionIcon
                        bg="rgba(144, 238, 144, 0.1)"
                        onClick={() => {
                            modalDisc[1].close();
                            onSelectEvidence && onSelectEvidence(row.original);
                        }}
                    >
                        <IconCheck color="green" />
                    </CustomActionIcon>

                    <EvidenceViewOrUpdateModal
                        readOnly
                        evidences={filteredEvidences}
                        values={row.original}
                    />

                    <EvidenceViewOrUpdateModal
                        readOnly={false}
                        evidences={filteredEvidences}
                        values={row.original}
                    />

                    <EvidenceDeleteButton
                        id={row.original.id}
                        code={row.original.code ?? ""}
                        clearSelection={table.resetRowSelection}
                    />
                </CustomFlexRow>
            );
        }}
    />
    )
}
