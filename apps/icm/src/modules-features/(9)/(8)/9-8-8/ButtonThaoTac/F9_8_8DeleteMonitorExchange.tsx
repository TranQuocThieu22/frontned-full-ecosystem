import { MyActionIconDelete } from "aq-fe-framework/components";

export default function F9_8_8DeleteMonitorExchange({ id }: { id: string }) {
  return (
    <MyActionIconDelete contextData={id} onSubmit={() => { /* Add your submit logic here */ }} />
  )
}