'use client'
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { checkPermissionByRule, RuleNode } from "../authorization-helper";

interface Props {
    rule: RuleNode,
    children: React.ReactNode;
}

export default function AllowRender({ rule, children }: Props) {
    const userPermissions = usePermissionStore().state.permission || [];
    return checkPermissionByRule(rule, userPermissions) ? children : null;
}

