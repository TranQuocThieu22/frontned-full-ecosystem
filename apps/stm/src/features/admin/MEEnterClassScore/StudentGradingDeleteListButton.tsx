"use client";

import { CustomButtonDeleteList as MyButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { I_ClassStudent } from "./interfaces";


export default function StudentGradingDeleteListButton({
  values,
}: {
  values: I_ClassStudent[];
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