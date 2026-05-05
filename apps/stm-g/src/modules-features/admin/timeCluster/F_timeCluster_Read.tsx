'use client'
import { service_timeCluster } from "@/api/services/service_timeCluster";
import { service_timeType } from "@/api/services/service_timeType";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ENUM_DAYS_OF_WEEK } from "@/constants/enum/global";
import { Group, Text } from "@mantine/core";
import { MyDataTable } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_timeCluster_CreateUpdate from "./F_timeCluster_CreateUpdate/F_timeCluster_CreateUpdate";
import F_timeCluster_Delete from "./F_timeCluster_Delete";
import F_timeCluster_DeleteList from "./F_timeCluster_DeleteList";
import F12_8Form from "./F_timeCluster_Form";
import { ITimeCluster } from "@/interfaces/timeCluster";

export default function F_timeCluster_Read() {
    const timeClusterQuery = useMyReactQuery({
        queryKey: [`timeClusterQuery`],
        axiosFn: async () => service_timeCluster.getAll({
            params: "?cols=TimeClusterDetails"
        })
    });
    const timeTypeDetailQuery = useMyReactQuery({
        queryKey: [`timeTypeDetailQuery`],
        axiosFn: async () => service_timeType.getAll({
            params: "?cols=TimeTypeDetails"
        })
    })


    const columns = useMemo<MRT_ColumnDef<ITimeCluster>[]>(() => [
        {
            header: "Mã cụm thời gian",
            accessorKey: "code",
        },
        {
            header: "Tên cụm thời gian",
            accessorKey: "name",
        },
        {
            header: "Danh sách thứ",
            accessorFn: (row) => {
                const thuNumber = row.timeClusterDetails?.map(item => ENUM_DAYS_OF_WEEK[item.dayOfWeek!])
                return thuNumber
            },
            Cell: ({ cell }) => {
                return (
                    <MyFlexColumn gap={2}>
                        {cell.getValue<string[]>().map((item, idx) =>
                            <Text key={idx}>{item}</Text>
                        )}
                    </MyFlexColumn>
                )
            }
        },
        {
            header: "Tiết bắt đầu",
            accessorFn: (row) => {
                const tietBatDaus = row.timeClusterDetails?.map(item => item.classPeriodStart)
                return tietBatDaus
            },
            Cell: ({ cell }) => {
                return (
                    <MyFlexColumn gap={2}>
                        {cell.getValue<string[]>().map((item, idx) =>
                            <Text key={idx}>{item}</Text>
                        )}
                    </MyFlexColumn>
                )
            }
        },
        {
            header: "Số phút",
            accessorFn: (row) => {
                if (!timeTypeDetailQuery.data) return
                const soPHut = row.timeClusterDetails?.map(item => timeTypeDetailQuery.data![0]?.timeTypeDetails?.slice(item.classPeriodStart, item.classPeriodEnd! + 1).reduce((acc, cur) => acc + cur.minuteNumber!, 0))
                return soPHut
            },
            Cell: ({ cell }) => {
                if (cell.getValue<string[]>() == undefined) return
                return (
                    <MyFlexColumn gap={2}>
                        {cell.getValue<string[]>().map((item, idx) =>
                            <Text key={idx}>{item}</Text>
                        )}
                    </MyFlexColumn>
                )
            }
        },
    ], [timeTypeDetailQuery.data]);

    if (timeClusterQuery.isLoading) return "Đang tải dữ liệu...";
    if (timeClusterQuery.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={timeClusterQuery.data!}
            exportAble
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <F12_8Form />
                    <F_timeCluster_CreateUpdate />
                    <F_timeCluster_DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    <MyButton crudType="import"></MyButton>
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_timeCluster_CreateUpdate timeClusterValues={{}} />
                        <F_timeCluster_Delete values={row.original} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
