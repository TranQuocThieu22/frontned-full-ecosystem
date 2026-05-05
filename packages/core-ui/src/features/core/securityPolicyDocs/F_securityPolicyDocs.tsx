import F_securityPolicyDocs_Read from "./F_securityPolicyDocs_Read";

export function F_securityPolicyDocs({ SecurityTypeId }: { SecurityTypeId: number }) {
    return (
        <F_securityPolicyDocs_Read SecurityTypeId={SecurityTypeId} />
    )
}
    