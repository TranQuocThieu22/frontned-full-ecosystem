import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function TaskAssignmentTabDelete({
  label,
  onDelete
}: {
  label: string;
  onDelete: () => void;
}) {
  return <CustomActionIconDelete
    onSubmit={onDelete}
    contextData={label} />;
}
