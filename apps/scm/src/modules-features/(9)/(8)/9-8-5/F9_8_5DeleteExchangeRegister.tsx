import { MyActionIconDelete } from "aq-fe-framework/components";

export default function F9_8_5DeleteExchangeRegister({ id }: { id: string }) {
  return (
    <MyActionIconDelete contextData={id} onSubmit={() => { /* Add your submit logic here */ }} />
  )
}