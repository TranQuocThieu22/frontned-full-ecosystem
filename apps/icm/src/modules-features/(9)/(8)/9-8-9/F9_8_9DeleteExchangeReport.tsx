'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function F9_8_9DeleteExchangeReport({ id }: { id: string }) {
  return (
    <MyActionIconDelete
      contextData={id}
      onSubmit={() => {
        console.log("Xoá báo cáo với ID:", id);
      }}
    />
  );
}
