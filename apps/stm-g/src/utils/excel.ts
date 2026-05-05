import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function utils_excel_exportExcel<T extends Record<string, any>>({
    dataSheets,
    headerMappings = {},
    markedColumns = []
}: {
    dataSheets: { name: string, data?: T[] }[],
    headerMappings?: { [K in keyof T]?: string },
    markedColumns?: Array<keyof T>
}) {
    const workbook = new ExcelJS.Workbook();

    // Loop through each dataSheet to create worksheets
    dataSheets.forEach(dataSheet => {
        const { name, data = [] } = dataSheet;
        const sheet = workbook.addWorksheet(name);

        // Extract column headers - use headerMappings keys if data is empty
        let fieldNames: string[] = [];

        if (data.length > 0) {
            // If we have data, get fields from the first item
            fieldNames = Object.keys(data[0]!);
        } else if (Object.keys(headerMappings).length > 0) {
            // If no data but we have headerMappings, use those keys
            fieldNames = Object.keys(headerMappings);
        } else {
            // No data and no headerMappings, nothing to do
            return;
        }

        // Create columns configuration
        const columns = fieldNames.map(fieldName => {
            return {
                key: fieldName,
                width: 20
            };
        });

        sheet.columns = columns;

        // Create first row with display names (values from headerMappings)
        const displayRow = sheet.addRow(
            fieldNames.map(fieldName => {
                // Get display name from headerMappings or use field name if not found
                const displayName = headerMappings[fieldName] || fieldName;
                // Add a red asterisk to marked columns
                return markedColumns.includes(fieldName) ? `${displayName} *` : displayName;
            })
        );

        // Create second row with field names (keys)
        const keyRow = sheet.addRow(fieldNames);

        // Add data rows starting from the third row (if any)
        data.forEach(item => {
            sheet.addRow(item);
        });

        // Style the first row (display names) - only for columns with data
        for (let i = 1; i <= fieldNames.length; i++) {
            const cell = displayRow.getCell(i);
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }  // Light gray background
            };
        }

        // Style the second row (field names) - only for columns with data
        for (let i = 1; i <= fieldNames.length; i++) {
            const cell = keyRow.getCell(i);
            cell.font = { italic: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF0F0F0' }  // Lighter gray background
            };
        }

        // Apply red color to asterisks in header cells
        if (markedColumns.length > 0) {
            for (let i = 1; i <= fieldNames.length; i++) {
                const cell = displayRow.getCell(i);
                const text = cell.value;

                if (typeof text === 'string' && text.endsWith(' *')) {
                    // Use rich text to apply red color only to the asterisk
                    cell.value = {
                        richText: [
                            {
                                text: text.substring(0, text.length - 2),
                                font: { bold: true }
                            },
                            {
                                text: ' *',
                                font: { bold: true, color: { argb: 'FFFF0000' } }  // Red color
                            }
                        ]
                    };
                }
            }
        }
    });

    // Generate and download the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Use the first sheet name or "Export" as default filename
    const fileName = dataSheets.length > 0 && dataSheets[0]?.name ? `${dataSheets[0]?.name}.xlsx` : "Export.xlsx";
    saveAs(blob, fileName);
}