import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    dataSelected: SRMReviewProposal[],
    reviewCommitteeCode: string,
}

export default function ReviewProposalExportButton({ dataSelected, reviewCommitteeCode }: Props) {

    const convertDataExport = (values: SRMReviewProposal[]) => {
        return values.map((item, index) => ({
            index: index + 1,
            code: item.srmTaskProposal?.code,
            name: item.srmTaskProposal?.name,
            srmResearchAreaName: item.srmTaskProposal?.srmArea?.name,
            userCode: item.srmTaskProposal?.user?.code,
            userFullName: item.srmTaskProposal?.user?.fullName
        }))
    }

    const exportConfig = {
        fields: [
            {
                header: "STT",
                fieldName: "index",
            },
            {
                header: "Mã đề xuất",
                fieldName: "code",
            },
            {
                header: "Tên đề tài",
                fieldName: "name",
            },
            {
                header: 'Lĩnh vực',
                fieldName: 'srmResearchAreaName',
            },
            {
                header: "Mã viên chức",
                fieldName: "userCode",
            },
            {
                header: "Tên viên chức",
                fieldName: "userFullName",
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh_sach_de_xuat_cua_hoi_dong_${reviewCommitteeCode}`}
            data={convertDataExport(dataSelected)}
            exportConfig={exportConfig}
        />
    )
}