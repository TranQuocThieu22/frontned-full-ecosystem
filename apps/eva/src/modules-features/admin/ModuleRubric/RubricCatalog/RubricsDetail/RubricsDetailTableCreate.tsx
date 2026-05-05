import { IEvaluationDetail } from "@/shared/APIs/evaluationDetailService";
import { rubricsCriteriaService } from "@/shared/APIs/rubricsCriteriaService";
import { Group } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyFieldset, MyNumberInput, MyTextArea } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { produce } from "immer";

import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import useS_Rubrics from "../useS_Rubrics";
import RubricsDetailCreate from "./RubricsDetailCreate";
import RubricsDetailDelete from "./RubricsDetailDelete";
import RubricsDetailDeleteList from "./RubricsDetailDeleteList";
import RubricsDetailUpdate from "./RubricsDetailUpdate";

export default function RubricsDetailTableCreate({ rubricId, evaluationDetailData, isLoading, isError }:
    {

        rubricId: number,
        evaluationDetailData: IEvaluationDetail[],
        isLoading: boolean,
        isError: boolean
    }) {
    const store = useS_Rubrics()
    const rubricCriteriaQuery = useMyReactQuery({
        queryKey: [`rubricCriteriaQuery`, rubricId],
        axiosFn: async () => rubricsCriteriaService.GetRubricsCriteriasByRubricsId(rubricId),
    })
    // const { data } = useQuery({
    //     queryKey: ['RubricsUpdate', 0],
    //     queryFn: () => {
    //         return mockData
    //     }
    // })
    const handleCreate = (newItem: IEvaluationDetail) => {
        const current = store.state.editedRubrics ?? [];

        // Find max id or assign negative IDs to avoid clashes
        const newId = Math.min(...current.map(x => x.id ?? 0), 0) - 1;

        const itemWithId = {
            ...newItem,
            id: newId,
        };

        store.setProperty("editedRubrics", [...current, itemWithId]);
    };

    /** Update item in editedRubrics by ID */
    const handleUpdate = (id: number, changes: Partial<IEvaluationDetail>) => {
        const current = store.state.editedRubrics ?? [];
        const updated = current.map(item =>
            item.id === id ? { ...item, ...changes } : item
        );
        store.setProperty("editedRubrics", updated);
    };

    /** Delete one or more items by ID */
    const handleDeleteList = (ids: number[]) => {
        const current = store.state.editedRubrics ?? [];
        const filtered = current.filter(item => !ids.includes(item.id));
        store.setProperty("editedRubrics", filtered);
    };
    const handleDelete = (id: number) => {
        const current = store.state.editedRubrics ?? [];
        const filtered = current.filter(item => item.id !== id);
        store.setProperty("editedRubrics", filtered);
    };
    function updateRubricField<T extends keyof any>(
        rubrics: IEvaluationDetail[],
        id: number,
        field: T,
        value: any[T]
    ): IEvaluationDetail[] {
        return rubrics.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
        const editedRubrics = store.state.editedRubrics ?? [];

        return [
            {
                header: "Mã tiêu chí",
                accessorKey: "code",
            },
            {
                header: "Tên tiêu chí",
                accessorKey: "name",
            },
            {
                header: "Tỉ trọng",
                accessorKey: "density",
                size: 50,
                accessorFn(originalRow) {

                    return (
                        <MyNumberInput
                            allowNegative={false}
                            max={100}
                            suffix=" %"
                            hideControls
                            defaultValue={originalRow.density}
                            onBlur={(event) => {
                                let inputValue = (event.target as HTMLInputElement).value;
                                // Remove any non-digit or non-dot characters (like %)
                                let numericString = inputValue.replace(/[^\d.]/g, "");
                                let numericValue = Math.min(Number(numericString), 100);
                                if (numericValue < 0) numericValue = 0;
                                const updated = updateRubricField(
                                    editedRubrics,
                                    originalRow.id,
                                    "density",
                                    numericValue);
                                store.setProperty("editedRubrics", updated);
                            }}
                        ></MyNumberInput >

                    )
                },

            },
            // {
            //     header: "Xuất sắc 100%",
            //     accessorKey: "excellent",
            //     accessorFn(originalRow) {
            //         return (
            //             <Textarea
            //                 defaultValue={originalRow.excellent}
            //                 onBlur={(event) => {
            //                     const inputValue = (event.target as HTMLTextAreaElement).value;
            //                     const updated = updateRubricField(
            //                         editedRubrics,
            //                         originalRow.id,
            //                         "excellent",
            //                         inputValue);
            //                     store.setProperty("editedRubrics", updated);
            //                 }}
            //             />
            //         )
            //     },
            // },
            ...(evaluationDetailData
                .map((evaluationDetail, index) => ({
                    header: evaluationDetail.name ?? "",
                    accessorKey: `${evaluationDetail.id}`,
                    accessorFn: (row: any) => {
                        if (!row) return null;

                        // Find the detail for this evaluationDetail in the current row
                        const currentDetail = row.evaRubricsCriteriaDetails?.find(
                            (detail: any) => detail.evaEvaluationId === evaluationDetail.id
                        );
                        return (
                            <MyTextArea
                                defaultValue={currentDetail?.description || ""}
                                onBlur={(event) => {
                                    const inputValue = (event.target as HTMLTextAreaElement).value;
                                    const descriptionValue = inputValue !== undefined && inputValue !== null ? inputValue : " ";

                                    // Always ensure evaRubricsCriteriaDetails contains all evaluationDetailData
                                    const newEvaRubricsCriteriaDetails = produce(
                                        row.evaRubricsCriteriaDetails ?? [],
                                        (draft: any) => {
                                            const existingIndex = draft.findIndex(
                                                (detail: any) => detail.evaEvaluationDetailId === evaluationDetail.id
                                            );

                                            if (existingIndex !== -1) {
                                                draft[existingIndex].description = descriptionValue;
                                            } else {
                                                draft.push({
                                                    id: 0,
                                                    code: evaluationDetail.code || '',
                                                    name: evaluationDetail.name || '',
                                                    concurrencyStamp: 'string',
                                                    isEnabled: true,
                                                    description: descriptionValue,
                                                    evaRubricsCriteriaId: null,
                                                    evaEvaluationDetailId: evaluationDetail.id,
                                                });
                                            }
                                        }
                                    );


                                    const currentRubrics = store.state.editedRubrics ?? [];
                                    const updatedRubrics = produce(currentRubrics, (draft) => {
                                        const rubric = draft.find((r) => r.id === row.id);
                                        if (!rubric) return;
                                        rubric.evaRubricsCriteriaDetails = newEvaRubricsCriteriaDetails;
                                    });

                                    store.setProperty("editedRubrics", updatedRubrics);
                                }}
                            />
                        );
                    },
                })) ?? [])
        ]
    }, [evaluationDetailData, store.state.editedRubrics]);

    useEffect(() => {
        if (rubricCriteriaQuery.data) {
            store.setProperty("editedRubrics", rubricCriteriaQuery.data);
        }
    }, [rubricCriteriaQuery.data]);
    // useEffect(() => {
    //     if (tempCriteriaDetail) {
    //         store.setProperty("editedRubricsDetail", tempCriteriaDetail);
    //         console.log('====================================');
    //         console.log(tempCriteriaDetail);
    //         console.log('====================================');

    //     }
    // }, [tempCriteriaDetail]);
    return (
        <MyFieldset w="100%" title="Danh mục rubrics">
            <MyDataTable
                isLoading={isLoading}
                isError={isError}
                columns={columns}
                data={store.state.editedRubrics || []}
                enableRowSelection
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <RubricsDetailCreate onCreate={handleCreate} />
                        <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                        <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                        <RubricsDetailDeleteList
                            values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)}
                            onDeleleList={handleDeleteList}
                        />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <Group>
                        <RubricsDetailUpdate
                            values={row.original}
                            onUpdate={(updatedItem) => {
                                if (typeof updatedItem.id === "number") {
                                    // Ensure 'note' is never null, only string or undefined
                                    const safeItem = {
                                        ...updatedItem,
                                        note: updatedItem.note === null ? undefined : updatedItem.note,
                                    };
                                    handleUpdate(updatedItem.id, safeItem);
                                }
                            }}
                        />
                        <RubricsDetailDelete code={row.original.code} id={row.original.id} ondelete={handleDelete} />
                    </Group>
                )}
            />
        </MyFieldset>
    )
}
const mockData: any[] = [
    {
        id: 1,
        code: "TC001",
        name: "Phân tích yêu cầu và xác định thực thể/thuộc tính",
        density: 25,
        excellent: `Phân tích đầy đủ, chính xác yêu cầu nghiệp vụ, xác định tất cả các thực thể, thuộc tính và mối quan hệ quan trọng một cách rõ ràng, logic, không thừa/thiếu`,
        good: `Phân tích khá đầy đủ, xác định được hầu hết các thực thể/ thuộc tính quan trọng. Có thể thiếu sót nhỏ hoặc có vài yếu tố chưa tối ưu.`,
        average: `Phân tích một phần yêu cầu. Xác định được một số thực thể/thuộc tính cơ bản nhưng còn thiếu sót đáng kể hoặc có nhiều yếu tố không cần thiết/chưa chính xác.`,
        bad: `Phân tích thiếu sót trầm trọng. Xác định thực thể/ thuộc tính sai lệch hoặc không đầy đủ; không đảm bảo logic, không đáp ứng yêu cầu cơ bản`,
        veryBad: `Không thể hiện được khả năng phân tích yêu cầu hoặc xác định thực thể/thuộc tính`,
    },
]