'use client'

import { MyDataTable, AQButtonExportData, MyFieldset, MyCenterFull, AQButtonCreateByImportFile } from "aq-fe-framework/components";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { Button, Grid } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import F_u8zfwd46p2_Create from "./F_u8zfwd46p2_Create";
import F_u8zfwd46p2_Update from "./F_u8zfwd46p2_Update";
import F_u8zfwd46p2_Delete from "./F_u8zfwd46p2_Delete";
import { useForm } from "@mantine/form";

export interface I_u8zfwd46p2_Read {
    id?: number; // STT
    agentCode?: string; //Mã đơn vị
    agentName?: string; //Tên đơn vị
    agentType?: string; //Loại đơn vị
    affiliatedOf?: string; //Trực thuộc
}
export default function F_u8zfwd46p2_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    const listOfagentDirectoryQuery = useQuery<I_u8zfwd46p2_Read[]>({
        queryKey: [`ListOfagentDirectoryQuery`],
        queryFn: async () => [
            {
                id: 1,
                agentCode: "B.CSVC",
                agentName: "Ban quản trị cơ sở vật chất",
                agentType: "Ban",
                affiliatedOf: "Ban quản trị cơ sở vật chất",
            }
        ],
    });

    const exportConfig = {
        fields: [
            { fieldName: 'agentCode', header: 'Mã đơn vị' },
            { fieldName: 'agentName', header: 'Tên đơn vị' },
            { fieldName: 'agentType', header: 'Loại đơn vị' },
            { fieldName: 'affiliatedOf', header: 'Trực thuộc' },
            { fieldName: 'note', header: 'Ghi chú' },
        ],
    };

    const columns = useMemo<MRT_ColumnDef<I_u8zfwd46p2_Read>[]>(
        () => [
            {
                header: "Mã đơn vị",
                accessorKey: "agentCode",
            },
            {
                header: "Tên đơn vị",
                accessorKey: "agentName",
            },
            {
                header: "Loại đơn vị",
                accessorKey: "agentType",
            },
            {
                header: "Trực thuộc",
                accessorKey: "affiliatedOf",
            }
        ],
        []
    );



    if (listOfagentDirectoryQuery.isLoading) return "Đang tải dữ liệu...";
    if (listOfagentDirectoryQuery.isError) return "Không có dữ liệu...";

    return (
        <>
            <MyFieldset mt="20" title="Danh mục đơn vị">
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    data={listOfagentDirectoryQuery.data!}
                    renderTopToolbarCustomActions={() => (
                        <>
                            <F_u8zfwd46p2_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => { console.log(form_multiple.values) }} />
                            <AQButtonExportData
                                data={listOfagentDirectoryQuery.data!}
                                exportConfig={exportConfig}
                                objectName="DanhMucDonVi" />
                            <Button color="red" leftSection={<IconTrash />}>
                                Xóa
                            </Button>
                        </>
                    )}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_u8zfwd46p2_Update data={row.original} />
                            <F_u8zfwd46p2_Delete
                                id={row.original.id!}
                                agentCode={row.original.agentCode!}
                            />
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </>
    );
}

export const loaiDonViSelectData = [
    { label: 'Phòng', value: 'Phòng' },
    { label: 'Ban', value: 'Ban' },
    { label: 'Khối chuyên môn', value: 'Khối chuyên môn' },
    { label: 'Tổ', value: 'Tổ' }
]

export const trucThuocSelectData = [
    { label: 'Ban quản trị cơ sở vật chất', value: 'Ban quản trị cơ sở vật chất' },
    { label: 'Bộ môn cơ sở dữ liệu', value: 'Bộ môn cơ sở dữ liệu' }
]
