import { SRMEvaluationMember } from "@/shared/interfaces/SRMEvaluationMember";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    table: MRT_TableInstance<SRMEvaluationMember>;
    loading?: boolean;
    councilRoleData?: SRMTitle[]
}

export default function ExportMember({ loading, table, councilRoleData }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Mã viên chức',
                fieldName: 'userCode',
                formatFunction: (_: any, row: SRMEvaluationMember) => row?.user?.code,
            },
            {
                header: 'Họ và tên',
                fieldName: 'userFullName',
                formatFunction: (_: any, row: SRMEvaluationMember) => row?.user?.fullName || '',
            },
            {
                header: 'Ngày sinh',
                fieldName: 'userDateOfBirth',
                formatFunction: (_: any, row: SRMEvaluationMember) => row?.user?.dateOfBirth || '',
            },
            {
                header: 'Giới tính(1 = nam, 2 = nữ)',
                fieldName: 'userGender',
                formatFunction: (_: any, row: SRMEvaluationMember) => row?.user?.gender,
            },
            {
                header: 'Đơn vị',
                fieldName: 'userWorkingUnit',
                formatFunction: (_: any, row: SRMEvaluationMember) => row?.user?.workingUnit?.name || '',
            },
            {
                header: 'Email',
                fieldName: 'userEmail',
                formatFunction: (_: any, row: SRMEvaluationMember) => row?.user?.email || '',
            },
            {
                header: 'Số điện thoại',
                fieldName: 'userPhoneNumber',
                formatFunction: (_: any, row: SRMEvaluationMember) => row.user?.phoneNumber,
            },
            {
                header: 'Vai trò',
                fieldName: 'srmTitleId',
                formatFunction: (_: any, row: SRMEvaluationMember) => councilRoleData?.find(item => item.id === row.srmTitleId)?.name || '',
            },

        ],
    };


    return (
        <AQButtonExportData
            loading={loading}
            objectName="DsPhanCongVietGiaiTrinhThucHienDamBaoChatLuong"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
