import { MyActionIconDelete } from "aq-fe-framework/components";

export default function GiftCatalogDelete({ id, code }: { id: number, code: string }) {
  return (
    <MyActionIconDelete contextData={code} onSubmit={() => { /* Add your submit logic here */ }} />
  )
}