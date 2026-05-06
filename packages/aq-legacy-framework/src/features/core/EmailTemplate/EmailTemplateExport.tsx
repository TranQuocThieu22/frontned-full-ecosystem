import { CustomButtonExportData } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { EmailTemplate } from "@aq-fe/aq-legacy-framework/shared/interfaces/EmailTemplate";
import { IExportConfig } from "@aq-fe/aq-legacy-framework/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";
import { emailTemplateEnum } from "./EmailTemplateTable";

interface Props {
    emailTemplateEnum: emailTemplateEnum
    table: MRT_TableInstance<EmailTemplate>
}

export default function EmailTemplateExport({ emailTemplateEnum, table }: Props) {
    const { data } = useExportData(table)
    const exportConfig: IExportConfig<EmailTemplate> = {
        fields: [
            {
                header: "Tiêu đề thông báo",
                fieldName: "name"
            },
            {
                header: "Loại hành động",
                fieldName: "type",
                formatFunction: (value: string | number | boolean | Date | undefined, row: EmailTemplate) => {
                    const typeKey = (value as number) || 0;
                    return emailTemplateEnum.emailTemplateEnum[typeKey] || "Không xác định";
                }
            },
        ]
    }

    return (
        <CustomButtonExportData
            objectName="Mau_mail_thong_bao"
            data={data || []}
            exportConfig={exportConfig}
        />
    )
}
