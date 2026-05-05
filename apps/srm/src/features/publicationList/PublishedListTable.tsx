import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import { EnumColorPublicationDeclarationStatus, EnumIconPublicationDeclarationStatus, EnumLabelPublicationDeclarationStatus } from "@/shared/consts/enum/EnumPublicationDeclarationStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import Shared_PublicationDeclarationViewDetail from "@/shared/features/PublicationDeclaration/Shared_PublicationDeclarationViewDetail";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import PublicationReviewButton from "../publicationReview/PublicationReviewButton";

interface Props {
    status?: number
    isReviewPage?: boolean
}
export default function PublishedListTable({ status, isReviewPage }: Props) {
    const store = useAcademicYearStore();
    const query = useCustomReactQuery({
        queryKey: [
            "service_PublishedList_GetAllbyType", status
        ],
        axiosFn: () => publicationDeclarationService.getAllByAcademicYear({
            AcademicYearId: store.state.academicYear?.id || -1,
            status: status
        }),
        options: {
            enabled: !!store.state.academicYear?.id
        }
    });

    const columns = useMemo<CustomColumnDef<SRMPublicationDeclaration>[]>(() => {
        const cols: CustomColumnDef<SRMPublicationDeclaration>[] = [
            {
                header: "Mã công bố",
                accessorKey: "code"
            },
            {
                header: "Tên công trình",
                accessorKey: "name",
                size: 350,
            },
            {
                header: "Tên loại công bố",
                accessorKey: "srmPublicationType.name",
                size: 350,
            },
            {
                header: "Năm xuất bản",
                accessorKey: "publicationYear",
            },
            {
                header: "Tác giả chính",
                accessorKey: "publishedAuthor",
                size: 300,
                type: "list",
                accessorFn: row => {
                    const authors: string[] = [];
                    const internalMembers = row.srmDeclarationMemberInternals?.filter(item => item.srmTitle?.isLeader === true).map(item => item.user?.fullName || "");
                    const externalMembers = row.srmDeclarationMemberExternals?.filter(item => item.srmTitle?.isLeader === true).map(item => item.user?.fullName || "");
                    authors.push(...internalMembers || []);
                    authors.push(...externalMembers || []);
                    return authors;
                }
            },
            {
                header: "Tên tạp chí/Hội thảo/NXB",
                accessorKey: "journal",
                size: 350,
            },
            {
                header: "File đính kèm",
                accessorKey: "attachmentPath",
                type: "viewFile"
            },
            {
                header: "Trạng thái",
                accessorKey: "status",
                size: 250,
                accessorFn: row => <CustomEnumBadge
                    value={row.status ?? 1}
                    enumLabel={EnumLabelPublicationDeclarationStatus}
                    enumColor={EnumColorPublicationDeclarationStatus}
                    enumIcon={EnumIconPublicationDeclarationStatus} />
            }
        ]

        const reviewPageCols: CustomColumnDef<SRMPublicationDeclaration>[] = [
            {
                header: "Nhận xét",
                accessorKey: "review",
                size: columnSizeObject.description
            },
            {
                header: "Gửi thông báo",
                accessorKey: "isSendMail",
                type: "squareCheck"
            }
        ]

        isReviewPage && cols.push(...reviewPageCols)
        return cols;
    }, [isReviewPage]);

    return (
        <CustomDataTable
            isLoading={query.isLoading}
            isError={query.isError}
            columns={columns}
            enableRowSelection
            data={query.data || []}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <Shared_PublicationDeclarationViewDetail data={row.original} loading={query.isFetching} />
                    {isReviewPage ? <PublicationReviewButton publication={row.original} isLoading={query.isFetching} /> : <></>}
                </CustomCenterFull>
            )}
        />
    )
}

// export interface IPublishedRecord extends IBaseEntity {
//     publishedType?: string,
//     publishedDate?: string,
//     publishedAuthor?: string,
//     journalPublisherConference?: string,
//     publishedFilePath?: string,
//     publishedFileDetail?: IFile,
//     publishedStatus?: number
// }

// export interface IPublishedMember extends IBaseEntity {
//     fullname?: string,
//     unit?: string,
//     role?: string,
//     contributionRatio?: number
// }