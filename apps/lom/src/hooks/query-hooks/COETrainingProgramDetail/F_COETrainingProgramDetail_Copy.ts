import { COESubjectByTrainingProgram } from '@/interfaces/shared-interfaces/COESubjectByTrainingProgram';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default async function F_COETrainingProgramDetail_Copy({ goalTrainingProgramId, sourceTrainingProgram }: { goalTrainingProgramId: number, sourceTrainingProgram: COESubjectByTrainingProgram, }) {
  const copiedSubject: COESubjectByTrainingProgram = {
    "id": goalTrainingProgramId,
    "code": sourceTrainingProgram.code,
    "name": sourceTrainingProgram.name,
    "concurrencyStamp": sourceTrainingProgram.concurrencyStamp,
    "isEnabled": sourceTrainingProgram.isEnabled,
    "coeGradeId": sourceTrainingProgram.coeGradeId,
    "coeSubjectId": sourceTrainingProgram.coeSubjectId,
    "coeSemesterId": sourceTrainingProgram.coeSemesterId,
    "coeSubjectGroupId": sourceTrainingProgram.coeSubjectGroupId,
    "order": sourceTrainingProgram.order,
  };
  const res = await baseAxios.post(`/COEGradeSubject/create`, copiedSubject)
  return res;
}
