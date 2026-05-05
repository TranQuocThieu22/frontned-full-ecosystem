import { pageService } from "@/APIs/pageService";
import { extractLinkedMenuItems, I_BasicAppShell_LinkItem, MyDataTable, MyFileInput } from "@/components";
import { useMyReactQuery } from "@/hooks/custom-hooks/useMyReactQuery";
import { useEditableRows } from "@/hooks/useEditableRows";
import { IPage } from "@/interfaces";
import { IAQFileDetail, utils_file_fileToAQDocumentType } from "@/utils";
import { Group, TextInput } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PageContentExport from "./PageContentExport";
import PageContentSave from "./PageContentSave";


export default function PageContentTable({ menuData }: { menuData: I_BasicAppShell_LinkItem[] }) {
    const pageQuery = useMyReactQuery({
        queryKey: ['pages'],
        axiosFn: () => pageService.getAll(),
        options: {
            refetchOnWindowFocus: false
        }
    })
    const { editedRows, handleFieldChange } = useEditableRows<IPage>();
    const columns = useMemo<MRT_ColumnDef<IPage>[]>(() => [
        {
            header: "Dashboard",
            accessorKey: "name"

        },
        {
            header: "Mô tả",
            accessorKey: "description",
            Cell: ({ row }) => {
                return (
                    <TextInput
                        defaultValue={row.original.description}
                        onChange={(e) => {
                            handleFieldChange(row.original, "description", e.target.value);
                        }}
                    />
                )
            }
        },
        {
            header: "Url video hướng dẫn",
            accessorKey: "link",
            Cell: ({ row }) => (
                <TextInput
                    defaultValue={row.original.link}
                    onChange={(e) => {
                        handleFieldChange(row.original, "link", e.target.value);
                    }}
                />
            )
        },
        {
            header: "File tài liệu hướng dẫn",
            accessorKey: "pageDocumentFileDetail.fileName",
            Cell: ({ row }) => {
                const file = row.original.pageDocumentFileDetail;
                return (
                    <MyFileInput
                        placeholder={file?.fileName || "Vui lòng chọn file"}
                        defaultValue={file?.fileName ? new File([], file.fileName) : undefined}
                        onChange={async (file) => {
                            if (!file) {
                                handleFieldChange(row.original, "pageDocumentFileDetail", {
                                    fileBase64String: "",
                                    fileExtension: "",
                                    fileName: ""
                                } as IAQFileDetail)
                                handleFieldChange(row.original, "documentFilePath", undefined)
                                return
                            }
                            handleFieldChange(row.original, "pageDocumentFileDetail", await utils_file_fileToAQDocumentType(file));
                        }}
                        clearable
                    />
                )
            }
        }
    ], [handleFieldChange])
    const mergedData = useMemo(() => {
        if (!pageQuery.data) return [];

        // Tạo map từ query.data (array2)
        const labelMap = new Map<number, IPage>();
        pageQuery.data.forEach(item => {
            labelMap.set(item.id!, item);
        });

        // Tạo data mới dựa theo menuData (array1)
        return extractLinkedMenuItems(menuData).map(item => {
            if (labelMap.get(item.pageId!) == undefined) return undefined
            return ({
                ...labelMap.get(item.pageId!),
                name: item.label,
            })
        }) as IPage[];
    }, [pageQuery.data, menuData]).filter(Boolean);
    return (
        <MyDataTable
            columns={columns}
            data={mergedData.map(item => ({
                ...item,
                pageDocumentFileDetail: {
                    fileName: item.documentFilePath
                } as IAQFileDetail
            }))}
            enableRowSelection
            getRowId={row => row.id?.toString()}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <PageContentSave values={editedRows} />
                    <PageContentExport table={table} />
                </Group>
            )}
        />
    )
}
