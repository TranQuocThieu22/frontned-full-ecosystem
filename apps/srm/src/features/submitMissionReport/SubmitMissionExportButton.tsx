import { EnumLabelTopicStatus, EnumTopicStatus } from "@/shared/consts/enum/EnumTopicStatus";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
export default function SubmitMissionExportButton({ dataSelected, topicCode }: { dataSelected: SRMTopic[], topicCode: string }) {

    const convertDataExport = (values: SRMTopic[]) => {
        return values.map((item, index) => ({
            ...item,
            index: index + 1,
            fromDate: dateUtils.toMMYYYY(item.fromDate),
            toDate: dateUtils.toMMYYYY(item.toDate),
            totalCost: currencyUtils.formatWithSuffix(item.totalCost, " VNĐ"),
            srmTypeName: item.srmType?.name,
            srmAreaName: item.srmArea?.name,
            topicLeader: item.srmTopicMembers?.find((i) => i.srmTitle?.isLeader)?.user?.fullName ?? "",
            status: EnumLabelTopicStatus[item.status as EnumTopicStatus]
        }))
    }

    const exportConfig = {
        fields: [
            {
                fieldName: 'index',
                header: 'STT',
            },
            { fieldName: 'code', header: 'Mã đăng ký' },
            { fieldName: 'registerName', header: 'Tên đề tài', size: 500 },
            {
                fieldName: 'duration',
                header: 'Thời gian thực hiện',
            },
            {
                fieldName: 'fromDate',
                header: 'Từ tháng/ năm',
            },
            {
                fieldName: 'toDate',
                header: 'Từ tháng/ năm',
            },
            {
                fieldName: 'hostOrganization',
                header: 'Đơn vị chủ trì',
                size: 200
            },
            {
                fieldName: 'managingOrganization',
                header: 'Đơn vị quản lý',
                size: 200
            },
            {
                fieldName: 'totalCost',
                header: 'Tổng kinh phí thực hiện',
                size: 200
            },
            {
                fieldName: 'srmTypeName',
                header: 'Loại hình đề tài',
            },
            {
                fieldName: 'srmAreaName',
                header: 'Lĩnh vực',
                size: 200
            },
            {
                fieldName: 'topicLeader',
                header: 'Chủ nhiệm đề tài',
                size: 200,
            },
            {
                fieldName: 'status',
                header: 'Tình trạng của đề tài',
                size: 400,
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh_sach_thuyet_minh_de_tai_${topicCode}`}
            data={convertDataExport(dataSelected)}
            exportConfig={exportConfig}
        />
    )
}