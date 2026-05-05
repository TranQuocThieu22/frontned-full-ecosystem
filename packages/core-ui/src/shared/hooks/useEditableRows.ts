import { useState } from "react";

type UseEditableRowsOptions<T> = {
    initValues?: T[];
    rowKey?: keyof T; // field dùng để định danh row
};

export function useEditableRows<T extends { [key: string]: any }>({ initValues = [], rowKey = "id" as keyof T }: UseEditableRowsOptions<T> = {}) {
    const [editedRows, setEditedRows] = useState<T[]>(initValues);

    const handleFieldChange = (
        row: T,
        field: keyof T,
        value: T[keyof T]
    ) => {
        setEditedRows((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item[rowKey] === row[rowKey]
            );

            let updatedRow;
            if (existingIndex !== -1) {
                // Đã từng chỉnh sửa → cập nhật bản đã chỉnh sửa
                updatedRow = { ...prev[existingIndex], [field]: value } as T;
                const updated = [...prev];
                updated[existingIndex] = updatedRow;
                return updated;
            } else {
                // Chưa chỉnh sửa → cập nhật từ dữ liệu gốc
                updatedRow = { ...row, [field]: value };
                return [...prev, updatedRow];
            }
        });
    };

    return {
        editedRows,
        handleFieldChange,
        setEditedRows,
    };
}
