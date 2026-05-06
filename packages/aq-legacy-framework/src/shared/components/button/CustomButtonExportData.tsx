import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton";
import { ButtonProps } from "@mantine/core";
import { utils, writeFile } from "xlsx";

interface FieldConfig {
    fieldName: string; // Field name in the data
    header: string; // Header name for the export
    formatFunction?: (value: any, row: any) => any; // Optional formatting function
}

interface ExportConfig {
    fields: FieldConfig[]; // Array of field configurations
}

interface CustomButtonExportDataProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ButtonProps {
    objectName: string;
    data: any[];
    exportConfig: ExportConfig;
}

export function CustomButtonExportData({
    objectName,
    data,
    exportConfig,
    ...rest
}: CustomButtonExportDataProps) {
    const handleExport = () => {
        // Process data with formatting functions
        const processedData = data.map((row) => {
            const newRow: any = {};
            exportConfig.fields.forEach(({ fieldName, formatFunction }) => {
                newRow[fieldName] = formatFunction ? formatFunction(row[fieldName], row) : row[fieldName];
            });
            return newRow;
        });

        // Map headers to new labels
        const headers: { [key: string]: string } = {};
        exportConfig.fields.forEach(({ fieldName, header }) => {
            headers[fieldName] = header;
        });

        // Create a worksheet
        const worksheet = utils.json_to_sheet(processedData);

        // Rename headers in the worksheet
        const headerRow = exportConfig.fields.map(({ fieldName }) => headers[fieldName]);
        utils.sheet_add_aoa(worksheet, [headerRow], { origin: "A1" });

        // Export worksheet as an Excel file
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Exported Data");

        // Trigger the download
        writeFile(workbook, `${objectName}.xlsx`);
    };

    return (
        <CustomButton
            // isCheckPermission={false}
            disabled={data.length === 0}
            actionType="export"
            onClick={(event) => {
                event.preventDefault();
                handleExport();
            }}
            {...rest}
        >
            {/* {isAllData ? "Xuất toàn bộ dữ liệu" : "Xuất dữ liệu được chọn"} */}
            {"Export"}
        </CustomButton>
    );
}

