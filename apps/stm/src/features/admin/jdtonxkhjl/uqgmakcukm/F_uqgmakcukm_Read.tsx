'use client'

import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Checkbox, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { F_dayAbsence } from "../F_jdtonxkhjl_Read";

export default function F_bgmhkdewbt_Read(
    { values }: { values: { fileProve: F_dayAbsence[] } }
) {
    // const [selectedLecturer, setselectedLecturer] = useState<F_lecturer | null>(values.fileProve[0] || null);


    const [dayAbsence, setdayAbsence] = useState<F_dayAbsence[]>(values.fileProve);
    const form = useForm<any>({
        initialValues: values.fileProve
    })

    const handleUpdateString = (id: number, key: keyof F_dayAbsence, value: string) => {
        setdayAbsence((prevLectuer) =>
            prevLectuer.map((lecturer) =>
                lecturer.id === id
                    ? {
                        ...lecturer,
                        [key]: value === "" ? "" : value, // Keep empty string if input is cleared
                    }
                    : lecturer
            )
        );
    };

    const handleUpdateNumber = (id: number, key: keyof F_dayAbsence, value: string) => {
        setdayAbsence((prevNumber) =>
            prevNumber.map((num) =>
                num.id === id
                    ? {
                        ...num,
                        [key]: value === "" ? "" : Number(value), // Keep empty string if input is cleared
                    }
                    : num
            )
        );
    };


    const columnsDayAbsence = useMemo<MRT_ColumnDef<F_dayAbsence>[]>(
        () => [
            {
                header: "Giảng viên", accessorKey: "lecturerName", Cell: ({ row }) => (
                    <TextInput

                        value={row.original.lecturerName !== undefined ? row.original.lecturerName : ""}
                        onChange={(e) =>
                            handleUpdateString(row.original.id, "lecturerName", e.target.value)
                        }
                        max={10}
                    />
                ),
            },
            {
                header: "Ngày dạy", accessorKey: "date", Cell: ({ row }) => (
                    <TextInput

                        value={row.original.date !== undefined ? row.original.date : ""}
                        onChange={(e) =>
                            handleUpdateString(row.original.id, "date", e.target.value)
                        }
                        max={10}
                    />
                ),
            },
            {
                header: "Tiết bắt đầu", accessorKey: "classStartDate", Cell: ({ row }) => (
                    <NumberInput

                        value={row.original.classStartDate !== undefined ? row.original.classStartDate : ""}
                        onChange={(e) =>
                            handleUpdateNumber(row.original.id, "classStartDate", String(e))
                        }
                        max={10}

                    />
                ),
            },
            {
                header: "Số tiết", accessorKey: "classPeriod", Cell: ({ row }) => (
                    <NumberInput

                        value={row.original.classPeriod !== undefined ? row.original.classPeriod : ""}
                        onChange={(e) =>
                            handleUpdateNumber(row.original.id, "classPeriod", String(e))
                        }
                        max={10}
                    />
                ),
            },
            { header: "Phòng", accessorKey: "room" },
            {
                header: "Mã Lớp", accessorKey: "classID", Cell: ({ row }) => (
                    <TextInput
                        value={row.original.classID !== undefined ? row.original.classID : ""}
                        onChange={(e) =>
                            handleUpdateString(row.original.id, "classID", e.target.value)
                        }
                        max={10}
                    />
                ),
            },
            { header: "Sĩ số", accessorKey: "classSize" },
            { header: "Đã xử lí", accessorKey: "checked", Cell: ({ row }) => <Checkbox onChange={() => { }} checked={row.original.checked}></Checkbox> },

        ],
        []
    );

    return (


        <MyDataTable
            exportAble
            enableSorting
            columns={columnsDayAbsence}
            enableRowNumbers={true}
            data={dayAbsence}
            renderTopToolbarCustomActions={() => <Group>
                <Button color="green" >Lưu</Button>
            </Group>}
        />
    );
}
