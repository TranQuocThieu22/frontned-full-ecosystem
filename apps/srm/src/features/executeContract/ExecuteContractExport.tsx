import { SRMContract } from '@/shared/interfaces/SRMContract';
import { AQButtonExportData } from '@aq-fe/core-ui/shared/components/button/AQButtonExportData';
import { currencyUtils } from '@aq-fe/core-ui/shared/utils/currencyUtils';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';

export default function ExecuteContractExport(
    {
        loading,
        data
    }: {
        loading?: boolean,
        data: SRMContract[]
    }
) {

    const formattedData = data.map(item => {
        return {
            ...item,
            topicCode: item.srmTopic?.code ?? "",
            code: item.code ?? "",
            name: item.name ?? "",
            srmTopicLeaders: item.srmTopic?.srmTopicMembers?.map((item) => item.srmTitle?.isLeader === true ? item.user?.fullName + ", " : "").join(" ").trim() ?? "",
            topicHostOrganization: item.srmTopic?.hostOrganization ?? "",
            topicManagingOrganization: item.srmTopic?.managingOrganization ?? "",
            contractNumber: item.contractNumber ?? "",
            signingDate: dateUtils.toDDMMYYYY(item.signingDate),
            duration: item.duration ?? "",
            fromDate: dateUtils.toMMYYYY(item.fromDate),
            toDate: dateUtils.toMMYYYY(item.toDate),
            totalCost: currencyUtils.formatWithSuffix(item.totalCost, " VNĐ"),
            srmTypeName: item.srmType?.name ?? "",
        }
    })

    const exportConfig = {
        fields: [
            {
                header: "Mã đăng ký",
                fieldName: "topicCode",
            }, // 
            {
                header: "Mã đề tài",
                fieldName: "code",
            },
            {
                header: "Tên đề tài",
                fieldName: "name",
            },
            {
                header: "Chủ nhiệm đề tài",
                fieldName: "srmTopicLeaders",
            },
            {
                header: "Đơn vị chủ trì",
                fieldName: "topicHostOrganization",
            },
            {
                header: "Đơn vị quản lý",
                fieldName: "topicManagingOrganization",
            },
            { header: "Số hợp đồng", fieldName: "contractNumber" }, //
            {
                header: "Ngày ký",
                fieldName: "signingDate", //

            },
            { header: "Thời gian thực hiện", fieldName: "duration" }, //
            {
                header: "Từ tháng/năm",
                fieldName: "fromDate", //
            },
            {
                header: "Đến tháng/năm",
                fieldName: "toDate", //
            },
            {
                header: "Tổng kinh phí dự toán",
                fieldName: "totalCost",
            }, //
            {
                header: "Loại đề tài",
                fieldName: "srmTypeName",
            }, //
        ],
    };

    return (
        <AQButtonExportData
            objectName="Danh_sach_hop_dong"
            exportConfig={exportConfig}
            data={formattedData}
            loading={loading}
        />
    )
}
