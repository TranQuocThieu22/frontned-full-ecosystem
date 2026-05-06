export interface PagePermission {
  pageId?: number;
  isCreate?: boolean;
  isUpdate?: boolean;
  isDelete?: boolean;
  isRead?: boolean;
  isPrint?: boolean;
  isExport?: boolean;
}
