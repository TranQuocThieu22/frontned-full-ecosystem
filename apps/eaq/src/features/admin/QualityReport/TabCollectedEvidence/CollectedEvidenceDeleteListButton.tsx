"use client";

import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
  values: ITaskDetailEvidence[];
}

export default function CollectedEvidenceDeleteListButton({
  values,
}: Props) {

  return (
    <CustomButtonDeleteList
      count={values.length}
      buttonProps={{
        disabled: values.length === 0
      }}
      onSubmit={
        () => { }
      }
    />
  );
}
