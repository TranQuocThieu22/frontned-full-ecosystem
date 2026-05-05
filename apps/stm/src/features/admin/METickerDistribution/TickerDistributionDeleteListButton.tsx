"use client";

import { CustomButtonDeleteList as MyButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { I_TickerDistribution } from "./interfaces";


export default function TickerDistributionDeleteListButton({
  values,
}: {
  values: I_TickerDistribution[];
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