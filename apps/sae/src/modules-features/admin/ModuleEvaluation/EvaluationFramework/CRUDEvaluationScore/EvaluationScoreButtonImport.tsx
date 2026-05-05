import { service_standard } from "@/api/services/service_standard";
import { Standard } from "@/interfaces/standard";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<Standard>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã nhóm",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên nhóm",
    isRequired: true,
  },
  {
    fieldKey: "maxPoint",
    fieldName: "Giới hạn điểm tối đa",
    isRequired: true,
  },
  {
    fieldKey: "note",
    fieldName: "Ghi chú",
    isRequired: false,
  },
];

export default function EvaluationScoreButtonImport() {
  const importMutation = useCustomReactMutation({
    axiosFn: (body: Standard[]) => service_standard.createOrUpdateList(body),
    mutationType: "import", // Setting ở đây sẽ tự notification nếu import thành công
  });
  const stack = useModalsStack<ModalImportId>([]);
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<Standard>({
      workbook: workbook,
      sheetName: "Khung điểm đánh giá",
      data: [],
      config: config,
    });
    excelUtils.download({
      name: "KhungDiemDanhGia",
      workbook,
    });
  };

  const { data: existingData = [] } = useCustomReactQuery({
    queryKey: ["EvaluationScoreButtonCreate_Create_Standard_GetAll"],
    axiosFn: () => service_standard.getAll(),
  });

  return (
    <>
      <MyModalImport
        fieldDefinition={config.map((item) => ({
          key: item.fieldKey,
          label: item.fieldName,
        }))}
        onExportStructure={handleExport}
        stack={stack}
        onExecute={(finalValues: Standard[]) => {
          const currentTotal = existingData.reduce(
            (sum, item) => sum + (item.maxPoint || 0),
            0
          );

          const importPoint = finalValues.reduce(
            (sum, item) => sum + (item.maxPoint || 0),
            0
          );

          if (currentTotal + importPoint > 100) {
            return utils_notification_show({
              crudType: "error",
              message: "Tổng điểm vượt quá 100",
            });
          }
          importMutation.mutate(finalValues, {
            onSuccess: () => {
              // Tắt modal sau khi import thành công
              stack.closeAll();
            },
          });
        }}
      />
      <CustomButton
        actionType="import"
        onClick={() => stack.open("FileImportConfig")}
      />
    </>
  );
}
