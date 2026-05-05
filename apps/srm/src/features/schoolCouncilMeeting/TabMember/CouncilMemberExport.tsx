import { SRMAcceptanceContractMember } from "@/shared/interfaces/SRMAcceptanceContractMember";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    contractCode?: string;
    data?: SRMAcceptanceContractMember[],
    disabled?: boolean
}

export default function CouncilMemberExport({ contractCode, data, disabled }: Props) {

    const convertDataExport = (values: SRMAcceptanceContractMember[]) => {
        return values.map((item, index) => ({
            index: index + 1,
            userCode: item.srmAcceptanceMember?.user?.code,
            userFullName: item.srmAcceptanceMember?.user?.fullName,
            srmTitleName: item.srmAcceptanceMember?.srmTitle?.name,
            conclusionName: item.srmConclusion?.name
        })) || []
    }

    const exportConfig = {
        fields: [
            {
                fieldName: 'index',
                header: 'STT',
            },
            {
                fieldName: 'userCode',
                header: 'Mã thành viên',
            },
            {
                fieldName: 'userFullName',
                header: 'Họ tên',
            },
            {
                fieldName: 'srmTitleName',
                header: 'Vai trò',
            },
            {
                fieldName: 'conclusionName',
                header: 'Kết luận',
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh_sach_nhan_xet_nghiem_thu_cap_khoa_cua_de_tai_${contractCode}`}
            data={convertDataExport(data || [])}
            exportConfig={exportConfig}
            disabled={disabled}
        />
    );
}