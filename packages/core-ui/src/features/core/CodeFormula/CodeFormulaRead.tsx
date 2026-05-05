import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CodeFormula } from "@aq-fe/core-ui/shared/interfaces/CodeFormula";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CodeFormulaCreate from "./CodeFormulaCreate";
import CodeFormulaDelete from "./CodeFormulaDelete";
import CodeFormulaDeleteList from "./CodeFormulaDeleteList";
import CodeFormulaExport from "./CodeFormulaExport";
import CodeFormulaImport from "./CodeFormulaImport";
import CodeFormulaUpdate from "./CodeFormulaUpdate";

type CodeFormulaReadProps = {
    businessTypeEnum?: Record<number, string>;
    objectTypeEnum?: Record<number, string>;
    repeatCycleEnum?: Record<number, string>;
    isSae?: boolean
};

export function CodeFormulaRead({
    businessTypeEnum,
    objectTypeEnum,
    repeatCycleEnum,
    isSae
}: CodeFormulaReadProps) {

    const codeConfigQuery = useCustomReactQuery({
        queryKey: [`CodeFormulaRead`],
        axiosFn: async () => codeFormulaService.getAll(),
    });

    const columns = useMemo<MRT_ColumnDef<CodeFormula>[]>(() => {
        const cols: MRT_ColumnDef<CodeFormula>[] = [
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
                accessorKey: "frequency",
                accessorFn: (row) =>
                    repeatCycleEnum[row.frequency || 0] ?? row.frequency,
            });
        }

        return cols;
    }, [businessTypeEnum, objectTypeEnum, repeatCycleEnum]);

    return (
        <CustomDataTable
            isLoading={codeConfigQuery.isLoading}
            isError={codeConfigQuery.isError}
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={codeConfigQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <CodeFormulaCreate
                        isSae={isSae}
                        businessTypeEnum={businessTypeEnum}
                        objectTypeEnum={objectTypeEnum}
                        repeatCycleEnum={repeatCycleEnum} />
                    <CodeFormulaImport
                        isLoading={codeConfigQuery.isLoading}
                        businessTypeEnum={businessTypeEnum}
                        objectTypeEnum={objectTypeEnum}
                        repeatCycleEnum={repeatCycleEnum}
                    />
                    <CodeFormulaExport
                        table={table}
                        businessTypeEnum={businessTypeEnum}
                        objectTypeEnum={objectTypeEnum}
                        repeatCycleEnum={repeatCycleEnum}
                    />
                    <CodeFormulaDeleteList
                        values={table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original)}
                    />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <CodeFormulaUpdate data={row.original} businessTypeEnum={businessTypeEnum} objectTypeEnum={objectTypeEnum} repeatCycleEnum={repeatCycleEnum} />
                    <CodeFormulaDelete
                        id={row.original.id!}
                        code={row.original.code!}
                    />
                </CustomCenterFull>
            )}
        />
    );
}
