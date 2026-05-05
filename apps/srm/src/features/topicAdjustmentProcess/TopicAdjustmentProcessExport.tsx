import { EnumLabelContractExecutionStatus } from '@/shared/consts/enum/EnumContractExecutionStatus';
import { EnumLabelProcessingStatus } from '@/shared/consts/enum/EnumProcessingStatus';
import { SRMContractDetail } from '@/shared/interfaces/SRMContractDetail';
import { AQButtonExportData } from '@aq-fe/core-ui/shared/components/button/AQButtonExportData';
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';

export default function TopicAdjustmentProcessExport(
    {
        loading,
        data
    }: {
        loading?: boolean,
        data: SRMContractDetail[]
    }
) {


    const formattedData = data.map(item => {
        return {
            ...item,
            code: item.srmContract?.code,
            name: item.srmContract?.name,
            fromDate: dateUtils.toMMYYYY(item.srmContract?.fromDate),
            toDate: dateUtils.toMMYYYY(item.srmContract?.toDate),
            SRMTopicLeader: item.srmContract?.srmTopic?.srmTopicMembers?.find(i => i.srmTitle?.isLeader == true)?.user?.fullName,
            processingStatus: converterUtils.getLabelByValue(EnumLabelProcessingStatus, item.processingStatus),
            executionStatus: converterUtils.getLabelByValue(EnumLabelContractExecutionStatus, item.srmContract?.executionStatus),
        }
    })

    const exportConfig = {
        fields: [
            { header: "Mã đề tài", fieldName: "code", size: 150 },
            { header: "Tên đề tài", fieldName: "name", size: 350 },
            { header: "Chủ nhiệm đề tài", fieldName: "SRMTopicLeader" },
            { header: "Thời gian thực hiện", fieldName: "duration" },
            { header: "Từ tháng/năm", fieldName: "fromDate" },
            { header: "Đến tháng/năm", fieldName: "toDate" },
            { header: "Nội dung điều chỉnh", fieldName: "amendmentContent", size: 200 },
            { header: "Trạng thái thực hiện", fieldName: "executionStatus" },
            { header: "Trạng thái kiểm tra", fieldName: "processingStatus" },
            { header: "Tóm tắt xử lý", fieldName: "processingSummary" },
        ],
    };



    return (
        <AQButtonExportData
            objectName="Danh_sach_yeu_cau_dieu_chinh"
            exportConfig={exportConfig}
            data={formattedData}
            loading={loading}
        />
    )
}

