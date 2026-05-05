'use client'

import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
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



    const columnsDayAbsence = useMemo<MRT_ColumnDef<F_dayAbsence>[]>(
        () => [
            { header: "Ngày dạy", accessorKey: "date" },
            { header: "Tiết bắt đầu", accessorKey: "classStartDate" },
            { header: "Số tiết", accessorKey: "classPeriod" },
            { header: "Phòng", accessorKey: "room" },
            { header: "Mã Lớp", accessorKey: "classID" },
            { header: "Sĩ số", accessorKey: "classSize" },
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
        // renderTopToolbarCustomActions={() => <Group>
        //     <Button color="green" onClick={() => console.log(dayAbsence)}>Lưu và Tổng kết</Button>
        //     <AQButtonCreateByImportFile color="" form={form} onSubmit={() => { }}></AQButtonCreateByImportFile>
        //     <Button color="red" >Xóa</Button>
        // </Group>}
        />
    );
}
