import { AQButtonExportData } from "@/components/Button/ButtonCRUD/AQButtonExportData";
import { useExportData } from "@/hooks";
import { MRT_TableInstance } from "mantine-react-table";
import { IAcademicYear } from "../../../../interfaces";
import { utils_date } from "../../../../utils-v2";

interface Props {
    table: MRT_TableInstance<IAcademicYear>
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
            academicYearStart: item.academicYearStart ? utils_date.toDDMMYYYY(item.academicYearStart) : undefined,
            academicYearEnd: item.academicYearEnd ? utils_date.toDDMMYYYY(item.academicYearEnd) : undefined,
            administrativeYearStart: item.administrativeYearStart ? utils_date.toDDMMYYYY(item.administrativeYearStart) : undefined,
            administrativeYearEnd: item.administrativeYearEnd ? utils_date.toDDMMYYYY(item.administrativeYearEnd) : undefined,

        };
    });

    return (
        <AQButtonExportData
            objectName="Danh mục năm học"
            data={exportData}
            exportConfig={exportConfig}
        />
    );
}
