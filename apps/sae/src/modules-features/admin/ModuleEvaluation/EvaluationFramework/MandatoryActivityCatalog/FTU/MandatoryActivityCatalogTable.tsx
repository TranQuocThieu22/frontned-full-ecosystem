"use client";
import { service_event } from "@/api/services/service_event";
import { service_standard } from "@/api/services/service_standard";
import { EnumSourceType, EnumSourceTypeColor, EnumSourceTypeIcon, EnumSourceTypeLabel } from "@/enum/EnumSourceType";
import { Event } from "@/interfaces/event";
import { Standard } from "@/interfaces/standard";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useMemo, useState } from "react";
import { CustomDataTableAPI } from '../../../../../../../../../packages/core-ui/src/shared/components/withAPI/CustomDataTableAPI';
import MandatoryActivityCatalogButtonDelete from "../MandatoryActivityCatalogButtonDelete";
import MandatoryActivityCatalogCreateUpdate from "./CreateUpdate/MandatoryActivityCatalogCreateUpdate";
import MandatoryActivityCatalogButtonImport from "./ImportExport/MandatoryActivityCatalogButtonImport";
import MandatoryActivityCatalogStandard from "./MandatoryActivityCatalogStandard";

export function MandatoryActivityCatalogTable() {
    const [selectedStandardId, setSelectedStandardId] = useState<string | null>("null");
    const [selectedStandard, setSelectedStandard] = useState<Standard>();
    const permissionStore = usePermissionStore();

    const standardQuery = useCustomReactQuery({
        queryKey: ["StandardGetAll"],
        axiosFn: () => service_standard.getAll(),
    });

    const eventRequiredQuery = useCustomReactQuery({
        queryKey: ["EventRequiredGetAll", selectedStandardId],
        axiosFn: () =>
            service_event.getEventRequired({
                standardId: selectedStandardId && selectedStandardId !== "null" ? Number(selectedStandardId) : undefined
            }),
    });

    const handleTabChange = (value: string | null) => {
        setSelectedStandardId(value);
        setSelectedStandard(standardQuery.data?.find((item) => item.id && String(item.id) === value))
    };

    const fixedActivityPointRate = useMemo(() => {
        if (!Array.isArray(eventRequiredQuery.data)) return 0;
        return eventRequiredQuery.data.reduce((sum, event: Event) => sum + (event.maxPoint ?? 0), 0);
    }, [eventRequiredQuery.data]);

    const columns = useMemo<CustomColumnDef<Event>[]>(
        () => [
            {
                accessorKey: "standardCode",
                header: "Điều",
                importFieldProps: {
                    isRequired: true,
                }
            },
            {
                accessorKey: "code",
                header: "Mã hoạt động",
                importFieldProps: {
                    isRequired: true,
                    isUnique: true
                }
            },
            {
                accessorKey: "name",
                header: "Hoạt động cố định",
                importFieldProps: {
                    isRequired: true
                },
                Cell: ({ row }) => {
                    return <CustomHtmlWrapper html={row.original.name || ""} />;
                },
                size: 400,
            },
            {
                accessorKey: "hostName",
                header: "Đơn vị tổ chức",
            },
            {
                accessorKey: "reviewedName",
                header: "Đơn vị ghi nhận",
            },
            {
                accessorKey: "completedName",
                header: "Đơn vị công nhận",
            },

            {
                accessorKey: "hostCode",
                isExcluded: true,
                header: "Đơn vị tổ chức",
                importFieldProps: {}
            },
            {
                accessorKey: "eventGroupCode",
                isExcluded: true,
                header: "Nhóm hoạt động",
                importFieldProps: {}
            },
            {
                accessorKey: "completedCode",
                isExcluded: true,
                header: "Đơn vị công nhận",
                importFieldProps: {}
            },
            {
                accessorKey: "maxPoint",
                header: "Điểm tối đa",
                importFieldProps: {
                    isRequired: true,
                    parseType: 'number',
                }
            },
            {
                accessorKey: "minusPoint",
                header: "Điểm trừ",
                accessorFn: (row) => 0,
            },
            {
                accessorKey: "minPoint",
                header: "Điểm tối thiểu",
                accessorFn: (row) => 0,
                importFieldProps: {
                    isRequired: true,
                    parseType: 'number',
                }
            },
            {
                accessorKey: 'source',
                header: 'Nguồn điểm',
                type: 'statusBadge',
                statusBadgeProps: {
                    enumLabel: EnumSourceTypeLabel,
                    enumObject: EnumSourceType,
                    enumIcon: EnumSourceTypeIcon,
                    enumColor: EnumSourceTypeColor,
                },
                importFieldProps: {
                    parseType: 'number',
                }
            },
            {
                header: "Nhóm hoạt động",
                accessorKey: "eventGroupName"
            },
        ],
        []
    );

    return (
        <CustomFieldset title="Danh mục hoạt động bắt buộc">
            <CustomTabs
                tabs={[
                    {
                        label: "Tất cả các điều",
                        value: "null",
                        children: <div></div>,
                    },
                    ...(standardQuery.isSuccess && Array.isArray(standardQuery.data)
                        ? standardQuery.data.map((item, index) => ({
                            label: `Điều ${index + 1}`,
                            value: item.id ? item.id.toString() : "",
                            children: <div></div>,
                        }))
                        : []),
                ]}
                value={selectedStandardId}
                onChange={handleTabChange}
            />

            <MandatoryActivityCatalogStandard
                selectedStandardId={selectedStandardId}
                standard={standardQuery.isSuccess && standardQuery.data ? standardQuery.data : []}
                fixedActivityPointRate={fixedActivityPointRate}
            />

            <CustomFlexColumn mt={4}>
                <CustomDataTableAPI
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    isLoading={eventRequiredQuery.isLoading}
                    isError={eventRequiredQuery.isError}
                    query={eventRequiredQuery}
                    exportProps={{
                        fileName: "export_hoat_dong_bat_buoc",
                    }}
                    deleteListFn={(ids) => {
                        return service_event.deleteListIds(ids);
                    }}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <MandatoryActivityCatalogCreateUpdate />
                                {permissionStore.state.currentPermissionPage?.isCreate && (
                                    <MandatoryActivityCatalogButtonImport />
                                )}
                            </>
                        );
                    }}
                    initialState={{
                        sorting: [{ id: "standardCode", desc: false }],
                    }}
                    columns={columns}
                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <MandatoryActivityCatalogCreateUpdate values={row.original} />
                                <MandatoryActivityCatalogButtonDelete
                                    code={row.original.code!}
                                    id={row.original.id!}
                                />
                            </CustomCenterFull>
                        );
                    }}
                />
            </CustomFlexColumn >
        </CustomFieldset>
    );
}
