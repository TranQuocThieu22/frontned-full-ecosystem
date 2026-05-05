"use client";
import { service_EAQCriteria } from "@/shared/APIs/service_EAQCriteria";
import { service_EAQRequirement } from "@/shared/APIs/service_EAQRequirement";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  excelUtils,
  IExcelColumnConfig,
} from "@aq-fe/core-ui/shared/utils/excelUtils";

const config: IExcelColumnConfig<ICriteria>[] = [
  {
    fieldKey: "id",
    fieldName: "Id tiêu chí",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã tiêu chí",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên tiêu chí",
    isRequired: true,
  },
  {
    fieldKey: "eaqStandardId",
    fieldName: "Id tiêu chuẩn",
    isRequired: true,
  },
  {
    fieldKey: "eaqStandardCode",
    fieldName: "Mã tiêu chuẩn",
    isRequired: true,
  },
];

export default function StandardStructure_ImportRequirements() {
  const store = useS_Shared_Filter();
  const standardSetStore = useS_Shared_Filter();

  const criteriaQuery = useCustomReactQuery({
    queryKey: [
      "criteriaQuery",
      "GetEAQCriteriaByEAQStandardId",
      standardSetStore.state.StandardSet?.id,
    ],
    axiosFn: () =>
      service_EAQCriteria.GetEAQCriteriaByEAQStandardSetId(
        standardSetStore.state.StandardSet?.id
      ),
    options: {
      enabled: !!standardSetStore.state.StandardSet,
    },
  });

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import Yêu cầu"
      onSubmit={async (value) => {
        const formattedValue = value.map((item) => ({
          ...item,
          eaqCriteriaId: criteriaQuery?.data?.find((criteria) => criteria.code === item.eaqCriteriaCode)?.id
        }));
        const payload = formattedValue.map(({ eaqCriteriaCode, ...rest }) => rest)
        return service_EAQRequirement.createOrUpdateList(payload);
      }}
      onPrepareWorkbook={async (workbook) => {
        excelUtils.addSheet<ICriteria>({
          workbook: workbook,
          sheetName: "Danh sách tiêu chí",
          data: criteriaQuery.data || [],
          config: config,
        });
      }}
    />
  );
}

const fields: FieldOption<IRequirement>[] = [
  {
    fieldKey: "eaqCriteriaCode",
    fieldName: "Mã tiêu chí",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã yêu cầu/ mốc chuẩn",
    isRequired: true,
    isUnique: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên yêu cầu/ mốc chuẩn",
    isRequired: true,
  },
  {
    fieldKey: "description",
    fieldName: "Mô tả",
    isRequired: false,
  },
  {
    fieldKey: "note",
    fieldName: "Ghi chú",
    isRequired: false,
  },
];
