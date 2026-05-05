import { commentGroupEnum } from '@/shared/constants/enum/CommentGroupEnum';
import { IComment } from '@/shared/interfaces/comment/IComment';
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    selectedRows: IComment[]
    allRows: IComment[]
    isLoading: boolean
}

export default function ExternalAssessmentExportButton({ selectedRows, allRows, isLoading }: Props) {
    const exportConfig = {
        fields: [
            {
                fieldName: 'standard.code', header: 'Mã tiêu chuẩn',
                formatFunction: (value: any, row: IComment) => row?.eaqSelfAssessment?.eaqTaskDetail?.eaqCriteria?.eaqStandard?.code
            },
            {
                fieldName: 'criteria.code', header: 'Mã tiêu chí',
                formatFunction: (value: any, row: IComment) => row?.eaqSelfAssessment?.eaqTaskDetail?.eaqCriteria?.code
            },
            {
                fieldName: 'eaqSelfAssessment.selfAssessmentType',
                header: 'Nhóm nội dung',
                formatFunction: (value: any, row: IComment) => {
                    if (!row.selfAssessmentType) return "";
                    return commentGroupEnum[row.selfAssessmentType];
                }
            },
            {
                fieldName: 'content', header: 'Nội dung đề cập',
            },
            {
                fieldName: 'commentDetail', header: 'Nhận xét và yêu cầu hiệu chỉnh',
            },
        ]
    }
    return (
        <AQButtonExportData
            loading={isLoading}
            objectName={'Danh sách nhận xét đánh giá ngoài'}
            data={selectedRows.length > 0 ? selectedRows : allRows || []}
            exportConfig={exportConfig}
        />
    );
}
