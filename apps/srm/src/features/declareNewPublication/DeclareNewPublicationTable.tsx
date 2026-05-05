'use client'
import { publicationDeclarationService } from '@/shared/APIs/publicationDeclarationService';
import { EnumColorPublicationDeclarationStatus, EnumIconPublicationDeclarationStatus, EnumLabelPublicationDeclarationStatus } from "@/shared/consts/enum/EnumPublicationDeclarationStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomEnumBadge } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { columnSizeObject } from '@aq-fe/core-ui/shared/consts/object/columnSizeObject';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DeclareNewPublicationCreateOrUpdate from "./DeclareNewPublicationCreateOrUpdate";
import DeclareNewPublicationDelete from "./DeclareNewPublicationDelete";
import DeclareNewPublicationDeleteList from "./DeclareNewPublicationDeleteList";
import DeclareNewPublicationExport from "./DeclareNewPublicationExport";
import DeclareNewPublicationImport from "./DeclareNewPublicationImport";


export default function DeclareNewPublicationTable() {
    const academicYearStore = useAcademicYearStore();

    const publicationDeclarationQuery = useCustomReactQuery({
        queryKey: ['publicationDeclarationQuery', academicYearStore.state.academicYear?.id],
        axiosFn: () => publicationDeclarationService.getAllByAcademicYear({ AcademicYearId: academicYearStore.state.academicYear?.id ?? 0 }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id
        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMPublicationDeclaration>[]>(() => [
        { header: "Mã công bố", accessorKey: "code" },
        { header: "Tên công trình", accessorKey: "name", size: columnSizeObject.name },
        { header: "Tên loại công bố", accessorKey: "srmPublicationType.name", size: columnSizeObject.name },
        { header: "Năm xuất bản", accessorKey: "publicationYear" },
        {
            header: "Tác giả chính",
            accessorKey: "Leader",
            size: columnSizeObject.name,
            accessorFn: (row) => {
                const leaderInternals = row.srmDeclarationMemberInternals?.filter(item => item.srmTitle?.isLeader).map(item => item.user?.fullName).join(", ");
                const leaderExternals = row.srmDeclarationMemberExternals?.filter(item => item.srmTitle?.isLeader).map(item => item.user?.fullName).join(", ");
                return [leaderInternals, leaderExternals].filter(Boolean).join(", ");
            }
        },
        { header: "Tên tạp chí/hội thảo/NXB", accessorKey: "journal" },
        // INFO: Xem khi dev
        // { header: "File đính kèm", accessorKey: "attachmentPath", accessorFn: (row) => <MyButtonViewFileAPI filePath={row.attachmentPath} /> },
        {
            header: "Trạng thái", accessorKey: "status",
            accessorFn: (row) => <CustomEnumBadge
                value={row.status}
                enumLabel={EnumLabelPublicationDeclarationStatus}
                enumColor={EnumColorPublicationDeclarationStatus}
                enumIcon={EnumIconPublicationDeclarationStatus}
            />
        },
    ], [])

    return (
        <CustomFieldset title="Danh sách" >
            <CustomDataTable
                pinningRightColumns={['status']}
                enableRowSelection
                columns={columns}
                isLoading={publicationDeclarationQuery.isLoading}
                isError={publicationDeclarationQuery.isError}
                data={publicationDeclarationQuery.data ?? []}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original) || [];

                    return (
                        <>
                            <DeclareNewPublicationCreateOrUpdate />
                            <DeclareNewPublicationImport />
                            <DeclareNewPublicationExport table={table} />
                            <DeclareNewPublicationDeleteList values={selectedRows} table={table} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            <DeclareNewPublicationCreateOrUpdate initValues={row.original} />
                            <DeclareNewPublicationDelete code={row.original?.code!} id={row.original?.id!} />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    );
}
