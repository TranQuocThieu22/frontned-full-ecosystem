import { COESubjectByTrainingProgram } from '@/interfaces/shared-interfaces/COESubjectByTrainingProgram';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default async function useF_COETrainingProgramDetail_Update(chosenOne: COESubjectByTrainingProgram) {
  const updatedSubject: COESubjectByTrainingProgram = {
    "id": chosenOne.id,
    "code": chosenOne.code,
    "name": chosenOne.name,
    "concurrencyStamp": chosenOne.concurrencyStamp,
    "isEnabled": chosenOne.isEnabled,
    "coeGradeId": chosenOne.coeGradeId,
    "coeSubjectId": chosenOne.coeSubjectId,
    "coeSemesterId": chosenOne.coeSemesterId,
    "coeSubjectGroupId": chosenOne.coeSubjectGroupId,
    "order": chosenOne.order,
  };
  const handleUpdate = await baseAxios.post(`/COEGradeSubject/update`, updatedSubject)
  return handleUpdate;
}
