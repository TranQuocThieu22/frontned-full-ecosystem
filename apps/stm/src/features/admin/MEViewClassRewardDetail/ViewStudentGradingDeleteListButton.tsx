"use client";

import { CustomButtonDeleteList as MyButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { I_StudentRewardDetail } from "./interfaces";


export default function ViewStudentGradingDeleteListButton({
  values,
}: {
  values: I_StudentRewardDetail[];
}) {
  return (
    <MyButtonDeleteList
      actionIconProps={{
        disabled: values.length === 0
      }}
      contextData={values.map((item) => item.code).join(", ")}
      onSubmit={() => { }}
    />
  );
}