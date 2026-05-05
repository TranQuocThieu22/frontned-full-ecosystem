'use client'
import { SimpleGrid } from "@mantine/core";
import { IconBox, IconChartBar, IconShare, IconTags } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MySelect } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StatisticsCards from "./StatisticsCards";

export interface StudentTicket {
    order: number;
    studentCode: string;
    fullName: string;
    className: string;
    ticketCount: number;
}

export default function TrackCirculatingTickersTable() {

    const columns = useMemo<MRT_ColumnDef<StudentTicket>[]>(
        () => [
            {
                accessorKey: 'order',
                header: 'TT',
                size: 50,
            },
            {
                accessorKey: 'studentCode',
                header: 'Mã học viên',
            },
            {
                accessorKey: 'fullName',
                header: 'Họ và tên học viên',
            },
            {
                accessorKey: 'className',
                header: 'Lớp',
            },
            {
                accessorKey: 'ticketCount',
                header: 'Số lượng ticket',
            },
        ], []
    );

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }} mb={32}>
                <StatisticsCards
                    title="Tổng"
                    value="1520"
                    icons={<IconChartBar opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <StatisticsCards
                    title="Ticker"
                    value="520"
                    icons={<IconTags opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <StatisticsCards
                    title="Ticker lưu hành"
                    value={"263"}
                    icons={<IconShare opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <StatisticsCards
                    title="Ticker tồn"
                    value={"683"}
                    icons={<IconBox opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
            </SimpleGrid>
            <MyFieldset title="Danh sách phát ticker lưu hành" >
                <MyDataTable
                    enableRowSelection
                    enableRowNumbers={false}
                    columns={columns}
                    data={studentTickets}
                    renderTopToolbarCustomActions={() => {
                        return (
                            <>
                                <MySelect data={["7A1", "7A2", "7A3", "7A4", "7A5"]} defaultValue={"7A1"} />
                                <MyButton crudType="export" />
                            </>
                        )
                    }}
                />
            </MyFieldset>
        </>
    )
}

export const studentTickets: StudentTicket[] = [
    {
        order: 1,
        studentCode: "HS00101",
        fullName: "Nguyễn An Bình",
        className: "Toán 7A",
        ticketCount: 50,
    },
    {
        order: 2,
        studentCode: "HS00102",
        fullName: "Lê Minh Duy",
        className: "Toán 7A",
        ticketCount: 150,
    },
    {
        order: 3,
        studentCode: "HS00103",
        fullName: "Phạm Thị Linh",
        className: "Toán 7A",
        ticketCount: 60,
    },
    {
        order: 4,
        studentCode: "HS00104",
        fullName: "Võ Hoàng Anh",
        className: "Toán 7A",
        ticketCount: 200,
    },
    {
        order: 5,
        studentCode: "HS00105",
        fullName: "Đặng Thị Nga",
        className: "Toán 7A",
        ticketCount: 0,
    },
];


