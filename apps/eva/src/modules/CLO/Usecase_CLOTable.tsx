import { MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { ComponentProps, useMemo } from "react";

export interface TopicTableDomain {
    id?: number,
    cloCode?: string,
    cloName?: string,
    totalQuestion?: number,
    difficultyQuestions?: {
        difficultyName?: string,
        questionCount: number
    }[]
}

interface Props extends Omit<ComponentProps<typeof MyDataTable>, "columns"> {
    data: TopicTableDomain[]
}
export default function Usecase_CLOTable({
    data,
    ...rest
}: Props) {
    const difficultyNames = Array.from(
        new Set(
            data.flatMap(item => item.difficultyQuestions?.map(q => q.difficultyName) ?? [])
        )
    );
    const columns = useMemo<MRT_ColumnDef<TopicTableDomain>[]>(() => [
        {
            header: "Mã CLO",
            accessorKey: "cloCode",
        },
        {
            header: "Tên CLO",
            accessorKey: "cloName"
        },
        {
            header: "Tổng số câu",
            accessorKey: "totalQuestion",
        },
        ...difficultyNames.map((name) => ({
            header: name ?? "Không rõ mức độ",
            id: name, // dùng id vì dữ liệu là custom
            accessorFn: (row) => {
                const matched = row.difficultyQuestions?.find(q => q.difficultyName === name);
                return matched?.questionCount ?? 0;
            },
        })) as MRT_ColumnDef<TopicTableDomain>[],
    ], [])
    return (
        <MyDataTable
            data={data}
            columns={columns}
            getRowId={(e) => e.id?.toString()}
            {...rest}
        />
    )
}
