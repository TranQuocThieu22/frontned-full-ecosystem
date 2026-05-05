"use client";

import { publicationService } from "@/shared/APIs/publicationService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumLabelMeasurementUnit, EnumMeasurementUnit } from "@/shared/consts/enum/EnumMeasurementUnit";
import { SRMPublicationType } from "@/shared/interfaces/SRMPublicationType";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<SRMPublicationType>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã loại công bố",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên loại công bố",
    isRequired: true,
  },
  {
    fieldKey: "srmPublicationId",
    fieldName: "ID nhóm công bố",
    isRequired: true,
  },
  {
    fieldKey: "measurementUnit",
    fieldName: "ID đơn vị tính",
    isRequired: true,
  },
  {
    fieldKey: "convertedHour",
    fieldName: "Số giờ quy đổi",
  },
  {
    fieldKey: "convertedScore",
    fieldName: "Số điểm quy đổi",
  },
  {
    fieldKey: "note",
    fieldName: "Ghi chú",
  },
  {
    fieldKey: "isDeactivate",
    fieldName: "Không sử dụng",
  }
];

const config2: IExcelColumnConfig<{ value: string, code: string, label: string }>[] = [
  {
    fieldKey: "value",
    fieldName: "ID nhóm công bố",
  },
  {
    fieldKey: "code",
    fieldName: "Mã nhóm công bố",
  },
  {
    fieldKey: "label",
    fieldName: "Tên nhóm công bố",
  },
];

const measurementUnitConfig: IExcelColumnConfig<{ label: string, value: string }>[] = [
  {
    fieldKey: "value",
    fieldName: "ID đơn vị tính",
  },
  {
    fieldKey: "label",
    fieldName: "Tên đơn vị tính",
  },
];

export default function PublicationTypeListImport() {
  const importMutation = useCustomReactMutation({
    axiosFn: (body: SRMPublicationType[]) => {
      return publicationTypeService.createOrUpdateList(body.map((item) => ({
        ...item,
        code: item.code?.toString(),
        name: item.name?.toString(),
        note: item.note?.toString(),
        isDeactivate: !!item.isDeactivate,
        srmPublicationId: Number(item.srmPublicationId),
        measurementUnit: Number(item.measurementUnit),
        convertedHour: item.convertedHour ? Number(item.convertedHour) : undefined,
        convertedScore: item.convertedScore ? Number(item.convertedScore) : undefined,
      })));
    },
    mutationType: "import",
  });

  const publicationQuery = useCustomReactQuery({
    queryKey: ["PublicationListImport"],
    axiosFn: () => publicationService.getAll({}),
  });

  const stack = useModalsStack<ModalImportId>([]);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<SRMPublicationType>({
      workbook: workbook,
      sheetName: "Danh mục loại công bố",
      data: [],
      config: config,
    });
    await excelUtils.addSheet<{ value: string, code: string, label: string }>({
      workbook: workbook,
      sheetName: "Nhóm công bố",
      data: publicationQuery.data?.map(item => ({
        value: item.id!.toString(),
        code: item?.code || "",
        label: item?.name || "",
      })) || [],
      config: config2,
    });
    await excelUtils.addSheet<{ label: string, value: string }>({
      workbook: workbook,
      sheetName: "Đơn vị tính",
      data: converterUtils.mapEnumToSelectData(EnumMeasurementUnit, EnumLabelMeasurementUnit),
      config: measurementUnitConfig,
    });
    excelUtils.download({ name: "Mẫu import danh mục loại công bố", workbook });
  };

  return (
    <>
      <MyModalImport
        fieldDefinition={config.map((item) => ({
          key: item.fieldKey,
          label: item.fieldName,
          isRequired: item.isRequired,
        }))}
        stack={stack}
        onExportStructure={handleExport}
        onExecute={(finalValues: SRMPublicationType[]) => {
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
