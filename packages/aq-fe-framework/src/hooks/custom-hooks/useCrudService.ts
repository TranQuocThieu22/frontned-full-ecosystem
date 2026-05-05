import { QueryKey } from "@tanstack/react-query";
import { BaseApiType } from "../../shared/lib/createBaseApi";
import { useMyReactMutation } from "./useMyReactMutation";
import { useMyReactQuery } from "./useMyReactQuery";

export function useCrudService<T>(
    service: BaseApiType<T>,
    queryKey: QueryKey
) {
    const query = useMyReactQuery({
        queryKey: queryKey,
        axiosFn: () => service.getAll()
    });

    const create = useMyReactMutation({
        axiosFn: (data: T) => service.create(data),
        mutationType: "create"
    });

    const update = useMyReactMutation({
        axiosFn: (data: T) => service.update(data),
        mutationType: "update"
    });

    const deleteMutation = useMyReactMutation({
        axiosFn: (id: number) => service.delete(id),
        mutationType: "delete"
    });

    const deleteList = useMyReactMutation({
        axiosFn: (list: number[]) => service.deleteListIds(list),
        mutationType: "delete"
    });

    return {
        query,
        create,
        update,
        delete: deleteMutation,
        deleteList
    };
}
