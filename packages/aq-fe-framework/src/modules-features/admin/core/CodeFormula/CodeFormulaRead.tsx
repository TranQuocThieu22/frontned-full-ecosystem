import { codeFormulaService } from "@/APIs/codeFormulaService";
import {
    AQButtonCreateByImportFile,
    MyCenterFull,
    MyDataTable,
} from "@/components";
import { useMyReactQuery } from "@/hooks";
import { ICodeFormula } from "@/interfaces/ICodeFormula";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import CodeFormulaCreate from "./CodeFormulaCreate";
import CodeFormulaDelete from "./CodeFormulaDelete";
import CodeFormulaDeleteList from "./CodeFormulaDeleteList";
import CodeFormulaUpdate from "./CodeFormulaUpdate";

type CodeFormulaReadProps = {
    businessTypeEnum?: Record<number, string>;
    objectTypeEnum?: Record<number, string>;
    repeatCycleEnum?: Record<number, string>;
};

export function CodeFormulaRead({
    businessTypeEnum,
    objectTypeEnum,
    repeatCycleEnum,
}: CodeFormulaReadProps) {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    const codeConfigQuery = useMyReactQuery({
        queryKey: [`CodeFormulaRead`],
        axiosFn: async () => codeFormulaService.getAll(),
    });

    const columns = useMemo<MRT_ColumnDef<ICodeFormula>[]>(() => {
        const cols: MRT_ColumnDef<ICodeFormula>[] = [
            {
                header: "Mã bộ đếm",
                accessorKey: "code",
            },
            {
                header: "Tên bộ đếm",
                accessorKey: "name",
            },
        ];

        if (businessTypeEnum) {
            cols.push({
                header: "Loại nghiệp vụ",
                accessorKey: "operationType",
                accessorFn: (row) =>
                    businessTypeEnum[row.operationType || 0] ?? row.operationType,
            });
        }

        if (objectTypeEnum) {
            cols.push({
                header: "Loại đối tượng",
                accessorKey: "objectType",
                accessorFn: (row) =>
                    objectTypeEnum[row.objectType || 0] ?? row.objectType,
            });
        }

        if (repeatCycleEnum) {
            cols.push({
                header: "Chu kỳ lặp",
                accessorKey: "repeatCycle",
                accessorFn: (row) =>
                    repeatCycleEnum[row.repeatCycle || 0] ?? row.repeatCycle,
            });
        }

        return cols;
    }, [businessTypeEnum, objectTypeEnum, repeatCycleEnum]);

    return (
        <MyDataTable
            isLoading={codeConfigQuery.isLoading}
            isError={codeConfigQuery.isError}
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            exportAble
            data={codeConfigQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <CodeFormulaCreate businessTypeEnum={businessTypeEnum} objectTypeEnum={objectTypeEnum} repeatCycleEnum={repeatCycleEnum} />
                    <CodeFormulaDeleteList
                        values={table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original)}
                    />
                    <AQButtonCreateByImportFile
                        setImportedData={setImportData}
                        form={form_multiple}
                        onSubmit={() => {
                            console.log(form_multiple.values);
                        }}
                    >
                        Import
                    </AQButtonCreateByImportFile>
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <CodeFormulaUpdate data={row.original} businessTypeEnum={businessTypeEnum} objectTypeEnum={objectTypeEnum} repeatCycleEnum={repeatCycleEnum} />
                    <CodeFormulaDelete
                        id={row.original.id!}
                        code={row.original.code!}
                    />
                </MyCenterFull>
            )}
        />
    );
}
