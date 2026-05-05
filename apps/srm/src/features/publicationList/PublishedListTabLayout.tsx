import { EnumPublicationDeclarationStatus } from "@/shared/consts/enum/EnumPublicationDeclarationStatus";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { IconCheck, IconClock, IconList, IconPencil, IconX } from "@tabler/icons-react";
import PublishedListTable from "./PublishedListTable";
interface Props {
    isReviewPage?: boolean
}

export default function PublishedListTabLayout({ isReviewPage }: Props) {
    return (
        <CustomFieldset title={"Danh sách công bố"}>
            <CustomTabs
                tabs={[
                    { label: "Tất cả", children: <PublishedListTable isReviewPage={isReviewPage} />, miw: "150px", leftSection: <IconList /> },
                    { label: "Chờ duyệt", children: <PublishedListTable status={EnumPublicationDeclarationStatus.Pending} isReviewPage={isReviewPage} />, miw: "150px", leftSection: <IconClock /> },
                    { label: "Đã duyệt", children: <PublishedListTable status={EnumPublicationDeclarationStatus.Approved} isReviewPage={isReviewPage} />, miw: "150px", leftSection: <IconCheck /> },
                    { label: "Chờ hiệu chỉnh", children: <PublishedListTable status={EnumPublicationDeclarationStatus.RequireAdjustment} isReviewPage={isReviewPage} />, miw: "150px", leftSection: <IconPencil /> },
                    { label: "Không duyệt", children: <PublishedListTable status={EnumPublicationDeclarationStatus.Rejected} isReviewPage={isReviewPage} />, miw: "150px", leftSection: <IconX /> },
                ]}
            />
        </CustomFieldset>
    )
}
