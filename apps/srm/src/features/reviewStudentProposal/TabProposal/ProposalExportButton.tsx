import { EnumProposalStatus, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";

interface Props {
    table: any
    decisionCode: string,
}

export default function ProposalExportButton({ table, decisionCode }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                header: "Mã đề xuất",
                fieldName: "code",
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.code ?? ""
            },
            {
                header: "Tên đề tài",
                fieldName: "name",
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.name ?? ""
            },
            {
                header: 'Lĩnh vực',
                fieldName: 'areaName',
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.srmArea?.name ?? ""
            },
            {
                header: 'Mục tiêu',
                fieldName: 'objective',
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.objective ?? ""
            },
            {
                header: 'Tổng kinh phí dự kiến',
                fieldName: 'estimatedBudget',
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.estimatedBudget ?? ""
            },
            {
                header: 'Kết quả chính',
                fieldName: 'result',
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.result ?? ""
            },
            {
                header: 'Phương án ứng dụng',
                fieldName: 'resexpectedOutput',
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.expectedOutput ?? ""
            },
            {
                header: 'Thời gian thực hiện (tháng)',
                fieldName: 'duration',
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.duration ?? ""
            },
            {
                header: "Mã sinh viên đăng ký",
                fieldName: "userCode",
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.user?.code ?? ""
            },
            {
                header: "Họ tên sinh viên đăng ký",
                fieldName: "fullName",
                formatFunction: (value: any, row: any) => row.srmTaskProposal?.user?.fullName ?? ""
            },
            {
                header: 'Mã khoa',
                fieldName: 'makhoa',
                formatFunction: (value: any, row: any) => ""
            },
            {
                header: "Trạng thái đề xuất",
                fieldName: "proposalStatus",
                formatFunction: (value: any, row: any) => EnumProposalStatusLabels[row.srmTaskProposal?.proposalStatus as EnumProposalStatus]
            }
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh sách đề xuất của quyết định ${decisionCode}`}
            data={data}
            exportConfig={exportConfig}
        />
    )
}