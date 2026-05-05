"use client";
import { service_event } from "@/api/services/service_event";
import { service_standard } from "@/api/services/service_standard";
import { EnumSourceType, EnumSourceTypeColor, EnumSourceTypeIcon, EnumSourceTypeLabel } from "@/enum/EnumSourceType";
import { Event } from "@/interfaces/event";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { useMemo, useState } from "react";
import F_xawveu4zfc_Create from "./MandatoryActivityCatalogButtonCreate";
import F_xawveu4zfc_Delete from "./MandatoryActivityCatalogButtonDelete";
import F_xawveu4zfc_Update from "./MandatoryActivityCatalogButtonUpdate";
import MandatoryActivityCatalogStandard from "./MandatoryActivityCatalogStandard";
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { service_department } from "@/api/services/service_department";
import MandatoryActivityCatalogButtonImport from "./MandatoryActivityCatalogButtonImport";

export default function MandatoryActivityCatalogTable() {
    const [selectedStandardId, setSelectedStandardId] = useState<string | null>(
        null
    );
    const permissionStore = usePermissionStore();
    const standardQuery = useCustomReactQuery({
        queryKey: ["MandatoryActivityCatalogTable_Standard_GetAll"],
        axiosFn: () => service_standard.getAll(),
    });

    const eventRequiredQuery = useCustomReactQuery({
        queryKey: ["getEventRequired", selectedStandardId],
        axiosFn: () =>
            service_event.getEventRequired({
                standardId: selectedStandardId
                    ? parseInt(selectedStandardId)
                    : undefined,
                pageNumber: 1,
                pageSize: 0,
            }),
    });

    const handleTabChange = (value: string | null) => {
        setSelectedStandardId(value);
    };

    const fixedActivityPointRate = useMemo(() => {
        if (
            eventRequiredQuery.isSuccess &&
            Array.isArray(eventRequiredQuery.data)
        ) {
            return eventRequiredQuery.data.reduce(
                (sum, event: Event) => sum + (event.maxPoint ?? 0),
                0
            );
        }
        return 0;
    }, [eventRequiredQuery.data, eventRequiredQuery.isSuccess]);

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
                accessorKey: "reviewedCode",
                isExcluded: true,
                header: "Đơn vị ghi nhận",
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
                isExcluded: true,
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
        ],
        []
    );

    const eventGroupQuery = useCustomReactQuery({
        queryKey: ["eventGroupGetAll"],
        axiosFn: () => service_eventGroup.getAll(),
    });

    const departmentQuery = useCustomReactQuery({
        queryKey: ["getWorkingUnit"],
        axiosFn: () => service_department.getWorkingUnit(),
        options: {
        },
    })


    return (
        <CustomFieldset title={"Danh mục hoạt động bắt buộc"}>
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
                    query={eventRequiredQuery}
                    deleteListFn={(ids) => {
                        return service_event.deleteListIds(ids);
                    }}
                    exportProps={{
                        fileName: "export_hoat_dong_bat_buoc",
                    }}
                    // buttonImportProps={{
                    //     buttonProps: {
                    //         loading: eventGroupQuery.isLoading || eventRequiredQuery.isLoading || departmentQuery.isLoading || standardQuery.isLoading,
                    //     },
                    //     onSubmit: async (finalValues) => {
                    //         const data = finalValues.map((item: Event) => {
                    //             return {
                    //                 ...item,
                    //                 standardId: standardQuery.data.find(std => std.code === item.standardCode)?.id,
                    //                 host: departmentQuery.data.find(dept => dept.name === item.hostName || dept.code === item.hostCode)?.id,
                    //                 reviewedBy: departmentQuery.data.find(dept => dept.name === item.reviewedName || dept.code === item.reviewedCode)?.id,
                    //                 completedBy: departmentQuery.data.find(dept => dept.name === item.completedName || dept.code === item.completedCode)?.id,
                    //                 eventGroupId: eventGroupQuery.data[0]?.id,
                    //             }
                    //         });

                    //         const promises = data.map((item) => {
                    //             return service_event.createEventRequired(item);
                    //         });
                    //     }
                    // }}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <Group>
                                <F_xawveu4zfc_Create />
                                <MandatoryActivityCatalogButtonImport/>
                            </Group>
                        );
                    }}
                    initialState={{
                        sorting: [{ id: "standardCode", desc: false }],
                    }}
                    columns={columns}
                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <F_xawveu4zfc_Update values={row.original} />
                                <F_xawveu4zfc_Delete
                                    code={row.original.code!}
                                    id={row.original.id!}
                                />
                            </CustomCenterFull>
                        );
                    }}
                />
            </CustomFlexColumn>
        </CustomFieldset>
    );
}
