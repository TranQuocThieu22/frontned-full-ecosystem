import { MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { ComponentProps, useMemo } from "react";

export interface TopicTableDomain {
    id?: number,
    topicCode?: string,
    topicName?: string,
    totalQuestion?: number,
    difficultyQuestions?: {
        difficultyName?: string,
        questionCount: number
    }[]
}

interface Usecase_TopicTableProps extends Omit<ComponentProps<typeof MyDataTable>, "columns"> {
    data: TopicTableDomain[]
    visibileColumns?: (keyof TopicTableDomain)[]
}
export default function Usecase_TopicTable({
    data,
    visibileColumns,
    ...rest
}: Usecase_TopicTableProps) {
    const difficultyNames = Array.from(
        new Set(
            data.flatMap(item => item.difficultyQuestions?.map(q => q.difficultyName) ?? [])
        )
    );
    const columns = useMemo<MRT_ColumnDef<TopicTableDomain>[]>(() => {
        const baseColumns: MRT_ColumnDef<TopicTableDomain>[] = [
            {
                header: "Mã chương",
                accessorKey: "topicCode",
            },
            {
                header: "Tên chương",
                accessorKey: "topicName",
            },
            {
                header: "Tổng số câu",
                accessorKey: "totalQuestion",
            },
        ];

        const dynamicDifficultyColumns: MRT_ColumnDef<TopicTableDomain>[] = (
            visibileColumns?.includes("difficultyQuestions")
                ? difficultyNames.map((name): MRT_ColumnDef<TopicTableDomain> => ({
                    header: name ?? "Không rõ mức độ",
                    id: name, // dùng id vì không có accessorKey
                    accessorFn: (row) => {
                        const matched = row.difficultyQuestions?.find(
                            (q) => q.difficultyName === name
                        );
                        return matched?.questionCount ?? 0;
                    },
                }))
                : []
        );

        return [...baseColumns, ...dynamicDifficultyColumns];
    }, [difficultyNames, visibileColumns]);
    return (
        <MyDataTable
            data={data}
            columns={columns}
            getRowId={(e) => e.id?.toString()}
            {...rest}
        />
    )
}
