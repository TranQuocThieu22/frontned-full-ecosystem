'use client'
import { IDifficulty, difficultyService } from "@/shared/APIs/difficultyService";
import { Group } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DifficultyLevelRead from "../CRUDDifficultyDetail/DifficultyDetailRead";
import DifficultyCreate from "./DifficultyCreate";
import DifficultyDelete from "./DifficultyDelete";
import DifficultyDeleteList from "./DifficultyDeleteList";
import DifficultyUpdate from "./DifficultyUpdate";

export default function DifficultyRead() {

    // const queryDifficulty = useQuery<IDifficultyInfoViewModel[]>({
    //     queryKey: ["DifficultyRead"],
    //     queryFn: () => {
    //         return mockData || [];
    //     },
    // });
    const queryDifficulty = useMyReactQuery({
        queryKey: [`DifficultyRead`],
        axiosFn: async () => difficultyService.getAll()
    })
    const columns = useMemo<MRT_ColumnDef<IDifficulty>[]>(() => [
        { header: "Mã thang đo", accessorKey: "code" },
        { header: "Tên thang đo", accessorKey: "name" },
        { header: "Ghi chú", accessorKey: "note" },
        {
            header: "Mức độ đo", accessorKey: "mucDoDo",
            accessorFn: (row) => {
                return <DifficultyLevelRead evaDifficultyId={row.id!} difficultData={row} />;
            }
        },
    ], []);

    return (
        <MyFieldset title={`Danh mục thang đo độ khó`}>
            <MyFlexColumn>
                <MyDataTable
                    isLoading={queryDifficulty.isLoading}
                    isError={queryDifficulty.isError}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <DifficultyCreate />
                            <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                            <DifficultyDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </Group>
                    )}
                    columns={columns}
                    data={queryDifficulty.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <DifficultyUpdate data={row.original} />
                            <DifficultyDelete id={row.original.id!} code={row.original.code!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

