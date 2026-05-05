import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMDeclarationMember } from "@/shared/interfaces/SRMDeclarationMember";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Center, Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { publicationDeclarationService } from "../../shared/APIs/publicationDeclarationService";
import PublishExportButton from "./PublishExportButton";
import PublishTimeCalculateButton from "./PublishTimeCalculateButton";
import PublishTimeLockButton from "./PublishTimeLockButton";
import PublishTimeUnlockButton from "./PublishTimeUnlockButton";


export default function PublishTimeLockCalculateTable() {
    const academicYearStore = useAcademicYearStore();

    const declarationQuery = useCustomReactQuery({
        queryKey: ['PublicationTimeLockCalculateList', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => publicationDeclarationService.getScientificPublicationHours(
            { AcademicYearId: academicYearStore?.state?.academicYear?.id ?? -1 }
        ),
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id
        }
    });

    const findOwner = (row: SRMDeclarationMember) => {
        const members = row?.isExternal
            ? row?.srmPublicationDeclaration?.srmDeclarationMemberExternals || []
            : row?.srmPublicationDeclaration?.srmDeclarationMemberInternals || []

        return members.find(item => item?.srmTitle?.isLeader === true)?.user?.fullName
    };

    const publishColumns = useMemo<MRT_ColumnDef<SRMDeclarationMember>[]>(
        () => [
            {
                header: "Mã công bố",
                accessorKey: "srmPublicationDeclaration.code"
            },
            {
                header: "Mã viên chức",
                accessorKey: "user.code"
            },
            {
                header: "Họ tên viên chức",
                accessorKey: "user.fullName",
                size: 200
            },
            {
                header: "Tên công trình",
                accessorKey: "srmPublicationDeclaration.name",
                size: 500
            },
            {
                header: "Tác giả chính",
                accessorKey: "isExternal",
                size: 200,
                accessorFn: (row) => findOwner(row),
            },
            {
                header: "Tên loại công bố",
                accessorKey: "srmPublicationDeclaration.srmPublicationType.name",
                size: 500
            },
            {
                header: "Năm xuất bản",
                accessorKey: "srmPublicationDeclaration.publicationYear",
                size: 120
            },
            {
                header: "Tên tạp chí/Hội thảo/NXB",
                accessorKey: "srmPublicationDeclaration.journal",
                size: 300
            },

            {
                header: "Vai trò tham gia",
                accessorKey: "srmTitle.name",
                size: 200,
            },
            {
                header: "Tỷ lệ đóng góp (%)",
                accessorKey: "contributionRate", size: 100,
                accessorFn: (row) => row?.contributionRate?.toFixed(2)
            },
            {
                header: "Số giờ quy đổi",
                accessorKey: "convertedTime", size: 80,
                accessorFn: (row) => row?.convertedTime?.toFixed(2)
            },
            {
                header: "Số điểm quy đổi",
                accessorKey: "convertedScore", size: 80,
                accessorFn: (row) => row?.convertedScore?.toFixed(2)
            },
            {
                header: "Số giờ quy đổi chênh lệch",
                accessorKey: "timeDifference", size: 80,
                accessorFn: (row) => row?.timeDifference?.toFixed(2)
            },
            {
                header: "Số điểm quy đổi chênh lệch",
                accessorKey: "scoreDifference", size: 80,
                accessorFn: (row) => row?.scoreDifference?.toFixed(2)
            },
            {
                header: "Đã khóa",
                accessorKey: "isBlock",
                size: 100,
                accessorFn: (row) =>
                    <Center>
                        <CustomThemeIconSquareCheck checked={row.isBlock} />
                    </Center>,
            },
        ],
        []
    );

    return (
        <CustomDataTable
            initialState={{
                columnPinning: {
                    right: [
                        'contributionRate',
                        'convertedTime',
                        'convertedScore',
                        'timeDifference',
                        'scoreDifference',
                        'isBlock'
                    ] as (keyof SRMDeclarationMember)[],
                }
            }}
            isLoading={declarationQuery.isLoading}
            isError={declarationQuery.isError}
            enableRowSelection
            enableRowNumbers
            data={declarationQuery.data || []}
            columns={publishColumns}
            renderTopToolbarCustomActions={({ table }) => {
                const chosenData = table.getSelectedRowModel().rows.map((item => item.original))

                return <Group>
                    <PublishTimeCalculateButton
                        resetRowSelection={table.resetRowSelection}
                        isLoading={declarationQuery.isFetching}
                        values={chosenData}
                    />
                    <PublishTimeLockButton
                        resetRowSelection={table.resetRowSelection}
                        isLoading={declarationQuery.isFetching}
                        values={chosenData}
                    />
                    <PublishTimeUnlockButton
                        resetRowSelection={table.resetRowSelection}
                        isLoading={declarationQuery.isFetching}
                        values={chosenData}
                    />
                    <PublishExportButton
                        resetRowSelection={table.resetRowSelection}
                        values={chosenData.length > 0 ? chosenData : declarationQuery.data || []}
                    />
                </Group>
            }}
        />
    )
}