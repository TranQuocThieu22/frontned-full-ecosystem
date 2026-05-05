"use client";
import { service_academicYear } from "@/api/services/service_academicYear";
import { service_account } from "@/api/services/service_account";
import { AcademicYear } from "@/interfaces/academicYear";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Center, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheck } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import AcademicYearCreateButton from "./AcademicYearCreateButton";
import AcademicYearDeleteButton from "./AcademicYearDeleteButton";
import AcademicYearUpdateButton from "./AcademicYearUpdateButton";
import ActivityPlanSyncButton from "./ActivityPlanSyncButton";
import PlanReInitButton from "./PlanReInitButton";
import PlanSyncEventRequiredButton from "./PlanSyncEventRequiredButton";
import SemesterCreateButton from "./SemesterCreateButton";
import SemesterDeleteButton from "./SemesterDeleteButton";
import SemesterUpdateButton from "./SemesterUpdateButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

export default function AcademicYearTable() {
    const permissionStore = usePermissionStore()
    const disc = useDisclosure()
    const academicYear = useCustomReactQuery({
        queryKey: ["academicYear"],
        axiosFn: () => service_academicYear.AcademicGetAll(),
        // axiosFn: () => service_academicYear.getAll(),
    })
    const titleState = useState<string>("")
    const mutation = useCustomReactMutation({
        axiosFn: () =>
            service_account.AQDataActivityPlan(),
        options: {
            retry: 0,
            onSuccess: (data: string) => {

                titleState[1](data)
                disc[1].open()
            }
        }
    });
    const activityPlanColumns = useMemo<MRT_ColumnDef<ActivityPlan>[]>(() => [
        { header: "Mã NHHK", accessorKey: "code" },
        { header: "Năm học học kỳ", accessorKey: "name" },

        {
            header: "Ngày bắt đầu",
            accessorKey: "startDate",
            accessorFn: (value) => dateUtils.toDDMMYYYY(value.startDate)
        },
        {
            header: "Ngày kết thúc",
            accessorKey: "endDate",
            accessorFn: (value) => dateUtils.toDDMMYYYY(value.endDate)
        },
        {
            header: "Hiện hành",
            accessorKey: "isCurrent", Cell: ({ cell }) => (cell.getValue() === true
                ? <Center>
                    <IconCircleCheck style={{ width: "30px", height: "30px", justifyContent: 'center' }} color="blue" />
                </Center>
                : "")
        },

        {
            size: 250,
            header: "Dữ liệu hoạt động",
            accessorKey: "addAdditional", accessorFn: (row) =>
                <Group>
                    <CustomCenterFull>
                        <PlanReInitButton activityPlanId={row.id || 0} />
                        <PlanSyncEventRequiredButton activityPlanId={row.id || 0} />
                    </CustomCenterFull>
                </Group>
        },
    ], []);

    const columns = useMemo<MRT_ColumnDef<AcademicYear>[]>(() => [
        { header: "Mã năm", accessorKey: "code" },
        { header: "Năm học", accessorKey: "name" },
        {
            header: "Ngày bắt đầu",
            accessorKey: "academicYearStart",
            accessorFn: (value) => value.academicYearStart ? dateUtils.toDDMMYYYY(value.academicYearStart) : ""

        },
        {
            header: "Ngày kết thúc",
            accessorKey: "academicYearEnd",
            accessorFn: (value) => value.academicYearEnd ? dateUtils.toDDMMYYYY(value.academicYearEnd) : ""

        },
        {
            header: "Học kỳ hiện tại", accessorKey: "isCurrent", Cell: ({ cell }) => (cell.getValue() === true
                ? <Center>
                    <IconCircleCheck style={{ width: "30px", height: "30px", justifyContent: 'center' }} color="blue" />
                </Center>
                : "")
        },
    ], []);
    return (
        <CustomFlexColumn>
            <CustomFieldset title={`Danh mục năm học - học kỳ`}>
                <CustomDataTable
                    isLoading={academicYear.isLoading}
                    isError={academicYear.isError}
                    enableExpanding={true}
                    enableExpandAll={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            <AcademicYearCreateButton />
                            <ActivityPlanSyncButton
                                disclosure={disc}
                                onStartSync={() => mutation.mutate()}
                                isLoading={mutation.isPending}
                                title={titleState[0]} />

                        </>

                    )}
                    columns={columns}
                    data={academicYear.data || []}
                    renderRowActions={({ row }) => (
                        <CustomCenterFull>
                            <AcademicYearUpdateButton data={row.original} />
                            <AcademicYearDeleteButton code={row.original.code!} id={row.original.id!} />
                        </CustomCenterFull>
                    )}
                    renderDetailPanel={
                        (academicYearRow) => <CustomDataTable
                            columns={activityPlanColumns}
                            data={academicYearRow.row.original.activityPlans || []}
                            renderTopToolbarCustomActions={({ table }) => (
                                permissionStore.state.currentPermissionPage?.isCreate && (
                                    <SemesterCreateButton
                                        data={academicYearRow.row.original}
                                        academicYearList={academicYear.data}
                                        currentAcademicYearRow={academicYearRow.row.original} />
                                )
                            )}
                            renderRowActions={({ row }) => (
                                <CustomCenterFull>
                                    <SemesterUpdateButton
                                        data={row.original}
                                        academicYearList={academicYear.data}
                                        currentAcademicYearRow={academicYearRow.row.original} />
                                    <SemesterDeleteButton
                                        id={row.original.id!}
                                        code={row.original.code || ''} />
                                </CustomCenterFull>
                            )
                            }
                        />}
                />
            </CustomFieldset>
        </CustomFlexColumn>

    );
}
