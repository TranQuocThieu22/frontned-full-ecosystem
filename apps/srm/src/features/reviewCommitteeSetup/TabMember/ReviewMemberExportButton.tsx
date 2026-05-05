import { SRMReviewMember } from "@/shared/interfaces/SRMReviewMember";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
    dataSelected: SRMReviewMember[],
    councilCode: string,
    roleList?: SRMTitle[]
}

export default function ReviewMemberExportButton({ dataSelected, councilCode, roleList }: Props) {

    const convertDataExport = (values: SRMReviewMember[]) => {
        return values.map((item, index) => ({
            index: index + 1,
            userCode: item.user?.code,
            userFullName: item.user?.fullName,
            userDateOfBirth: dateUtils.toDDMMYYYY(item.user?.dateOfBirth),
            userGender: genderLabel[item.user?.gender as genderEnum],
            userWorkingUnitName: item.user?.workingUnitName,
            userJobTitle: item.user?.jobTitle,
            srmTitleName: roleList?.find(role => role.id == item.srmTitleId)?.name
        }))
    }

    const exportConfig = {
        fields: [
            {
                fieldName: 'index',
                header: 'STT',
            },
            {
                fieldName: 'userCode',
                header: 'Mã viên chức',
            },
            {
                fieldName: 'userFullName',
                header: 'Họ và Tên',
            },
            {
                fieldName: 'userDateOfBirth',
                header: 'Ngày sinh',
            },
            {
                fieldName: 'userGender',
                header: 'Giới tính',
            },
            {
                fieldName: 'userWorkingUnitName',
                header: 'Đơn vị',
            },
            {
                fieldName: 'userJobTitle',
                header: 'Chức vụ',
            },
            {
                fieldName: 'srmTitleName',
                header: 'Vai trò',
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh_sach_thanh_vien_cua_hoi_dong_${councilCode}`}
            data={convertDataExport(dataSelected)}
            exportConfig={exportConfig}
        />
    )
}