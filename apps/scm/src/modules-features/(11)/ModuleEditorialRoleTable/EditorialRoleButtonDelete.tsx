"use client";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { IEditorialRole } from "./interface/EditorialRoleViewModel";

export default function EditorialRoleButtonDelete({
  EditorialRole,
}: {
  EditorialRole: IEditorialRole;
}) {
  return (
    <MyActionIconDelete
      contextData={EditorialRole.roleCode}
      onSubmit={() => { }}
    ></MyActionIconDelete>
  );
}
