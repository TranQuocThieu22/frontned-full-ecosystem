import { contractService } from "@/shared/APIs/contractService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { ContractExecuteStatusBadgeProps } from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";

export function TopicListTable() {
    const academicYearStore = useAcademicYearStore()
    const topicListQuery = useCustomReactQuery({
        queryKey: ['TopicListRead'],
        axiosFn: () => contractService.GetAllByAcademicYear({ AcademicYearId: academicYearStore.state.academicYear?.id }),
        options: {
            enabled: academicYearStore.state.academicYear != undefined
        }
    })

    const columns = useMemo<CustomColumnDef<SRMContract>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Mã đề tài",
            },
            {
                accessorKey: "name",
                header: "Tên đề tài",
                size: columnSizeObject.name
            },
            {
                accessorKey: "srmTopic.srmTopicMembers",
                header: "Chủ nhiệm đề tài",
                accessorFn: (row) => {
                    return row.srmTopic?.srmTopicMembers?.filter(item => item.srmTitle?.isLeader == true).map(item => item.user?.fullName)
                },
                type: "list"
            },
            {
                accessorKey: "srmTopic.hostOrganization",
                header: "Đơn vị chủ trì",
                size: columnSizeObject.name,
            },
            {
                accessorKey: "srmTopic.managingOrganization",
                header: "Đơn vị quản lý",
                size: columnSizeObject.name,
            },
            {
                accessorKey: "duration",
                header: "Thời gian thực hiện (tháng)",
            },
            {
                header: "Từ tháng/năm",
                accessorKey: "fromDate",
                type: "MMyyyy"
            },
            {
                header: "Đến tháng/năm",
                size: 200,
                accessorKey: "toDate",
                type: "MMyyyy"
            },

            {
                accessorKey: "totalCost",
                header: "Tổng kinh phí (VNĐ)",
                type: "currency"
            },
            {
                accessorKey: "srmType",
                header: "Loại đề tài",
                size: 180,
                accessorFn(row) {
                    return row.srmType?.name
                },
            },
            {

                accessorKey: "executionStatus",
                header: "Trạng thái thực hiện đề tài",
                type: "statusBadge",
                statusBadgeProps: ContractExecuteStatusBadgeProps
            },
            {
                header: "File thuyết minh",
                accessorKey: "attachmentPath",
                type: "viewFile"
            },
        ],
        []
    );


    return <CustomFieldset title="Danh sách đề tài" >
        <CustomDataTableAPI
            pinningRightColumns={['attachmentPath', 'executionStatus']}
            query={topicListQuery}
            columns={columns}
            enableRowSelection={true}
            enableRowNumbers={true}
            exportProps={{
                fileName: "Danh sách đề tài"
            }}
        />
    </CustomFieldset>
}

