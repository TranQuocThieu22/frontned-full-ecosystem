'use client'

import { liquidationMinuteService } from "@/shared/APIs/liquidationMinuteService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import LiquidationMinutesCreateOrUpdateButton from "./LiquidationMinutesCreateOrUpdate/LiquidationMinutesCreateOrUpdateButton";
import LiquidationMinutesDeleteButton from "./LiquidationMinutesDeleteButton";
import LiquidationMinutesDeleteListButton from "./LiquidationMinutesDeleteListButton";
import LiquidationMinutesExportButton from "./LiquidationMinutesExportButton";
import LiquidationMinutesImportButton from "./LiquidationMinutesImportButton";

export default function LiquidationMinutesTable() {
    const academicYearStore = useAcademicYearStore();

    const liquidationMinuteQuery = useCustomReactQuery({
        queryKey: ['liquidationMinuteQuery', academicYearStore.state.academicYear?.id],
        axiosFn: () => liquidationMinuteService.GetAllByAcademicYear({
            AcademicYearId: academicYearStore.state.academicYear?.id ?? 0,
        }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id
        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMLiquidationMinute>[]>(() => [
        {
            header: "Số biên bản",
            accessorKey: "minuteNumber",
        },
        {
            header: "Ngày biên bản",
            accessorKey: "liquidationDate",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.liquidationDate)
        },
        {
            header: "Mã đề tài",
            accessorKey: "srmContract.code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "srmContract.srmTopic.registerName",
            size: columnSizeObject.name,
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "custom_leaderName",
            accessorFn: (row) => row?.srmContract?.srmTopic?.srmTopicMembers?.
                filter(item => item.srmTitle?.isLeader == true).map(item => item.user?.fullName).join(", ")
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "srmContract.duration",
        },
        {
            header: "Từ tháng/ năm",
            accessorKey: "srmContract.fromDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row.srmContract?.fromDate)
        },
        {
            header: "Đến tháng/ năm",
            accessorKey: "srmContract.toDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row.srmContract?.toDate)
        },
        {
            header: "Kinh phí dự đoán",
            accessorKey: "srmContract.totalCost",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.srmContract?.totalCost || 0, ' VNĐ'),
        },
        {
            header: "Kinh phí đề nghị",
            accessorKey: "proposedBudget",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.proposedBudget || 0, ' VNĐ'),
        },
        {
            header: "Kinh phí thanh toán",
            accessorKey: "totalCost",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost || 0, ' VNĐ'),
        },
        {
            header: "Kinh phí hoàn trả",
            accessorKey: "refundedBudget",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.refundedBudget || 0, ' VNĐ'),
        },
        {
            header: "File biên bản thanh lý",
            accessorKey: "attachmentPath",
            accessorFn: (row) => (
                <CustomCenterFull>
                    {row.attachmentPath && (
                        <CustomButtonViewFileAPI filePath={row.attachmentPath} />
                    )}
                </CustomCenterFull>
            )
        },
    ], []);

    return (
        <CustomFieldset
            title="Danh sách biên bản thanh lý">
            <CustomDataTable
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={true}
                isLoading={liquidationMinuteQuery.isLoading}
                isError={liquidationMinuteQuery.isError}
                data={liquidationMinuteQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return <>
                        <LiquidationMinutesCreateOrUpdateButton actionType="create" />
                        <LiquidationMinutesImportButton />
                        <LiquidationMinutesExportButton table={table} />
                        <LiquidationMinutesDeleteListButton
                            table={table}
                        />
                    </>
                }}
                renderRowActions={({ row }) => {
                    return <CustomCenterFull>
                        <LiquidationMinutesCreateOrUpdateButton values={row.original!} actionType="update" />
                        <LiquidationMinutesDeleteButton id={row.original.id!} code={row.original?.minuteNumber!} />
                    </CustomCenterFull>
                }}
            />
        </CustomFieldset>
    );
}

