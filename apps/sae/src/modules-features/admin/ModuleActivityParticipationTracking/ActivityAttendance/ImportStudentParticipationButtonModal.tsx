import { BodyImportParticipate, service_event } from "@/api/services/service_event";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

const config: FieldOption<BodyImportParticipate>[] = [
  { fieldName: "Mã sinh viên", fieldKey: "studentCode", isRequired: true },
  { fieldName: "Điểm", fieldKey: "point", isRequired: true, parseType: "number" },
];

export default function ImportStudentParticipationButtonModal({ eventId }: { eventId: number }) {
  return (
    <CustomButtonImport
      fields={config}
      fileName="Mẫu Import Điểm danh hoạt động"
      onSubmit={(finalValues: BodyImportParticipate[]) => {
        return service_event.importParticipate({ eventId }, finalValues) as any;
      }}
    />
  );
}
