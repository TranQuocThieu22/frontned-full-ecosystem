'use client'
import { levelService } from "@/shared/APIs/levelService";
import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { SRMType } from "@/shared/interfaces/SRMType";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import TopicTypeListCreateOrUpdate from "./TopicTypeListCreateOrUpdate";

export default function TopicTypeListTable() {
    const columns = useMemo<MRT_ColumnDef<SRMType>[]>(() => [
        {
            header: "Mã loại đề tài",
            accessorKey: "code",
            importFieldProps: {
                isRequired: true,
                isUnique: true,
            },
        },
        {
            header: "Tên loại đề tài",
            accessorKey: "name",
            importFieldProps: {
                isRequired: true,
            },
        },
        {
            header: "Mã cấp đề tài",
            accessorKey: "srmLevel.code",
        },
        {
            header: "Mã cấp đề tài",
            accessorKey: "srmLevelCode",
            isExcluded: true,
            importFieldProps: {},
        },
        {
            header: "Tên cấp đề tài",
            accessorKey: "srmLevel.name",
        },
        {
            header: "Số giờ",
            accessorKey: "workingHours",
            importFieldProps: {
                parseType: "number",
                isRequired: true,
            },
        },
        {
            header: "Số điểm",
            accessorKey: "point",
            importFieldProps: {
                parseType: "number",
            },
        },
        {
            header: "Không sử dụng",
            accessorKey: "isDeactivate",
            Cell({ row }) {
                return (
                    <CustomCenterFull>
                        <CustomThemeIconSquareCheck checked={row.original.isDeactivate} />
                    </CustomCenterFull>
                )
            },
            importFieldProps: {
                parseType: "boolean"
            },
        },
        {
            header: "Ghi chú",
            accessorKey: "note"
        }
    ], [])

    const topicTypeQuery = useCustomReactQuery({
        queryKey: ['topicTypes'],
        axiosFn: () => SRMTypeService.getAll({ params: '?cols=SRMLevel' })
    })

    const researchLevelQuery = useCustomReactQuery({
        queryKey: ['researchLevel'],
        axiosFn: () => {
            return levelService.getAll()
        },
    })

    return (
        <CustomFieldset
            title="Danh mục loại đề tài"
        >
            <CustomDataTableAPI
                columns={columns}
                query={topicTypeQuery}
                isLoading={topicTypeQuery.isLoading}
                isError={topicTypeQuery.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                deleteListFn={SRMTypeService.deleteListIds}
                deleteFn={SRMTypeService.delete}
                exportProps={{
                    fileName: "Danh sách loại đề tài",
                }}
                buttonImportProps={{
                    buttonProps: {
                        loading: topicTypeQuery.isLoading || researchLevelQuery.isLoading,
                    },
                    fileName: "Mẫu import loại đề tài",
                    onSubmit: (data) => {
                        return SRMTypeService.createOrUpdateList(data.map((item) => ({
                            ...item,
                            srmLevelId: researchLevelQuery.data?.find(level => level.code === item.srmLevelCode)?.id || undefined,
                        })));
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return <>
                        <TopicTypeListCreateOrUpdate />
                    </>
                }}
                renderRowActions={({ row }) => {
                    return <>
                        <TopicTypeListCreateOrUpdate initValues={row.original!} />
                    </>
                }}
            />
        </CustomFieldset>
    );
}
