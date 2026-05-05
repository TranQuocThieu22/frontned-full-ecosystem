import { MyFlexEnd } from "@/components";
import { Space } from "@mantine/core";
import { F_organizationPolicyDocs_Create } from "./F_organizationPolicyDocs_Create";
import F_organizationPolicyDocs_Read from "./F_organizationPolicyDocs_Read";

export function F_organizationPolicyDocs({ RegulationsTypeId }: { RegulationsTypeId: number }) {
    return (
        <>
            <MyFlexEnd>
                <F_organizationPolicyDocs_Create RegulationsTypeId={RegulationsTypeId} />
            </MyFlexEnd>
            <Space />
            <F_organizationPolicyDocs_Read RegulationsTypeId={RegulationsTypeId} />
        </>
    )
}
