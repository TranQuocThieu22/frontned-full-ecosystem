import { EnumLabelProductType, EnumProductType } from "@/shared/consts/enum/EnumProductType";
import { SRMCompletedProduct } from "@/shared/interfaces/SRMCompletedProduct";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CompletedProductsExport from "./CompletedProductsExport";
import ProgressReportCompletedProductsCreateUpdate from "./ProgressReportCompletedProductsCreateUpdate";
import ProgressReportCompletedProductsDelete from "./ProgressReportCompletedProductsDelete";
import ProgressReportCompletedProductsDeleteList from "./ProgressReportCompletedProductsDeleteList";


export default function ProgressReportCompletedProductsTable({ readOnly, completedProductData }: { readOnly?: boolean, completedProductData?: SRMCompletedProduct[] }) {
    const columns = useMemo<MRT_ColumnDef<SRMCompletedProduct>[]>(() => [
        {
            header: "Tên tác giả",
            accessorKey: "author"
        },
        {
            header: "Năm công bố",
            accessorKey: "publicationYear"
        },
        {
            header: "Tên công trình",
            accessorKey: "workTitle"
        },
        {
            header: "Tên tạp chí/ NXB/ Số tập trang đăng công trình",
            accessorKey: "journalName"
        },
        {
            header: "ISSN/ISBN",
            accessorKey: "issn"
        },
        {
            header: "Loại sản phẩm",
            accessorKey: "productType",
            accessorFn: (row) => EnumLabelProductType[row.productType as EnumProductType]
        },
        {
            header: "Minh chứng",
            accessorKey: "attachmentPath",
            accessorFn: (row) => <CustomButtonViewFileAPI filePath={row.attachmentPath} />
        },
    ], [])
    return (
        <CustomDataTable
            enableRowSelection
            columns={columns}
            data={completedProductData || []}
            renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        {readOnly == false && <>
                            <ProgressReportCompletedProductsCreateUpdate />
                            <ProgressReportCompletedProductsDeleteList table={table} />
                        </>}
                        <CompletedProductsExport table={table} />
                    </Group>
            )}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <ProgressReportCompletedProductsCreateUpdate values={row.original} />
                    <ProgressReportCompletedProductsDelete id={row.original.id!} code={row.original.author || ""} />
                </CustomCenterFull>
            )}
            enableRowActions={!readOnly}
        />
    )
}
