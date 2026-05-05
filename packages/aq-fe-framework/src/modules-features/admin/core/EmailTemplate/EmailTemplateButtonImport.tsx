
import { emailTemplateService } from "@/APIs/emailTemplateService";
import { ModalImportId, MyButton, MyModalImport } from "@/core";
import { useMyReactMutation } from "@/hooks";
import { IEmailTemplate } from "@/interfaces/IEmailTemplate";
import { IUtils_Excel_ColumnConfig, utils_excel_download, utils_excel_exportExcel } from "@/utils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";


type emailTemplateEnum = {
  emailTemplateEnum: Record<number, string>;
};

// Cấu hình các trường dữ liệu cho file import
const config: IUtils_Excel_ColumnConfig<IEmailTemplate>[] = [
  {
    fieldKey: "name",
    fieldName: "Tiêu đề thông báo",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã mẫu thông báo",
    isRequired: true,
  },
  {
    fieldKey: "type",
    fieldName: "Loại hành động",
    isRequired: true,
  },
];

const config2: IUtils_Excel_ColumnConfig<{
  id: number;
  name: string;
}>[] = [
    {
      fieldKey: "id",
      fieldName: "Id loại hành động",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên loại hành động",
      isRequired: true,
    },
  ];

export default function EmailTemplateButtonImport({ emailTemplateEnum }: emailTemplateEnum) {
  const importMutation = useMyReactMutation({
    axiosFn: (body: IEmailTemplate[]) => emailTemplateService.createOrUpdateList(body),
    mutationType: "import",
  });

  const stack = useModalsStack<ModalImportId>([]);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();

    // Tạo file mẫu với các trường theo cấu hình
    await utils_excel_exportExcel<IEmailTemplate>({
      workbook: workbook,
      sheetName: "Mẫu thông báo email",
      data: [],
      config: config,
    });

    await utils_excel_exportExcel<{ id: number; name: string }>({
      workbook: workbook,
      sheetName: "Danh sách loại hành dộng",
      data: Object.entries(emailTemplateEnum)
        .filter((entry): entry is [string, string] => !isNaN(Number(entry[1])))
        .map(([name, id]) => ({
          id: Number(id),
          name: name,
        })),
      config: config2,
    });

    // Tải xuống file mẫu
    utils_excel_download({
      name: "mau_importMauEmailThongBao",
      workbook,
    });
  };

  return (
    <>
      <MyModalImport
        fieldDefinition={config.map((item) => ({
          key: item.fieldKey,
          label: item.fieldName,
        }))}
        onExportStructure={handleExport}
        stack={stack}
        onExecute={(finalValues: IEmailTemplate[]) => {
          // Thêm giá trị mặc định nếu cần
          finalValues = finalValues.map((value) => ({
            ...value,
            aqModuleId: value.aqModuleId || 1,
            order: value.order || 1,
          }));

          // Tiến hành import
          importMutation.mutate(finalValues, {
            onSuccess: () => {
              stack.closeAll();
            },
          });
        }}
      />
      <MyButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
    </>
  );
}
