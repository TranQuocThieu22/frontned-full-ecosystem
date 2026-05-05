"use client";


import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { AcademicYear } from "@aq-fe/core-ui/shared/interfaces/AcademicYear";
import { academicYearService } from "../../../shared/APIs/academicYearService";

const academicYearFields: FieldOption<AcademicYear>[] = [
    { fieldKey: "code", fieldName: "Năm học (ví dụ: 2024)", isRequired: true },
    { fieldKey: "name", fieldName: "Tên năm học", isRequired: true },
    { fieldName: "Ngày bắt đầu năm học (Ngày/ tháng/ năm)", fieldKey: "academicYearStart" },
    { fieldName: "Ngày kết thúc năm học (Ngày/ tháng/ năm)", fieldKey: "academicYearEnd" },
    { fieldName: "Ngày bắt đầu năm hành chính (Ngày/ tháng/ năm)", fieldKey: "administrativeYearStart" },
    { fieldName: "Ngày kết thúc năm hành chính (Ngày/ tháng/ năm)", fieldKey: "administrativeYearEnd" },
    { fieldName: "Hiện hành (True/ False)", fieldKey: "isCurrent", parseType: "boolean" },
    { fieldName: "Ghi chú", fieldKey: "note" },
];

interface AcademicYearImportButtonProps {
    loading?: boolean;
    disabled?: boolean;
}

export default function AcademicYearImportButton(
    {
        loading,
        disabled
    }: AcademicYearImportButtonProps
) {
    const parseDate = (dateStr: string): Date => {
        const [day, month, year] = dateStr.split("/");
        return new Date(parseInt(year!), parseInt(month!) - 1, parseInt(day!));
    };

    const handleImportAcademicYear = (finalValues: AcademicYear[]) => {
        const transformedValues: AcademicYear[] = finalValues.map((item) => ({
            ...item,
            code: String(item.code || "").trim(),
            academicYearStart:
                typeof item.academicYearStart === "string"
                    ? parseDate(item.academicYearStart)
                    : item.academicYearStart,
            academicYearEnd:
                typeof item.academicYearEnd === "string"
                    ? parseDate(item.academicYearEnd)
                    : item.academicYearEnd,
            administrativeYearStart:
                typeof item.administrativeYearStart === "string"
                    ? parseDate(item.administrativeYearStart)
                    : item.administrativeYearStart,
            administrativeYearEnd:
                typeof item.administrativeYearEnd === "string"
                    ? parseDate(item.administrativeYearEnd)
                    : item.administrativeYearEnd,
            aqModuleId: 5
        }));

        return academicYearService.createList(transformedValues);
    }

    return (
        <>
            <CustomButtonImport
                fields={academicYearFields}
                buttonProps={{
                    loading: loading,
                    disabled: disabled
                }}
                fileName="Mẫu import danh mục năm học"
                onSubmit={handleImportAcademicYear}
            />
        </>
    );
}
