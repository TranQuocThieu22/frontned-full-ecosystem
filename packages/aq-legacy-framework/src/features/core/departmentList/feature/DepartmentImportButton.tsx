import { departmentService } from "@aq-fe/aq-legacy-framework/shared/APIs/departmentService";
import { CustomButtonImport } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { Department } from "@aq-fe/aq-legacy-framework/shared/interfaces/Department";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/aq-legacy-framework/shared/utils/excelUtils";
import { Workbook } from "exceljs";

const type: Record<number, string> = {
  1: "Khoa",
  2: "Bộ môn",
  3: "Phòng",
  4: "Trung tâm",
};

export default function DepartmentImportButton() {
  const unitsQuery = useLegacyReactQuery({
    queryKey: ["Unit_DepartmentImportButton"],
    axiosFn: () => departmentService.getAll(),
  });

  const fields: FieldOption<Department>[] = [
    {
      fieldKey: "code",
      fieldName: "Mã đơn vị",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên đơn vị",
      isRequired: true,
    },
    {
      fieldKey: "type",
      fieldName: "Loại đơn vị",
      isRequired: false,
      parseType: "number",
    },
    {
      fieldKey: "unitId",
      fieldName: "ID trực thuộc",
      isRequired: false,
      parseType: "number",
    },
    {
      fieldKey: "note",
      fieldName: "Ghi chú",
      isRequired: false,
    },
    {
      fieldKey: "isWorkingUnit",
      fieldName: "Là đơn vị ngoài trường (1 = true / 0 = false)",
      isRequired: false,
      parseType: "boolean",
    },
  ];

  const getDepartmentTypeData = () => {
    return Object.entries(type).map(([key, label]) => ({
      id: Number(key),
      name: label,
    }));
  };

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu danh sách đơn vị"
      onPrepareWorkbook={async (workbook: Workbook) => {
        const typeConfig: IExcelColumnConfig<{
          id: number;
          name: string;
        }>[] = [
            {
              fieldKey: "id",
              fieldName: "Id loại đơn vị",
              isRequired: true,
            },
            {
              fieldKey: "name",
              fieldName: "Tên loại đơn vị",
              isRequired: true,
            },
          ];

        const unitConfig: IExcelColumnConfig<{
          value: string;
          label: string;
        }>[] = [
            {
              fieldKey: "value",
              fieldName: "Id trực thuộc",
              isRequired: true,
            },
            {
              fieldKey: "label",
              fieldName: "Tên trực thuộc",
              isRequired: true,
            },
          ];

        await excelUtils.addSheet<{ id: number; name: string }>({
          workbook: workbook,
          sheetName: "Danh sách loại đơn vị",
          data: getDepartmentTypeData(),
          config: typeConfig,
        });

        await excelUtils.addSheet<{
          value: string;
          label: string;
        }>({
          workbook: workbook,
          sheetName: "Danh sách trực thuộc",
          data:
            unitsQuery?.data?.map((item) => ({
              value: item.id?.toString() ?? "",
              label: item.name ?? "",
            })) ?? [],
          config: unitConfig,
        });
      }}
      onSubmit={async (values: Department[]) => {
        const transformedData = values.map((value) => ({
          ...value,
          code: value.code?.toString() ?? "",
          name: value.name?.toString() ?? "",
          type: value.type ? Number(value.type) : undefined,
          unitId: value.unitId ? Number(value.unitId) : undefined,
          note: value.note?.toString() ?? "",
          isWorkingUnit: !value.isWorkingUnit,
        }));

        return await departmentService.createOrUpdateList(transformedData);
      }}
    />
  );
}
