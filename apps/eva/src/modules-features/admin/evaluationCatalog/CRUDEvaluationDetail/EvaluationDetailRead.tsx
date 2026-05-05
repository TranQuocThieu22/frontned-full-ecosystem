'use client'
import { IEvaluationDetail, evaluationDetailService } from "@/shared/APIs/evaluationDetailService";
import { IEvaluation } from "@/shared/APIs/evaluationService";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { MyButton, MyButtonModal, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvaluationDetailCreate from "./EvaluationDetailCreate";
import EvaluationDetailDelete from "./EvaluationDetailDelete";
import EvaluationDetailDeleteList from "./EvaluationDetailDeleteList";
import EvaluationDetailUpdate from "./EvaluationDetailUpdate";

export default function EvaluationDetailRead({ data }: { data: IEvaluation }) {
    const dis = useDisclosure(false);
    const queryEvaluationDetail = useMyReactQuery({
        queryKey: [`EvaluationDetailRead ${data.id}`],
        axiosFn: async () => evaluationDetailService.GetEvaluationDetailsByEvaluationId({ param: `EvaluationId=${data.id}` }),
        options: {
            enabled: dis[0],
            refetchOnWindowFocus: false
        }
    })


    const columns = useMemo<MRT_ColumnDef<IEvaluationDetail>[]>(() => [
        { header: "Mã mức độ", accessorKey: "code" },
        { header: "Tên mức độ", accessorKey: "name" },
        {
            header: "Tỷ lệ điểm", accessorKey: "density",
            accessorFn: (row) => {
                return `${row.density}%`;
            }
        },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);

    return (
        <MyButtonModal
            variant="transparent"
            crudType="default"
            label="Chi tiết"
            disclosure={dis} title="Chi tiếc mức độ đo"
            modalSize={"90%"}>
            <Group mb="md" align="center" gap="xs">
                <Text fw={700} size="lg" >
                    Thang đo:
                </Text>
                <Text size="lg">
                    {data.name}
                </Text>
            </Group>
            <MyFieldset title={`Danh sách mức độ đo`}>
                <MyFlexColumn>
                    <MyDataTable
                        isLoading={queryEvaluationDetail.isLoading}
                        isError={queryEvaluationDetail.isError}
                        enableRowSelection={true}
                        enableRowNumbers={true}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <EvaluationDetailCreate data={data} />
                                <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                                <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                                <EvaluationDetailDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                            </Group>
                        )}
                        columns={columns}
                        data={queryEvaluationDetail.data || []}
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <EvaluationDetailUpdate data={row.original} />
                                <EvaluationDetailDelete id={row.original.id!} code={row.original.code!} />
                            </MyCenterFull>
                        )}
                    />
                </MyFlexColumn>
            </MyFieldset>
        </MyButtonModal>
    );
}
