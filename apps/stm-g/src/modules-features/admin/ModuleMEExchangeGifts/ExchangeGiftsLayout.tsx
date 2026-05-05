import MyButtonDeleteList from "@/components/Buttons/ButtonCRUD/MyButtonDeleteList";
import { Button, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBox, IconChartBar, IconTableExport, IconTags, IconUser } from "@tabler/icons-react";
import { AQButtonCreateByImportFile, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ExchangeGiftsCreate from "./ExchangeGiftsCreate";
import ExchangeGiftsDelete from "./ExchangeGiftsDelete";
import ExchangeGiftsUpdate from "./ExchangeGiftsUpdate";
import StatisticsCards from "./StatisticsCards";

export interface IExchangeGifts {
    id: number;
    code: string;
    exchangeTime: string;
    studentCode: string;
    studentName: string;
    initialTickets: number;
    gift: IGiftItem;
    remainingTickets: number;
    staffName: string;
}

export interface IGiftItem {
    id: number;
    code: string;
    name: string;
    sticker: number;
    stock: number;
}

export interface IStudent {
    id: number,
    code: string,
    name: string,
    totalTickets: number,
}

export default function ExchangeGiftsLayout() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    const columns = useMemo<MRT_ColumnDef<IExchangeGifts>[]>(() => [
        {
            header: "Thời gian đổi",
            accessorKey: "exchangeTime",
        },
        {
            header: "Mã học sinh",
            accessorKey: "studentCode",
        },
        {
            header: "Họ và tên học sinh",
            accessorKey: "studentName",
            size: 250
        },
        {
            header: "Tổng số ticker ban đầu",
            accessorKey: "initialTickets",
        },
        {
            header: "Mã quà",
            accessorKey: "gift.code",
        },
        {
            header: "Tên quà",
            accessorKey: "gift.name",
            size: 250
        },
        {
            header: "Số lượng ticker quy đổi",
            accessorKey: "gift.sticker",
        },
        {
            header: "Số lượng hiện có (trong kho)",
            accessorKey: "gift.stock",
        },
        {
            header: "Số ticker còn lại",
            accessorKey: "remainingTickets",
        },
        {
            header: "Người thực hiện",
            accessorKey: "staffName",
            size: 250
        },
    ], []);

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }} mb={32}>
                <StatisticsCards
                    title="Tổng quà"
                    value="1520"
                    icons={<IconChartBar opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <StatisticsCards
                    title="Quà đã đổi"
                    value="520"
                    icons={<IconTags opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <StatisticsCards
                    title="Số sinh viên đổi"
                    value={"263"}
                    icons={<IconUser opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <StatisticsCards
                    title="Quà tồn kho"
                    value={"683"}
                    icons={<IconBox opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
            </SimpleGrid>
            <MyFieldset title="Danh sách đổi quà">
                <MyDataTable
                    columns={columns}
                    data={mockData}
                    enableRowSelection={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <ExchangeGiftsCreate />
                                <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} setImportedData={setImportData} />
                                <Button
                                    leftSection={<IconTableExport />}
                                    color="teal"
                                    size="sm"
                                    radius="sm"
                                >
                                    Export
                                </Button>
                                <MyButtonDeleteList
                                    disabled={table.getSelectedRowModel().rows.length === 0}
                                    contextData={table.getSelectedRowModel().rows.map((item) => item.original.code).join(", ")}
                                    onSubmit={() => { }}
                                />
                            </>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <ExchangeGiftsUpdate values={row.original} />
                                <ExchangeGiftsDelete id={row.original.id} code={row.original.code} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFieldset>
        </>
    );
}


const mockData: IExchangeGifts[] = [
    {
        id: 1,
        code: "EXG001",
        exchangeTime: "15/07/2025 15:45:00",
        studentCode: "HS00101",
        studentName: "Nguyễn An Bình",
        initialTickets: 100,
        gift: {
            id: 1,
            code: "QUA001",
            name: "Bút chì màu cao cấp",
            sticker: 50,
            stock: 50
        },
        remainingTickets: 50,
        staffName: "Nguyễn Thị Lan (Lễ tân)"
    },
    {
        id: 2,
        code: "EXG002",
        exchangeTime: "15/07/2025 16:00:00",
        studentCode: "HS00102",
        studentName: "Lê Minh Duy",
        initialTickets: 50,
        gift: {
            id: 2,
            code: "QUA005",
            name: "Móc khóa hình thú dễ thương",
            sticker: 20,
            stock: 150
        },
        remainingTickets: 30,
        staffName: "Trần Văn Hùng (QLĐT)"
    },
    {
        id: 3,
        code: "EXG003",
        exchangeTime: "14/07/2025 10:30:00",
        studentCode: "HS00103",
        studentName: "Phạm Thị Linh",
        initialTickets: 200,
        gift: {
            id: 3,
            code: "QUA004",
            name: "Bình nước giữ nhiệt 500ml",
            sticker: 80,
            stock: 60
        },
        remainingTickets: 120,
        staffName: "Nguyễn Thị Lan (Lễ tân)"
    },
    {
        id: 4,
        code: "EXG004",
        exchangeTime: "14/07/2025 11:15:00",
        studentCode: "HS00104",
        studentName: "Võ Hoàng Anh",
        initialTickets: 350,
        gift: {
            id: 4,
            code: "QUA003",
            name: "Bộ đồ dùng học tập",
            sticker: 150,
            stock: 30
        },
        remainingTickets: 200,
        staffName: "Trần Văn Hùng (QLĐT)"
    },
    {
        id: 5,
        code: "EXG005",
        exchangeTime: "13/07/2025 09:00:00",
        studentCode: "HS00105",
        studentName: "Đặng Thị Nga",
        initialTickets: 500,
        gift: {
            id: 5,
            code: "QUA008",
            name: "Balo học sinh",
            sticker: 500,
            stock: 5
        },
        remainingTickets: 0,
        staffName: "Nguyễn Thị Lan (Lễ tân)"
    }
];
