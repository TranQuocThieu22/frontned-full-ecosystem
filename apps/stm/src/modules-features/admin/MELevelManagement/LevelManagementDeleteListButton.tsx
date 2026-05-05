"use client";

import { MyButtonDeleteList } from "aq-fe-framework/components";
import { I_Level } from "./interfaces";


export default function LevelManagementDeleteListButton({
  values,
}: {
  values: I_Level[];
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