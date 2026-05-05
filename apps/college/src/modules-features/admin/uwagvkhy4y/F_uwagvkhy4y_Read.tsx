'use client';

import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_uwagvkhy4y_Create from "./F_uwagvkhy4y_Create";
import F_uwagvkhy4y_Delete from "./F_uwagvkhy4y_Delete";
import F_uwagvkhy4y_Update from "./F_uwagvkhy4y_Update";

interface I_Course {
    id?: number; // STT
    maMon?: string; // Mã môn
    tenMon?: string; // Tên môn
    tenMonEg?: string; // Tên môn Eg
    ghiChu?: string; // Ghi chú
}

export default function F_uwagvkhy4y_Read() {
    const [fileData, setFileData] = useState<any[]>([]);

    const query = useQuery<I_Course[]>({
        queryKey: ["CourseTable"],
        queryFn: async () => [
            { id: 1, maMon: "CS101", tenMon: "Lập trình C", tenMonEg: "C Programming", ghiChu: "Cơ bản" },
            { id: 2, maMon: "CS102", tenMon: "Lập trình Java", tenMonEg: "Java Programming", ghiChu: "OOP nâng cao" },
            { id: 3, maMon: "CS103", tenMon: "Phát triển Web", tenMonEg: "Web Development", ghiChu: "HTML, CSS, JS" },
        ],
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_Course>[]>(
        () => [
            {
                header: "Mã môn",
                accessorKey: "maMon",
            },
            {
                header: "Tên môn",
                accessorKey: "tenMon",
            },
            {
                header: "Tên môn Eg",
                accessorKey: "tenMonEg",
            },
            {
                header: "Ghi chú",
                accessorKey: "ghiChu",
            },
        ],
        []
    );

    const exportConfig = {
        fields: [
            { fieldName: "maMon", header: "Mã môn" },
            { fieldName: "tenMon", header: "Tên môn" },
            { fieldName: "tenMonEg", header: "Tên môn Eg" },
            { fieldName: "ghiChu", header: "Ghi chú" },
        ]
    };

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_uwagvkhy4y_Create />
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={() => { }}
                        form={form_multiple}
                    >
                    </AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsDotXet"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                </>
            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_uwagvkhy4y_Update data={row.original} />
                        <F_uwagvkhy4y_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}