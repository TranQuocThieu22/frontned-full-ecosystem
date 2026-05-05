import { accountService } from "@/shared/APIs/accountService";
import { IconSearch } from "@tabler/icons-react";
import { MySelect } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { useEffect } from "react";
import { useS_Shared_FilterStudent } from "./useS_FilterStudent";

export default function F_Shared_FilterStudent() {
    const getStudentList_query = useMyReactQuery({
        queryKey: [],
        axiosFn: () => accountService.getStudentList()
    })
    const filterStudent_store = useS_Shared_FilterStudent()
    useEffect(() => {
        if (!getStudentList_query.data) return
        filterStudent_store.setProperty("userId", getStudentList_query.data[0]?.id)
    }, [getStudentList_query.data])
    if (getStudentList_query.isLoading) return "Đang tải dữ liệu"
    return (
        <MySelect
            label="Chọn học viên"
            rightSection={<IconSearch />}
            data={getStudentList_query.data?.map(item => ({
                label: item.code + " - " + item.fullName,
                value: item.id?.toString()!
            })) || []}
            value={filterStudent_store.state.userId?.toString()}
            onChange={(e) => {
                filterStudent_store.setProperty("userId", parseInt(e!))
            }}
        />
    )
}
