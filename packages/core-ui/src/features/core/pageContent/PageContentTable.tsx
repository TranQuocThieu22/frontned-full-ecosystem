import { pageService } from "@aq-fe/core-ui/shared/APIs/pageService";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
import { extractLinkedMenuItems } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/utils";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useEditableRows } from "@aq-fe/core-ui/shared/hooks/useEditableRows";
import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { Page } from "@aq-fe/core-ui/shared/interfaces/Page";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Group, TextInput } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PageContentExport from "./PageContentExport";
import PageContentSave from "./PageContentSave";


export default function PageContentTable({ menuData }: { menuData: I_BasicAppShell_LinkItem[] }) {
    const pageQuery = useCustomReactQuery({
        queryKey: ['pages'],
        axiosFn: () => pageService.getAll(),
        options: {
            refetchOnWindowFocus: false
        }
    })
    const { editedRows, handleFieldChange } = useEditableRows<Page>();
    const columns = useMemo<MRT_ColumnDef<Page>[]>(() => [
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
                    <CustomFileInput
                        placeholder={file?.fileName || "Vui lòng chọn file"}
                        defaultValue={file?.fileName ? new File([], file.fileName) : undefined}
                        onChange={async (file) => {
                            if (!file) {
                                handleFieldChange(row.original, "pageDocumentFileDetail", {
                                    fileBase64String: "",
                                    fileExtension: "",
                                    fileName: ""
                                } as AQFileDetail)
                                handleFieldChange(row.original, "documentFilePath", undefined)
                                return
                            }
                            handleFieldChange(row.original, "pageDocumentFileDetail", await fileUtils.fileToAQDocumentType(file));
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
        const labelMap = new Map<number, Page>();
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
        }) as Page[];
    }, [pageQuery.data, menuData]).filter(Boolean);
    return (
        <CustomDataTable
            columns={columns}
            data={mergedData.map(item => ({
                ...item,
                pageDocumentFileDetail: {
                    fileName: item.documentFilePath
                } as AQFileDetail
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
