import F_organizationPolicyDocs_Read from "./F_organizationPolicyDocs_Read";

export function F_organizationPolicyDocs({
  RegulationsTypeId,
}: {
  RegulationsTypeId: number;
}) {
  return (
    <>
      {/* <CustomFlexEnd>
                <F_organizationPolicyDocs_Create RegulationsTypeId={RegulationsTypeId} />
            </CustomFlexEnd>
            <Space /> */}
      <F_organizationPolicyDocs_Read RegulationsTypeId={RegulationsTypeId} />
    </>
  );
}
