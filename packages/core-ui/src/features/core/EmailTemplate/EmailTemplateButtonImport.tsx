import { emailTemplateService } from "@aq-fe/core-ui/shared/APIs/emailTemplateService";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { EmailTemplate } from "@aq-fe/core-ui/shared/interfaces/EmailTemplate";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

type emailTemplateEnum = {
  emailTemplateEnum: Record<number, string>;
};

export default function EmailTemplateButtonImport({ emailTemplateEnum }: emailTemplateEnum) {
  const fields: FieldOption<EmailTemplate>[] = [
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
      parseType: "number",
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import Mẫu thông báo email"
      onPrepareWorkbook={async (workbook: Workbook) => {
        const referenceConfig: IExcelColumnConfig<{
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

        await excelUtils.addSheet<{ id: number; name: string }>({
          workbook: workbook,
          sheetName: "Danh sách loại hành dộng",
          data: Object.entries(emailTemplateEnum)
            .filter((entry): entry is [string, string] => !isNaN(Number(entry[1])))
            .map(([name, id]) => ({
              id: Number(id),
              name: name,
            })),
          config: referenceConfig,
        });
      }}
      onSubmit={async (values: EmailTemplate[]) => {
        const transformedData = values.map((value) => ({
          ...value,
          aqModuleId: value.aqModuleId || 1,
          order: value.order || 1,
        }));

        return await emailTemplateService.createOrUpdateList(transformedData);
      }}
    />
  );
}
