'use client'

import { service_account } from "@/api/services/service_account";
import { service_studentsActivityRegistration } from "@/api/services/service_studentsActivityRegistration";
import StundentInfoDisplay from "@/components/StudentInfo/StundentInfoDisplay";
import { EnumLabelRegisterType, EnumRegisterType } from "@/enum/EnumEventRegisterType";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Flex, Paper, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function ActivityExecutionPlanLayout() {

    const currentUserQuery = useCustomReactQuery({
        queryKey: ["Q_StudentInfo"],
        axiosFn: () => service_account.getCurrentUser()
    });

    const currentUser = useMemo(() => {
        if (!currentUserQuery.data) return {};
        return currentUserQuery.data;
    }, [currentUserQuery.data]);

    const Q_ActivityRegistration = useCustomReactQuery({
        queryKey: ["Q_StudentsActivityRegistration_GetByStudent", currentUser.id],
        axiosFn: () => service_studentsActivityRegistration.getByStudent({
            studentId: currentUser.id
        }),
    });

    const eventQuantityCount = useMemo(() => {
        if (!Q_ActivityRegistration.data) return 0;
        return Q_ActivityRegistration.data.filter(row => row.event?.name).length;
    }, [Q_ActivityRegistration.data]);

    const eventTotalScoreArchived = useMemo(() => {
        if (!Q_ActivityRegistration.data) return 0;

        return Q_ActivityRegistration.data.reduce((total, row) => {
            // chỉ cộng nếu có tên sự kiện và có điểm hợp lệ
            if (typeof row.point === "number") {
                return total + row.point;
            }
            return total;
        }, 0);
    }, [Q_ActivityRegistration.data]);


    const columns = useMemo<MRT_ColumnDef<StudentEvent>[]>(() => [

        { header: "Điều", accessorKey: "event.standardCode", size: 50 },
        {
            header: "Hoạt động ngoại khóa",
            size: 700,
            accessorFn: (row) =>
                row.event?.name ? <CustomHtmlWrapper html={row.event.name} /> : "",
        },
        { header: "Đơn vị tổ chức", accessorKey: "event.hostName" },
        { header: "Đơn vị ghi nhận", accessorKey: "event.reviewedName", size: 190 },
        { header: "Đơn vị công nhận", accessorKey: "event.completedName", size: 210 },
        { header: "Địa điểm tổ chức", accessorKey: "event.addressName" },
        { header: "SLSV dự kiến", accessorKey: "event.quantity" },
        { header: "Điểm tối thiểu", accessorKey: "event.minPoint", size: 160 },
        { header: "Điểm tối đa", accessorKey: "event.maxPoint", size: 160 },
        {
            header: "Đối tượng tham gia",
            accessorKey: "registerType",
            accessorFn: (row) => EnumLabelRegisterType[row.event?.registerType as EnumRegisterType],
        },
        {
            header: "Từ ngày",
            accessorKey: "event.startDate",
            accessorFn: (row) =>
                row.event?.startDate
                    ? dateUtils.toDDMMYYYY(new Date(row.event.startDate))
                    : ''
        },
        {
            header: "Từ ngày",
            accessorKey: "event.endDate",
            accessorFn: (row) =>
                row.event?.endDate
                    ? dateUtils.toDDMMYYYY(new Date(row.event.endDate))
                    : ''
        },
    ], [])
    return (
        <>
            <StundentInfoDisplay
                currentUser={currentUser}
                eventQuantityCount={eventQuantityCount}
                eventTotalScoreArchived={eventTotalScoreArchived}
            />
            <CustomFieldset mt="20" title='Danh sách hoạt động đã đăng ký'>
                <CustomDataTable
                    isLoading={Q_ActivityRegistration.isLoading}
                    isError={Q_ActivityRegistration.isError}
                    enableRowNumbers={true}
                    columns={columns}
                    data={Q_ActivityRegistration.data || []}
                />
            </CustomFieldset>
            {/* <Text ml="20" fw={"bold"} c={"blue"}>Tổng hoạt động đã tham gia: {eventQuantityCount}</Text>
                <Text ml="20" fw={"bold"} c={"blue"}>Tổng điểm của hoạt động đã tham gia: {eventTotalScoreArchived}</Text> */}
        </>)
}
