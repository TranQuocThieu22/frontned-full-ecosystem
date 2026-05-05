'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable, MyDateInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table"; 
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import { useMemo } from "react";
import { I_Class } from "./interfaces";
import { mockData_ClassList } from "./mockDatas";
import StudentGradingModal from "./StudentGradingModal";
import { ClassStatusBadge } from "./utils/ClassStatusBadge";

export default function EnterClassScoreTable() {
    // const query = useMyReactQuery({
    //     queryKey: [`LeaveCompensationRead`],
    //     axiosFn: async () => 
    // })

    const query = useQuery<I_Class[]>({
        queryKey: ["ClassListRead"],
        queryFn: async () => mockData_ClassList
    })

    const columns = useMemo<MRT_ColumnDef<I_Class>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "code",
            size: 60
        },
        {
            header: "Tên lớp",
            accessorKey: "name",
            size: 180
        },
        {
            header: "Giáo viên chủ nhiệm",
            accessorKey: "homeroomTeacherName",
            size: 180
        },
        {
            header: "Lịch học",
            accessorKey: "schedule",
            size: 210
        },
        {
            header: "Phòng học",
            accessorKey: "room",
            size: 50
        },
        {
            header: "Sĩ số hiện tại/Sĩ số tối đa",
            accessorFn: (row) => `${row.currentCapacity}/${row.maxCapacity}`,
            accessorKey: "classCapacity",
            size: 50
        },
        {
            header: "Trạng thái lớp",
            accessorKey: "status",
            accessorFn: (row) => <ClassStatusBadge status={row.status ?? -1} />,
            size: 220
        },
        {
            header: "Đã nhập điểm",
            accessorKey: "isGraded",
            accessorFn: (row) =>
                <MyCenterFull>
                    <MyCheckbox checked={row.isGraded} readOnly />
                </MyCenterFull>,
            size: 100
        },
    ], []);


    return (
        <Stack>
            <MyDateInput style={{ width: "20%" }} label="Chọn ngày nhập điểm" defaultValue={new Date()} onChange={() => { }} />
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
                            <StudentGradingModal />
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </Stack>
    )
}
