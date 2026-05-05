/**
 * Utility decode JWT để lấy roles và redirect đúng phân hệ.
 * KHÔNG verify signature (trust backend đã verify).
 */

import { APP_CONFIG } from "@/shared/configs/appConfig";

// ============================================================================
// Types
// ============================================================================

export type AppRole =
    | "STUDENT"
    | "LECTURER"
    | "CLUB_MANAGER"
    | "CTSV_STAFF"
    | "FACULTY_HEAD"
    | "COUNCIL_MEMBER"
    | "SUPER_ADMIN"
    | "TENANT_ADMIN";

export type MfeSubsystem = "public" | "operation" | "admin";

export interface DecodedToken {
    sub: string;
    name?: string;
    email?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    roles: string[];
    scope?: string;
    exp?: number;
    iat?: number;
}

export interface LoginResult {
    redirectUrl: string;
    subsystem: MfeSubsystem;
    primaryRole: AppRole | string;
}

// ============================================================================
// JWT Decode (KHÔNG verify signature)
// ============================================================================

/**
 * Decode JWT payload (base64url decode, KHÔNG verify signature).
 * Chỉ dùng để lấy thông tin hiển thị, không dùng cho auth thực thụ.
 */
export function decodeJwtPayload(token: string): DecodedToken | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const payload = parts[1] ?? "";
        // Replace URL-safe chars and add padding
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

        const decoded = atob(padded);
        const json = JSON.parse(decoded);

        // Extract roles from realm_access (Keycloak format)
        const realmRoles: string[] = [];
        if (json.realm_access?.roles) {
            realmRoles.push(...json.realm_access.roles);
        }
        // Also check resource_access for client-specific roles
        if (json.resource_access?.["aq-iam"]?.roles) {
            realmRoles.push(...json.resource_access["aq-iam"].roles);
        }

        return {
            sub: json.sub || "",
            name: json.name,
            email: json.email,
            preferred_username: json.preferred_username,
            given_name: json.given_name,
            family_name: json.family_name,
            roles: realmRoles,
            scope: json.scope,
            exp: json.exp,
            iat: json.iat
        };
    } catch {
        console.warn("JWT decode failed:", token);
        return null;
    }
}

// ============================================================================
// Role → Subsystem Mapping
// ============================================================================

/** Roles dành cho MFE-PUBLIC */
const PUBLIC_ROLES: AppRole[] = ["STUDENT", "LECTURER", "CLUB_MANAGER"];

/** Roles dành cho MFE-OPERATION */
const OPERATION_ROLES: AppRole[] = ["CTSV_STAFF", "FACULTY_HEAD", "COUNCIL_MEMBER"];

/** Roles dành cho MFE-ADMIN */
const ADMIN_ROLES: AppRole[] = ["SUPER_ADMIN", "TENANT_ADMIN", "SUPER_ADMIN"];

/**
 * Xác định subsystem dựa trên role đầu tiên tìm được.
 * Priority: ADMIN > OPERATION > PUBLIC
 */
export function getSubsystemByRoles(roles: string[]): MfeSubsystem {
    // Check ADMIN first (highest priority)
    if (roles.some((r) => ADMIN_ROLES.includes(r as AppRole))) {
        return "admin";
    }
    // Check OPERATION
    if (roles.some((r) => OPERATION_ROLES.includes(r as AppRole))) {
        return "operation";
    }
    // Check PUBLIC
    if (roles.some((r) => PUBLIC_ROLES.includes(r as AppRole))) {
        return "public";
    }
    // Default fallback
    return "public";
}

/**
 * Lấy primary role (role đầu tiên theo priority)
 */
export function getPrimaryRole(roles: string[]): AppRole | string {
    const adminMatch = roles.find((r) => ADMIN_ROLES.includes(r as AppRole));
    if (adminMatch) return adminMatch as AppRole;

    const operationMatch = roles.find((r) => OPERATION_ROLES.includes(r as AppRole));
    if (operationMatch) return operationMatch as AppRole;

    const publicMatch = roles.find((r) => PUBLIC_ROLES.includes(r as AppRole));
    if (publicMatch) return publicMatch as AppRole;

    return roles[0] || "UNKNOWN";
}

// ============================================================================
// Redirect URL Mapping
// ============================================================================

/** Dashboard routes cho từng role trong từng subsystem */
const REDIRECT_ROUTES: Record<MfeSubsystem, Record<string, string>> = {
    public: {
        STUDENT: "/public/student/dashboard",
        LECTURER: "/public/lecturer/dashboard",
        CLUB_MANAGER: "/public/club/dashboard",
        default: "/public/dashboard"
    },
    operation: {
        CTSV_STAFF: "/operation/ctsv/dashboard",
        FACULTY_HEAD: "/operation/faculty/dashboard",
        COUNCIL_MEMBER: "/operation/council/dashboard",
        default: "/operation/dashboard"
    },
    admin: {
        SUPER_ADMIN: "/admin/dashboard",
        TENANT_ADMIN: "/admin/dashboard",
        SUPERUSER_ADMIN: "/admin/dashboard",
        default: "/admin/dashboard"
    }
};

/**
 * Tạo redirect URL sau khi login thành công.
 * Decode token → xác định subsystem & role → trả về URL tương ứng.
 */
export function getRedirectUrl(accessToken: string): LoginResult {
    const decoded = decodeJwtPayload(accessToken);
    const roles = decoded?.roles || [];
    const subsystem = getSubsystemByRoles(roles);
    const primaryRole = getPrimaryRole(roles);

    // Get role-specific redirect or fallback to default
    const roleRoute = REDIRECT_ROUTES[subsystem][primaryRole];
    const defaultRoute = REDIRECT_ROUTES[subsystem].default;
    const redirectUrl = roleRoute || defaultRoute;

    return {
        redirectUrl: APP_CONFIG.alias + redirectUrl,
        subsystem,
        primaryRole
    };
}

/**
 * Lấy thông tin user từ token (để hiển thị)
 */
export function getUserInfoFromToken(accessToken: string): {
    fullName: string;
    email: string;
    username: string;
} | null {
    const decoded = decodeJwtPayload(accessToken);
    if (!decoded) return null;

    const fullName =
        decoded.name ||
        [decoded.given_name, decoded.family_name].filter(Boolean).join(" ") ||
        decoded.preferred_username ||
        "Unknown";

    return {
        fullName,
        email: decoded.email || "",
        username: decoded.preferred_username || decoded.sub
    };
}
