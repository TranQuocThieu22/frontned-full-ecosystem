import { ImportCyclesBody, service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

interface Props {
  tranningProgramCode?: string
  standardSetCode?: string
}

export default function CycleImport({ tranningProgramCode, standardSetCode }: Props) {

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import Chu kỳ kiểm định"
      onSubmit={(values) => service_EAQTrainingProgram.importCycles(
        values.map((value) => ({
          ...value,
          eaqStandardSetTrainingProgramCode: tranningProgramCode,
          eaqStandardSetCode: standardSetCode
        }))
      )}
    />
  );
}

const fields: FieldOption<ImportCyclesBody>[] = [
  {
    fieldKey: "order",
    fieldName: "Thứ tự chu kỳ",
    isRequired: true,
  },
  {
    fieldKey: "startYear",
    fieldName: "Năm đánh giá",
    isRequired: true,
  },
];
