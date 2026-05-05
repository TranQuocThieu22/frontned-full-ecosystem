"use client";

import { MyButtonDeleteList } from "aq-fe-framework/components";
import { I_StudentRewardDetail } from "./interfaces";


export default function ViewStudentGradingDeleteListButton({
  values,
}: {
  values: I_StudentRewardDetail[];
}) {
  return (
    <MyButtonDeleteList
      // disabled={values.length === 0}
      contextData={values.map((item) => item.code).join(", ")}
      onSubmit={() => {}}
    />
  );
}