import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MyFieldset, MyDataTable, AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StudentLevelFormulaDelete from "./StudentLevelFormulaDelete";
import StudentLevelFormulaDeleteList from "./StudentLevelFormulaDeleteList";
import StudentLevelFormulaCreate from "./StudentLevelFormulaCreate";
import StudentLevelFormulaUpdate from "./StudentLevelFormulaTableUpdate";

export default function StudentLevelFormulaTable() {

    const form = useForm({
        initialValues: {

        }
    });
    const query = useQuery<IStudentLevel[]>({
        queryKey: ["studentLevels"],
        queryFn: async () => {
            return studentLevelMockData || [];
        },
    })

    const columns = useMemo<MRT_ColumnDef<IStudentLevel>[]>(() => [
        {
            header: "Phân loại",
            accessorKey: "category"
        },
        {
            header: "Tiêu chí",
            accessorKey: "criteria"
        },
        {
            header: "Mức độ",
            accessorKey: "level"
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "category", header: "Phân loại" },
            { fieldName: "criteria", header: "Tiêu chí" },
            { fieldName: "level", header: "Mức độ" }
        ]
    };

    return (
        <MyFieldset title={"Danh sách công thức gán mức độ học sinh"}>
            <MyDataTable
                isError={query.isError}
                isLoading={query.isLoading}
                columns={columns}
                data={query.data || []}
                enableRowSelection
                enableColumnFilters
                enableRowNumbers
                renderTopToolbarCustomActions={({ table }) => (
                    <    >
                        <StudentLevelFormulaCreate />
                        <AQButtonCreateByImportFile onSubmit={() => { }} form={form} />
                        <AQButtonExportData
                            objectName={"DanhSachcongthucganmucdohocsinh"}
                            data={query.data || []}
                            exportConfig={exportConfig}
                        />
                        <StudentLevelFormulaDeleteList
                            values={table
                                .getSelectedRowModel()
                                .flatRows.flatMap((item) => item.original)}
                        />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <StudentLevelFormulaUpdate data={row.original} />
                        <StudentLevelFormulaDelete
                            id={row.original.id}
                            label={row.original.id.toString()}
                        />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    )
}

// Interface cho bảng Mức độ học sinh
export interface IStudentLevel {
    id: number; // TT
    category: string; // Phân loại
    criteria: string; // Tiêu chí
    level: number; // Mức độ
}

// Mock data cho bảng (dạng chuẩn)
export const studentLevelMockData: IStudentLevel[] = [
    { id: 1, category: "Chuyên cần", criteria: "Nghỉ phép 1 buổi", level: 1 },
    { id: 2, category: "Chuyên cần", criteria: "Nghỉ phép 2 buổi liên tiếp", level: 3 },
    { id: 3, category: "Chuyên cần", criteria: "Nghỉ phép 2 buổi/tháng", level: 3 },
    { id: 4, category: "Chuyên cần", criteria: "Nghỉ phép 3 buổi/tháng", level: 4 },
    { id: 5, category: "Điểm", criteria: "Chưa làm BTVN 1 buổi", level: 1 },
    { id: 6, category: "Điểm", criteria: "Chưa làm BTVN 2 buổi/tháng", level: 3 },
    { id: 7, category: "Điểm", criteria: "Chưa làm BTVN 3 buổi/tháng", level: 4 },
    { id: 8, category: "Điểm", criteria: "CCG 1 buổi", level: 1 },
    { id: 9, category: "Điểm", criteria: "CCG 2 buổi", level: 2 },
    { id: 10, category: "Điểm", criteria: "CCG 3 buổi", level: 3 },
    { id: 11, category: "Điểm", criteria: "5 điểm 2 buổi liên tiếp", level: 1 },
    { id: 12, category: "Điểm", criteria: "5 điểm 3 buổi/tháng", level: 2 },
    { id: 13, category: "Điểm", criteria: "Quên vở 1 buổi", level: 1 },
    { id: 14, category: "Điểm", criteria: "Quên vở 2 buổi", level: 2 },
    { id: 15, category: "Điểm", criteria: "Điểm kiểm tra tháng CCG", level: 2 },
];

