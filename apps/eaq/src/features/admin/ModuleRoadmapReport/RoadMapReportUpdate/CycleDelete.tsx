
'use client';

import { Cycle } from '@/shared/interfaces/cycle/Cycle';
import { service_EAQTrainingProgram } from '@/shared/APIs/service_EAQTrainingProgram';
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  data: Cycle,
  resetRowSelection: Function,
}
export default function CycleDelete({ data, resetRowSelection }: Props) {
  return (
    <CustomActionIconDelete
      contextData={data.code}
      onSubmit={async () => {
        resetRowSelection();
        return await service_EAQTrainingProgram.DeleteListCycle([{ id: data.id }]);
      }}
    />
  );
}
