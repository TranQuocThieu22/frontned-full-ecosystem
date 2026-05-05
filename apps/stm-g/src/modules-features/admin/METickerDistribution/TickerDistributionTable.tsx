'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table"; // Assuming this is used for column definitions
import { useState } from "react";
import { I_TickerDistribution } from "./interfaces";
import { useForm } from "@mantine/form";
import FeeDeclarationCreateUpdateModal from "./TickerDistributionCreateUpdateModal";
import TickerDistributionDeleteButton from "./TickerDistributionDeleteButton";
import TickerDistributionDeleteListButton from "./TickerDistributionDeleteListButton";
import { mockData_StudentReward } from "./mockDatas";
import { utils_date_formatToDateTimeString } from "@/utils/date";

export default function TickerDistributionTable() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // const query = useMyReactQuery({
    //     queryKey: [`TickerDistributionRead`],
    //     axiosFn: async () => 
    // })

    const query = useQuery<I_TickerDistribution[]>({
        queryKey: ["TickerDistributionRead"],
        queryFn: async () => mockData_StudentReward
    })

    const columns: MRT_ColumnDef<I_TickerDistribution>[] = [
        {
            header: "Thời gian ghi nhận",
            accessorFn: row => utils_date_formatToDateTimeString(new Date(row.recordedAt)),
            id: "recordedAt"
        },
        {
            header: "Người thực hiện",
            accessorKey: "performer"
        },
        {
            header: "Mã học sinh",
            accessorKey: "studentCode"
        },
        {
            header: "Tên học sinh",
            accessorKey: "studentName"
        },
        {
            header: "Lớp",
            accessorKey: "className"
        },
        {
            header: "Loại khen thưởng",
            accessorKey: "rewardType"
        },
        {
            header: "Số lượng Ticker phát",
            accessorKey: "ticketAmount",
            size: 100,
            accessorFn(row) {
                return (<MyCenterFull>
                    {row.ticketAmount}
                </MyCenterFull>)
            },
        },
        {
            header: "Ghi chú/Lý do khen thưởng",
            accessorKey: "reason",
            size: 280
        }
    ];


    return (
        <MyFieldset title={"Danh sách phát ticker"}>
            <MyDataTable
                columns={columns}
                data={query.data || []}
                enableRowSelection
                enableColumnPinning
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 30 },
                    columnPinning: {
                        right: ["mrt-row-actions"]
                    }
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original) || [];

                    return (<MyCenterFull>
                        <FeeDeclarationCreateUpdateModal />
                        <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} setImportedData={setImportData} />
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
                        <TickerDistributionDeleteListButton values={selectedRows} />
                    </MyCenterFull>);
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <FeeDeclarationCreateUpdateModal values={row.original} />
                            <TickerDistributionDeleteButton code={row.original.studentCode || ""} id={row.original.id} />
                        </MyCenterFull>)
                }}
            />
        </MyFieldset>
    )
}
