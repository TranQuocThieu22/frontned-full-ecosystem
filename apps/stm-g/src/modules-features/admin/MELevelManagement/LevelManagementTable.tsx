'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyCheckbox, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table"; // Assuming this is used for column definitions
import { useMemo, useState } from "react";
import { I_Level } from "./interfaces";
import LevelManagementCreateUpdateButton from "./LevelManagementCreateUpdateModal";
import LevelManagementDeleteButton from "./LevelManagementDeleteButton";
import LevelManagementDeleteListButton from "./LevelManagementDeleteListButton";
import { mockDataLevel } from "./mockDatas";

export default function LevelManagementTable() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // const query = useMyReactQuery({
    //     queryKey: [`LevelManagementRead`],
    //     axiosFn: async () => 
    // })

    const query = useQuery<I_Level[]>({
        queryKey: ["LevelManagementRead"],
        queryFn: async () => mockDataLevel
    })

    const columns = useMemo<MRT_ColumnDef<I_Level>[]>(() => [
        { header: "Mã cấp độ", accessorKey: "code", size: 150 },
        { header: "Tên cấp độ", accessorKey: "name", },
        { header: "Mã chương trình chính", accessorKey: "programCode", size: 150 },
        { header: "Mô tả cấp độ", accessorKey: "levelDescription", size: 300 },
        { header: "Thứ tự cấp độ", accessorKey: "levelOrder" },
        { header: "Số tiết học (cấp độ)", accessorKey: "totalLessons" },
        { header: "Số giờ học (cấp độ)", accessorKey: "totalHours" },
        { header: "Học phí gợi ý (cấp độ)", accessorKey: "suggestedFeeNote", size: 300 },
        { header: "Bài thi cuối cấp độ", accessorKey: "finalTestCode" },
        {
            header: "Đang hoạt động",
            accessorKey: "isActive",
            accessorFn(row) {return (
                <MyCenterFull>
                    <MyCheckbox readOnly checked={row.isActive} />
                </MyCenterFull>
            )
        }},
    ], [query.data]);


    return (
        <MyFieldset title="Danh sách cấp độ">
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
                return (
                    <MyCenterFull>
                        <LevelManagementCreateUpdateButton/>
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
                        <LevelManagementDeleteListButton values={selectedRows} />
                    </MyCenterFull>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <LevelManagementCreateUpdateButton values={row.original} />
                        <LevelManagementDeleteButton code={row.original.code || ""} id={row.original.id} />
                    </MyCenterFull>)
            }}
            />
            </MyFieldset>
    )
}
