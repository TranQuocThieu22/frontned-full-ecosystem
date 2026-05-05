"use client";

import { MyButtonDeleteList } from "aq-fe-framework/components";
import { I_TickerDistribution } from "./interfaces";


export default function TickerDistributionDeleteListButton({
  values,
}: {
  values: I_TickerDistribution[];
}) {
  return (
    <MyButtonDeleteList
      // disabled={values.length === 0}
      contextData={values.map((item) => item.code).join(", ")}
      onSubmit={() => {}}
    />
  );
}