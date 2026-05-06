import { Box, Table } from "@mantine/core";
import { MRT_RowData } from "mantine-react-table";
import { CustomHtmlWrapper } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCheckbox } from "@aq-fe/aq-legacy-framework/shared/components/input/CustomCheckbox";
import { CustomButtonPrintPDF } from "./CustomButtonPrintPDF";
interface FieldConfig {
  fieldName: string; // Field name in the data
  header: string; // Header name for the print
  isCenter?: boolean; // Optional flag to center align content, default is true
  formatFunction?: (value: any, row: any) => any; // Optional formatting function
}

interface PrintConfig {
  fields: FieldConfig[]; // Array of field configurations
  title?: string; // Optional title for the printed table
  showRowNumbers?: boolean; // Optional flag to show row numbers
}

interface AQButtonPrintTableProps<TData extends MRT_RowData = any> extends React.ComponentPropsWithoutRef<typeof CustomButtonPrintPDF> {
  printConfig?: PrintConfig; // Optional print configuration
  objectName?: string; // Name of the file to print
  data?: TData[]; // Data to print
}

export function CustomButtonPrintTablePDF<TData extends MRT_RowData = any>({
  printConfig,
  data,
  ...rest
}: AQButtonPrintTableProps<TData>) {
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Hàm format giá trị theo kiểu dữ liệu
  const formatValue = (value: any): string => {
    if (value === undefined || value === null) {
      return '';
    }

    // Xử lý định dạng ngày tháng
    if (value instanceof Date) {
      return formatDate(value);
    }

    // Xử lý các kiểu dữ liệu khác
    return String(value);
  };

  const rows = data?.map((item, index) => {
    if (!printConfig?.fields) return null;

    return (
      <Table.Tr key={index}>
        {printConfig.showRowNumbers && (
          <Table.Td ta="center" px="xs" style={{ border: "1px solid lightgray" }}>
            {index + 1}
          </Table.Td>
        )}
        {printConfig.fields.map((field) => {
          let value = item[field.fieldName];

          if (field.formatFunction) {
            value = field.formatFunction(value, item);
          } else {
            value = formatValue(value);
          }

          const alignment = field.isCenter === false ? "left" : "center";

          // Xử lý giá trị HTML
          if (typeof value === 'string' && (value.includes('<') || value.includes('&lt;'))) {
            return (
              <Table.Td
                key={field.fieldName}
                px="xs"
                ta={alignment}
                style={{ border: "1px solid lightgray" }}
              >
                <CustomHtmlWrapper html={value} />
              </Table.Td>
            );
          }

          // Xử lý giá trị boolean
          if (value === 'true' || value === 'false') {
            return (
              <Table.Td
                key={field.fieldName}
                ta={alignment}
                px="xs"
                style={{ border: "1px solid lightgray" }}
              >
                <CustomCheckbox type="checkbox" checked={value === 'true'} readOnly />
              </Table.Td>
            );
          }

          return (
            <Table.Td
              key={field.fieldName}
              ta={alignment}
              px="xs"
              style={{ border: "1px solid lightgray" }}
            >
              {value}
            </Table.Td>
          );
        })}
      </Table.Tr>
    );
  });

  const renderContent = () => {
    if (!data || !printConfig?.fields) return null;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const tableTitle = printConfig?.title || "Bảng dữ liệu";

    return (
      <Box p="lg" >
        <div style={{ textAlign: 'center', marginTop: '10px', fontStyle: 'italic', color: '#666' }}>
          Ngày in: {formattedDate}
        </div>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          {tableTitle}
        </h2>
        <Table withColumnBorders highlightOnHover style={{ border: "1px solid lightgray" }}>
          <Table.Thead>
            <Table.Tr>
              {printConfig.showRowNumbers && (
                <Table.Th style={{ border: "1px solid lightgray" }} w="10%" ta="center" px="xs">
                  STT
                </Table.Th>
              )}
              {printConfig.fields.map((field) => {
                const alignment = field.isCenter === false ? "left" : "center";
                return (
                  <Table.Th
                    key={field.fieldName}
                    style={{ border: "1px solid lightgray" }}
                    ta={alignment}
                    px="xs"
                  >
                    {field.header}
                  </Table.Th>
                );
              })}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
      </Box>
    );
  };
  return (
    <CustomButtonPrintPDF
      {...rest}
    >
      {renderContent()}
    </CustomButtonPrintPDF>
  );
}

