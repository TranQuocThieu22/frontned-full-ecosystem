import { QueryClient } from "@tanstack/react-query";

/**
 * Cập nhật một hàng trong dữ liệu React Query
 * @param queryClient - React Query Client
 * @param queryKey - Khóa của query cần cập nhật
 * @param id - ID của hàng cần cập nhật
 * @param updatedFields - Các trường cần cập nhật
 * @param idField - Tên trường ID, mặc định là 'id'
 * @returns - Dữ liệu đã được cập nhật hoặc undefined nếu không tìm thấy dữ liệu
 */
function updateQueryRow<T extends Record<string, any>>(
    queryClient: QueryClient,
    queryKey: unknown[],
    id: number | string,
    updatedFields: Partial<T>,
    idField: keyof T = 'id' as keyof T
): T[] | undefined {
    // Lấy dữ liệu hiện tại từ cache
    const currentData = queryClient.getQueryData<T[]>(queryKey);

    if (!currentData) {
        console.warn(`Không tìm thấy dữ liệu cho queryKey: ${JSON.stringify(queryKey)}`);
        return undefined;
    }

    // Tạo bản sao và cập nhật
    const updatedData = currentData.map(item =>
        // So sánh ID dưới dạng string để tránh các vấn đề về kiểu dữ liệu
        String(item[idField]) === String(id)
            ? { ...item, ...updatedFields }
            : item
    );

    // Cập nhật lại cache
    queryClient.setQueryData(queryKey, updatedData);

    return updatedData;
}

/**
 * Cập nhật nhiều hàng trong dữ liệu React Query
 * @param queryClient - React Query Client
 * @param queryKey - Khóa của query cần cập nhật
 * @param updates - Mảng các cập nhật (id và dữ liệu)
 * @param idField - Tên trường ID, mặc định là 'id'
 * @returns - Dữ liệu đã được cập nhật hoặc undefined nếu không tìm thấy dữ liệu
 */
function updateQueryRows<T extends Record<string, any>>(
    queryClient: QueryClient,
    queryKey: unknown[],
    updates: Array<{ id: number | string; fields: Partial<T> }>,
    idField: keyof T = 'id' as keyof T
): T[] | undefined {
    // Lấy dữ liệu hiện tại từ cache
    const currentData = queryClient.getQueryData<T[]>(queryKey);

    if (!currentData) {
        console.warn(`Không tìm thấy dữ liệu cho queryKey: ${JSON.stringify(queryKey)}`);
        return undefined;
    }

    // Tạo map id -> fields để tra cứu nhanh
    const updateMap = new Map(
        updates.map(update => [String(update.id), update.fields])
    );

    // Tạo bản sao và cập nhật
    const updatedData = currentData.map(item => {
        const itemId = String(item[idField]);
        const updateFields = updateMap.get(itemId);

        return updateFields
            ? { ...item, ...updateFields }
            : item;
    });

    // Cập nhật lại cache
    queryClient.setQueryData(queryKey, updatedData);

    return updatedData;
}

/**
 * Cập nhật dữ liệu query theo điều kiện
 * @param queryClient - React Query Client
 * @param queryKey - Khóa của query cần cập nhật
 * @param predicate - Hàm kiểm tra để xác định hàng cần cập nhật
 * @param updatedFields - Các trường cần cập nhật
 * @returns - Dữ liệu đã được cập nhật hoặc undefined nếu không tìm thấy dữ liệu
 */
function updateQueryWhere<T>(
    queryClient: QueryClient,
    queryKey: unknown[],
    predicate: (item: T) => boolean,
    updatedFields: Partial<T>
): T[] | undefined {
    // Lấy dữ liệu hiện tại từ cache
    const currentData = queryClient.getQueryData<T[]>(queryKey);

    if (!currentData) {
        console.warn(`Không tìm thấy dữ liệu cho queryKey: ${JSON.stringify(queryKey)}`);
        return undefined;
    }

    // Tạo bản sao và cập nhật
    const updatedData = currentData.map(item =>
        predicate(item) ? { ...item, ...updatedFields } : item
    );

    // Cập nhật lại cache
    queryClient.setQueryData(queryKey, updatedData);

    return updatedData;
}

/**
 * Hook tiện ích để sử dụng các hàm cập nhật
 * @param queryClient - React Query Client
 */
export function useH_Custom_QueryUpdater(queryClient: QueryClient) {
    return {
        updateRow: <T extends Record<string, any>>(
            queryKey: unknown[],
            id: number | string,
            updatedFields: Partial<T>,
            idField?: keyof T
        ) => updateQueryRow<T>(queryClient, queryKey, id, updatedFields, idField),

        updateRows: <T extends Record<string, any>>(
            queryKey: unknown[],
            updates: Array<{ id: number | string; fields: Partial<T> }>,
            idField?: keyof T
        ) => updateQueryRows<T>(queryClient, queryKey, updates, idField),

        updateWhere: <T>(
            queryKey: unknown[],
            predicate: (item: T) => boolean,
            updatedFields: Partial<T>
        ) => updateQueryWhere<T>(queryClient, queryKey, predicate, updatedFields)
    };
}