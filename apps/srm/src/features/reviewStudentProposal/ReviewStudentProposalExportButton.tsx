import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
    table: any
    disabled?: boolean
}

export default function ReviewStudentProposalExportButton({ table, disabled }: Props) {
    const academicStore = useAcademicYearStore();
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: 'decisionCode',
                header: 'Số quyết định'
            },
            {
                fieldName: 'decisionDate',
                header: 'Ngày quyết định',
                formatFunction: (value: any, row: any) => dateUtils.toDDMMYYYY(row.decisionDate)
            },
            {
                fieldName: 'decisionName',
                header: 'Tên quyết định',
            },
            {
                fieldName: 'signer',
                header: 'Người ký',
            },
            {
                fieldName: 'note',
                header: 'Ghi chú',
            },
        ],
    };
    return (
        <AQButtonExportData
            objectName={`Danh sách quyết định phê duyệt danh mục đề xuất sinh viên NCKH năm ${academicStore.state.academicYear?.name}`}
            data={data}
            exportConfig={exportConfig}
            disabled={disabled}
        />
    )
}