import { COEIRMService } from "@/api/services/COEIRMService";
import { service_COEGrade } from "@/api/services/service_COEGrade";
import IRMApplyByGradeExportButton from "@/features/admin/UncategorizedModules/IRM-applied-by-course/IRMApplyByGradeExportButton";
import IRMApplyByGradeImportButton from "@/features/admin/UncategorizedModules/IRM-applied-by-course/IRMApplyByGradeImportButton";
import IRMApplyByGradeRemoveIRMButton from "@/features/admin/UncategorizedModules/IRM-applied-by-course/IRMApplyByGradeRemoveIRMButton";
import IRMApplyManyButton from "@/features/admin/UncategorizedModules/IRM-applied-by-course/IRMApplyManyButton";
import IRMApplySaveButton from "@/features/admin/UncategorizedModules/IRM-applied-by-course/IRMApplySaveButton";
import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo, useState } from "react";


export default function IRMApplyByGradeTable() {
    const [dataChange, setDataChange] = useState<COEGrade[]>([]);

    const GradesQuery = useCustomReactQuery({
        queryKey: ["grades"],
        axiosFn: () => service_COEGrade.getAll({
            cols: ["COEProgram", "COEIRM"]
        }),
        options: {
            refetchOnWindowFocus: false
        }
    })

    const IRMListQuery = useCustomReactQuery({
        queryKey: ["IRMs"],
        axiosFn: () => COEIRMService.getAll(),
        options: {
            refetchOnWindowFocus: false
        }
    })

    const IRMOption = useMemo(() => {
        return IRMListQuery.data?.map((IRM) => ({
            value: String(IRM.id),
            label: `${IRM.code}`,
            name: String(IRM.name)
        })) || []
    }, [IRMListQuery.data])

    const mergeById = <T extends { id?: number }>(prev: T[], incoming: T[]): T[] => {
        const map = new Map(prev.map(item => [item.id, item]));

        incoming.forEach(item => {
            map.set(item.id, { ...map.get(item.id), ...item });
        });

        return Array.from(map.values());
    };


    const gradeColumn = useMemo<CustomColumnDef<COEGrade>[]>(() => [
        {
            header: "Mã khóa",
            accessorKey: "code",
        },
        {
            header: "Tên khóa",
            accessorKey: "name"
        },
        {
            header: "Chương trình",
            accessorKey: "coeProgram.name"
        },
        {
            header: "Khoa",
            accessorKey: "coeProgram.department.name",
        },
        {
            header: "Mã thang do IRM",
            accessorKey: "coeirmCode",
            accessorFn: (row) => row.coeirm?.code ?? "",
            Cell: ({ row }) => {
                return <>
                    <CustomSelect
                        data={IRMOption}
                        clearable
                        key={`${row.original.id}-${row.original.coeirmId}`}
                        defaultValue={String(row.original.coeirmId)}
                        onChange={(value, option) => {
                            const newCoeirmId = value ? Number(value) : undefined;
                            row.original.coeirm = value ? { name: (option as any).name } : { name: "" };
                            setDataChange(prev =>
                                mergeById(prev, [{
                                    ...row.original,
                                    coeirmId: newCoeirmId,
                                }])
                            );
                        }}
                    />
                </>
            }
        },
        {
            header: "Tên thang đo IRM",
            accessorKey: "coeirm.name",
            Cell: ({ row }) => row.original.coeirm?.name
        },

    ], [IRMOption]);

    return <>
        <CustomDataTable
            enableRowSelection
            data={GradesQuery.data || []}
            isError={GradesQuery.isError}
            isLoading={GradesQuery.isFetching}
            mantineTableBodyRowProps={({ row }) => ({
                style: {
                    backgroundColor: (row.original.coeirm && !row.original.coeirm.code) ? "#fff6de" : "transparent",
                },
            })}
            columns={gradeColumn}
            renderTopToolbarCustomActions={({ table }) => {
                const rowSelected = table.getSelectedRowModel().rows;
                return <>
                    <IRMApplySaveButton
                        dataChange={dataChange}
                        resetLocalChange={() => { setDataChange([]) }}
                    />
                    <IRMApplyByGradeImportButton
                        disabled={GradesQuery.isFetching}
                    />
                    <IRMApplyByGradeExportButton
                        table={table}
                        disabled={GradesQuery.isFetching}
                    />
                    <IRMApplyManyButton
                        gradesSelected={rowSelected.map(row => row.original)}
                        onConfirm={(values) => {
                            setDataChange(prev => mergeById(prev, values));
                        }}
                        resetRowSelection={table.resetRowSelection}
                    />
                    <IRMApplyByGradeRemoveIRMButton
                        resetRowSelection={table.resetRowSelection}
                        gradeIds={rowSelected.map(i => i.original.id ?? 0)}
                    />
                </>
            }}
        />
    </>
};

