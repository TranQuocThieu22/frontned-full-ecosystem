'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { I_Class } from "./interfaces";
import { mockData_ClassList } from "./mockDatas";
import { ClassStatusBadge } from "./utils/ClassStatusBadge";
import ViewStudentGradingModal from "./ViewStudentGradingModal";

export default function ViewClassRewardDetailTable() {
    // const query = useMyReactQuery({
    //     queryKey: [`LeaveCompensationRead`],
    //     axiosFn: async () => 
    // })

    const query = useQuery<I_Class[]>({
        queryKey: ["ClassListRead"],
        queryFn: async () => mockData_ClassList
    })

    const columns: MRT_ColumnDef<I_Class>[] = [
        {
            header: "Mã lớp",
            accessorKey: "code",
            size: 100
        },
        {
            header: "Tên lớp",
            accessorKey: "name",
            size: 160
        },
        {
            header: "Giáo viên chủ nhiệm",
            accessorKey: "homeroomTeacherName",
            size: 190
        },
        {
            header: "Lịch học",
            accessorKey: "schedule",
        },
        {
            header: "Phòng học",
            accessorKey: "room",
            size: 100
        },
        {
            header: "Sĩ số hiện tại/Sĩ số tối đa",
            accessorFn: row => `${row.currentCapacity}/${row.maxCapacity}`,
            accessorKey: "classCapacity",
            size: 100,
        },
        {
            header: "Trạng thái lớp",
            accessorFn: row => <ClassStatusBadge status={row.status ?? -1} />,
            accessorKey: "status",
        },
    ];

    return (
        <Stack>
            <MySelect
                style={{ width: "20%" }}
                label="Chọn năm học" data={["2024 - 2025", "2023 - 2024"]}
                value={"2024 - 2025"}
                onChange={() => { }} />
            <MyFieldset title={"Danh sách lớp"}>
                <MyDataTable
                    columns={columns}
                    data={query.data || []}
                    enableRowNumbers
                    enableColumnPinning
                    initialState={{
                        density: "md",
                        pagination: { pageIndex: 0, pageSize: 30 },
                        columnPinning: {
                            right: ["mrt-row-actions"]
                        }
                    }}
                    renderTopToolbarCustomActions={() => {
                        return (<MyCenterFull>
                            <Button
                                leftSection={<IconTableExport />}
                                color="teal"
                                size="sm"
                                radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message:
                                            "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    });
                                }}
                            >
                                Export
                            </Button>
                        </MyCenterFull>);
                    }}
                    renderRowActions={() => (
                        <MyCenterFull>
                            <ViewStudentGradingModal />
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </Stack>
    )
}
