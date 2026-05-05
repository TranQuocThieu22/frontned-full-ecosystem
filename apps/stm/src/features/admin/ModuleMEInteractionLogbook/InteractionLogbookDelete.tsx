import { MyActionIconDelete } from "aq-fe-framework/components";

export default function InteractionLogbookDelete({
  id,
  label,
}: {
  id: number;
  label: string;
}) {
  return <MyActionIconDelete onSubmit={() => {}} contextData={label} />;
}