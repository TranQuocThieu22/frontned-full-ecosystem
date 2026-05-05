import { useQueryClient } from "@tanstack/react-query";

export function utils_reactQuery_updateListItemInQuery<T>({
    queryClient,
    queryKey,
    listKey,
    itemId,
    updatedFields,
    matchBy = 'id',
}: {
    queryClient: ReturnType<typeof useQueryClient>;
    queryKey: unknown[];
    listKey: keyof T;
    itemId: any;
    updatedFields: Partial<any>;
    matchBy?: string;
}) {
    const oldData = queryClient.getQueryData<T>(queryKey);
    if (!oldData) return;

    const updatedList = (oldData[listKey] as any[]).map((item) =>
        item[matchBy] === itemId ? { ...item, ...updatedFields } : item
    );

    queryClient.setQueryData(queryKey, {
        ...oldData,
        [listKey]: updatedList,
    });
}