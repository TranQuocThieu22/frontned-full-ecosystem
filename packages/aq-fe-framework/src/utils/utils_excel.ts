import ExcelJS from "exceljs";
import saveAs from "file-saver";
import { read, utils, writeFile } from "xlsx";

type FieldKey<T> = keyof T | (string & {});
/**
 * @deprecated Hàm này không xài nữa
 * Vui lòng dùng `IExcelColumnConfig` từ `utils-v2` thay thế.
 */
export interface IUtils_Excel_ColumnConfig<T> {
    fieldKey: FieldKey<T>;
    fieldName: string;
    isRequired?: boolean;
    formatter?: (value: any, row: T) => any;
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
/**
 * @deprecated Hàm này không xài nữa
 * Vui lòng dùng `utils_excel.addSheet` từ `utils-v2` thay thế.
 */
export async function utils_excel_exportExcel<T extends Record<string, any>>({
    workbook,
    sheetName,
    data,
    config,
}: {
    workbook: ExcelJS.Workbook;
    sheetName: string;
    data: T[];
    config: IUtils_Excel_ColumnConfig<T>[];
}) {
    const sheet = workbook.addWorksheet(sheetName);

    const fieldKeys: string[] = config.map((item) => String(item.fieldKey));
    const headerMappings: Record<string, string> = {};
    const markedColumns: string[] = [];

    config.forEach((item) => {
        const fieldKeyStr = String(item.fieldKey);
        headerMappings[fieldKeyStr] = item.fieldName;
        if (item.isRequired) markedColumns.push(fieldKeyStr);
    });

    sheet.columns = fieldKeys.map((fieldKey) => ({
        key: fieldKey,
        width: 20,
    }));

    const displayRow = sheet.addRow(
        fieldKeys.map((fieldKey) =>
            markedColumns.includes(fieldKey)
                ? `${headerMappings[fieldKey]} *`
                : headerMappings[fieldKey] || fieldKey
        )
    );

    const keyRow = sheet.addRow(fieldKeys);

    // build data rows
    data.forEach((row) => {
        const rowData: Record<string, any> = {};
        config.forEach(({ fieldKey, formatter }) => {
            const fieldKeyStr = String(fieldKey);
            const rawValue = getValueByPath(row, fieldKeyStr);
            rowData[fieldKeyStr] = formatter ? formatter(rawValue, row) : rawValue;
        });
        sheet.addRow(rowData);
    });

    // Style the first row (display names)
    for (let i = 1; i <= fieldKeys.length; i++) {
        const cell = displayRow.getCell(i);
        cell.font = { bold: true };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFE0E0E0" },
        };
    }

    // Style the second row (field keys)
    for (let i = 1; i <= fieldKeys.length; i++) {
        const cell = keyRow.getCell(i);
        cell.font = { italic: true };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF0F0F0" },
        };
    }

    // Apply red color to asterisks in headers
    if (markedColumns.length > 0) {
        for (let i = 1; i <= fieldKeys.length; i++) {
            const cell = displayRow.getCell(i);
            const text = cell.value;

            if (typeof text === "string" && text.endsWith(" *")) {
                cell.value = {
                    richText: [
                        {
                            text: text.slice(0, -2),
                            font: { bold: true },
                        },
                        {
                            text: " *",
                            font: { bold: true, color: { argb: "FFFF0000" } },
                        },
                    ],
                };
            }
        }
    }

    return workbook;
}
/**
 * @deprecated Hàm này không xài nữa
 * Vui lòng dùng `utils_excel.download` từ `utils-v2` thay thế.
 */
export async function utils_excel_download({
    workbook,
    name,
}: {
    workbook: ExcelJS.Workbook;
    name: string;
}) {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, name);
}



export async function utils_excel_parseToJson<TData = any>(
    file: File,
    titleIndex: number,
    dataStartIndex: number
): Promise<{ data: TData[]; headers: string[] }> {
    const buffer = await file.arrayBuffer();
    const workbook = read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const raw = utils.sheet_to_json(sheet, { header: 1 }) as any[][];

    const headers = raw[titleIndex - 1];
    const rows = raw.slice(dataStartIndex - 1);

    const data = rows.map((row) => {
        const obj: Record<string, any> = {};
        headers.forEach((header: string, i: number) => {
            obj[header] = row[i];
        });
        return obj;
    });

    return {
        data: data as TData[], // 👈 ép kiểu an toàn vì bạn biết nó đúng
        headers,
    };
}
export interface IExportConfig<T> {
    fields: {
        fieldName: keyof T,
        header: string,
        formatFunction?: (value: T[keyof T], row: T) => any;
    }[],

}

export function utils_excel_handleExport<T>(
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
