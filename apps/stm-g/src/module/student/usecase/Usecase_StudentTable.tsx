import { Group, TextInput } from "@mantine/core"
import { MyDataTable } from "aq-fe-framework/components"
import { MyButton } from "aq-fe-framework/core"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"

export interface StudentTableDomain {
    studentCode?: string,
    studentName?: string
    parentPhoneNumber?: string,
    studentStatus?: string,
    tickerByMonth?: {
        monthName?: string,
        count?: number
    }[],
    tickerTransferCount?: number
    remainingTickerCount?: number,
    totalTicker?: number
    quarterlyBonus?: string
}

interface Usecase_StudentTableProps {
    data: StudentTableDomain[]
}
export default function Usecase_StudentTable({
    data
}: Usecase_StudentTableProps) {
    const dynamicMonthColumns = useMemo(() => {
        const monthSet = new Set<string>();

        data.forEach((student) => {
            student.tickerByMonth?.forEach((entry) => {
                if (entry.monthName) {
                    monthSet.add(entry.monthName);
                }
            });
        });

        return Array.from(monthSet).sort().map((monthName) => ({
            header: monthName,
            id: monthName,
            accessorFn: (row: StudentTableDomain) =>
                row.tickerByMonth?.find((m) => m.monthName === monthName)?.count ?? 0,
        }));
    }, [data]);

    const columns = useMemo<MRT_ColumnDef<StudentTableDomain>[]>(() => [
        { header: "Mã học sinh", accessorKey: "studentCode" },
        { header: "Họ và tên", accessorKey: "studentName" },
        { header: "SĐT Phụ huynh", accessorKey: "parentPhoneNumber" },
        { header: "Trạng thái", accessorKey: "studentStatus" },
        ...dynamicMonthColumns,
        { header: "Số ticker đã đổi", accessorKey: "tickerTransferCount" },
        { header: "Số ticker còn lại", accessorKey: "remainingTickerCount" },
        { header: "Tổng ticker", accessorKey: "totalTicker" },
        { header: "Khen thưởng Quý", accessorKey: "quarterlyBonus", accessorFn: () => <TextInput /> }
    ], [dynamicMonthColumns]);

    return (
        <MyDataTable
            columns={columns}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <MyButton actionType="save" />
                    <MyButton actionType="export" />
                    <MyButton actionType="delete" />
                </Group>
            )}
            data={data || []}
        />
    )
}
