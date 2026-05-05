import { EnumLabelPublicationDeclarationStatus } from "@/shared/consts/enum/EnumPublicationDeclarationStatus";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { MRT_TableInstance } from "mantine-react-table";


export default function DeclareNewPublicationExport({ table }: { table: MRT_TableInstance<SRMPublicationDeclaration> }) {
    const { data } = useExportData(table)

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã công bố",
            },
            {
                fieldName: "name",
                header: "Tên công trình",
            },
            {
                fieldName: "srmPublicationTypeName",
                header: "Tên loại công bố",
                formatFunction: (row: SRMPublicationDeclaration, object: SRMPublicationDeclaration) => {
                    return object.srmPublicationType?.name;
                }
            },
            {
                fieldName: "publicationYear",
                header: "Năm xuất bản",
            },
            {
                fieldName: "mainAuthor",
                header: "Tác giả chính",
            },
            {
                fieldName: "journal",
                header: "Tên tạp chí/hội thảo/NXB",
            },
            {
                fieldName: "status",
                header: "Trạng thái",
                formatFunction: (row: SRMPublicationDeclaration, object: SRMPublicationDeclaration) => {
                    return converterUtils.getLabelByValue(EnumLabelPublicationDeclarationStatus, object?.status ?? 1);
                }
            },
        ],
    };

    const values = data.map((item) => {
        return {
            ...item,
        };
    });

    return (
        <AQButtonExportData
            objectName="Export danh sách kê khai công bố mới"
            data={values! || []}
            exportConfig={exportConfig}
        />
    );
}
