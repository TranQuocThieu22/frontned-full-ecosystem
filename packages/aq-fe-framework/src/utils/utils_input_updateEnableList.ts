/**
 * Cập nhật danh sách dạng many-to-many có cờ enable.
 * @param oldList - danh sách gốc đang lưu trong state
 * @param selectedIds - danh sách id đang được chọn (sau khi onchange)
 * @param getId - hàm lấy id từ mỗi item
 * @param createNew - hàm tạo mới item nếu thêm mới
 */
export function updateEnableList<T>(
    oldList: T[],
    selectedIds: number[],
    getId: (item: T) => number | undefined,
    createNew: (id: number) => T
): T[] {
    const result: T[] = [];

    // Giữ lại hoặc thêm mới
    selectedIds.forEach((id) => {
        const existing = oldList.find((item) => getId(item) === id);
        if (existing) {
            result.push({ ...existing, isEnabled: true });
        } else {
            result.push(createNew(id));
        }
    });

    // Cái nào bị bỏ chọn thì enable = 0
    oldList.forEach((item) => {
        const id = getId(item);
        if (id !== undefined && !selectedIds.includes(id) && (item as any).isEnabled !== 0) {
            result.push({ ...item, isEnabled: 0 });
        }
    });

    return result;
}
