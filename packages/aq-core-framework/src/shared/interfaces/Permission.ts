export interface Permission {
  id?: string;
  code?: string | null;
  category?: string | null;
  description?: string | null;
}

export interface CreatePermissionRequest {
  id?: string
  code?: string | null;
  category?: string | null;
  description?: string | null;
}

export interface UpdatePermissionRequest {
  id: string
  description?: string | null;
}

export interface GetByCategoryParams {
  Category?: string;
  PageNumber?: number;
  PageSize?: number;
}

/** Cấu trúc cây quyền theo module — dùng cho UI nhóm quyền */
export interface PermissionGroup {
  module: string;
  moduleLabel: string;
  permissions: { code: string; label: string; description?: string }[];
}
