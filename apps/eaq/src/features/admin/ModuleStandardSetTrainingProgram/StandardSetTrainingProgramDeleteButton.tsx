import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  data: StandardSetTrainingProgram,
  resetRowSelection: Function,
  isLoading: boolean
}
export default function StandardSetTrainingProgramDeleteButton(
  { data, resetRowSelection, isLoading }: Props) {
  return (
    <CustomActionIconDelete
      buttonProps={{
        loading: isLoading
      }}
      contextData={data.code}
      onSubmit={async () => {
        resetRowSelection();
        return await service_EAQTrainingProgram.deleteListAccreditationTrainingPrograms([{ id: data.id }]);
      }}
    />
  );
}
