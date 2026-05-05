import { DeepKeys } from "@tanstack/table-core";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { utils, writeFile } from "xlsx";
import { SafeOmitType } from "../types/safeOmitType";
import { IExportConfig } from "./fileUtils";
dayjs.extend(customParseFormat);
export interface IExcelColumnConfig<T> {
    fieldKey: (({} & string) | DeepKeys<T>);
    fieldName: string;
    isRequired?: boolean;
    isUnique?: boolean
    formatter?: (value: any, row: T) => any;
}
interface AddSheetProps<T> {
    workbook: Workbook;
    sheetName: string;
    data: T[];
    config: IExcelColumnConfig<T>[];
}
function addSheet<T extends Record<string, any>>(props: AddSheetProps<T>) {
    const sheet = props.workbook.addWorksheet(props.sheetName);

    const fieldKeys: string[] = props.config.map((item) => String(item.fieldKey));
    const headerMappings: Record<string, string> = {};
    const requiredColumns: string[] = [];
    const uniqueColumns: string[] = [];

    props.config.forEach((item) => {
        const fieldKeyStr = String(item.fieldKey);
        headerMappings[fieldKeyStr] = item.fieldName;
        if (item.isRequired) requiredColumns.push(fieldKeyStr);
        if (item.isUnique) uniqueColumns.push(fieldKeyStr);
    });

    sheet.columns = fieldKeys.map((fieldKey) => {
        const headerText = headerMappings[fieldKey] || fieldKey;
        const headerLength = headerText.length;

        const dataLengths = props.data.map((row) => {
            const val = getValueByPath(row, fieldKey);
            return val ? String(val).length : 0;
        });

        const maxDataLength = dataLengths.length > 0 ? Math.max(...dataLengths) : 0;
        const width = Math.max(headerLength, maxDataLength) + 3;

        return { key: fieldKey, width };
    });

    // Tạo hàng header hiển thị (Display row)
    const displayRow = sheet.addRow(
        fieldKeys.map((fieldKey) => {
            const base = headerMappings[fieldKey] || fieldKey;
            const hasRequired = requiredColumns.includes(fieldKey);
            const hasUnique = uniqueColumns.includes(fieldKey);

            // hiển thị * hoặc ! nếu có
            let suffix = "";
            if (hasRequired) suffix += " *";
            if (hasUnique) suffix += " !";

            return base + suffix;
        })
    );

    // Hàng field key (kỹ thuật)
    const keyRow = sheet.addRow(fieldKeys);

    // Build data rows
    props.data.forEach((row) => {
        const rowData: Record<string, any> = {};
        props.config.forEach(({ fieldKey, formatter }) => {
            const fieldKeyStr = String(fieldKey);
            const rawValue = getValueByPath(row, fieldKeyStr);
            rowData[fieldKeyStr] = formatter ? formatter(rawValue, row) : rawValue;
        });
        sheet.addRow(rowData);
    });

    // Style header row
    for (let i = 1; i <= fieldKeys.length; i++) {
        const cell = displayRow.getCell(i);
        cell.font = { bold: true };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFE0E0E0" },
        };
    }

    // Style field key row
    for (let i = 1; i <= fieldKeys.length; i++) {
        const cell = keyRow.getCell(i);
        cell.font = { italic: true };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF0F0F0" },
        };
    }

    // Áp dụng màu đỏ cho * (required) và ! (unique)
    for (let i = 1; i <= fieldKeys.length; i++) {
        const fieldKey = fieldKeys[i - 1];
        const cell = displayRow.getCell(i);
        const text = String(cell.value || "");

        const hasRequired = requiredColumns.includes(fieldKey!);
        const hasUnique = uniqueColumns.includes(fieldKey!);

        if (hasRequired || hasUnique) {
            const baseText = headerMappings[fieldKey!] || fieldKey;

            const richText: any[] = [
                { text: baseText, font: { bold: true } },
            ];

            if (hasRequired) {
                richText.push({
                    text: " *",
                    font: { bold: true, color: { argb: "FFFF0000" } },
                });
            }
            if (hasUnique) {
                richText.push({
                    text: " !",
                    font: { bold: true, color: { argb: "FFFF6600" } }, // đỏ cam nhẹ hơn để phân biệt
                });
            }

            cell.value = { richText };
        }
    }

    return props.workbook;
}
async function download(props: {
    workbook: Workbook;
    name: string;
}) {
    const buffer = await props.workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, props.name);
}

function normalizeDate(input?: string): string | undefined {
    if (!input) return undefined;

    // Nếu Excel gửi về kiểu số serial (ví dụ 45245 = ngày)
    if (!isNaN(Number(input))) {
        const excelEpoch = dayjs("1899-12-30").add(Number(input), "day");
        return excelEpoch.format("YYYY-MM-DDTHH:mm:ss");
    }

    for (const pattern of DATE_PATTERNS) {
        const parsed = dayjs(input, pattern, true); // strict mode
        if (parsed.isValid()) {
            return parsed.format("YYYY-MM-DDTHH:mm:ss");
        }
    }

    const autoParsed = dayjs(input);
    if (autoParsed.isValid()) {
        return autoParsed.format("YYYY-MM-DDTHH:mm:ss");
    }
    console.warn("Không parse được ngày:", input);
    return undefined;
}
function handleExport<T>(
    data: T[],
    exportConfig: IExportConfig<T>,
    fileName: string
) {
    // Process data with formatting functions
    const processedData = data.map((row) => {
        const newRow: any = {};
        exportConfig.fields.forEach(({ fieldName, formatFunction }) => {
            const value = row[fieldName];
            newRow[fieldName] = formatFunction ? formatFunction(value, row) : value;
        });
        return newRow;
    });

    // Map headers to new labels
    const headers: { [key: string]: string } = {};
    exportConfig.fields.forEach(({ fieldName, header }) => {
        headers[fieldName as string] = header;
    });

    // Create a worksheet
    const worksheet = utils.json_to_sheet(processedData);

    // Rename headers in the worksheet
    const headerRow = exportConfig.fields.map(({ fieldName }) => headers[fieldName as string]);
    utils.sheet_add_aoa(worksheet, [headerRow], { origin: "A1" });

    // Export worksheet as an Excel file
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Exported Data");
    writeFile(workbook, `${fileName}.xlsx`);
}

interface AddEnumSheetProps<T> extends SafeOmitType<AddSheetProps<T>, "config" | "data"> {
    enumObject: Record<string, any>;
    labelMapping?: Record<string, string>; // thêm phần này để map label
}

/**
 * Tạo sheet từ enum: 2 cột name / value, trong đó name lấy từ label nếu có
 */
function addEnumSheet<T extends Record<string, any>>({
    workbook,
    sheetName,
    enumObject,
    labelMapping
}: AddEnumSheetProps<T>) {
    const enumEntries = Object.entries(enumObject)
        .filter(([key]) => isNaN(Number(key))); // lấy key string

    const data = enumEntries.map(([name, value]) => {
        const display = labelMapping?.[name]
            ?? labelMapping?.[value]
            ?? name;
        return {
            name: display,
            value,
        };
    }) as unknown as T[];

    return addSheet({
        workbook,
        sheetName,
        data,
        config: [
            { fieldKey: "name", fieldName: "Tên" },
            { fieldKey: "value", fieldName: "Giá trị" }
        ]
    });
}

export const excelUtils = {
    addSheet,
    addEnumSheet,
    download,
    normalizeDate,
    handleExport
}

function isObjectPath(path: string): boolean {
    // true nếu không chứa số hoặc ký tự đặc biệt (ngoài chấm ngăn cách field)
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*(\.[a-zA-Z_$][a-zA-Z0-9_$]*)+$/.test(path);
}

function getValueByPath(obj: any, path: string): any {
    if (isObjectPath(path)) {
        return path.split(".").reduce((acc, key) => acc?.[key], obj);
    }
    return obj?.[path];
}




// Các pattern phổ biến mà Excel/web có thể trả về
const DATE_PATTERNS = [
    "DD/MM/YYYY",
    "D/M/YYYY",
    "DD-MM-YYYY",
    "D-M-YYYY",
    "DD.MM.YYYY",
    "D.M.YYYY",
    "YYYY-MM-DD",
    "YYYY/MM/DD",
    "MMM D, YYYY",
    "MMMM D, YYYY",
    "DD MMM YYYY",
    "DD-MMM-YYYY",
    "YYYYMMDD",

    // Date + Time
    "DD/MM/YYYY HH:mm",
    "DD-MM-YYYY HH:mm",
    "YYYY-MM-DD HH:mm",
    "DD MMM YYYY HH:mm",
    "MMM D, YYYY h:mm A",
    "YYYY-MM-DDTHH:mm:ss", // ISO
];

