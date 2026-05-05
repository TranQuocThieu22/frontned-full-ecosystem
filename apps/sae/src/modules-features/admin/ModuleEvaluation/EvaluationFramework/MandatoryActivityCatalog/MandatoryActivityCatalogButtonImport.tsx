import { service_department } from "@/api/services/service_department";
import { service_event } from "@/api/services/service_event";
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { service_standard } from "@/api/services/service_standard";
import { Standard } from "@/interfaces/standard";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<Standard>[] = [
  {
    fieldKey: "standardId",
    fieldName: "Id Điều",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "host",
    fieldName: "Id đơn vị tổ chức",
    isRequired: true,
  },
  {
    fieldKey: "reviewedBy",
    fieldName: "Id đơn vị ghi nhận",
    isRequired: true,
  },
  {
    fieldKey: "completedBy",
    fieldName: "Id đơn vị công nhận",
    isRequired: true,
  },
  {
    fieldKey: "minPoint",
    fieldName: "Điểm tối thiểu",
    isRequired: true,
  },
  {
    fieldKey: "maxPoint",
    fieldName: "Điểm tối đa",
    isRequired: true,
  },
];

const config2: IExcelColumnConfig<{
  value: string;
  label: string;
  name: string;
}>[] = [
    {
      fieldKey: "value",
      fieldName: "Id",
      isRequired: true,
    },
    {
      fieldKey: "label",
      fieldName: "Mã",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên",
      isRequired: true,
    },
  ];

export default function MandatoryActivityCatalogButtonImport() {
  const standardQuery = useCustomReactQuery({
    queryKey: ["MandatoryActivityCatalogTable_Standard_GetAll"],
    axiosFn: () => service_standard.getAll(),
  });

  // Đơn vị ghi nhận và đơn vị công nhận
  const departmentGetWorkingUnitQuery = useCustomReactQuery({
    queryKey: ["getWorkingUnit"],
    axiosFn: () => service_department.getWorkingUnit(),
  });

  // Đơn vị tổ chức
  const departmentOnlyQuery = useCustomReactQuery({
    queryKey: ["getDepartmentOnly"],
    axiosFn: () => service_department.getDepartmentOnly(),
  });

  const importMutation = useCustomReactMutation({
    axiosFn: async (body: Standard[]) => {
      const promises = body.map((item) => {
        return service_event.createEventRequired(item);
      });
      const results = await Promise.all(promises);
      const length = results[results.length - 1];
      if (!length) {
        throw new Error("Import failed");
      } else {
        return length;
      }
    },
    mutationType: "import", // Setting ở đây sẽ tự notification nếu import thành công
  });
  const stack = useModalsStack<ModalImportId>([]);
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<Standard>({
      workbook: workbook,
      sheetName: "Hoạt động bắt buộc",
      data: [],
      config: config,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Danh sách điều",
      data:
        standardQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Đơn vị tổ chức",
      data:
        departmentOnlyQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Đơn vị ghi nhận",
      data:
        departmentGetWorkingUnitQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Đơn vị công nhận",
      data:
        departmentGetWorkingUnitQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    excelUtils.download({
      name: "hoatDongbatBuoc",
      workbook,
    });
  };

  const eventGroupQuery = useCustomReactQuery({
    queryKey: ["eventGroupGetAll"],
    axiosFn: () => service_eventGroup.getAll(),
  });

  if (!eventGroupQuery.isSuccess) return;

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
          const newValues = finalValues.map((value) => {
            return {
              ...value,
              eventGroupId: eventGroupQuery.data[0]?.id,
              isRequired: true,
            };
          });

          importMutation.mutate(newValues, {
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
