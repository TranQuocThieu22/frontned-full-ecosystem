import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMScientificPublicationHours } from "@/shared/interfaces/SRMScientificPublicationHours";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import PublicationHoursReportViewDetail from "./PublicationHoursReportViewDetail";

export default function PublicationHoursReportTable() {
    const academicyearStore = useAcademicYearStore()
    const query = useCustomReactQuery({
        queryKey: ['PublicationDeclarations'],
        axiosFn: () => publicationDeclarationService.getScientificPublicationHours({ AcademicYearId: academicyearStore.state.academicYear?.id }),
    })
    const getAllAuthorFullName = (row: SRMScientificPublicationHours) => {
        const allAuthorExternalsName = row.srmPublicationDeclaration
            ?.srmDeclarationMemberExternals
            ?.filter(item => item.srmTitle?.isLeader == true)
            .map(item => item.user?.fullName)
        const allAuthorInternalsName = row.srmPublicationDeclaration
            ?.srmDeclarationMemberInternals
            ?.filter(item => item.srmTitle?.isLeader == true)
            .map(item => item.user?.fullName)

        return [allAuthorExternalsName, allAuthorInternalsName].flat()
    }
    const columns = useMemo<CustomColumnDef<SRMScientificPublicationHours>[]>(() => [
        {
            header: "Mã công bố",
            accessorKey: "srmPublicationDeclaration.code"
        },
        {
            header: "Tên công trình",
            accessorKey: "srmPublicationDeclaration.name",
            size: columnSizeObject.name
        },
        {
            header: "Tác giả chính",
            accessorFn: (row) => {
                return getAllAuthorFullName(row)
            },
            type: "list"
        },
        {
            header: "Tên loại công bố",
            accessorKey: "srmPublicationDeclaration.srmPublicationType.name",
            size: columnSizeObject.name
        },
        {
            header: "Năm xuất bản",
            accessorKey: "srmPublicationDeclaration.publicationYear"
        },
        {
            header: "Tên tạp cí/Hội thảo/NXB",
            accessorKey: "srmPublicationDeclaration.journal",
            size: columnSizeObject.name
        },
        {
            header: "Mã viên chức",
            accessorKey: "user.code",
        },
        {
            header: "Họ tên viên chức",
            accessorKey: "user.fullName"
        },
        {
            header: "Vai trò tham gia",
            accessorKey: "srmTitle.name"
        },
        {
            header: "Tỷ lệ đóng góp",
            accessorKey: "contributionRate"
        },
        {
            header: "Số giờ quy đổi",
            accessorKey: "convertedTime",
            type: "roundedTo2"
        },
        {
            header: "Số điểm quy đổi",
            accessorKey: "convertedScore",
            type: "roundedTo2"
        }
    ], [])
    return (
        <CustomFieldset title="Danh sách công bố">
            <CustomDataTableAPI
                columns={columns}
                query={query}
                renderRowActions={({ row }) => (
                    <PublicationHoursReportViewDetail
                        publicationDeclarationId={row.original.srmPublicationDeclaration?.id}
                    />
                )}
            />
        </CustomFieldset>
    )
}


