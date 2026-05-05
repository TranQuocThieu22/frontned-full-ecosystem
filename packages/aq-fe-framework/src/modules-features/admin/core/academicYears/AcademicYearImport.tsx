"use client";

import { useModalsStack } from "@mantine/core";

import { MyButton } from "@/core";
import { ModalImportId, MyModalImport } from "@/core/overlays/MyModalStackImport/MyModalImport";
import { useMyReactMutation } from "@/hooks/custom-hooks/useMyReactMutation";
import { IUtils_Excel_ColumnConfig, utils_excel_download, utils_excel_exportExcel } from "@/utils/utils_excel";
import ExcelJS from "exceljs";
import { academicYearService } from "../../../../APIs/academicYearService";
import { IAcademicYear } from "../../../../interfaces";

const config: IUtils_Excel_ColumnConfig<IAcademicYear>[] = [
    { fieldKey: "code", fieldName: "Năm học (ví dụ: 2024)", isRequired: true },
    { fieldKey: "name", fieldName: "Tên năm học", isRequired: true },
    { fieldName: "Ngày bắt đầu năm học (Ngày/ tháng/ năm)", fieldKey: "academicYearStart" },
    { fieldName: "Ngày kết thúc năm học (Ngày/ tháng/ năm)", fieldKey: "academicYearEnd" },
    { fieldName: "Ngày bắt đầu năm hành chính (Ngày/ tháng/ năm)", fieldKey: "administrativeYearStart" },
    { fieldName: "Ngày kết thúc năm hành chính (Ngày/ tháng/ năm)", fieldKey: "administrativeYearEnd" },
    { fieldName: "Hiện hành (True/ False)", fieldKey: "isCurrent" },
    { fieldName: "Ghi chú", fieldKey: "note" },
];

export default function AcademicYearImport() {
    const importMutation = useMyReactMutation({
        axiosFn: (body: IAcademicYear[]) =>
            academicYearService.createOrUpdateList(body),
        mutationType: "import",
    });

    const stack = useModalsStack<ModalImportId>([]);

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await utils_excel_exportExcel<IAcademicYear>({
            workbook,
            sheetName: "Danh mục năm học học kỳ",
            data: [],
            config: config,
        });
        utils_excel_download({ name: "Ghi nhận danh mục năm học", workbook });
    };

    const parseDate = (dateStr: string): Date => {
        const [day, month, year] = dateStr.split("/");
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: IAcademicYear[]) => {
                    const transformedValues: IAcademicYear[] = finalValues.map((item) => ({
                        ...item,
                        code: String(item.code || "").trim(),
                        isCurrent: item.isCurrent ?? false,
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
                    }));

                    importMutation.mutate(transformedValues, {
                        onSuccess: () => {
                            stack.closeAll();
                        },
                        onError: () => console.log(transformedValues),
                    });
                }}
            />
            <MyButton
                actionType="import"
                onClick={() => stack.open("FileImportConfig")}
            />
        </>
    );
}
