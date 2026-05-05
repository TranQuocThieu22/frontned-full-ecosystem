"use client";

import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { SRMAwardLevel } from "@/shared/interfaces/SRMAwardLevel";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<SRMAwardLevel>[] = [
     {
          fieldKey: "code",
          fieldName: "Mã cấp giải thưởng",
          isRequired: true,
     },
     {
          fieldKey: "name",
          fieldName: "Tên cấp giải thưởng",
          isRequired: true,
     },
     {
          fieldKey: "isDeactivate",
          fieldName: "Không sử dụng",
          isRequired: true,
     },
     {
          fieldKey: "note",
          fieldName: "Ghi chú",
     },
];

export default function SRMAwardLevelImportButton() {
     const importMutation = useCustomReactMutation({
          axiosFn: (body: SRMAwardLevel[]) => {
               return AwardLevelService.createOrUpdateList(body.map((item) => ({
                    ...item,
               })));
          },
          mutationType: "import",
     });

     const stack = useModalsStack<ModalImportId>([]);
     const handleExport = async () => {
          const workbook = new ExcelJS.Workbook();
          await excelUtils.addSheet<SRMAwardLevel>({
               workbook: workbook,
               sheetName: "Danh sách cấp giải thưởng sinh viên nghiên cứu khoa học",
               data: [],
               config: config,
          });
          excelUtils.download({ name: "Mẫu import cấp giải thưởng sinh viên nghiên cứu khoa học", workbook });
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
                    onExecute={(finalValues: SRMAwardLevel[]) => {
                         importMutation.mutate(finalValues, {
                              onSuccess: () => {
                                   stack.closeAll();
                              },
                         });
                    }}
               />
               <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
          </>
     );
}
