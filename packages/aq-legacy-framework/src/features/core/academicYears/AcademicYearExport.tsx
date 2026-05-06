import { CustomButtonExportData } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AcademicYear } from "@aq-fe/aq-legacy-framework/shared/interfaces/AcademicYear";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    table: MRT_TableInstance<AcademicYear>
    isLoading?: boolean
}

export default function AcademicYearExport({ table }: Props) {
    const { data } = useExportData(table)
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Năm học", },
            { fieldName: "name", header: "Tên năm học", },
            { header: "Ngày bắt đầu năm học", fieldName: "academicYearStart", },
            { header: "Ngày kết thúc năm học", fieldName: "academicYearEnd", },
            { header: "Ngày bắt đầu năm hành chính", fieldName: "administrativeYearStart", },
            { header: "Ngày kết thúc năm hành chính", fieldName: "administrativeYearEnd", },
            { header: "Hiện hành (True/ False)", fieldName: "isCurrent", },
            { header: "Ghi chú", fieldName: "note" },
        ],
    };

    const exportData = data.map((item) => {
        return {
            ...item,
            academicYearStart: item.academicYearStart ? dateUtils.toDDMMYYYY(item.academicYearStart) : undefined,
            academicYearEnd: item.academicYearEnd ? dateUtils.toDDMMYYYY(item.academicYearEnd) : undefined,
            administrativeYearStart: item.administrativeYearStart ? dateUtils.toDDMMYYYY(item.administrativeYearStart) : undefined,
            administrativeYearEnd: item.administrativeYearEnd ? dateUtils.toDDMMYYYY(item.administrativeYearEnd) : undefined,

        };
    });

    return (
        <CustomButtonExportData
            objectName="Danh mục năm học"
            data={exportData}
            exportConfig={exportConfig}
        />
    );
}
