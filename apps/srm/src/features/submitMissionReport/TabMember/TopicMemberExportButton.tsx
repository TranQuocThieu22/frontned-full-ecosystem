import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

export default function TopicMemberExportButton({ dataSelected, topicCode }: { dataSelected: SRMTopicMember[], topicCode: string }) {

    const convertDataExport = (values: SRMTopicMember[]) => {
        return values.map((item, index) => ({
            index: index + 1,
            userCode: item.user?.code,
            userFullName: item.user?.fullName,
            userDateOfBirth: dateUtils.toDDMMYYYY(item.user?.dateOfBirth),
            userGender: genderLabel[item.user?.gender as genderEnum],
            userWorkingUnitName: item.user?.workingUnitName,
            userJobTitle: item.user?.jobTitle,
            srmTitleName: item.srmTitle?.name
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
            objectName={`Danh_sach_thanh_vien_cua_de_tai_${topicCode}`}
            data={convertDataExport(dataSelected)}
            exportConfig={exportConfig}
        />
    )
}