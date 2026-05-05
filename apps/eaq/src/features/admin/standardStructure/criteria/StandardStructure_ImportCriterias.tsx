"use client";

import { service_EAQCriteria } from "@/shared/APIs/service_EAQCriteria";
import { service_EAQStandard } from "@/shared/APIs/service_EAQStandard";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import { IStandard } from "@/shared/interfaces/standard/Standard";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  excelUtils,
  IExcelColumnConfig,
} from "@aq-fe/core-ui/shared/utils/excelUtils";

const config: IExcelColumnConfig<IStandard>[] = [
  {
    fieldKey: "id",
    fieldName: "Id",
  },
  {
    fieldKey: "code",
    fieldName: "Mã",
  },
  {
    fieldKey: "name",
    fieldName: "Tên",
  },
];

export default function StandardStructure_ImportCriterias() {
  const standardSetStore = useS_Shared_Filter();

  const standardQuery = useCustomReactQuery({
    queryKey: [
      "standardQuery",
      "GetAllByEAQStandardId",
      standardSetStore.state.StandardSet?.id,
    ],
    axiosFn: () =>
      service_EAQStandard.GetAllByEAQStandardSetId({
        eaqStandardSetId: standardSetStore.state.StandardSet?.id,
      }),
    options: {
      enabled: !!standardSetStore.state.StandardSet,
    },
  });

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import Tiêu chí"
      onSubmit={async (value) => {
        const formattedValue = value.map((item) => ({
          ...item,
          eaqStandardId: standardQuery?.data?.find((standard) => standard.code === item.eaqStandardCode)?.id
        }));
        const payload = formattedValue.map(({ eaqStandardCode, ...rest }) => rest);
        return service_EAQCriteria.createOrUpdateList(payload);
      }}
      onPrepareWorkbook={async (workbook) => {
        excelUtils.addSheet<IStandard>({
          workbook: workbook,
          sheetName: "Danh sách tiêu chuẩn",
          data: standardQuery.data || [],
          config: config,
        });
      }}
    />
  );
}

const fields: FieldOption<ICriteria>[] = [
  {
    fieldKey: "eaqStandardCode",
    fieldName: "Mã tiêu chuẩn",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã tiêu chí",
    isRequired: true,
    isUnique: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên tiêu chí",
    isRequired: true,
  },
  {
    fieldKey: "englishName",
    fieldName: "Tên tiêu chí Eg",
    isRequired: false,
  },
  {
    fieldKey: "evidence",
    fieldName: "Minh chứng gợi ý",
    isRequired: false,
  },
  {
    fieldKey: "note",
    fieldName: "Ghi chú",
    isRequired: false,
  },
];
