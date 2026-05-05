'use client'
import { Group } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import MeasurementLevelRead from "../MeasurementLevelDetail/MeasurementLevelRead";
import AssessmentScaleCreate from "./AssessmentScaleCreate";
import AssessmentScaleDelete from "./AssessmentScaleDelete";
import AssessmentScaleDeleteList from "./AssessmentScaleDeleteList";
import AssessmentScaleUpdate from "./AssessmentScaleUpdate";
import { IAssessmentScaleInfoViewModel } from "./interfaces/InfoInterfaces";

export default function AssessmentScaleRead() {
    
    const queryAssessmentScale = useQuery<IAssessmentScaleInfoViewModel[]>({
        queryKey: ["AssessmentScaleRead"],
        queryFn: () => {
            return mockData || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<IAssessmentScaleInfoViewModel>[]>(() => [
        { header: "Mã thang đo", accessorKey: "maThangDo" },
        { header: "Tên thang đo", accessorKey: "tenThangDo" },
        { header: "Ghi chú", accessorKey: "ghiChu" },
        {
            header: "Mức độ đo", accessorKey: "mucDoDo",
            accessorFn: (row) => {
                return <MeasurementLevelRead />;
            }
        },
    ], []);

    if (queryAssessmentScale.isLoading) return "Loading...";
    if (queryAssessmentScale.isError) return 'Không có dữ liệu...';

    return (
        <MyFieldset title={`Danh mục thang đo đánh giá`}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <AssessmentScaleCreate />
                            <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                            <AssessmentScaleDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </Group>
                    )}
                    columns={columns}
                    data={queryAssessmentScale.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <AssessmentScaleUpdate data={row.original} />
                            <AssessmentScaleDelete id={row.original.id!} code={row.original.maThangDo!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: IAssessmentScaleInfoViewModel[] = [
    {
        id: 1,
        maThangDo: "5bacCL",
        tenThangDo: "5 bậc chất lượng",
        ghiChu: '',
    },
];