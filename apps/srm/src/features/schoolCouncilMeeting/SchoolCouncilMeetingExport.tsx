import { EnumContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { SRMAcceptanceContract } from "@/shared/interfaces/SRMAcceptanceContract";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
    academicYearName?: string;
    data?: SRMAcceptanceContract[],
    disabled?: boolean
}

export default function SchoolCouncilMeetingExport({ academicYearName, data, disabled }: Props) {

    const convertDataExport = (values: SRMAcceptanceContract[]) => {
        return values.map((item, index) => ({
            index: index + 1,
            acceptanceCouncilCode: item.srmAcceptanceCouncil?.code,
            acceptanceCouncilName: item.srmAcceptanceCouncil?.name,
            dateMeeting: dateUtils.toDDMMYYYY(item.dateMeeting),
            code: item.srmContract?.code,
            name: item.srmContract?.name,
            areaName: item.srmContract?.srmTopic?.srmArea?.name,
            topicLeader: item.srmContract?.srmTopic?.srmTopicMembers?.
                flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : [])).
                join(", ") ?? "",
            point: item.point,
            srmConclusionName: item.srmConclusion?.name,
            recommendation: item.recommendation,
            comment: item.comment,
            executionStatus: EnumLabelContractExecutionStatus[item.srmContract?.executionStatus as EnumContractExecutionStatus]
        }))
    }

    const exportConfig = {
        fields: [
            {
                fieldName: 'acceptanceCouncilCode',
                header: 'Mã hội đồng'
            },
            {
                fieldName: 'acceptanceCouncilName',
                header: 'Tên hội đồng',
            },
            {
                fieldName: 'dateMeeting',
                header: 'Ngày họp',
            },
            {
                fieldName: 'code',
                header: 'Mã đề tài',
            },
            {
                fieldName: 'name',
                header: 'Tên đề tài',
            },
            {
                fieldName: 'areaName',
                header: 'Lĩnh vực',
            },
            {
                fieldName: 'topicLeader',
                header: 'Chủ nhiệm',
            },
            {
                fieldName: 'point',
                header: 'Điểm trung bình',
            },
            {
                fieldName: 'srmConclusionName',
                header: 'Xếp loại',
            },
            {
                fieldName: 'recommendation',
                header: 'Kiến nghị',
            },
            {
                fieldName: 'comment',
                header: 'Tóm tắt nhận xét',
            },
            {
                fieldName: 'executionStatus',
                header: 'Trạng thái thực hiện',
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh_sach_de_tai_nghiem_thu_cap_khoa_${academicYearName}`}
            data={convertDataExport(data || [])}
            exportConfig={exportConfig}
            disabled={disabled}
        />
    );
}