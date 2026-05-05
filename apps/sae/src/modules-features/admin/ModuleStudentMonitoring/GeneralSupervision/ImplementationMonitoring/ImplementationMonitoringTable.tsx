'use client';
import { service_event } from "@/api/services/service_event";
import { Event } from "@/interfaces/event";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Flex, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ExportButton from "./ExportButton";
import ImplementationMonitoringButtonImport from "./ImplementationMonitoringButtonImport";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";


export default function ImplementationMonitoringTable() {
    const permissionStore = usePermissionStore()

    const [filter, setFilter] = useState<string>("1");
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const query = useCustomReactQuery({
        queryKey: ["getEventOnPlan", filter],
        axiosFn: () => service_event.getEventOnPlan({
            // isOrganization: filter == '1' ? false : filter == '2' ? false : true
        })
    });

    const columns = useMemo<MRT_ColumnDef<Event>[]>(() => [
        { header: "Điều", accessorKey: "standardCode" },
        {
            header: "Hoạt động ngoại khóa",
            accessorKey: "name",
            accessorFn: (row) => {
                return row.isRequired ?
                    <Flex>
                        <Text dangerouslySetInnerHTML={{ __html: row.name || '' }} />
                        <Text c="red">(*)</Text>
                    </Flex>
                    : <Text dangerouslySetInnerHTML={{ __html: row.name || '' }} />
            }
        },
        { header: "Đơn vị tổ chức", accessorKey: "hostName" },
        { header: "Đơn vị ghi nhận", accessorKey: "reviewedName" },
        { header: "Đơn vị công nhận", accessorKey: "completedName" },
        { header: "Địa điểm tổ chức", accessorKey: "addressName" },
        { header: "SLSV dự kiến", accessorKey: "quantity" },
        { header: "Điểm tối đa", accessorKey: "maxPoint" },
        { header: "Điểm trừ", accessorKey: "minPoint" },
        { header: "Đối tượng SV", accessorKey: "facultyName" },
        { header: "SLSV đã đăng ký", accessorKey: "registrationCount" },
        { header: "SLSV tham gia", accessorKey: "participationCount" },
        {
            header: "Người cập nhật", accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật", accessorKey: "modifiedWhen",
            accessorFn: row => row.modifiedWhen ? dateUtils.toDDMMYYYY(row.modifiedWhen!) : "",
        }
    ], [filter, query.data]);


    return (
        <CustomFlexColumn>
            <Flex align={'center'} gap={10} maw={400}>
                <Text>
                    Lọc
                </Text>
                <CustomSelect
                    w={'100%'}
                    clearable={false}
                    defaultValue={filter}
                    onChange={(value) => setFilter(value ?? "1")}
                    data={[
                        { value: "1", label: "Tất cả hoạt động" },
                        { value: "2", label: "Hoạt động đã tổ chức" },
                        { value: "3", label: "Hoạt động không tổ chức" },
                        { value: "4", label: "Hoạt động tổ chức không theo kế hoạch" },
                    ]}
                />
            </Flex>
            {query.isLoading && <Text>Loading...</Text>}
            {query?.isError ? <Text>Không có dữ liệu</Text> :
                query.data && <CustomDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            {permissionStore.state.currentPermissionPage?.isCreate &&
                                <ImplementationMonitoringButtonImport />
                            }
                            {permissionStore.state.currentPermissionPage?.isExport &&
                                <ExportButton table={table} data={query.data || []} />
                            }
                        </Group>
                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => {
                        if (row.original.isCompleted == true) return (
                            <CustomCenterFull>
                                <CustomThemeIconSquareCheck checked />
                            </CustomCenterFull>
                        )
                        return <CustomCenterFull>
                            <Group>
                                <CustomButtonCreateUpdate
                                    buttonProps={{
                                        children: 'Thực hiện'
                                    }}
                                    modalProps={{
                                        title: "Xác nhận"
                                    }}
                                    onSubmit={async () => await service_event.eventCompleted({ eventId: row.original.id! })}
                                    form={form_multiple}
                                >
                                    <Text>
                                        Bạn có muốn thực hiện hoạt động này không ?
                                    </Text>
                                </CustomButtonCreateUpdate>
                            </Group >
                        </CustomCenterFull>
                    }
                    }
                />}
        </CustomFlexColumn>
    );
}

