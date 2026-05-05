'use client'

import { service_classActivityPlan } from "@/api/services/service_classActivityPlan";
import { service_event } from "@/api/services/service_event";
import { Event } from "@/interfaces/event";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { Paper, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ListStudentOfActivityButtonModal from "./ListStudentOfActivityButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

export default function HomeroomTeacherActivityJoinByStudentTable() {
    const [selectedClass, setSelectedClass] = useState<string>('')
    const activityPlanStore = useS_Shared_ActivityPlan()

    const Q_Class = useCustomReactQuery({
        queryKey: [
            "HomeroomTeacherActivityJoinByStudentTableget_findByLecturer",
            activityPlanStore.state.ActivityPlan?.id,
        ],
        axiosFn: async () => {
            return await service_classActivityPlan.findByLecturer({
                activityPlanId: activityPlanStore.state.ActivityPlan?.id,
                cols: "Class",
            });
        },
        options: {
            enabled: !!activityPlanStore.state.ActivityPlan?.id,
            select: (data) => {
                // Remove duplicates by classId + activityPlanId
                return Array.from(
                    new Map(
                        data.map((item) => [
                            `${item.classId}-${item.activityPlanId}`, // composite key
                            item,
                        ])
                    ).values()
                );
            },
        },
    });

    const Q_EventOnPlan = useCustomReactQuery({
        queryKey: ["HomeroomTeacherActivityJoinByStudentTable_getEventOnPlan", activityPlanStore.state.ActivityPlan?.id],
        axiosFn: async () => {
            const res = await service_event.getEventOnPlanForLectureOfClass({
                standardId: undefined,
                host: 0,
                facultyId: 0,
                startDate: undefined,
                endDate: undefined,
                // isOrganization: false,
                activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
            })
            return res
        },
        options: {
            enabled: !!activityPlanStore.state.ActivityPlan?.id
        }
    })

    const columns = useMemo<MRT_ColumnDef<Event>[]>(() => [
        {
            header: "Điều",
            accessorKey: "standardCode",
            accessorFn: (row) => {
                if (row.code === undefined) return <CustomCenterFull>
                    <Text fw={600} p={20} c={'#000'}>{row.standardCode}</Text>
                </CustomCenterFull>
            }
        },
        {
            header: 'STT',
            Cell: ({ row }) => row.index + 1
        },
        { header: "Mã hoạt động", accessorKey: "code", size: 200 },
        {
            header: "Tên hoạt động", accessorKey: "name", size: 300, accessorFn: (row) => {
                return <CustomHtmlWrapper html={row.name || ''} />
            }
        },
        { header: "Điểm tối đa", accessorKey: "maxPoint" },
        { header: "Số lượng SV dự kiến", accessorKey: "quantity" },
        { header: "Số lượng SV đã đăng ký", accessorKey: "registrationCount" },
        // { header: "Số lượng SV phụ trách đã đăng ký", accessorKey: "soluongSVPhuTrachDangKy" },
        { header: "Đối tượng SV", accessorKey: "facultyName", size: 250 },
        {
            header: "Từ ngày", accessorKey: "startDate", accessorFn(originalRow) {
                if (!originalRow.startDate) {
                    return '';
                }
                return dateUtils.toDDMMYYYY(new Date(originalRow.startDate!));
            },
        },
        {
            header: "Đến ngày", accessorKey: "endDate", accessorFn(originalRow) {
                if (!originalRow.endDate) {
                    return '';
                }
                return dateUtils.toDDMMYYYY(new Date(originalRow.endDate!));
            },
        },
        { header: "Địa điểm", accessorKey: "addressName" },

    ], [])

    // Group dữ liệu theo standardCode
    const groupedData = useMemo(() => {
        if (!Q_EventOnPlan.data) return []

        const sorted = Q_EventOnPlan.data.sort((a, b) => (a.standardCode || '').localeCompare(b.standardCode || ''))
        const grouped: Event[] = []
        const groupMap = new Map<string, Event[]>()

        // Group events theo standardCode
        sorted.forEach(event => {
            const standardCode = event.standardCode || ''
            if (!groupMap.has(standardCode)) {
                groupMap.set(standardCode, [])
            }
            groupMap.get(standardCode)!.push(event)
        })

        // Tạo dữ liệu với hàng header cho mỗi group
        groupMap.forEach((events, standardCode) => {
            // Thêm hàng header với chỉ có standardCode
            const headerRow: Event = {
                standardCode: standardCode,
            }
            grouped.push(headerRow)

            // Thêm tất cả events trong group
            events.forEach(event => {
                grouped.push(event)
            })
        })

        return grouped
    }, [Q_EventOnPlan.data])

    return (
        <Paper p={20}>
            <CustomSelect
                isLoading={Q_Class.isLoading}
                isError={Q_Class.isError}
                w={350}
                mb={20}
                label="Chọn lớp:"
                value={selectedClass}
                data={[{ value: '', label: 'Tất cả' }, ...(Q_Class.data?.map(item => ({ value: item.class?.id!.toString() || '', label: item?.class?.name || '' })) || [])]}
                defaultValue=""
                onChange={(value) => {
                    setSelectedClass(value || '')
                }}
            />
            <CustomFieldset title="Danh sách hoạt động ngoại khóa" >
                <CustomDataTable
                    isLoading={Q_EventOnPlan.isLoading}
                    isError={Q_EventOnPlan.isError}
                    enableRowSelection={false}
                    enableRowNumbers={false}
                    columns={columns}
                    data={groupedData}
                    renderRowActions={({ row }) => {
                        if (row.original.code !== undefined) {
                            return <ListStudentOfActivityButtonModal classId={selectedClass !== '' ? Number(selectedClass) : undefined} eventId={row.original.id!} />
                        }
                        return null;
                    }}
                >
                </CustomDataTable>
            </CustomFieldset>
        </Paper>
    )
}
