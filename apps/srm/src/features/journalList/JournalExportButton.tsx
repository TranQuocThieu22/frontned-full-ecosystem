import { EnumJournalType, EnumLabelJournalType } from "@/shared/consts/enum/EnumJournalType";
import { SRMJournal } from "@/shared/interfaces/SRMJournal";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    table: MRT_TableInstance<SRMJournal>;
}

export default function JournalExportButton({ table }: Props) {
    const { data } = useExportData(table)

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã danh mục",
            },
            {
                fieldName: "name",
                header: "Tên",
            },
            {
                fieldName: "type",
                header: "Loại",
                formatFunction: (value: any) => EnumLabelJournalType[value as EnumJournalType]
            },
            {
                fieldName: "typeCode",
                header: "Mã loại công bố",
                formatFunction: (value: any, row: any) => row.srmPublicationType?.code
            },
            {
                fieldName: "isbn",
                header: "Chỉ số ISBN/ISSN",
            },
            {
                fieldName: "note",
                header: "Ghi chú",
                size: 300
            }
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh_sach_tap_chi_hoi_thao_NXB`}
            data={data}
            exportConfig={exportConfig}
        />
    );
}