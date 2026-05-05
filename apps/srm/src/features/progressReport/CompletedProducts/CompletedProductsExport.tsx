import { EnumLabelProductType, EnumProductType } from "@/shared/consts/enum/EnumProductType";
import { SRMCompletedProduct } from "@/shared/interfaces/SRMCompletedProduct";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";
const exportConfig: IExportConfig<SRMCompletedProduct> = {
    fields: [
        {
            header: "Tên tác giả",
            fieldName: "author"
        },
        {
            header: "Năm công bố",
            fieldName: "publicationYear"
        },
        {
            header: "Tên công trình",
            fieldName: "workTitle"
        },
        {
            header: "Tên tạp chí/ NXB/ Số tập trang đăng công trình",
            fieldName: "journalName"
        },
        {
            header: "ISSN/ISBN",
            fieldName: "issn"
        },
        {
            header: "Loại sản phẩm",
            fieldName: "productType",
            formatFunction: (value, row) => EnumLabelProductType[row.productType as EnumProductType]
        },
        {
            header: "Minh chứng",
            fieldName: "attachmentPath",
        },
    ]
}

export default function CompletedProductsExport({ table }: { table: MRT_TableInstance<SRMCompletedProduct> }) {
    const { data } = useExportData(table)
    return (
        <AQButtonExportData
            objectName="Danh sách sản phẩm hoàn thành"
            data={data || []}
            exportConfig={exportConfig}
        />
    )
}
