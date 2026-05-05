/**
 * AccessRule Model - US-A-04
 */

export interface AccessRule {
    id: number;
    module: string;
    page: string;
    allowedRoles: string[];
    status: "active" | "inactive";
}
