'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateCoreSubjectData, canDeleteCoreSubjectData } from "@/features/auth/PageAuthorization/core-subject-data.auth";
import useQ_COEGrade_GetDetail from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IGradeSubjectInfoViewModel } from "../../Curriculum&Subject/ModuleGradeSubject/ConfigAMRI/Interfaces/Interfaces";
import ChangeGradeSubjectCoreStatusButton from "./ChangeGradeSubjectCoreStatusButton";
import F_CoreSubjectDelete from "./F_CoreSubjectDelete";
import useS_CoreSubject from "./useS_CoreSubject";

const legend = "Danh mục môn học cốt lõi đo lường đầu ra chương trình đào tạo"

export default function F_CoreSubjectTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const store = useS_CoreSubject()
    const COEGradeGetDetailQuery = useQ_COEGrade_GetDetail({
        params: `?gradeId=${store.state.gradeId}&IsCore=true`
    })
    const columns = useMemo<MRT_ColumnDef<IGradeSubjectInfoViewModel>[]>(() => [
        {
            header: "Năm học Học kỳ",
            accessorKey: "activityPlan.name"
        },
        {
            header: "Thứ tự",
            accessorKey: "order"
        },
        {
            header: "Mã môn học",
            accessorKey: "coeSubject.code"
        },
        {
            header: "Tên môn học",
            accessorKey: "coeSubject.name"
        },
        {
            header: "Nhóm môn học",
            accessorKey: "coeSubjectGroup.name"
        },
        {
            header: "Số tín chỉ",
            accessorKey: "coeSubject.numberCredit"
        },
        {
            header: "Số tiết",
            accessorKey: "coeSubject.numberPeriod"
        }
    ], [])

    return (
        <MyDataTable
            data={COEGradeGetDetailQuery.data || []}
            columns={columns}
            renderTopToolbarCustomActions={() => (
                <Group>
                    {canCreateCoreSubjectData(userStore, userPermissionStore) && <ChangeGradeSubjectCoreStatusButton />}
                </Group>
            )}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    {canDeleteCoreSubjectData(userStore, userPermissionStore) && <F_CoreSubjectDelete data={row.original} />}
                </CustomCenterFull>
            )}
        />
    )
}
