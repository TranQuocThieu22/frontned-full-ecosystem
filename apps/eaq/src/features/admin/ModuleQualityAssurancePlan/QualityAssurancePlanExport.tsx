import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { MRT_TableInstance } from "mantine-react-table";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";

interface Props {
    table: MRT_TableInstance<ITaskDetailAnalysis>;
    loading?: boolean;
}

export default function QualityAssurancePlanExport({ loading, table }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Mã tiêu chuẩn',
                fieldName: 'standardCode',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code || '',
            },
            {
                header: 'Mã tiêu chí',
                fieldName: 'criteriaCode',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code || '',
            },
            {
                header: 'Mã hạn chế',
                fieldName: 'limitationCode',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.eaqAnalysis?.eaqRequirement?.code || '',
            },
            {
                header: 'Tên hạn chế',
                fieldName: 'limitationName',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.eaqAnalysis?.eaqRequirement?.name || '',
            },
            {
                header: 'Mã công việc',
                fieldName: 'taskCode',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.code || '',
            },
            {
                header: 'Tên công việc',
                fieldName: 'taskName',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.name || '',
            },
            {
                header: 'Mã minh chứng dự kiến',
                fieldName: 'expectedEvidenceCode',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row.eaqTaskDetailEvidences?.map(item => item.code).join(", ") || '',
            },
            {
                header: 'Tên minh chứng dự kiến',
                fieldName: 'expectedEvidenceName',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row.eaqTaskDetailEvidences?.map(item => item.name).join(", ") || '',
            },
            {
                header: 'Thời hạn',
                fieldName: 'duration',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.duration || '',
            },
            {
                header: 'Kết quả dự kiến',
                fieldName: 'expectedResult',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.expectedResult || '',
            },
            {
                header: 'Đơn vị chủ trì',
                fieldName: 'hostUnit',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.hostUnit || '',
            },
            {
                header: 'Đơn vị phối hợp',
                fieldName: 'supportUnit',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.supportUnit || '',
            },
            {
                header: 'Ghi chú',
                fieldName: 'note',
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.note || '',
            },
        ],
    };


    return (
        <AQButtonExportData
            loading={loading}
            objectName="DsKeHoachDamBaoChatLuong"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
