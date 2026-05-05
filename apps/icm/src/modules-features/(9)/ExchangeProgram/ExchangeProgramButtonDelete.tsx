"use client";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { IExchangeProgram } from "./interface/ExchangeProgramViewModel";

export default function ExchangeProgramButtonDelete({
  ExchangeProgram,
}: {
  ExchangeProgram: IExchangeProgram;
}) {
  return (
    <MyActionIconDelete
      contextData={ExchangeProgram.exchangeCode}
      onSubmit={() => { }}
    ></MyActionIconDelete>
  );
}
