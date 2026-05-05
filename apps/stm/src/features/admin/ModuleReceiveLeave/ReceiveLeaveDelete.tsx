import { MyActionIconDelete } from "aq-fe-framework/components";

export default function ReceiveLeaveDelete({ id, code }: { id: number, code: string }) {
  return (
    <MyActionIconDelete contextData={code} onSubmit={() => { /* Add your submit logic here */ }} />
  )
}