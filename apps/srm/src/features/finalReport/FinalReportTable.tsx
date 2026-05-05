'use client'
import { contractService } from "@/shared/APIs/contractService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import Shared_ContractExecuteStatusBadge from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AdjustRequestExportButton from "./FinalReportExportButton";
import FinalReportUpdateOrDetailButton from "./FinalReportUpdateOrDetail/FinalReportUpdateOrDetailButton";


export default function FinalReportTable() {
    const academicYearStore = useAcademicYearStore()
    const contractFinalReportQuery = useCustomReactQuery({
        queryKey: ['contractFinalReportQuery', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => {
            return contractService.getSRMContractFinalReport({ AcademicYearId: academicYearStore?.state?.academicYear?.id ?? 0 })
        },
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id
        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMContract>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
            size: columnSizeObject.name
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "leader",
            accessorFn(row) {
                return row.srmTopic?.srmTopicMembers?.find(item => item?.srmTitle?.isLeader === true)?.user?.fullName
            }
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "duration",
        },
        {
            header: "Từ tháng/năm",
            accessorKey: "fromDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row?.fromDate)
        },
        {
            header: "Đến tháng/năm",
            accessorKey: "toDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row?.toDate)
        },
        {
            header: "Tổng kinh phí dự đoán",
            accessorKey: "totalCost",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost || 0, ' VNĐ'),
        },
        {
            header: "Tổng kinh phí thanh toán",
            accessorKey: "usedTotalCost",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.usedTotalCost || 0, ' VNĐ'),
        },
        {
            header: "Đã nộp báo cáo tổng kết",
            accessorKey: "isAcceptanceSubmitted",
            accessorFn: (row) => <CustomCenterFull>
                <CustomThemeIconSquareCheck checked={row.isAcceptanceSubmitted} />
            </CustomCenterFull>
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "executionStatus",
            size: 280,
            accessorFn: (row) => <Shared_ContractExecuteStatusBadge value={row.executionStatus ?? 0} />
        }
    ], []);

    return (
        <CustomFieldset
            title="Danh sách đề tài"
        >
            <CustomDataTable
                columns={columns}
                data={contractFinalReportQuery.data || []}
                isLoading={contractFinalReportQuery.isLoading}
                isError={contractFinalReportQuery.isError}
                enableRowSelection={true}
                pinningRightColumns={['isAcceptanceSubmitted']}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return <>
                        <AdjustRequestExportButton table={table} />
                    </>
                }}
                renderRowActions={({ row }) => {
                    return <CustomCenterFull>
                        {
                            row.original.isAcceptanceSubmitted ?
                                <FinalReportUpdateOrDetailButton values={row.original!} actionType="viewDetail" />
                                : <FinalReportUpdateOrDetailButton values={row.original!} actionType="update" />
                        }
                    </CustomCenterFull>
                }}
            />
        </CustomFieldset>
    );
}
