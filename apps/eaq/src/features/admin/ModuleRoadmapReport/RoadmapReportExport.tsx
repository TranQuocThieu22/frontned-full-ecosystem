import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    table: MRT_TableInstance<StandardSetTrainingProgram>
}

export default function RoadmapReportExport({ table }: Props) {
    const { data } = useExportData(table);

    // Safety check: ensure data exists and is an array
    const safeData = Array.isArray(data) ? data : [];

    // Find the maximum number of cycles across all training programs
    const maxCycles = safeData.length > 0
        ? Math.max(...safeData.map(item => item?.eaqCycles?.length || 0))
        : 0;

    // Create dynamic cycle columns
    const cycleColumns = Array.from({ length: maxCycles }, (_, index) => ({
        header: `Năm chu kỳ ${index + 1}`,
        fieldName: `cycleYear${index + 1}`,
        formatFunction: (value: any, row: StandardSetTrainingProgram) => {
            // Add safety check for row and eaqCycles
            if (!row || !row.eaqCycles) return '';
            const cycle = row.eaqCycles.find(c => c.order === index + 1);
            return cycle?.startYear?.toString() || '';
        }
    }));

    const exportConfig = {
        fields: [
            {
                header: "Mã chương trình đào tạo",
                fieldName: "eaqTrainingProgram.code",
                formatFunction: (value: any, row: StandardSetTrainingProgram) => row?.eaqTrainingProgram?.code || ""
            },
            {
                header: "Tên chương trình đào tạo",
                fieldName: "eaqTrainingProgram.name",
                formatFunction: (value: any, row: StandardSetTrainingProgram) => row?.eaqTrainingProgram?.name || ""
            },
            {
                header: "Mã bộ tiêu chuẩn",
                fieldName: "eaqStandardSet.code",
                formatFunction: (value: any, row: StandardSetTrainingProgram) => row?.eaqStandardSet?.code || ""
            },
            {
                header: "Năm bắt đầu tuyển sinh",
                fieldName: "eaqTrainingProgram.admissionStartYear",
                formatFunction: (value: any, row: StandardSetTrainingProgram) => row?.eaqTrainingProgram?.admissionStartYear?.toString() || ""
            },
            {
                header: "Năm tốt nghiệp khóa đầu",
                fieldName: "eaqTrainingProgram.firstGraduationYear",
                formatFunction: (value: any, row: StandardSetTrainingProgram) => row?.eaqTrainingProgram?.firstGraduationYear?.toString() || ""
            },
            ...cycleColumns
        ],
    };

    return (
        <AQButtonExportData
            objectName="Danh sách lộ trình thực hiện báo cáo tự đánh giá"
            data={safeData}
            exportConfig={exportConfig}
        />
    );
}
