'use client'
import { ICognition, cognitionService } from "@/shared/APIs/cognitionService"
import { Group } from "@mantine/core"
import { useForm } from "@mantine/form"
import { AQButtonCreateByImportFile, MyCenterFull, MyDataTable } from "aq-fe-framework/components"
import { useMyReactQuery } from "aq-fe-framework/hooks"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo, useState } from "react"
import CognitionCreate from "./CognitionCreate"
import CognitionDelete from "./CognitionDelete"
import CognitionDeleteList from "./CognitionDeleteList"
import CognitionUpdate from "./CognitionUpdate"

export default function CognitionRead() {
    const query = useMyReactQuery({
        queryKey: ['Cognitions'],
        axiosFn: async () => cognitionService.getAll(),
    })

    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const columns = useMemo<MRT_ColumnDef<ICognition>[]>(() => [
        {
            header: 'Mã mức độ',
            accessorKey: 'code',
            id: 'code',
        },
        {
            header: 'Tên mức độ',
            accessorKey: 'name',
            id: 'name',
        },
        {
            header: 'Ghi chú',
            accessorKey: 'note',
            id: 'note',
        },
    ], [])




    return (
        <MyDataTable
            // isLoading={query.isLoading}
            // isError={query.isError}
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            exportAble
            data={query.data || []}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <CognitionCreate />
                    <CognitionDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);
                    }} >s</AQButtonCreateByImportFile>
                </Group>)}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <CognitionUpdate cognition={row.original} />
                        <CognitionDelete id={row.original.id!} code={row.original.code!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}