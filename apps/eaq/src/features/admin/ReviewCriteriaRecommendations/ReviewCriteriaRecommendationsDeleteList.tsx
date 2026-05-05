import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { MRT_TableInstance } from "mantine-react-table";
import React from "react";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function ReviewCriteriaRecommendationsDeleteList({
  table,
}: {
  table: MRT_TableInstance<ILimitation>;
}) {
  const selected = table
    .getSelectedRowModel()
    .flatRows.flatMap((row) => row.original);
  return (
    <CustomButtonDeleteList
      count={selected.length}
      onSubmit={() => service_EAQLimitation.deleteList(selected)}
      contextData={selected.map((item) => String(item.code)).join(",")}
    />
  );
}
