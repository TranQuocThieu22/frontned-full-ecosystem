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

export default function RubricsDetailTableUpdate({ rubricId, evaluationDetailData, isLoading, isError }:
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

        store.setProperty("editedRubrics", [...current, newItem]);
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
        const deleted = current.filter(item => ids.includes(item.id));
        store.setProperty("editedRubrics", filtered);
        // Add deleted items to deletedItems array in store.state
        const prevDeleted = store.state.deletedItems ?? [];
        store.setProperty("deletedItems", [...prevDeleted, ...deleted]);
    };
    const handleDelete = (ids: number) => {
        const current = store.state.editedRubrics ?? [];
        const filtered = current.filter(item => item.id !== ids);
        const deleted = current.filter(item => item.id === ids);
        store.setProperty("editedRubrics", filtered);
        // Add deleted items to deletedItems array in store.state
        const prevDeleted = store.state.deletedItems ?? [];
        store.setProperty("deletedItems", [...prevDeleted, ...deleted]);
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

        const staticColumns: MRT_ColumnDef<any>[] = [
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
        ];

        const dynamicColumns: MRT_ColumnDef<any>[] =
            (!evaluationDetailData || evaluationDetailData.length <= 0)
                ? []
                : evaluationDetailData.map((evaluationDetail) => ({
                    header: evaluationDetail.name ?? "",
                    accessorKey: `evaluation_${evaluationDetail.id}`,
                    accessorFn: (row: any) => {
                        if (!row) return null;

                        console.log('====================================');
                        console.log(evaluationDetail.code);
                        console.log('====================================');

                        // Find the matching criteria detail based on evaluation detail name/code
                        const matchingCriteriaDetail = row.evaRubricsCriteriaDetails?.find(
                            (d: any) => d.name === evaluationDetail.name || d.code === evaluationDetail.code
                        );

                        const description = matchingCriteriaDetail?.description ?? "";

                        return (
                            <MyTextArea
                                defaultValue={description}
                                onBlur={(event) => {
                                    const inputValue = (event.target as HTMLTextAreaElement).value;
                                    if (!inputValue) return;

                                    const newCriteriaDetail = {
                                        // Use the matching criteria detail's properties if it exists
                                        code: matchingCriteriaDetail?.code ?? evaluationDetail.code,
                                        name: evaluationDetail.name,
                                        concurrencyStamp: 'string',
                                        isEnabled: true,
                                        description: inputValue,
                                        evaRubricsCriteriaId: row.id, // This should be the rubric's ID
                                        evaEvaluationDetailId: evaluationDetail.id
                                    };
                                    console.log('newCriteriaDetail', newCriteriaDetail);

                                    const currentRubrics = store.state.editedRubrics ?? [];

                                    const updatedRubrics = produce(currentRubrics, (draft) => {
                                        const rubric = draft.find((r) => r.id === row.id);
                                        if (!rubric) return;

                                        if (!rubric.evaRubricsCriteriaDetails) {
                                            rubric.evaRubricsCriteriaDetails = [];
                                        }

                                        // Find existing by matching name/code with evaluation detail
                                        const existing = rubric.evaRubricsCriteriaDetails.find(
                                            (d: any) => d.name === evaluationDetail.name || d.code === evaluationDetail.code
                                        );

                                        if (existing) {
                                            existing.description = inputValue;
                                            existing.evaEvaluationDetailId = evaluationDetail.id
                                        } else {
                                            rubric.evaRubricsCriteriaDetails.push(newCriteriaDetail);
                                        }
                                    });

                                    store.setProperty("editedRubrics", updatedRubrics);
                                }}
                            />
                        );
                    },
                }));

        return [...staticColumns, ...dynamicColumns];
    }, [evaluationDetailData, store.state.editedRubrics, rubricCriteriaQuery.data]);

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