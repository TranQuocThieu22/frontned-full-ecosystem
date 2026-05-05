import { MRT_TableInstance } from "mantine-react-table";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    table: MRT_TableInstance<ITaskDetail>;
    loading?: boolean;
}

export default function AssignJustificationExport({ loading, table }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Mã tiêu chuẩn',
                fieldName: 'standardCode',
                formatFunction: (value: any, row: ITaskDetail) => row?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code || '',
            },
            {
                header: 'Mã tiêu chí',
                fieldName: 'criteriaCode',
                formatFunction: (value: any, row: ITaskDetail) => row?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code || '',
            },
            {
                header: 'Mã hạn chế',
                fieldName: 'limitationCode',
                formatFunction: (value: any, row: ITaskDetail) => row?.eaqAnalysis?.eaqRequirement?.code || '',
            },
            {
                header: 'Tên hạn chế',
                fieldName: 'limitationName',
                formatFunction: (value: any, row: ITaskDetail) => row?.eaqAnalysis?.eaqRequirement?.name || '',
            },
            {
                header: 'Mã công việc',
                fieldName: 'taskCode',
                formatFunction: (value: any, row: ITaskDetail) => row?.code || '',
            },
            {
                header: 'Tên công việc',
                fieldName: 'taskName',
                formatFunction: (value: any, row: ITaskDetail) => row?.name || '',
            },
            {
                header: 'Mã minh chứng dự kiến',
                fieldName: 'expectedEvidenceCode',
                formatFunction: (value: any, row: ITaskDetail) => row.eaqTaskDetailEvidences?.map(item => item.code).join(", ") || '',
            },
            {
                header: 'Tên minh chứng dự kiến',
                fieldName: 'expectedEvidenceName',
                formatFunction: (value: any, row: ITaskDetail) => row.eaqTaskDetailEvidences?.map(item => item.name).join(", ") || '',
            },
            {
                header: 'Thời hạn',
                fieldName: 'duration',
                formatFunction: (value: any, row: ITaskDetail) => row?.duration || '',
            },
            {
                header: 'Kết quả dự kiến',
                fieldName: 'expectedResult',
                formatFunction: (value: any, row: ITaskDetail) => row?.expectedResult || '',
            },
            {
                header: 'Đơn vị chủ trì',
                fieldName: 'hostUnit',
                formatFunction: (value: any, row: ITaskDetail) => row?.hostUnit || '',
            },
            {
                header: 'Đơn vị phối hợp',
                fieldName: 'supportUnit',
                formatFunction: (value: any, row: ITaskDetail) => row?.supportUnit || '',
            },
            {
                header: 'Ghi chú',
                fieldName: 'note',
                formatFunction: (value: any, row: ITaskDetail) => row?.note || '',
            },
            {
                header: 'Nhân sự phụ trách',
                fieldName: 'fullName',
                formatFunction: (value: any, row: ITaskDetail) => row?.user?.fullName || '',
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
