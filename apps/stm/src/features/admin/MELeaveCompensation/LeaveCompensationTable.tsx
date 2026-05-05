'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table"; // Assuming this is used for column definitions
import { I_MakeUpLessonRequest } from "./interfaces";

import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import LeaveCompensationPickSessionModal from "./LeaveCompensationPickSessionModal";
import { EnumMakeUpStatus, LeaveCompensationStatusBadge } from "./LeaveCompensationStatusBadge";
import { mockData_MakeUpLessonRequest } from "./mockDatas";

export default function LeaveCompensationTable() {
    // const query = useMyReactQuery({
    //     queryKey: [`LeaveCompensationRead`],
    //     axiosFn: async () => 
    // })

    const query = useQuery<I_MakeUpLessonRequest[]>({
        queryKey: ["LeaveCompensationRead"],
        queryFn: async () => mockData_MakeUpLessonRequest
    })

    const columns: MRT_ColumnDef<I_MakeUpLessonRequest>[] = [
        {
            header: "Mã đơn nghỉ phép gốc",
            accessorKey: "code",
            size: 120
        },
        {
            header: "Mã học sinh",
            accessorKey: "studentCode",
            size: 120
        },
        {
            header: "Họ và tên HS",
            accessorKey: "name",
            size: 170
        },
        {
            header: "Lớp/Môn học chính",
            accessorKey: "subject",
            size: 120
        },
        {
            header: "Ngày/Buổi học bị vắng",
            accessorFn: row => utils_date_dateToDDMMYYYString(row.absenceDate),
            accessorKey: "absenceDate",
            size: 120
        },
        {
            header: "Lý do nghỉ",
            accessorKey: "reason"
        },
        {
            header: "Trạng thái bù",
            accessorFn: (row) => LeaveCompensationStatusBadge({ status: row.makeUpStatus as EnumMakeUpStatus }),
            accessorKey: "makeUpStatus"
        },
        {
            header: "Chọn buổi",
            id: "selectMakeUpSlot",
            accessorFn: () => (
                <MyCenterFull>
                    <LeaveCompensationPickSessionModal />
                </MyCenterFull>
            )
        }
    ];

    return (
        <MyFieldset title={"Danh sách cần xử lý bù"}>
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
            />
        </MyFieldset>
    )
}
