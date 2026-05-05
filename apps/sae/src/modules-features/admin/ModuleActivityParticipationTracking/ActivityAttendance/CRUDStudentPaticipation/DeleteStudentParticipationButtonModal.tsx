import { service_studentsActivityParticipation } from "@/api/services/service_studentsActivityParticipation";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function DeleteStudentParticipationButtonModal({ id, code }: { id: number, code: string }) {
  return (
    <CustomActionIconDelete contextData={code} onSubmit={() => {
      service_studentsActivityParticipation.delete(id);
    }} />
  );
}
