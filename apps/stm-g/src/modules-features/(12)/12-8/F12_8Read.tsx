'use client'
import { service_timeCluster } from "@/api/services/service_timeCluster";
import { service_timeType } from "@/api/services/service_timeType";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ENUM_DAYS_OF_WEEK } from "@/constants/enum/global";
import { Group, Text } from "@mantine/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F12_8Delete from "./F12_8Delete";
import F12_8DeleteList from "./F12_8DeleteList";
import F12_8Form from "./F12_8Form";
import { ITimeCluster } from "@/interfaces/timeCluster";

export default function F12_8Read() {
    const timeTypeDetailQuery = useMyReactQuery({
        queryKey: [`timeTypeDetailQuery`],
        axiosFn: async () => service_timeType.getAll({
            params: "?cols=TimeTypeDetails"
        })
    })
    const timeClusterQuery = useMyReactQuery({
        queryKey: [`timeClusterQuery`],
        axiosFn: async () => service_timeCluster.getAll({
            params: "?cols=TimeClusterDetails"
        })
    });

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
                    {/* <F12_8FormRefactor /> */}
                    <F12_8DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    <MyButton crudType="import"></MyButton>
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_8Form values={row.original} />
                        <F12_8Delete values={row.original} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
