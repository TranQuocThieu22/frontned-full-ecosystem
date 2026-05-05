export type type_mutation = "create" | "update" | "delete" | "mutation" | "import"

export const typeLabel_mutation: Record<type_mutation, string> = {
    create: "Tạo thành công!",
    update: "Cập nhật thành công!",
    delete: "Xóa thành công!",
    mutation: "Thao tác thành công!",
    import: "Import thành công"
};