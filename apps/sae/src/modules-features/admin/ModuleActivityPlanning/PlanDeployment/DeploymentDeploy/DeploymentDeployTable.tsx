import { service_activityPlan } from "@/api/services/service_activityPlan";
import { schoolCode } from "@/constants/object/schoolCode";
import { EnumLabelRegisterType, EnumRegisterType } from "@/enum/EnumEventRegisterType";
import { Event } from "@/interfaces/event";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { useMemo, useState } from "react";
import ActivityButtonDelete from "./ActivityButtonDelete";
import ActivityCreateUpdateButton from "./CreateUpdate/ActivityCreateUpdateButton";
import DeploymentDeployCalendar from "./DeploymentDeployCalendar";

export default function DeploymentDeployTable({ standardId }: { standardId: string | null }) {
    const isRequiredHidden = useState<boolean>(true);
    const activityPlanStore = useS_Shared_ActivityPlan();

    const query = useCustomReactQuery({
        queryKey: ["planActivityInit", standardId, activityPlanStore.state.ActivityPlan?.id],
        axiosFn: () => service_activityPlan.getPlanActivityInit({
            standardId: standardId && standardId !== "all" ? Number(standardId) : undefined,
            host: undefined,
            facultyId: undefined,
            searchText: undefined,
            startDate: undefined,
            endDate: undefined,
            activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
        })
    });

    // Định nghĩa cột của bảng
    // Gộp đơn vị Tổ chức và Đơn vị Ghi nhận lại, có thể xử lý bằng cách Ẩn đơn vị ghi nhận đi, khi thêm/ sửa dữ liệu, thì gán đơn vị Tổ chức = đơn vị ghi nhân luôn.

    const columns = useMemo<CustomColumnDef<Event>[]>(() => {
        const allColumns: CustomColumnDef<Event>[] = [
            { header: "Điều", accessorKey: "standardCode", size: 100 },
            {
                header: "Hoạt động ngoại khóa",
                accessorKey: "name",
                size: 300,
                accessorFn: (row) => (
                    <Flex>
                        <CustomHtmlWrapper html={row.name!} />
                        <Text>
                            <Tooltip label="Hoạt động cố định">
                                <span
                                    hidden={!(row as Event).isRequired}
                                    style={{ color: "red" }}>(*)</span>
                            </Tooltip>
                        </Text>
                    </Flex>
                )
            },
            { header: "Đơn vị tổ chức", accessorKey: "hostName" },
            { header: "Đơn vị ghi nhận", accessorKey: "reviewedName", size: 190 },
            { header: "Đơn vị công nhận", accessorKey: "completedName", size: 210 },
            { header: "Địa điểm tổ chức", accessorKey: "location", size: 200 },
            { header: "Số lượt tham gia tối đa", accessorKey: "quantity" },
            { header: "Điểm tối thiểu", accessorKey: "minPoint", size: 160 },
            { header: "Điểm tối đa", accessorKey: "maxPoint", size: 160 },
            {
                header: "Đối tượng tham gia",
                accessorKey: "registerType",
                accessorFn: (row) => EnumLabelRegisterType[row.registerType as EnumRegisterType],
            },
            { header: "SLSV đã đăng ký", accessorKey: "registrationCount", size: 150, },
            { header: "SLSV tham gia", accessorKey: "participationCount", size: 150, },
            {
                header: "Ngày bắt đầu",
                accessorKey: "startDate",
                size: 150,
                type: "ddMMyyyy",
            },
            {
                header: "Ngày kết thúc",
                size: 150,
                accessorKey: "endDate",
                type: "ddMMyyyy",
            },
        ]
        if (APP_CONFIG.schoolCode == schoolCode.FTU) {
            return allColumns.filter(col => col.accessorKey !== "reviewedName");
        }
        return allColumns
    }, []);

    const filteredData = useMemo(() => {
        if (!isRequiredHidden[0]) {
            return query.data?.events || [];
        }

        return (query.data?.events || []).filter((row) => {
            const isRowRequired = (row as Event).isRequired;
            return !isRowRequired;
        })
    }, [query?.data, isRequiredHidden[0]]);

    return (
        <>
            <CustomDataTable
                initialState={{
                    showColumnFilters: false,
                    sorting: [{ id: "standardCode", desc: false },],
                    expanded: true,
                }}
                isLoading={query.isLoading}
                isError={query.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={filteredData || []}

                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <ActivityCreateUpdateButton />
                        <CustomCheckbox
                            label={'Ẩn hoạt động bắt buộc'}
                            checked={isRequiredHidden[0]}
                            onChange={(e) => isRequiredHidden[1](e.target.checked)}
                        />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <ActivityCreateUpdateButton values={row.original} loadingActionIcon={query.isFetching} />
                        <ActivityButtonDelete code={row.original.code!} id={row.original.id!} />
                    </CustomCenterFull>
                )}
            />
            <DeploymentDeployCalendar
                data={query.data?.events || []}
                isRequiredHidden={isRequiredHidden[0]}
            />
        </>

    );
}

