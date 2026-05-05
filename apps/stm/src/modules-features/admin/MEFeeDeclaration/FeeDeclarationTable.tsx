'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table"; // Assuming this is used for column definitions
import { useState } from "react";
import FeeDeclarationCreateUpdateModal from "./FeeDeclarationCreateUpdateModal";
import FeeDeclarationDeleteButton from "./FeeDeclarationDeleteButton";
import FeeDeclarationDeleteListButton from "./FeeDeclarationDeleteListButton";
import { I_TuitionFee } from "./interfaces";
import { mockData_TuitionFee } from "./mockDatas";

export default function FeeDeclarationTable() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // const query = useMyReactQuery({
    //     queryKey: [`FeeDeclarationRead`],
    //     axiosFn: async () => 
    // })

    const query = useQuery<I_TuitionFee[]>({
        queryKey: ["FeeDeclarationRead"],
        queryFn: async () => mockData_TuitionFee
    })

    const columns: MRT_ColumnDef<I_TuitionFee>[] = [
        { header: "Mã chương trình", accessorKey: "programCode" },
        { header: "Tên chương trình", accessorKey: "programName" },
        { header: "Mã cơ sở", accessorKey: "campusCode" },
        { header: "Tên cơ sở", accessorKey: "campusName" },
        { header: "Mã khóa học", accessorKey: "courseSectionCode" },
        { header: "Tên khóa học", accessorKey: "courseSectionName" },
        { header: "Mã cấp độ", accessorKey: "levelCode" },
        { header: "Tên cấp độ", accessorKey: "levelName" },
        { header: "Đơn giá", accessorKey: "price" },
        { header: "Ghi chú", accessorKey: "note" },
    ];

    return (
        <MyFieldset title={"Danh sách đơn giá"}>
            <MyDataTable
                columns={columns}
                data={query.data || []}
                enableRowSelection
                enableColumnPinning
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 30 },
                    columnPinning: {
                        right: ["mrt-row-actions"]
                    }
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original) || [];

                    return (<MyCenterFull>
                        <FeeDeclarationCreateUpdateModal />
                        <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} setImportedData={setImportData} />
                        <Button
                            leftSection={<IconTableExport />}
                            color="teal"
                            size="sm"
                            radius="sm"
                            onClick={() => {
                                notifications.show({
                                    title: "Thông báo",
                                    message:
                                        "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                    color: "blue",
                                    autoClose: 5000,
                                });
                            }}
                        >
                            Export
                        </Button>
                        <FeeDeclarationDeleteListButton values={selectedRows} />
                    </MyCenterFull>);
                }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeeDeclarationCreateUpdateModal values={row.original} />
                        <FeeDeclarationDeleteButton code={row.original.code || ""} id={row.original.id} />
                    </MyCenterFull>)
            }}
            />
        </MyFieldset>
    )
}
