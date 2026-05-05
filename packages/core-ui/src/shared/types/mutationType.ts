export type mutationType = "create" | "update" | "delete" | "mutation" | "import" | "sync"

export const mutationLabel: Partial<Record<mutationType, string>> = {
    create: "Tạo thành công!",
    update: "Cập nhật thành công!",
    delete: "Xóa thành công!",
    mutation: "Thao tác thành công!",
    import: "Import thành công",
    sync: "Đồng bộ thành công"
};