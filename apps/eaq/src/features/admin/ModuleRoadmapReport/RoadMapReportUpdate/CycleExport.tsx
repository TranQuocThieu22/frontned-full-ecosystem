import { Cycle } from "@/shared/interfaces/cycle/Cycle";
import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    table: MRT_TableInstance<Cycle>
    eaqStandardSetTrainingProgram: StandardSetTrainingProgram
}

export default function CycleExport({ table, eaqStandardSetTrainingProgram }: Props) {
    const { data } = useExportData(table);

    // Safety check: ensure data exists and is an array
    const safeData = Array.isArray(data) ? data : [];

    const exportConfig = {
        fields: [
            {
                header: "Mã chương trình đào tạo",
                fieldName: "eaqTrainingProgram.code",
                formatFunction: (value: any, _row: Cycle) => eaqStandardSetTrainingProgram?.eaqTrainingProgram?.code || ""
            },
            {
                header: "Tên chương trình đào tạo",
                fieldName: "eaqTrainingProgram.name",
                formatFunction: (value: any, _row: Cycle) => eaqStandardSetTrainingProgram?.eaqTrainingProgram?.name || ""
            },

            {
                header: "Thứ tự chu kỳ",
                fieldName: "eaqTrainingProgram.admissionStartYear",
                formatFunction: (value: any, row: Cycle) => row.order || ""
            },
            {
                header: "Năm đánh giá",
                fieldName: "eaqTrainingProgram.firstGraduationYear",
                formatFunction: (value: any, row: Cycle) => row.startYear || ""
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh sách chu kỳ kiểm định của CTDT ${eaqStandardSetTrainingProgram?.eaqTrainingProgram?.code}`}
            data={safeData}
            exportConfig={exportConfig}
        />
    );
}
