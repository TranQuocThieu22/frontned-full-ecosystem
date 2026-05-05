import { SRMDeclarationMember } from "@/shared/interfaces/SRMDeclarationMember";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    values: SRMDeclarationMember[];
    resetRowSelection?: () => void
}

export default function PublishExportButton({
    values,
}: Props) {

    const findOwner = (row: SRMDeclarationMember) => {
        const members = row?.isExternal
            ? row?.srmPublicationDeclaration?.srmDeclarationMemberExternals || []
            : row?.srmPublicationDeclaration?.srmDeclarationMemberInternals || []

        return members.find(item => item?.srmTitle?.isLeader === true)?.user?.fullName
    };

    const publicationExportConfig = {
        fields: [
            {
                fieldName: "srmPublicationDeclaration.code",
                header: "Mã công bố",
                formatFunction: (value: any, row: SRMDeclarationMember) => row?.srmPublicationDeclaration?.code || "",
            },
            {
                fieldName: "name",
                header: "Tên công trình",
                formatFunction: (value: any, row: SRMDeclarationMember) => row?.srmPublicationDeclaration?.name || "",
            },
            {
                fieldName: "isExternal", header: "Tác giả chính",
                formatFunction: (value: any, row: SRMDeclarationMember) => findOwner(row),
            },
            {
                fieldName: "srmPublicationDeclaration.srmPublicationType.name",
                header: "Tên loại công bố",
                formatFunction: (value: any, row: SRMDeclarationMember) => row?.srmPublicationDeclaration?.srmPublicationType?.name || "",
            },
            {
                fieldName: "srmPublicationDeclaration.publicationYear",
                header: "Năm xuất bản",
                formatFunction: (value: any, row: SRMDeclarationMember) => row?.srmPublicationDeclaration?.publicationYear || "",
            },
            {
                fieldName: "journal",
                header: "Tên tạp chí/Hội thảo/NXB",
                formatFunction: (value: any, row: SRMDeclarationMember) => row?.srmPublicationDeclaration?.journal || "",
            },
            {
                fieldName: "user.code", header: "Mã viên chức",
                formatFunction: (value: any, row: SRMDeclarationMember) => row?.user?.code || "",
            },
            {
                fieldName: "user.fullName",
                header: "Họ tên viên chức",
                formatFunction: (value: any, row: SRMDeclarationMember) => row?.user?.fullName || "",
            },
            {
                fieldName: "title",
                header: "Vai trò tham gia",
                formatFunction: (value: any, row: SRMDeclarationMember) => row?.srmTitle?.name || "",
            },
            { fieldName: "contributionRate", header: "Tỷ lệ đóng góp (%)" },
            { fieldName: "convertedTime", header: "Số giờ quy đổi" },
            { fieldName: "convertedScore", header: "Số điểm quy đổi" },
            { fieldName: "timeDifference", header: "Số giờ quy đổi chênh lệch" },
            { fieldName: "scoreDifference", header: "Số điểm quy đổi chênh lệch" },
            {
                fieldName: "isBlock",
                header: "Đã khóa",
                formatFunction: (value: any, row: SRMDeclarationMember) =>
                    row.isBlock ? "Có" : "Không",
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName="Danh sách công bố đã duyệt"
            data={values || []}
            exportConfig={publicationExportConfig}
        />
    )
}