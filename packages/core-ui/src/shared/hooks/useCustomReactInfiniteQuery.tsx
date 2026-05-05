import { UseInfiniteQueryOptions } from "@tanstack/react-query"
import { BaseEntity } from "../interfaces/BaseEntity"

const PAGE_SIZE = 20

interface CustomReactInfiniteQueryProps<TData> extends UseInfiniteQueryOptions {

}

export default function useCustomReactInfiniteQuery<TData extends BaseEntity>({

}: CustomReactInfiniteQueryProps<TData>) {
    // const getStudentInfiniteQuery = useInfiniteQuery<CustomApiResponse<TData[]>, Error>({
    //     queryKey: ["students-infinite"],
    //     initialPageParam: 1,
    //     queryFn: async ({ pageParam }) => {
    //         const res = await accountService.getStudentsBasicInfo({
    //             codeOrFullname: search,
    //             pageNumber: pageParam as number,
    //             pageSize: PAGE_SIZE,
    //         })
    //         return res.data
    //     },
    //     getNextPageParam: (lastPage, allPages) => {
    //         const list = lastPage.data ?? []
    //         return list.length < PAGE_SIZE
    //             ? undefined
    //             : allPages.length + 1
    //     },
    // })
    // return getStudentInfiniteQuery
}
