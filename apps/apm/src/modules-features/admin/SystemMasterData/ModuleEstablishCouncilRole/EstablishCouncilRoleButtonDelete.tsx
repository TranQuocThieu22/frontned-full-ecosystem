"use client";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { IEstablishCouncilRole } from "./interface/EstablishCouncilRoleViewModel";

export default function EstablishCouncilButtonDelete({
  establishCouncilRole,
}: {
  establishCouncilRole: IEstablishCouncilRole;
}) {
  return (
    <MyActionIconDelete
      contextData={establishCouncilRole.roleCode}
      onSubmit={() => { }}
    ></MyActionIconDelete>
  );
}
