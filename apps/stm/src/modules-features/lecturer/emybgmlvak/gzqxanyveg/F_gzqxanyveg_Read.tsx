'use client'

import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Box, Button, Checkbox, Fieldset, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { F_class, F_student } from "../F_emybgmlvak_Read";

export default function F_gzqxanyveg_Read(
    { values }: { values: { classes: F_class[] } }
) {
    const [selectedClass, setSelectedClass] = useState<F_class | null>(values.classes[0] || null);

    const [students, setStudents] = useState<F_student[]>(selectedClass ? selectedClass.students : []);
    const form = useForm<any>({
        initialValues: values.classes
    })

    // Function to update student data and recalculate total
    const handleUpdate = (id: number, key: keyof F_student, value: string) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === id
                    ? {
                        ...student,
                        [key]: value === "" ? "" : Number(value), // Keep empty string if input is cleared
                        total: key === "inclass" || key === "midterm" || key === "final"
                            ? (
                                ((key === "inclass" ? Number(value) || 0 : student.inclass || 0) * 0.3) +
                                ((key === "midterm" ? Number(value) || 0 : student.midterm || 0) * 0.3) +
                                ((key === "final" ? Number(value) || 0 : student.final || 0) * 0.4)
                            )
                            : student.total,
                    }
                    : student
            )
        );
    };

    const columns = useMemo<MRT_ColumnDef<F_student>[]>(() => [
        { header: "Họ Tên", accessorKey: "name" },
        { header: "Giới tính", accessorKey: "gender" },
        { header: "Ngày sinh", accessorKey: "dob" },
        { header: "Trạng thái học viên", accessorKey: "status" },

        {
            header: "Chuyên cần",
            accessorKey: "inclass",
            Cell: ({ row }) => (
                <NumberInput

                    value={row.original.inclass !== undefined ? String(row.original.inclass) : ""}
                    onChange={(e) =>
                        handleUpdate(row.original.id, "inclass", String(e))
                    }
                    max={10}
                />
            ),
        },
        {
            header: "Giữa kì",
            accessorKey: "midterm",
            Cell: ({ row }) => (
                <NumberInput

                    value={row.original.midterm !== undefined ? String(row.original.midterm) : ""}
                    onChange={(e) =>
                        handleUpdate(row.original.id, "midterm", String(e))
                    }
                    max={10}

                />
            ),
        },
        {
            header: "Cuối kì",
            accessorKey: "final",
            Cell: ({ row }) => (
                <NumberInput
                    value={row.original.final !== undefined ? String(row.original.final) : ""}
                    onChange={(e) =>
                        handleUpdate(row.original.id, "final", String(e))
                    }
                    max={10}

                />
            ),
        },

        {
            header: "Tổng kết",
            accessorKey: "total",
            Cell: ({ row }) => <>{row.original.total}</>,
        },

        {
            header: "Đạt",
            accessorKey: "pass",
            Cell: ({ row }) => {
                const isPassed = Number(row.original.total) >= 5;
                return (
                    <Checkbox
                        onChange={() => { }}
                        checked={isPassed}
                        color="black"
                        variant="outline"
                        style={{ cursor: "unset" }}
                    />
                );
            },
        },
    ], []);

    return (

        <Fieldset variant="subtle" legend={<Box style={{ display: "inline-flex", fontSize: "1.3rem", fontWeight: "bold", padding: "5px 10px", gap: "2rem" }}>
            <span>Mã lớp: {selectedClass?.code || "N/A"}</span>
            <span>Tên khoá học: {selectedClass?.code ? "Lập trình web năm 2024 khoá 1" : "N/A"}</span>
            <span>Cách tổng kết: Trọng số</span>
        </Box>} >
            <MyDataTable
                enableSorting
                columns={columns}
                enableRowNumbers={true}
                data={students} // Bind updated students data
                renderTopToolbarCustomActions={() => <Group>
                    <Button color="green">Lưu và Tổng kết</Button>
                    <AQButtonCreateByImportFile color="" form={form} onSubmit={() => { }}></AQButtonCreateByImportFile>
                    <Button color="red" >Xóa</Button>
                </Group>}
            />
        </Fieldset>
    );
}
