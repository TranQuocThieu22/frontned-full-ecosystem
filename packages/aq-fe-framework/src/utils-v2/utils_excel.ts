import dayjs from "dayjs";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
export interface IExcelColumnConfig<T> {
    fieldKey: keyof T | (string & {});
    fieldName: string;
    isRequired?: boolean;
    isUnique?: boolean
    formatter?: (value: any, row: T) => any;
}

function addSheet<T extends Record<string, any>>(props: {
    workbook: Workbook;
    sheetName: string;
    data: T[];
    config: IExcelColumnConfig<T>[];
}) {
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

        const hasRequired = requiredColumns.includes(fieldKey);
        const hasUnique = uniqueColumns.includes(fieldKey);

        if (hasRequired || hasUnique) {
            const baseText = headerMappings[fieldKey] || fieldKey;

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



export const utils_excel = {
    addSheet,
    download,
    normalizeDate,
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

