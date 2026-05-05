"use client";

import { MyButtonDeleteList } from "aq-fe-framework/components";
import { I_TuitionFee } from "./interfaces";


export default function FeeDeclarationDeleteListButton({
  values,
}: {
  values: I_TuitionFee[];
}) {
  return (
    <MyButtonDeleteList
      actionIconProps={{
        disabled: values.length === 0
      }}
      contextData={values.map((item) => item.code).join(", ")}
      onSubmit={() => {}}
    />
  );
}