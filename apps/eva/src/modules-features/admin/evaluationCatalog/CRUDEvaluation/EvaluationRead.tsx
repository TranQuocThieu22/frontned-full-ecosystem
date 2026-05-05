'use client'
import { IEvaluation, evaluationService } from "@/shared/APIs/evaluationService";
import { Group } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvaluationDetailRead from "../CRUDEvaluationDetail/EvaluationDetailRead";
import EvaluationCreate from "./EvaluationCreate";
import EvaluationDelete from "./EvaluationDelete";
import EvaluationDeleteList from "./EvaluationDeleteList";
import EvaluationUpdate from "./EvaluationUpdate";

export default function EvaluationRead() {


    const queryEvaluation = useMyReactQuery({
        queryKey: [`EvaluationRead`],
        axiosFn: async () => evaluationService.getAll()
    })
    // const queryEvaluation = useQuery<IEvaluationInfoViewModel[]>({
    //     queryKey: ["EvaluationRead"],
    //     queryFn: () => {
    //         return mockData || [];
    //     },
    // });

    const columns = useMemo<MRT_ColumnDef<IEvaluation>[]>(() => [
        { header: "Mã thang đo", accessorKey: "code" },
        { header: "Tên thang đo", accessorKey: "name" },
        { header: "Ghi chú", accessorKey: "note" },
        {
            header: "Mức độ đo", accessorKey: "mucDoDo",
            accessorFn: (row) => {
                return <EvaluationDetailRead data={row} />;
            }
        },
    ], []);
    return (
        <MyFieldset title={`Danh mục thang đo đánh giá`}>
            <MyFlexColumn>
                <MyDataTable
                    isLoading={queryEvaluation.isLoading}
                    isError={queryEvaluation.isError}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <EvaluationCreate />
                            <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                            <EvaluationDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </Group>
                    )}
                    columns={columns}
                    data={queryEvaluation.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <EvaluationUpdate data={row.original} />
                            <EvaluationDelete id={row.original.id!} code={row.original.code!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

