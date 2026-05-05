import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { DocumentAttribute } from "@aq-fe/core-ui/shared/interfaces/DocumentAttribute";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    table: MRT_TableInstance<DocumentAttribute>;
    loading?: boolean;
}

export function F_documentCategories_Export({ loading, table }: Props) {
    const { data } = useExportData(table);

    const exportConfig: IExportConfig<DocumentAttribute> = {
        fields: [
            {
                header: 'Mã loại văn bản',
                fieldName: 'code',
            },
            {
                header: 'Tên loại văn bản',
                fieldName: 'name',
            },
        ],
    };

    return (
        <CustomButtonExportData
            loading={loading}
            objectName="Danh sách Loại văn bản"
            data={data}
            exportConfig={exportConfig}
        />
    );
}