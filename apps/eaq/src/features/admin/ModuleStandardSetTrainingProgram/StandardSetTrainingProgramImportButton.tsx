import { service_EAQStandardSet } from "@/shared/APIs/service_EAQStandardSet";
import { ImportAccreditationTrainingProgramsBody, service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";

export default function StandardSetTrainingProgramImportButton() {

  const standardSetQuery = useCustomReactQuery({
    queryKey: ["StandardSetGetAll"],
    axiosFn: () => service_EAQStandardSet.getAll(),
    options: {
      enabled: false
    }
  })

  const traningProgramQuery = useCustomReactQuery({
    queryKey: ["TraningProgramGetAll"],
    axiosFn: () => service_EAQTrainingProgram.getAll(),
    options: {
      enabled: false
    }
  })

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import danh sách chương trình đào tạo kiểm định"
      onSubmit={(values) => service_EAQTrainingProgram.importAccreditationTrainingPrograms(values)}
      onPrepareWorkbook={async (workbook) => {

        const [trainingProgram, standardSet] = await Promise.all([
          traningProgramQuery.refetch(),
          standardSetQuery.refetch(),
        ]);

        excelUtils.addSheet<any>({
          workbook: workbook,
          sheetName: "Danh sách CTĐT",
          data: trainingProgram.data || [],
          config: programConfig,
        });

        excelUtils.addSheet<any>({
          workbook: workbook,
          sheetName: "Danh sách Bộ tiêu chuẩn",
          data: standardSet.data || [],
          config: standardSetConfig,
        });

      }}
    />
  );
}

const fields: FieldOption<ImportAccreditationTrainingProgramsBody>[] = [
  {
    fieldKey: "eaqTrainingProgramCode",
    fieldName: "Mã chương trình đào tạo",
    isRequired: true,
  },
  {
    fieldKey: "eaqStandardSetCode",
    fieldName: "Tên chương trình đào tạo",
    isRequired: true,
  },
  {
    fieldKey: "note",
    fieldName: "Ghi chú",
  }
];


const programConfig: IExcelColumnConfig<any>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã chương trình đào tạo",
  },
  {
    fieldKey: "name",
    fieldName: "Tên chương trình đào tạo",
  },
];

const standardSetConfig: IExcelColumnConfig<any>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã bộ tiêu chuẩn",
  },
  {
    fieldKey: "name",
    fieldName: "Tên bộ tiêu chuẩn",
  }
];
