'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset"
import { Button } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconTrash } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { AQButtonCreateByImportFile, AQButtonExportData } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import F_yybmjrdprg_Add from "./F_yybmjrdprg_Add"
import F_yybmjrdprg_View from "./F_yybmjrdprg_View"

export interface I {
    id?: number,
    ngayGui?: string,
    tieuDe?: string,
    loaiDoiTuong?: string,
    soLuong?: number
}

export default function F_yybmjrdprg_Read() {
    const query = useQuery<I[]>({
        queryKey: ["useS_yybmjrdprg_Read"],
        queryFn: async () => [
            {
                ngayGui: "12/02/2025 10:12:32",
                tieuDe: "Thông báo nhận chứ chỉ hoàn thành khoá học Lập trình Web khoá 25-1",
                loaiDoiTuong: "Học viên có quyết định cấp chứng chỉ",
                soLuong: 32
            }
        ]
    })

    const form_mutiple = useForm<any>({
        initialValues: {
            importedData: [],
        }
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Ngày gửi",
            accessorKey: "ngayGui"
        },
        {
            header: "Tiêu đề thông báo",
            accessorKey: "tieuDe"
        },
        {
            header: "Loại đối tượng",
            accessorKey: "loaiDoiTuong"
        },
        {
            header: "Số lượng người nhận",
            accessorKey: "soLuong"
        },
    ], [])

    const exportConfig = {
        fields: [
            { fieldName: "ngayGui", header: "Ngày gửi" },
            { fieldName: "tieuDe", header: "Tiêu đề thông báo" },
            { fieldName: "loaiDoiTuong", header: "Loại đối tượng" },
            { fieldName: "soLuong", header: "Số lượng người nhận" },
        ]
    }

    function setFileData(data: any): void {
        throw new Error("Function not implemented.")
    }

    if (query.isLoading) return <div>Đang tải dữ liệu...</div>
    if (query.isError) return <div>Lỗi: {query.error.message}</div>


    return (
        <MyFieldset title="Danh sách thông báo đã gửi">
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={query.data ?? []}
                renderTopToolbarCustomActions={() =>
                    <>
                        <F_yybmjrdprg_Add />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => { }}
                            form={form_mutiple}
                        >
                        </AQButtonCreateByImportFile>
                        <AQButtonExportData
                            objectName="sendmail"
                            data={query.data!}
                            exportConfig={exportConfig}
                        />
                        <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                    </>
                }
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull >
                            <F_yybmjrdprg_View values={row.original} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}
