import { activityServiceQT } from "@/shared/APIs/activityServiceQT";
import { Activity, ActivityStateEnum } from "@/shared/interfaces/Activity";
import { ActivityStateColor, ActivityStateLabel } from "@/shared/interfaces/ActivityStudent";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/aq-core-framework/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { useMemo } from "react";
import ImportActivityPointImportButton from "./ImportActivityPointImportButton";

export default function ImportActitivtyPointTable() {
    const authenticateStore = useAuthenticateStore()
    const query = useCustomReactQuery({
        queryKey: ['import-activity-point'],
        serviceFn: () => activityServiceQT.getAll({
            tenantId: authenticateStore.state.tenantId,
            Type: 1,
        })
    })
    const columns = useMemo<CustomColumnDef<Activity>[]>(() => [

        {
            accessorKey: "code",
            header: "Mã hoạt động",
        },
        {
            accessorKey: "name",
            header: "Tên hoạt động",
            size: columnSizeObject.name
        },
        {
            accessorKey: "state",
            header: "Trạng thái",
            type: "statusBadge",
            statusBadgeProps: {
                enumColor: ActivityStateColor,
                enumLabel: ActivityStateLabel,
                enumObject: ActivityStateEnum
            },
            size: 200
        },
        {
            accessorKey: "quota",
            header: "Chỉ tiêu",
        },
        {
            accessorKey: "registeredCount",
            header: "Số lượng đăng ký",
        },
        {
            header: "Loại hoạt động",
            accessorKey: "type",
        }
        // {
        //     accessorKey: "description",
        //     header: "Mô tả",
        // },
        // {
        //     accessorKey: "type",
        //     header: "Loại hoạt động",
        // },
        // {
        //     accessorKey: "startDate",
        //     header: "Ngày bắt đầu",
        // },
        // {
        //     accessorKey: "endDate",
        //     header: "Ngày kết thúc",
        // },
        // {
        //     accessorKey: "status",
        //     header: "Trạng thái",
        // },
    ], [])
    return (
        <CustomDataTableAPI
            columns={columns}
            customReactQueryProps={{
                queryKey: ['import-activity-point'],
                serviceFn: () => activityServiceQT.getAll({
                    tenantId: authenticateStore.state.tenantId,
                    Type: 1,
                })
            }}
            renderRowActions={(props) => {
                return (
                    <ImportActivityPointImportButton activityId={props.row.original.id} disabled={props.row.original.state !== ActivityStateEnum.RECORDING} />
                )
            }}
        />
    )
}
